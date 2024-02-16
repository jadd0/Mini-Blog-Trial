<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
	import { SvelteSimpleMarquee } from 'sveltesimplemarquee';
	import { SvelteScrollTypewriter } from 'sveltescrolltypewriter';
	import { onMount } from 'svelte';

	export let data;

	let screenWidth;

	let scrollOld = 0;

	let typewriter1, height1, innerh;
	let scroll = 0,
		scroll1 = 0;

	let projects, projectsTop, projectsDistance;
	let project1, project2, project3;
	let project1Right = -400, project2Right = -400, project3Right = -400;
	let inView = false;

	function changeVal() {
		projectsTop = projects.getBoundingClientRect().top;
		scroll1 = scroll - projectsDistance;

		if (projectsTop == 0 && scroll1 > 50) {
			//to see if project1 in view

			if ((screenWidth+15) > scroll1 ) {
				project1Right = scroll1 - 400;
			}
			
			else {

				project2Right = scroll1 - screenWidth -400;
			
			}

		}
	}

	function scrollFn() {
		changeVal();
	}

	function calculateDistance() {
		const element = document.getElementById('projects');
		const rect = element.getBoundingClientRect();
		projectsDistance = rect.top + window.pageYOffset;
	}

	onMount(() => {
		height1 = typewriter1.getBoundingClientRect().top;
		console.log(height1, scroll, innerh);
		calculateDistance();

		console.log({ screenWidth });
	});
</script>

<svelte:window
	bind:scrollY={scroll}
	bind:innerHeight={innerh}
	bind:innerWidth={screenWidth}
	on:scroll={scrollFn}
/>

<!-- <SvelteInertiaScroll> -->
<body>
	<div class="hero">
		<div class="marquee">
			<SvelteSimpleMarquee>
				<h1>Jadd Al-Khabbaz</h1>
				<h1>Jadd Al-Khabbaz</h1>
				<h1>Jadd Al-Khabbaz</h1>
			</SvelteSimpleMarquee>
		</div>
		<div class="typewriter">
			<SvelteScrollTypewriter
				fontSize={20}
				furthestScrolled={0}
				auto={true}
				phrase={'Freelance web developer, Computer science student, UX/UI designer, Back-end developer, Full-stack developer, Computer scientist, Tech enthusiast, SEO specialist, Aspiring software developer, Front-end developer, Javascript/Typescript developer, Python developer, Motivated, Accountable, Creative, Detail oriented, Problem solver'}
			/>
		</div>
		<div class="jaddImage">
			<!-- <img id="imgJadd" src="/images/jaddpic.jpeg" alt="" /> -->
		</div>
	</div>

	<div class="section" id="aboutMe">
		<div class="inner">
			<h2>Who am I?</h2>
			<div bind:this={typewriter1} id="aboutMeTypewriter" class="typewriter">
				<SvelteScrollTypewriter
					fontSize={20}
					furthestScrolled={scroll + innerh}
					height={height1}
					phrase={`Hi! I am Jadd, a freelance web developer. I am from the Wirral, United Kingdom and I am currently in ${data.area}, ${data.region} as of ${data.time}. As a current Computer Science student, I am very enthusiastic in the web development industry... lorem mkdfosdfmsdmf fjsdhfusdhf sdkjf ksjd fksdfk sdkjf ksd fksd fks dfk kfsd f kj`}
				/>
			</div>
		</div>
	</div>

	<div id="projects" bind:this={projects}>
		<div class="inner">
			<h2 id="projectsTitle">Projects.</h2>
			<div class="project" style="right: {project1Right}px; background: white" bind:this={project1} />
			<div class="project" style="right: {project2Right}px; background: blue" bind:this={project2} />
			<div class="project" style="right: {project3Right}px; background: red" bind:this={project3} />
		</div>
	</div>
</body>

<!-- </SvelteInertiaScroll> -->

<style>
	@font-face {
		font-family: 'jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	.box {
		position: sticky;
		width: 100vw;
		height: 40px;
		background-color: white;
		top: 0;
	}
	body {
		margin: 0;
		padding: 0;
		border: 0;
		width: 100vw;
		min-height: 1000vh;
		background-color: #141414;
		overflow-x: clip;
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
		min-height: 100vh;
		position: relative;
	}

	h1 {
		margin: 20px;
		font-size: 17vw;
		color: #d9d9d9;
	}

	.typewriter {
		width: 600px;
		position: absolute;
		bottom: 10%;
		top: auto;
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
		height: 600px;
		width: 100vw;
		margin-top: 50px;
	}

	h2 {
		font-size: 100px;
		position: relative; /* Changed from absolute */
		left: 88px;
		padding: 10px;
	}

	h2 {
		display: inline-block;
		margin: 0;
		text-transform: uppercase;
		position: absolute;
	}

	.inner {
		width: 100%;
		height: 100%;
		padding: 50px;
	}

	#projectsTitle {
		cursor: pointer;
		top: 100px;
	}

	#projectsTitle:after {
		display: block;
		content: '';
		border-bottom: solid 20px white;
		transform: scaleX(0);
		transition: transform 250ms linear;
	}
	#projectsTitle:after {
		transform-origin: 100% 50%;
	}

	#projectsTitle:hover:after {
		transform: scaleX(1);
		transform-origin: 0% 50%;
	}

	#projects {
		height: 85vh;
		width: 100vw;
		margin-top: 50px;
		padding: 50px;
		position: sticky;
		position: -webkit-sticky;
		top: 0px;
		bottom: 500px;
	}

	#projects:before {
		content: ' ';
		border-left: 20px solid white;
		border-top: 20px solid white;
		border-bottom: 20px solid white;
		padding: 800px 100px 10px 5px;
		position: absolute;
		left: 30px;
	}

	#aboutMeTypewriter {
		position: absolute;
		top: 200px;
	}

	.project {
		width: 300px;
		height: 300px;
		position: absolute;
		top: 300px;
		right: -310px;
	}
</style>
