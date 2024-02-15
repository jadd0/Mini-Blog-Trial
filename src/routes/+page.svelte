<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
	import { SvelteSimpleMarquee } from 'sveltesimplemarquee'
	import { SvelteScrollTypewriter } from 'sveltescrolltypewriter';
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
				<SvelteScrollTypewriter height={0} furthestScrolled={0} auto={true} phrase={"Freelance web developer, Computer science student, UX/UI designer, Back-end developer, Full-stack developer, Computer scientist, Tech enthusiast, SEO specialist, Aspiring software developer, Front-end developer, Javascript/Typescript developer, Python developer, Motivated, Accountable, Creative, Detail oriented, Problem solver"} />
			</div>
		</div>
	</body>
</SvelteInertiaScroll>

<style>
	@font-face {
		font-family: 'jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	* {
		font-family: jakarta;
		margin: 0;
		padding: 0;
	}

	body {
		margin: 0;
		padding: 0;
		width: 100vw;
		background: #121212;
		height: 10000vh;
	}

	.hero {
		width: 100vw;
		height: 100vh;
	}

	h1 {
		margin: 20px;
		font-size: 17vw;
		color: #d9d9d9;
	}
</style>
