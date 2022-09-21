<script>
	import Nav from "../__nav/+page.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	export let data;
	let posts = [];
	let loading = true;

	function date(isoDate) {
		const date = new Date(isoDate);
		const newDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;

		return newDate;
	}

	onMount(async () => {
		const res = await fetch(`/api/getUserPosts?user=${$page.params.username}`);
		const resJson = await res.json();
		posts = resJson.data;
		loading = false;
	});

	const submit = async () => {
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
			<button on:click={submit} id="followButton">Follow</button>
		{/if}
		{#if data.bool == true}
			<button on:click={submit} id="followButton">Unfollow</button>
		{/if}

		{#if data.bool == 'self'}
			<button on:click={() => {
				location.href = "/moods"
			}} id="followButton">Moods</button>
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
			<a href="/post/{post.id}" id="hello">
				<div id="postContainer" class="postContainer">
					<h1 id="title">
						{post.title}
					</h1>
					<div id="descriptionHolder">
						<h2 id="description">{post.metadata.description}</h2>
						<a href="/@{post.username}">
							<h2 id="name">@{post.username}</h2>
						</a>
						<h2 id="date">
							{date(new Date(post.created_at))}
						</h2>
					</div>
				</div>
			</a>
		{/each}
	</div>
</body>

<style>
	@font-face {
		font-family: "New-Inter";
		src: url("/fonts/Inter.ttf");
	}

	body {
		padding-top: 60px;
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		/* height: 100vh; */
		width: 100vw;
		background-color: #141414;
		/* overflow-x: hidden */
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

	#followerContainer {
		display: flex;
		flex-direction: row;
		gap: 10px;
		margin-top: 20px;
	}

	#button {
		width: 200px;
		height: 45px;
		line-height: 45px;
		font-weight: 600;
		color: white;
		background: #212121;
		border-radius: 40px;
		transition: all 0.2s linear;
	}

	#button:hover {
		background: rgb(56, 56, 56);
	}

	@media (max-width: 500px) {
		#button {
			width: 150px;
			font-size: 20px;
		}
	}

	#bland {
		font-size: 3rem;
		font-weight: 700;
		color: white;
		text-align: left;
		margin-left: 5vw;
		font-size: 30px !important;
		margin-top: 15vh;
	}

	#title {
		padding-right: 20px;
	}

	#username {
		margin: 0 auto;
		font-weight: 600;
	}

	#name {
		margin: 0 auto;
		font-weight: 600;
		color: rgb(136, 136, 136);
	}

	#date {
		margin: 0 auto;
		font-weight: 600;
		color: rgb(136, 136, 136);
		font-size: 20px;
	}

	#whole {
		padding-top: 60px;
		width: 100vw;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-bottom: 20px;
	}

	#description,
	#title {
		word-break: break-word;
	}

	#postContainer {
		width: 50vw;
		/* min-height: 20vh; */
		padding-bottom: 20px;
		background: #212121;
		margin-top: 20px;
		border-radius: 10px;
		transition: all 0.2s linear;
		/* margin: auto; */
	}

	#postContainer:hover {
		background: rgb(56, 56, 56);
	}

	@media (max-width: 800px) {
		#postContainer {
			width: 75vw;
		}
	}

	@media (max-width: 520px) {
		h1 {
			font-size: 10vw !important;
		}
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
		color: white;
		padding-top: 10px;
		text-align: left;
		margin-left: 5vw;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 500;
		color: white;
		text-align: left;
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
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s linear;
	}

	#followButton:hover {
		background: rgb(56, 56, 56);
	}

	a {
		text-decoration: none;
	}
</style>
