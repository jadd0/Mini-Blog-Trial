<script>
	import { onMount } from 'svelte';
	export let data;
	console.log(data.returnData.title);
</script>

<h1>Hello</h1>
<body>
	<h1>{data.returnData.title}</h1>
	<h2>At {data.returnData.created_at}</h2>
	<div id="pHolder">
		<p>{data.returnData.body}</p>
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
		height: 1000vh;
		width: 100vw;
		background-color: #141414;
		overflow: scroll;
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
		font-weight: 300;
		/* font-weight: 500;

		font-variation-settings: 'wght' 500; */

		letter-spacing: -2px;

		/* font-family: "fenix";
		font-weight: 500; */
	}

	h1 {
		font-size: 5rem;
		color: white;
		font-weight: 600;
		margin-top: 5vh;
	}

	h2 {
		font-size: 2rem;
		color: white;
		font-weight: 600;
	}

	#pHolder {
		width: 75vw;
		margin: 0 auto;
	}

	p {
		margin: 0 auto;
		margin-top: 5vh;
		font-size: 2.5rem;
		font-weight: 300 !important;
		color: white;
	}
</style>
