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
			<div class="inner" id="activity">
				<h2>My Activity.</h2>

				<div class="jaddblogHolder">
					<div class="posts">
						{#each data.posts as post}
						<a href="https://blog.jadd.live/post/{post.id}"><div class="post">
							
								<div class="contentHolder">
								<h4>{post.title}</h4>
							<p>{post.body}</p>
							</div>
							
							
							<div class="adminHolder">
								<a href="https://blog.jadd.live/@jadd"><span class="name">@jadd</span></a>
								
								<span class="timeAgo">{post.timeAgo}</span>
								<span class="vote">Vote Count: {post.vote}</span>
							</div>
							
						</div></a>
					{/each}
					</div>
					
				</div>
			</div>
			
		</div>
		<div class="end"></div>
		</main>
		
		<footer>
			<div class="footerContent">
				<h6>Hey there...</h6>
				<div class="contactForm">Contact me</div>
			</div>
			
		</footer>

		
			
		
	</body>
	
</SvelteInertiaScroll>

<style>
	@font-face {
		font-family: 'jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	body {
		margin: 0;
		padding: 0;
		border: 0;
		height:2600px;
		background: #d9d9d9;
		overflow-x: clip;
		border-radius: 20px
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
		font-size:20px;
		text-align: start;
	}

	.adminHolder span {
		font-size: 17px;
		color: rgb(136, 136, 136);
		text-align: start;
	}

	.timeAgo, .vote {
		margin-top: 4px;
	}

	a {
		text-decoration: none;
	}

	main {
		width: 100vw;
		border-radius: 30px;
		background-color: #141414;
	}
	.end {
		height: 300px;
		width: 100vw;
	}

	footer {
		width: 100vw;
		height: 400px;
	}

	.footerContent {
		width: 100vw;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 40px;
	}

	footer h6 {
		color: #212121;
		font-size: 60px;
	}

	.contactForm {
    color: #141414;
    font-size: 30px;
    font-weight: 600;
    border-radius: 30px;
    border: solid 1px #212121;
    width: 270px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* Added position relative for absolute positioning of pseudo-element */
    overflow: hidden; /* Hide the overflow of the pseudo-element */
}

.contactForm:after {
		display: block;
		content: '';
		border-bottom: solid 20px black;
		transform: scaleX(0);
		transition: transform 250ms linear;
		transform-origin: 100% 50%;
	}


	.contactForm:hover:after {
		transform: scaleX(1);
		transform-origin: 0% 50%;
	}

/* Removed the keyframe animations */

</style>
