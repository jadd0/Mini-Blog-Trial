<script>
	import Icon from "@iconify/svelte";
	import Nav from "../__nav/+page.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	export let data;
	let posts = [];
	let polls = {};
	let loading = true;
	let likes = []


	async function submit(id, option) {
		const response = await fetch("/api/voteOption", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
				option,
			}),
		});
	}

	async function like(id) {
		if (likes[id].isLiked) {
			likes[id].isLiked = false;
			likes[id].likeCount--;

			const res = await fetch("/api/removeLike", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: id,
				}),
			});
			return
		}
		if (likes[id].isDisliked) {
			likes[id].isDisliked = false;
			likes[id].dislikeCount--;
		}
		likes[id].isLiked = true;
		likes[id].likeCount++;

		const res = await fetch("/api/likePost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
			}),
		});
	}

	async function dislike(id) {
		console.log(id)
		if (likes[id].isDisliked) {
			likes[id].isDisliked = false;
			likes[id].dislikeCount--;

			const res = await fetch("/api/removeDislike", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
				}),
			});
			return
		}
		if (likes[id].isLiked) {
			likes[id].isLiked = false;
			likes[id].likeCount--;
		}
		likes[id].isDisliked = true;
		likes[id].dislikeCount++;

		const res = await fetch("/api/dislikePost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
			}),
		});
	}

	function getLikesDislikes(post) {
		if (post == undefined) return
		post = posts.find((item) => item.id === post)
		const likes1 = post.likes || []
		const dislikes = post.dislikes || []

		const isLiked = !(
			likes1.find((user) => user.username === data.username) === undefined
		);
		const isDisliked = !(
			dislikes.find((user) => user.username === data.username) === undefined
		);

		likes[post.id] = {
			isLiked,
			likeCount: likes1.length,
			isDisliked,
			dislikeCount: dislikes.length,
			likeHover: false,
			dislikeHover: false
		};
		likes = [...likes]
	}

	function getStats(post) {
		if (polls[post.id] != undefined) {
			return;
		}

		polls[post.id] = {
			clicked: false,
		};

		let total = 0;

		for (let i in post.options) {
			total += post.options[i].votes.length;
			polls[post.id][i] = {
				total: post.options[i].votes.length,
				percentage: 0,
			};

			if (
				post.options[i].votes.find(
					(item) => item.username === data.username
				) != undefined
			) {
				polls[post.id][i] = { ...polls[post.id][i], clicked: true };
				polls[post.id].clicked = true;
			}
		}
		polls[post.id].total = total;

		for (let i in post.options) {
			polls[post.id][i].percentage = Math.round(
				(polls[post.id][i].total / total) * 100
			);
		}
	}

	function vote(post, option) {
		polls[post.id] = {
			selected: option,
		};

		let total = 0;

		for (let i in post.options) {
			total += post.options[i].votes.length;
			polls[post.id][i] = {
				total: post.options[i].votes.length,
				percentage: 0,
			};
		}

		polls[post.id][option].total += 1;
		total += 1;
		submit(post.id, post.options[option].value);

		for (let i in post.options) {
			for (let i in post.options) {
				polls[post.id][i].percentage = Math.round(
					(polls[post.id][i].total / total) * 100
				);
			}
		}

		polls[post.id][option] = { ...polls[post.id][option], clicked: true };
		polls[post.id].total = total;
	}

	function timeAgo(input) {
		const date = input instanceof Date ? input : new Date(input);
		const formatter = new Intl.RelativeTimeFormat("en");
		const ranges = {
			years: 3600 * 24 * 365,
			months: 3600 * 24 * 30,
			weeks: 3600 * 24 * 7,
			days: 3600 * 24,
			hours: 3600,
			minutes: 60,
			seconds: 1,
		};
		const secondsElapsed = (date.getTime() - Date.now()) / 1000;
		for (let key in ranges) {
			if (ranges[key] < Math.abs(secondsElapsed)) {
				const delta = secondsElapsed / ranges[key];
				return formatter.format(Math.round(delta), key);
			}
		}
	}

	onMount(async () => {
		const res = await fetch(`/api/getUserPosts?user=${$page.params.username}`);
		const resJson = await res.json();
		posts = resJson.data;
		loading = false;
	});

	const follow = async () => {
		const response = await fetch(
			`/api/${data.bool === true ? "unfollow" : "follow"}`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: $page.params.username,
				}),
			}
		);

		if (response.ok) {
			location.reload();
		}
	};
