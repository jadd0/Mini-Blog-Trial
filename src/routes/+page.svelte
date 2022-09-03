<script>
	import { onMount } from "svelte";
	export let data = [];
	
</script>

<body>
	<div>
		{#each data.data as d}
			<a href="/post/{d.id}">{d.title}</a>
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
		height: 100vh;
		width: 100vw;
		background-color: #141414;
		overflow: hidden;
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

	p {
		font-weight: 250 !important;
	}
</style>
