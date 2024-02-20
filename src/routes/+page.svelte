<script>
	import { SvelteSimpleMarquee } from 'sveltesimplemarquee';
	import { SvelteScrollTypewriter } from 'sveltescrolltypewriter';
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let data;

	let screenWidth;

	let scrollOld = 0;

	let typewriter1, height1, innerh;
	let scroll = 0,
		scroll1 = 0;

	let projects, projectsTop, projectsDistance;
	let project1 = true,
		project2 = true,
		project3 = true;
	let project1Top = 300,
		project2Top = 1000,
		project3Top = 1700;
	let inView = false;

	function changeVal() {
		projectsTop = projects.getBoundingClientRect().top;
		scroll1 = scroll - projectsDistance;

		if (projectsTop == 0 && scroll1 > 150) {
			project1 = true;

			if (scroll1 > 350) {
				project2 = true;

				if (scroll1 > 500) {
					project3 = true;
				} else {
					project3 = false;
				}
			} else {
				project2 = false;
			}
		} else if (scroll1 <= 50) {
			project1 = false;
		}
	}

	function scrollFn() {
		//changeVal();
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

<body>
	<main>
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
				<a href="https://github.com/jadd0"><h2 id="projectsTitle">Projects.</h2></a>
				<div class="projectsHolder">
					{#if project1}
						<a href="https://blog.jadd.live">
							<div class="project" transition:fly={{ duration: 300, y: 500, opacity: 0.5 }}>
								<div class="innerProject">
									<div class="descriptionProjectHolder">
										<h3>JaddBlog</h3>
										<div class="description">
											A text-based social media inlcuding basic posts, polls, followers,
											comments, likes etc.
										</div>
									</div>
									<img class="projectImage" src="/images/jaddblog.png" />
								</div>
							</div>
						</a>
					{/if}
					{#if project2}
						<a href="https://wirralbears.com">
							<div
								class="project"
								id="secondProject"
								transition:fly={{ duration: 300, y: 500, opacity: 0.5 }}
							>
								<div class="innerProject">
									<div class="descriptionProjectHolder">
										<h3>Wirral Bears</h3>
										<div class="description">
											A website to display the 'Wirral Bears' basketball team
										</div>
									</div>
									<img class="projectImage" src="/images/screenshot.png" />
								</div>
							</div>
						</a>
					{/if}
					{#if project3}
						<div
							class="project"
							id="thirdProject"
							transition:fly={{ duration: 300, y: 500, opacity: 0.5 }}
						>
							<div class="innerProject">
								<div class="descriptionProjectHolder">
									<h3>To come...</h3>
									<div class="description">Watch this space</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div class="section">
			<div class="inner" id="activity">
				<h2>My Activity.</h2>

				<div class="jaddblogHolder">
					<div class="posts">
						{#each data.posts as post}
							<a href="https://blog.jadd.live/post/{post.id}"
								><div class="post">
									<div class="contentHolder">
										<h4>{post.title}</h4>
										<p>{post.body}</p>
									</div>

									<div class="adminHolder">
										<a href="https://blog.jadd.live/@jadd"><span class="name">@jadd</span></a>

										<span class="timeAgo">{post.timeAgo}</span>
										<span class="vote">Vote Count: {post.vote}</span>
									</div>
								</div></a
							>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="end" />
	</main>
</body>

<style>
	@font-face {
		font-family: 'jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	body {
		margin: 0;
		padding: 0;
		border: 0;
		background: #d9d9d9;
		overflow-x: clip;
		border-bottom-right-radius: 50px;
		border-bottom-left-radius: 50px;
	}

	/* Hide scrollbar for Chrome, Safari and Opera */
	body::-webkit-scrollbar {
		display: none !important;
	}

	* {
		font-size: 24px;
		text-align: center;
		color: #d9d9d9;
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
		min-height: 600px;
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
		transform-origin: 100% 50%;
	}

	#projectsTitle:hover:after {
		transform: scaleX(1);
		transform-origin: 0% 50%;
	}

	#projects {
		height: 2000px;
		width: 100vw;
		margin-top: 50px;
		padding: 50px;
		position: sticky;
		top: 0px;
		bottom: 1300px;
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

	#secondProject,
	#thirdProject {
		border-top: none !important;
	}

	.innerProject {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 40px;
		height: 100%;
		width: 100%;
		transition: all linear 0.3s;
		z-index: 0;
		position: relative;
		left: 0;
	}

	.descriptionProjectHolder {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		width: 380px;
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
		position: absolute;
		right: 0;
	}

	#activity {
		height: 600px;
	}

	.jaddblogHolder {
		background: none;
		width: 600px;
		height: auto;
		position: absolute;
		top: 245px;
		left: 98px;
		border-bottom: 1px solid #8f8f8f;
	}

	.posts {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.post {
		min-height: 120px;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		gap: 10px;
		border-top: 1px solid #8f8f8f;
		padding: 20px 0 25px;
	}

	h4 {
		font-size: 25px;
		text-align: start;
	}

	.contentHolder {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		width: 100% !important;
	}

	.adminHolder {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.post p {
		font-size: 20px;
		text-align: start;
	}

	.adminHolder span {
		font-size: 17px;
		color: rgb(136, 136, 136);
		text-align: start;
	}

	.timeAgo,
	.vote {
		margin-top: 4px;
	}

	a {
		text-decoration: none;
	}

	main {
		width: 100vw;
		border-radius: 0px 30px 30px 0;
		background-color: #141414;
	}
	.end {
		height: 300px;
		width: 100vw;
	}
</style>
