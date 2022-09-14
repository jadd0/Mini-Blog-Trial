<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import Nav from "../nav/+page.svelte";
	export let data = [];

	function date(isoDate) {
		const date = new Date(isoDate);
		const newDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;

		return newDate;
	}

	const submit = async () => {
		const response = await fetch(`/api/${data.bool === true ? 'unfollow' : 'follow'}`, {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: $page.params.username,
			}),
		});

		if (response.ok) {
			location.reload();
		}
	};
</script>

<body>
	<Nav username={data.username} />
	<div id="whole">
		<h1 id="username">@{data.user.username}</h1>
		<h2 id="name">{data.user.name}</h2>
		{#if data.bool == "self"}
			{#if (data.data).length == 0}
				<a href="/newpost" id="bland">Looking very bland here...<br>Why not post your first blog today?</a>
			{/if}
		{/if}
		{#if data.bool == false}
			<button on:click={submit} id="followButton">Follow</button>
		{/if}
		{#if data.bool == true}
			<button on:click={submit} id="followButton">Unfollow</button>
		{/if}
		{#each data.data as d}
			<a href="/post/{d.id}" id="hello">
				<div id="postContainer" class="postContainer">
					<h1 id="title">
						{d.title}
					</h1>
					<div id="descriptionHolder">
						<h2 id="description">{d.metadata.description}</h2>
						<a href="/@{d.a}">
							<h2 id="name">@{d.a}</h2>
						</a>
						<h2 id="date">
							{date(new Date(d.created_at))}
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
		width: 100vw;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-bottom: 20px;
	}

	#description, #title {
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
		margin-bottom: 20px;
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
