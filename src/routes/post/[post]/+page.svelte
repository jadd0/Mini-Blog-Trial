<script>
	import { page } from "$app/stores";
	import Nav from "../../__nav/+page.svelte";
	import Icon from "@iconify/svelte";
	const month = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	export let data;

	let isLiked = data.isLiked;
	let isDisliked = data.isDisliked;
	let likeCount = data.likeCount;
	let dislikeCount = data.dislikeCount;

	let likeHover = false;
	let dislikeHover = false;

	let commentBody = "";

	async function like() {
		if (isLiked) {
			isLiked = false;
			likeCount--;

			const res = await fetch("/api/removeLike", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: $page.params.post,
				}),
			});
			return
		}
		if (isDisliked) {
			isDisliked = false;
			dislikeCount--;
		}
		isLiked = true;
		likeCount++;

		const res = await fetch("/api/likePost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: $page.params.post,
			}),
		});
	}

	async function dislike() {
		if (isDisliked) {
			isDisliked = false;
			dislikeCount--;

			const res = await fetch("/api/removeDislike", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: $page.params.post,
				}),
			});
			return
		}
		if (isLiked) {
			isLiked = false;
			likeCount--;
		}
		isDisliked = true;
		dislikeCount++;

		const res = await fetch("/api/dislikePost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: $page.params.post,
			}),
		});
	}

	const deletePost = async () => {
		const response = await fetch("/api/deletePost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: data.id,
			}),
		});

		if (response.ok) {
			location.replace(`/@${data.returnData.username}`);
		}
	};

	const submit = async () => {
		if (commentBody.length < 3) return;
		const response = await fetch("/api/newComment", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: data.id,
				commentBody,
			}),
		});

		if (response.ok) {
			location.reload();
		}
	};

	const date = new Date(data.returnData.created_at);
	const dateMonth = month[date.getMonth()];
	const dateDay = date.getDate();
	const dateYear = date.getFullYear();
</script>

<svelte:head>
	<title>Post {$page.params.post} - {data.returnData.title}</title>
</svelte:head>

