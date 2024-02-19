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
	let project1Top = 300,
		project2Top = 1000,
		project3Top = 1700;
	let inView = false;

	function changeVal() {
		projectsTop = projects.getBoundingClientRect().top;
		scroll1 = scroll - projectsDistance;

		if (projectsTop == 0 && scroll1 > 50) {
			//to see if project1 in view

			if (project2Top > 350) {
				//moving project 1 into view and end position
				project2Top += -scroll1;
			} else {
				project2Top -= scroll1;
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
			<div class="typewriterHolderHero">
				<div class="typewriter">
					<SvelteScrollTypewriter
						fontSize={20}
						furthestScrolled={0}
						auto={true}
						phrase={'Freelance web developer, Computer science student, UX/UI designer, Back-end developer, Full-stack developer, Computer scientist, Tech enthusiast, SEO specialist, Aspiring software developer, Front-end developer, Javascript/Typescript developer, Python developer, Motivated, Accountable, Creative, Detail oriented, Problem solver'}
					/>
				</div>
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
				<div class="projectsHolder">
					<div class="project">
						<div class="innerProject">
							<img class="projectImage" src="/images/screenshot.png" />
							<div class="descriptionProjectHolder">
								<h3>JaddBlog</h3>
								<div class="description">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, et.
								</div>
							</div>
						</div>
					</div>
					<div class="project" id="secondProject">
						<div class="innerProject">
							<img class="projectImage" src="/images/screenshot.png" />
							<div class="descriptionProjectHolder">
								<h3>JaddBlog</h3>
								<div class="description">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, et.
								</div>
							</div>
						</div>
					</div>
					<div class="project">
						<div class="innerProject">
							<img class="projectImage" src="/images/screenshot.png" />
							<div class="descriptionProjectHolder">
								<h3>JaddBlog</h3>
								<div class="description">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, et.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			
		</div>
		<div class="section">
			<div class="inner">
				<h2>My Activity.</h2>

				<div class="jaddblogHolder">
					<div class="posts">
						{#each data.posts as post}
						<div class="post">
							<h4>{post.title}</h4>
							<p>{post.body}</p>
							<span>{post.timeAgo}</span>
						</div>
					{/each}
					</div>
					
				</div>
			</div>
			
		</div>
	</body>
</SvelteInertiaScroll>

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

	/* Hide scrollbar for Chrome, Safari and Opera */
	body::-webkit-scrollbar {
		display: none !important;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	* {
		-ms-overflow-style: none !important; /* IE and Edge */
		scrollbar-width: none !important; /* Firefox */
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

	.typewriterHolderHero {
		height: 35vh;
		width: 100vw;
		position: absolute;
		bottom: 0;
	}

	.typewriter {
		width: 600px;
		position: absolute;
		top: 0;
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
		position: absolute; /* Changed from absolute */
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
		top: 120px;
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
		height: 1050px;
		width: 100vw;
		margin-top: 50px;
		padding: 50px;
		position: sticky;
		position: -webkit-sticky;
		top: 0px;
		bottom: 500px;
		z-index: 1000 !important;
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

	.projectsHolder {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 330px;
		z-index: 100;
	}

	.project {
		width: 600px;
		height: 150px;
		border-top: 1px solid #8f8f8f;
		border-bottom: 1px solid #8f8f8f;
		cursor: pointer;
		overflow: hidden;
	}

	#secondProject {
		border: none !important;
	}

	.innerProject {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 40px;
		height: 100%;
		width: 100%;
		transition: all linear 0.3s;
		z-index: 0;
		position: relative;
		left: -185px;
		

	}

	.innerProject:hover {
		transform: translate(190px);
	}

	@keyframes easeIn {
		
	}

	.descriptionProjectHolder {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
	}

	h3 {
		font-size: 50px;
	}

	.description {
		font-size: 15px;
		color: #8f8f8f;
		text-align: start;
	}

	.projectImage {
		width: 150px;
	}

	.jaddblogHolder {
		background: none;
		width: 600px;
		height: 400px;
		position: absolute;
		top: 225px;
		left: 98px;

	}

	.posts {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.post {
		min-height: 100px;
		border-top: 1px solid #8f8f8f;
		border-bottom: 1px solid #8f8f8f;
	}
</style>
