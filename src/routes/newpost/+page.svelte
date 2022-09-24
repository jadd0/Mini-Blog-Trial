<script>
	import Nav from "../__nav/+page.svelte";
	import Blog from "./components/__blog/+page.svelte";
	import Vote from './components/__votes/+page.svelte';
	import Day from "./components/__day/+page.svelte";
	import Text from "./components/__text/+page.svelte";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	export let data;

	let option;
	let lastOption = '';

	function day() {
		lastOption = option
		option = "day";
		const day1 = document.getElementById("day");
		document.getElementById(lastOption).style.borderBottom =
			"3px solid #1b1b1b";
		day1.style.borderBottom = "3px solid white";
	}

	function blog() {
		try {
			lastOption = option
			document.getElementById(lastOption).style.borderBottom = "3px solid #1b1b1b";
		}
		catch {
			console.log("First option")
		}
		option = "blog";
		const blog1 = document.getElementById("blog");
		blog1.style.borderBottom = "3px solid white";
	}

	function vote() {
			lastOption = option
			option = "vote";
			const vote1 = document.getElementById("vote");
			document.getElementById(lastOption).style.borderBottom = "3px solid #1b1b1b";
			vote1.style.borderBottom = "3px solid white";
		}
	onMount(() => {
		blog();
	});
</script>

<svelte:head>
	<title>New Post</title>
</svelte:head>

<body>
	<Nav username={data.username} />
	<div id="form">
		<div id="optionHolder">
			<button id="option" on:click={day}><h2 id="day">SDay</h2></button>
			<button id="option" on:click={blog}><h2 id="blog">Blog</h2></button>
			<button id="option" on:click={vote}><h2 id="vote">Vote</h2></button>
		</div>

		{#if option == "day"}
			<div in:fade={{ duration: 200 }}>
				<Day />
			</div>
		{/if}

		{#if option == "blog"}
			<div in:fade={{ duration: 200 }}>
				<Blog />
			</div>
		{/if}

		{#if option == "vote"}
			<div in:fade={{ duration: 300 }}>
				<Vote />
			</div>
		{/if}
	</div>
</body>

<style>
	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		height: auto;
		width: 100vw;
		background-color: #141414;
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
		font-weight: 300;
	}

	#option {
		background: none;
		cursor: pointer;
	}

	#optionHolder {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin: 0 auto;
		padding-top: 20px !important;
		padding-bottom: 10px;
	}

	h2 {
		font-size: 30px;
		font-weight: 500;
		color: white;
		border-bottom: 3px solid #1b1b1b;
	}

	@media (max-width: 930px) {
		#form {
			width: 340px !important;
		}
	}

	h1 {
		font-size: 1.75em;
		font-weight: 800;
		padding-top: 20px;
		padding-bottom: 20px;
		color: white;
	}

	#form {
		margin: 0 auto;
		background: #1b1b1b;
		width: 40vw;
		min-height: 400px;
		padding-bottom: 30px;
		margin-bottom: 30px;
		border-radius: 15px;
		margin-top: 4vh;
	}
</style>
