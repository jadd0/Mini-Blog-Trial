<script>
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
	const date = new Date(data.returnData.created_at);
	const dateMonth = month[date.getMonth()];
	const dateDay = date.getDay();
	const dateYear = date.getFullYear();
</script>

<body>
	<div id="container">
		<h1>{data.returnData.title}</h1>
		<h2>{dateMonth} {dateDay}, {dateYear}</h2>
		<div id="pHolder">
			<p>{data.returnData.body}</p>
		</div>
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
		text-align: left;
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

	@media (max-width: 800px) {
		h1 {
			font-size: 10vw !important;
		}

		h2 {
			font-size: 5vw !important;
		}

		p {
			font-size: 6vw !important;
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
	}

	h2 {
		/* position: absolute; */
		font-size: 2rem;
		color: white;
		font-weight: 600;
		float: left;
		text-align: left;
	}


	p {
		/* margin: 0 auto; */
		margin-top: 5vh;
		font-size: 1.75rem;
		font-weight: 300 !important;
		color: white;
		text-align: left;
	}
</style>
