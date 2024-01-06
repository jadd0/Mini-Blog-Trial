<body>
	<div class="container">
		<div class="content">
			<div class="welcome">
				<div class="marquee">
					<p>Jadd Al-Khabbaz Jadd Al-Khabbaz</p>
				</div>
				<span>A freelance web developer</span>
			</div>
		</div>
		<div class="content">2</div>
		<div class="content">3</div>
		<div class="content">4</div>
	</div>
</body>

<style>
	@font-face {
		font-family: 'Jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	@font-face {
		font-family: 'Circular-normal';
		src: url('/fonts/CircularStd-Medium.otf');
	}

	@font-face {
		font-family: 'tnr';
		src: url('/fonts/timesnewroman.ttf');
	}

	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		width: 100vw;
		/* height: 1000vh; */
		background-color: #141414;
		overflow-x: hidden;
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
		font-family: Circular-normal;
		letter-spacing: -0px !important;
	}

	.marquee {
		width: 100vw;
		height: 300px;
		overflow: hidden;
		position: relative;
		background: #fefefe;
		color: #333;
		border: 1px solid #4a4a4a;
	}

	.marquee p {
		font-size: 150px;
		position: absolute;
		width: 200%;
		height: 100%;
		margin: 0;
		line-height: 50px;
		text-align: center;
		padding: 40px;
		-moz-transform: translateX(100%);
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
		-moz-animation: scroll-left 2s linear infinite;
		-webkit-animation: scroll-left 2s linear infinite;
		animation: scroll-left 20s linear infinite;
	}

	@-moz-keyframes scroll-left {
		0% {
			-moz-transform: translateX(0%);
		}
		100% {
			-moz-transform: translateX(-100%);
		}
	}

	@-webkit-keyframes scroll-left {
		0% {
			-webkit-transform: translateX(00%);
		}
		100% {
			-webkit-transform: translateX(-100%);
		}
	}

	@keyframes scroll-left {
		0% {
			-moz-transform: translateX(00%);
			-webkit-transform: translateX(00%);
			transform: translateX(0%);
		}
		100% {
			-moz-transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
			transform: translateX(-100%);
		}
	}

	span {
		/* font-family: 'Times New Roman', Times, serif; */
		color: rgb(166, 166, 166) !important;
	}

	.welcome {
		margin-bottom: 30vh;
		/* margin-left: 40px; */
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
	}
	h1 {
		font-size: 75px;
	}

	.container,
	.content {
		width: 100vw;
		height: 100vh;
		font-size: 60px;
	}

	.container {
		overflow: scroll;
		-webkit-scroll-snap-type: y mandatory;
		-ms-scroll-snap-type: y mandatory;
		scroll-snap-type: y mandatory;
	}

	.content {
		scroll-snap-align: start;
	}

	.container,
	.content {
		margin: 0 auto;
	}

	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		color: white;
		/* padding: 5vw; */
	}
</style>
