<script>
	import { onMount } from "svelte";
	export let data = [];
</script>

<body>
	{#each data.data as d}
		<a href="/post/{d.id}">
			<div id="postContainer">
				<h1>
					{d.title}
				</h1>
				<h2>
					{d.metadata.description}
				</h2>
			</div>
		</a>
	{/each}
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
		height: 100vh;
		width: 100vw;
		background-color: #141414;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
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
		/* font-family: New-Inter; */
		font-family: New-Inter;
		/* font-weight: 500;

		font-variation-settings: 'wght' 500; */

		letter-spacing: -2px;

		/* font-family: "fenix";
		font-weight: 500; */
	}

	#postContainer {
		width: 50vw;
		min-height: 20vh;
		background: #212121;
		margin-top: 20px;
		border-radius: 20px;
		transition: all 0.2s linear;
	}

	#postContainer:hover {
		background: rgb(56, 56, 56);
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
		color: white;
		padding-top: 10px;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 500;
		color: white;
	}

	a {
		text-decoration: none;
	}

	p {
		font-weight: 250 !important;
	}
</style>
