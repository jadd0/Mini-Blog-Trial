<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
	import { SvelteSimpleMarquee } from 'sveltesimplemarquee'
	import { SvelteScrollTypewriter } from 'sveltescrolltypewriter';

	export let data;
</script>

<SvelteInertiaScroll>
	<body>
		<div class="hero">
			<div class="marquee">
				<SvelteSimpleMarquee>
					<h1>Jadd Al-Khabbaz</h1>
					<h1>Jadd Al-Khabbaz</h1>
					<h1>Jadd Al-Khabbaz</h1>
				</SvelteSimpleMarquee>
			</div>
			<div class="descriptions">
				<SvelteScrollTypewriter fontSize={20} furthestScrolled={0} auto={true} phrase={"Freelance web developer, Computer science student, UX/UI designer, Back-end developer, Full-stack developer, Computer scientist, Tech enthusiast, SEO specialist, Aspiring software developer, Front-end developer, Javascript/Typescript developer, Python developer, Motivated, Accountable, Creative, Detail oriented, Problem solver"} />
			</div>
			<div class="jaddImage">
				<img id="imgJadd" src="/images/jaddpic.jpeg" alt="">
			</div>
		</div>

		<div class="section" id="projects">
			<h2>Projects</h2>
		</div>

		<div class="section" id="aboutMe">

		</div>
	</body>
</SvelteInertiaScroll>

<style>
	@font-face {
		font-family: 'jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		max-width: 100vw;
		min-height: 1000vh;
		background-color: #141414;
	}

	* {
		font-size: 24px;
		text-align: center;
		color: white;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: jakarta;
		letter-spacing: -0px !important;
	}

	.hero {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	h1 {
		margin: 20px;
		font-size: 17vw;
		color: #d9d9d9;
	}

	.descriptions {
		width: 600px;
		position: absolute;
		top: 70%;
		left: 100px;
	}

	.jaddImage {
		position: absolute;
		top: 70%;
		right: 200px;
	}

	#imgJadd {
		width: 150px;
		border-radius: 15px;
	}

	.c {
		width: 100vw;
		height: 75vh;
		display: flex;
		flex-direction: row;
		align-items: start;
		justify-content: start;
		margin-bottom: 70px;
	}

	.section {
		position: relative;
		height: 85vh;
		width: 100vw;
	}

	h2 {
		font-size: 100px;
		position: absolute;
		top: 50px;
		left: 100px;
		border-bottom: 20px solid white;
	}
</style>
