<script>
	import Nav from "./__nav/+page.svelte";
	import { onMount } from "svelte";

	export let data;
	let posts = [];
	let polls = {};
	let loading = true;

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

	function roundToTwo(num) {
		return +(Math.round(num + "e+2") + "e-2");
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
			polls[post.id][i].percentage = Math.floor(
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
				polls[post.id][i].percentage = Math.floor(
					(polls[post.id][i].total / total) * 100
				);
			}
		}

		polls[post.id][option] = { ...polls[post.id][option], clicked: true };
		polls[post.id].total = total;
	}

	function date(isoDate) {
		const date = new Date(isoDate);
		const newDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;

		return newDate;
	}

	onMount(async () => {
		const res = await fetch(`/api/homePosts`);
		const resJson = await res.json();
		posts = resJson.data;
		loading = false;
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<body>
	<Nav username={data.username} />
	<div id="whole">
		<h1 id="homeTitle">Home</h1>
		{#if posts.length == 0 && !loading}
			<a href="/search" id="empty"
				>It's looking empty here...<br />Go follow some people!</a
			>
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
								{date(new Date(post.created_at))}
							</h2>
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
						<!-- <div class="fullForPerc">
							<div class="percHolder">
							<button
								on:click={() => {
									vote(post, i);
								}}
								class="voteButton POST{post.id}"
								><h5>{option.value}</h5></button
							>
							</div>
						</div> -->
						<div class="fullForPerc">
							<div class="percHolder">
								<div
									class="percBar"
									style="min-width: 13px; width: 100%"
								>
									<h5>{option.value}</h5>
								</div>
							</div>
							<h6 class="percNum">
								
							</h6>
						</div>
						{/each}
					{:else}
						{#each post.options as option, i}
							<div class="fullForPerc">
								<div class="percHolder">
									<div
										class="percBar"
										class:selected={polls[post.id][i]
											.clicked == true}
										style="min-width: 13px; width: {polls[
											post.id
										][i].percentage}%"
									>
										<h5>{option.value}</h5>
									</div>
								</div>
								<h6 class="percNum">
									{polls[post.id][i].percentage}%
								</h6>
							</div>
						{/each}
						<h6 id="total">{polls[post.id].total} votes</h6>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</body>

<style>
	@font-face {
		font-family: "New-Inter";
		src: url("/fonts/Inter.ttf");
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
		font-family: New-Inter;
		letter-spacing: -1px !important;
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
		width: 40vw;
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
	}

	.vote:hover {
		background: #212121 !important;
	}

	.voteButton {
		width: 74%;
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
		margin-left: 5vw;
	}

	.voteButton:hover {
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
		font-size: 20px;
	}

	#name {
		color: rgb(159, 159, 159);
		overflow: hidden;
		margin-top: 5px;
		font-weight: 800;
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

	#title, #voteTitle {
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

	/* @media (max-width: 520px) {
		h1 {
			font-size: 6vw !important;
		}

		h2 {
			font-size: 4.5vw !important;
		}

		h5 {
			font-size: 5vw !important;
		}
	} */

	h1 {
		font-size: 30px;
		font-weight: 700;
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

	a {
		text-decoration: none;
	}
</style>
