<script>
  export let data = [];
	console.log(data.returnData)
</script>

<body>
	<h1>{data.returnData.title}</h1>
	<h2>At {data.returnData.created_at}</h2>
	<p>{data.returnData.body}</p>
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
		font-size: 5rem;
		color: white;
		font-weight: 600;
		margin-top: 5vh;
	}

	p {
		font-size: 2.5rem;
		font-weight: 300 !important;
		color: white;
	}
</style>
