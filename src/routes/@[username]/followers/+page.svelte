<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Nav from '../../__nav/+page.svelte';
	export let data;

	function date(isoDate) {
		const date = new Date(isoDate);
		const newDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

		return newDate;
	}

	const submit = async () => {
		const response = await fetch(`/api/${data.bool === true ? 'unfollow' : 'follow'}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: $page.params.username
			})
		});

		if (response.ok) {
			location.reload();
		}
	};
</script>

<svelte:head>
	<title>@{$page.params.username}'s followers</title>
</svelte:head>

<body>
	<Nav username={data.username} />
	<div id="whole">
		<h1 id="username">@{$page.params.username}'s followers</h1>
		<div id="container">
			{#each data.data as follower}
				<!-- {#if follower.username != data.username} -->
					<a href="/@{follower.username}">
						<div id="userHolder">
							<h1 id="name">{follower.username}</h1>
						</div>
					</a>
				<!-- {/if} -->
			{/each}
		</div>
	</div>
</body>

<style>
	@font-face {
		font-family: 'Jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	body {
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
		font-family: Jakarta;
		letter-spacing: -0px !important;
	}

	#username {
		margin: 0 auto;
		font-weight: 600;
	}

	#name {
		font-size: 25px !important;
		color: rgb(255, 255, 255);
		margin: 0 auto;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 10px 10px 10px 10px;
		transition: all 0.2s linear;
		font-size: 3rem;
		font-weight: 600;
		color: white;
		padding-top: 10px;
		text-align: left;
		/* margin-left: 5vw; */
	}

	#userHolder {
		line-height: 65px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 55px;
		border-bottom: solid 4px #212121;
	}

	#container {
		margin-top: 40px;
		height: 50vh;
		width: 400px;
		overflow: scroll;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		padding-bottom: 30px;
		border: 5px solid #212121;
		border-radius: 20px;
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

	@media (max-width: 520px) {
		h1 {
			font-size: 10vw !important;
		}

		#container {
			width: 300px !important;
		}
	}

	h1 {
		font-size: 3rem;
		font-weight: 600;
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
	a {
		text-decoration: none;
	}
</style>