</script>

<svelte:head>
	<title>@{$page.params.username}</title>
</svelte:head>

<body>
	<Nav username={data.username} />
	<div id="whole">
		<h1 id="username">@{$page.params.username}</h1>
		<h2 id="name">{data.user.name}</h2>
		{#if data.bool == false}
			<button on:click={follow} id="followButton">Follow</button>
		{/if}
		{#if data.bool == true}
			<button on:click={follow} id="followButton">Unfollow</button>
		{/if}

		{#if data.bool == "self"}
			<button
				on:click={() => {
					location.href = "/moods";
				}}
				id="followButton">Moods</button
			>
		{/if}
		<div id="followerContainer">
			<a href="/@{data.user.username}/following">
				<div id="button">Following</div>
			</a>
			<a href="/@{data.user.username}/followers">
				<div id="button">Followers</div></a
			>
		</div>

		{#if data.bool == "self"}
			{#if posts.length == 0 && !loading}
				<a href="/newpost" id="bland"
					>Looking very bland here...<br />Why not post your first
					blog today?</a
				>
			{/if}
		{/if}
		{#if loading}
			<div class="css-spinner clickable">
				<div class="lds-ring">
					<div />
					<div />
					<div />
					<div />
				</div>
			</div>
		{/if}

		{#each posts as post}
		{#if post != undefined}
			{#if post.type == "blog"}
				<a href="/post/{post.id}" id="hello">
					<div id="postContainer" class="postContainer">
						<h1 id="title">
							{post.title}
						</h1>
						<div id="descriptionHolder">
							<h2 id="description">
								{post.body}
							</h2>
							<a href="/@{post.username}">
								<h2 id="name">@{post.username}</h2>
							</a>
							<h2 id="date">
								{timeAgo(post.created_at)}
							</h2>
						</div>
						<div id="buttonHolder">
							<div id="hidden" style="display: none">
								{getLikesDislikes(post.id)}
							</div>
							<button on:click={() => like(post.id)} id="likeButton">
								<div
									on:mouseenter={() => {
										likes[post.id].likeHover = true;
									}}
									on:mouseleave={() => {
										likes[post.id].likeHover = false;
									}}
								>
									{#if likes[post.id].likeHover || likes[post.id].isLiked}
										<Icon
											icon="akar-icons:arrow-up"
											color="green"
											width="40"
											height="40"
										/>
									{:else}
										<Icon
											icon="akar-icons:arrow-up"
											color="white"
											width="40"
											height="40"
										/>
									{/if}
								</div>
							</button>
			
							<h5 id="likeCount">{likes[post.id].likeCount - likes[post.id].dislikeCount}</h5>
			
							<button on:click={() => dislike(post.id)} id="likeButton">
								<div
									on:mouseenter={() => {
										likes[post.id].dislikeHover = true;
									}}
									on:mouseleave={() => {
										likes[post.id].dislikeHover = false;
									}}
								>
									{#if likes[post.id].dislikeHover || likes[post.id].isDisliked}
										<Icon
											icon="akar-icons:arrow-down"
											color="red"
											width="40"
											height="40"
										/>
									{:else}
										<Icon
											icon="akar-icons:arrow-down"
											color="white"
											width="40"
											height="40"
										/>
									{/if}
								</div>
							</button>
						</div>
					</div>
				</a>
			{/if}
			{#if post.type == "vote"}
			
				<div id="postContainer" class="vote">
					<h3 id="voteTitle">{post.body}</h3>
					<div>
						<div id="hidden" style="display: none">
							{getStats(post)}
						</div>
					</div>
					{#if polls[post.id].clicked == false}
						{#each post.options as option, i}
							<div class="fullForPerc">
								<div class="percHolder">
									<button
										class="percBar button {post.id}{i}"
										style="transition: all 0.2s linear;min-width: 13px; width: 100%"
										on:click={() => {
											vote(post, i);
										}}
									>
										<h5>{option.value}</h5>
									</button>
								</div>
								<h6 class="percNum" />
							</div>
						{/each}
					{:else}
						{#each post.options as option, i}
							<div class="fullForPerc">
								<div class="percHolder">
									<button
										class="percBar"
										class:selected={polls[post.id][i]
											.clicked == true}
										style="transition: all 0.2s linear; min-width: 13px; width: {polls[
											post.id
										][i].percentage}%"
									>
										<h5>{option.value}</h5>
									</button>
								</div>
								<h6 class="percNum">
									{polls[post.id][i].percentage}%
								</h6>
							</div>
						{/each}
						<h6 id="total">{polls[post.id].total} votes</h6>
					{/if}
					<div id="credentials">
						<a href="/@{post.username}">
							<h2 id="name">@{post.username}</h2>
						</a>
						<h2 id="date">
							{timeAgo(post.created_at)}
						</h2>
					</div>
					<div id="buttonHolder">
						<div id="hidden" style="display: none">
							{getLikesDislikes(post.id)}
						</div>
						<button on:click={() => like(post.id)} id="likeButton">
							<div
								on:mouseenter={() => {
									likes[post.id].likeHover = true;
								}}
								on:mouseleave={() => {
									likes[post.id].likeHover = false;
								}}
							>
								{#if likes[post.id].likeHover || likes[post.id].isLiked}
									<Icon
										icon="akar-icons:arrow-up"
										color="green"
										width="40"
										height="40"
									/>
								{:else}
									<Icon
										icon="akar-icons:arrow-up"
										color="white"
										width="40"
										height="40"
									/>
								{/if}
							</div>
						</button>
		
						<h5 id="likeCount">{likes[post.id].likeCount - likes[post.id].dislikeCount}</h5>
		
						<button on:click={() => dislike(post.id)} id="likeButton">
							<div
								on:mouseenter={() => {
									likes[post.id].dislikeHover = true;
								}}
								on:mouseleave={() => {
									likes[post.id].dislikeHover = false;
								}}
							>
								{#if likes[post.id].dislikeHover || likes[post.id].isDisliked}
									<Icon
										icon="akar-icons:arrow-down"
										color="red"
										width="40"
										height="40"
									/>
								{:else}
									<Icon
										icon="akar-icons:arrow-down"
										color="white"
										width="40"
										height="40"
									/>
								{/if}
							</div>
						</button>
					</div>
				</div>
			{/if}
			{/if}
			
		{/each}
	</div>
</body>

<style>
	@font-face {
		font-family: "Jakarta";
		src: url("/fonts/Jakarta.ttf");
	}

	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		width: 100vw;
		background-color: #141414;
		overflow-x: hidden;
	}

	* {
		font-size: 24px;
		text-align: center;
		color: black;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: Jakarta;
		letter-spacing: -0px !important;
	}

	#likeCount {
		margin: 0 auto;
		text-align: center;
		font-size: 20px;
		color: white;
		font-weight: 500;
		/* text-align: left;
		word-break: break-all; */
	}

	#buttonHolder {
		/* margin-top: -10%; */
		margin-left: 4.5vw;
		width: 110px;
		height: 40px !important;
		line-height: 60px;
		display: flex;
		flex-direction: row;
		/* position: relative;
		top: -20%;
		z-index: 0; */
	}

	#likeButton {
		width: 60px;
		height: 60px;
		border-radius: 100px;
		background: none;
		cursor: pointer;
	}



	#credentials {
		margin-left: 5vw;
		margin-top: 2vh;
	}

	#total {
		font-weight: 600;
		font-size: 20px;
		height: 20px;
		float: right;
		margin-right: 5%;
		margin-top: 5px;
	}

	.selected {
		background-color: #00b1b1 !important;
		border: none !important;
	}

	.fullForPerc {
		height: 38px !important;
		width: 95%;
		display: flex;
	}

	h5 {
		font-size: 17px;
		color: white;
		margin-left: 20px;
		text-align: left;
		overflow: visible;
		font-weight: 500;
		width: 100vw;
	}

	h6 {
		position: relative;
		top: 10px;
		right: 0;
		height: 0px;
		width: 100px;
		text-align: right !important;
		color: white;
		font-size: 17px;
	}

	.percHolder {
		height: 35px;
		/* margin-left: 20px; */
		margin-top: 5px;
		width: 90%;
		min-width: 5% !important;
		display: flex;
		flex-direction: row;
	}

	.percBar {
		height: 32px;
		background: #2a2a2a;
		border-radius: 15px;
		color: white;
		text-align: center;
		transition: all 0.2s linear;
		border: 2px solid rgb(55, 55, 55);
		margin-left: 5vw;
		line-height: 30px;
		transition: all 0.25s linear !important;
	}

	.vote:hover {
		background: #212121 !important;
	}

	.button {
		cursor: pointer;
		/* width: 74%;
		min-height: 35px;
		background: #2a2a2a;
		border-radius: 15px;
		color: white;
		text-align: center;
		margin-top: 5px;
		cursor: pointer;
		transition: all 0.2s linear;
		border: 2px solid rgb(55, 55, 55);
		float: left;
		margin-left: 5vw; */
	}

	.button:hover {
		background: #3a3a3a;
	}

	h3 {
		font-size: 20px;
		font-weight: 400;
		color: white;
		text-align: left;
		margin-left: 5vw;
		margin-top: 1vw;
	}

	.lds-ring {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
		margin-top: 20vh;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid #323232;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #323232 transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	#homeTitle {
		font-size: 30px;
		margin-bottom: 30px;
	}

	#empty {
		font-size: 3rem;
		font-weight: 700;
		color: white;
		text-align: left;
		margin-left: 5vw;
		font-size: 30px !important;
		margin-top: 20vh;
	}

	#date {
		margin: 0 auto;
		font-weight: 600;
		color: rgb(136, 136, 136);
	}

	#name {
		color: rgb(159, 159, 159);
		overflow: hidden;
		margin-top: 5px;
		font-weight: 600;
	}

	#whole {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-bottom: 60px;
		height: auto;
	}

	#description {
		font-size: 17px;
	}

	#description,
	#title {
		word-break: break-word;
	}

	#title,
	#voteTitle {
		font-size: 19px;
		padding-right: 20px;
	}

	#postContainer {
		width: 50vw;
		/* min-height: 20vh; */
		padding-bottom: 20px;
		background: #212121;
		/* margin-top: 20px; */
		/* border-radius: 5px; */
		border-bottom: 1px solid black;
		transition: all 0.2s linear;
	}

	#postContainer:hover {
		background: rgb(56, 56, 56);
	}

	@media (max-width: 575px) {
		#postContainer {
			width: 100vw !important;
		}
	}

	@media (max-width: 800px) {
		#postContainer {
			width: 90vw;
		}
	}

	@media (min-width: 800px) {
		#postContainer {
			width: calc(500px + 20vw) !important;
		}
	}

	#username {
		margin-left: 0px !important;
	}

	h1 {
		font-size: 30px;
		font-weight: 600;
		color: white;
		padding-top: 10px;
		text-align: left;
		margin-left: 5vw;
	}

	h2 {
		font-size: 17px;
		font-weight: 500;
		color: white;
		text-align: left;
		/* text-overflow: ellipsis; */
		/* margin-left: 1vw; */
	}

	#descriptionHolder {
		width: 80%;
		margin: 0 auto;
		font-size: 1.5rem;
		margin-left: 5vw !important;
	}

	#followButton {
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 0px;
		width: 300px;
		height: 50px;
		color: white;
		font-weight: 600;
		background-color: #212121;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s linear;
		font-size: 18px;
	}

	#followButton:hover {
		background: rgb(56, 56, 56);
	}

	#followerContainer {
		display: flex;
		flex-direction: row;
		gap: 10px;
		margin-top: 10px;
	}

	#button {
		width: 150px;
		height: 45px;
		font-size: 18px;
		line-height: 45px;
		font-weight: 600;
		color: white;
		background: #212121;
		border-radius: 10px;
		transition: all 0.2s linear;
		margin-bottom: 20px;
	}

	#button:hover {
		background: rgb(56, 56, 56);
	}

	@media (max-width: 500px) {
		#button {
			width: 30vw;
		}

		#followButton {
			width: 60vw !important;
		}
	}

	a {
		text-decoration: none;
	}
</style>
