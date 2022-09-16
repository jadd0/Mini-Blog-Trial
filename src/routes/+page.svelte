<script>
	import Nav from "./nav/+page.svelte";
	import { onMount } from "svelte";
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
		<h1 style="margin-left:-0px">Home</h1>
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
			<a href="/post/{post.id}" id="hello">
				<div id="postContainer" class="postContainer">
					<h1 id="title">
						{post.title}
					</h1>
					<div id="descriptionHolder">
						<h2 id="description">{post.metadata.description}</h2>
						<a href="/@{post.a}">
							<h2 id="name">@{post.a}</h2>
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
		margin: 0;
		padding: 0;
		border: 0;
		/* height: auto; */
		width: 100vw;
		background-color: #141414;
		/* overflow-x:hidden; */
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
		padding-bottom: 20px;
		height: auto;
	}

	#description,
	#title {
		word-break: break-word;
	}

	#title {
		padding-right: 20px;
	}

	#postContainer {
		width: 50vw;
		/* min-height: 20vh; */
		padding-bottom: 20px;
		background: #212121;
		margin-top: 20px;
		border-radius: 10px;
		transition: all 0.2s linear;
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
			font-size: 9vw !important;
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