<Nav username={data.username} />
<body>
	<div id="whole">
		<div id="container">
			{#if data.bool}
				<button on:click={deletePost} id="deletePost"
					>Delete Post</button
				>
			{/if}
			<h1>{data.returnData.title}</h1>
			<h2>{dateMonth} {dateDay}, {dateYear}</h2>
			<a href="/@{data.returnData.username}">
				<h2 id="name">@{data.returnData.username}</h2>
			</a>
			<div id="pHolder">
				<p>{data.returnData.body}</p>
			</div>
			<div id="buttonHolder">
				<button on:click={like} id="likeButton">
					<div
						on:mouseenter={() => {
							likeHover = true;
						}}
						on:mouseleave={() => {
							likeHover = false;
						}}
					>
						{#if likeHover || isLiked}
							<Icon
								icon="akar-icons:arrow-up"
								color="green"
								width="60"
								height="60"
							/>
						{:else}
							<Icon
								icon="akar-icons:arrow-up"
								color="white"
								width="60"
								height="60"
							/>
						{/if}
					</div>
				</button>

				<h5>{likeCount - dislikeCount}</h5>

				<button on:click={dislike} id="likeButton">
					<div
						on:mouseenter={() => {
							dislikeHover = true;
						}}
						on:mouseleave={() => {
							dislikeHover = false;
						}}
					>
						{#if dislikeHover || isDisliked}
							<Icon
								icon="akar-icons:arrow-down"
								color="red"
								width="60"
								height="60"
							/>
						{:else}
							<Icon
								icon="akar-icons:arrow-down"
								color="white"
								width="60"
								height="60"
							/>
						{/if}
					</div>
				</button>
			</div>

			<div id="comments">
				<h1 id="commentHeader">Comments</h1>
				<div id="commentInputHolder">
					<div id="inputHolder">
						<textarea
							name="text"
							id="userInput"
							maxlength="200"
							placeholder="(3-200 chars)"
							bind:value={commentBody}
							oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
						/>
					</div>
					<button on:click={submit} id="postButton">Post</button>
				</div>
				<div id="commentBox">
					{#each data.comments as comment}
						<div id="commentHolder">
							<a href="/@{comment.username}">
								<h4>{comment.username}</h4>
							</a>
							<h5>{comment.body}</h5>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div></body
>

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
		/* height: 1000vh; */
		width: 100vw;
		background-color: #141414;
		overflow-x: hidden;
	}

	* {
		text-align: left;
		font-size: 24px;
		text-align: center;
		color: black;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: Jakarta;
		font-weight: 300;
		letter-spacing: -0px !important;
	}

	h5 {
		/* width: 20px; */
		margin: 0 auto;
		text-align: center;
	}

	#buttonHolder {
		margin-top: 20px;
		margin-left: -11vw;
		width: 160px;
		height: 60px !important;
		line-height: 70px;
		display: flex;
		flex-direction: row;
	}

	#likeButton {
		width: 60px;
		height: 60px;
		border-radius: 100px;
		background: none;
		cursor: pointer;
	}

	#deletePost {
		margin-top: 10px;
		margin-left: 0vw;
		width: 90%;
		min-width: 200px;
		height: 50px;
		color: rgb(255, 0, 0);
		font-weight: 600;
		background-color: #212121;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s linear;
	}

	#deletePost:hover {
		background-color: red;
		color: white;
	}

	#commentHolder {
		margin-top: 20px;
		width: 300px;
	}

	h4 {
		font-size: 32px;
		color: white;
		font-weight: 600;
		text-align: left;
	}

	h5 {
		font-size: 20px;
		color: white;
		font-weight: 400;
		text-align: left;
		word-break: break-all;
	}

	#postButton {
		margin-top: 10px;
		margin-left: 0vw;
		width: 60%;
		min-width: 200px;
		height: 50px;
		color: white;
		font-weight: 600;
		background-color: #212121;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s linear;
	}

	#postButton:hover {
		background: rgb(56, 56, 56);
	}

	#commentInputHolder {
		display: flex;
		flex-direction: column;
	}

	#commentHeader {
		font-size: 3rem !important;
		color: white;
		font-weight: 600;
		margin-top: 3vh;
		text-align: left;
		margin-left: -0vw;
	}

	#userInput {
		width: 83.5%;
		min-height: 32px;
		margin-left: 8%;
		/* margin: 0 auto; */
		margin-top: 1%;
		margin-bottom: 0.5%;
		border-radius: 10px;
		background: #212121;
		color: white;
		text-align: left;
		font-size: 1.25rem;
	}

	#inputHolder {
		width: 60%;
		min-width: 200px;
		min-height: 40px;
		/* margin: 0 auto; */
		margin-top: 10px;
		background: #212121;
		border-radius: 20px;
		color: white;
		text-align: left;
	}

	textarea {
		resize: none;
		width: 400px;
		min-height: 100px;
		height: auto;
		padding: 5px;
		overflow: hidden;
		box-sizing: border-box;
	}

	#comments {
		margin-top: 20px;
		width: 50vw;
		margin-left: -10vw;
		padding-bottom: 30px;
	}

	#name {
		font-size: 20px;
		margin-top: 5px;
	}

	#whole {
		width: 100vw;
		height: auto;
		overflow-x: hidden;
		padding-bottom: 80px;
	}

	@media (max-width: 800px) {
		h1 {
			font-size: 10vw !important;
		}

		#commentHeader {
			font-size: 7vw !important;
		}

		h2,
		h4 {
			font-size: 5vw !important;
		}

		p {
			width: 85vw;
			margin-top: 1vh !important;
		}
	}

	@media (max-width: 400px) {
		p,
		h5 {
			font-size: 5vw !important;
		}

		#userInput {
			font-size: 4vw !important;
		}
	}

	#container {
		width: 60vw;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		/* align-items: left; */
		justify-content: flex-start;
	}

	h1 {
		font-size: 5rem;
		color: white;
		font-weight: 600;
		margin-top: 3vh;
		text-align: left;
		margin-left: -10vw;
	}

	h2 {
		/* position: absolute; */
		font-size: 2rem;
		color: white;
		font-weight: 600;
		float: left;
		text-align: left;
		margin-left: -10vw;
	}

	p {
		/* margin: 0 auto; */
		margin-top: 5vh;
		font-size: 1.5rem;
		font-weight: 300 !important;
		color: white;
		text-align: left;
		margin-left: -10vw;
	}
</style>
