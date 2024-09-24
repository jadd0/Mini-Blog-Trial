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

	let typewriter1, typewriter2, height1, height2, innerh;
	let scroll = 0,
		scroll1 = 0;

	let projects, projectsTop, projectsDistance, siteMap, siteMapDistance;
	let project1 = false,
		project2 = false,
		project3 = false;

	let domainHolder;
  let topOffset = 0; // Initial top value of the domainHolder
	//$: domainHolder.style[top] = `${350+topOffset} px;`

  const scrollThreshold = 75; // Change threshold for each scroll step
  const topChangeValue = 100; // Value to add/subtract from top each time


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

	function changeValPhone() {
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
		if (screenWidth < 800) {
			changeValPhone();
		} else {
			changeVal();
		}

		let siteMapTop = siteMap.getBoundingClientRect().top;
		let scrollDistance = scroll - siteMapDistance;

		if (siteMapTop == 0) {

			if (scrollDistance > 75) {
				topOffset = 100;
				if (scrollDistance > 150) {
					topOffset = 200;

					if (scrollDistance > 225) {
						topOffset = 300;

						if (scrollDistance > 300) {
							topOffset = 400;


				}

				else {
					topOffset = 300;

								
}
			} 

			else {
				topOffset = 200;

								
}
			}

			else {
				topOffset = 100;
				
								
}
			}

			else {
				topOffset = 0;

								
}
		}
    
		//domainHolder.style.top = `${350 + topOffset}px !important;`;
		console.log(topOffset)
	}

	function calculateDistance() {
		const element = document.getElementById('projects');
		const rect = element.getBoundingClientRect();
		projectsDistance = rect.top + window.pageYOffset;
	}

	function calculateDistanceSiteMap() {
		const element = document.getElementById('siteMap');
		console.log(element)
		const rect = element.getBoundingClientRect();
		siteMapDistance = rect.top + window.pageYOffset;
	}

	onMount(() => {
		height1 = typewriter1.getBoundingClientRect().top;
		console.log(height1, scroll, innerh);
		calculateDistance();
		calculateDistanceSiteMap();

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
						fontSize={16}
						furthestScrolled={0}
						auto={true}
						phrase={'Freelance web developer, Computer science student, UX/UI designer, Back-end developer, Full-stack developer, Computer scientist, Tech enthusiast, SEO specialist, Aspiring software developer, Front-end developer, Javascript/Typescript developer, Python developer, Motivated, Accountable, Creative, Detail oriented, Problem solver.'}
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
						fontSize={16}
						furthestScrolled={scroll + innerh}
						height={height1}
						phrase={`Hi! I am Jadd, a freelance web developer. I am from the Wirral, United Kingdom and I am currently in ${data.area}, ${data.region} as of ${data.time}. As a current Computer Science student, I am very enthusiastic in the web development industry and enjoy building cool stuff in my free time`}
					/>
				</div>
			</div>
		</div>
		<div class="section" id="projectSection">
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
												A text-based social media inlcuding basic posts, polls, followers, comments,
												likes etc.
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
		</div>



		<div class="section sectionSitemap" id="siteMap" bind:this={siteMap}>
			<div class="inner">
				<h2>SITE MAP.</h2>
				<div class="desc"></div>
			</div> 
			<div bind:this={typewriter2} id="descTypewriter" class="typewriter">
				<SvelteScrollTypewriter
					fontSize={16}
					furthestScrolled={scroll + innerh}
					height={height2}
					phrase={`All of my personal work (pet projects and whatnot) is hosted under the same domain. I have used subdomains to seperate projects. Scroll down to see each.`}
				/>
			</div>
			<div class="domainHolder" bind:this={domainHolder} style="top: {350 + topOffset}px !important;">
				<h3>.JADD.LIVE</h3>
				<div class="subdomainDesc">
					{#if topOffset == 0}
					<SvelteScrollTypewriter
						fontSize={16}
						auto
						phrase={`This is my main portfolio site, also the site which we are currently on. This is a showcase of my talents as a full stack developer, whilst also trying to make it look as 'pretty' as possible (I hope I did a decent job).`}
					/>
						{:else if topOffset == 100}
						<SvelteScrollTypewriter
						fontSize={16}
						auto
						phrase={`This is my largest project. It is a text-based social network project where users can post their own content and view other people's content too. Users can follow others, like/comment on posts and also create/vote on vote-type posts.`}
					/>
						{:else if topOffset == 200}<SvelteScrollTypewriter
						fontSize={16}
						auto
						phrase={`This is a small project in which I created a music recommender for myself. Users can key in a song/album name, and upon clicking the title, I am then recommended said music.`}
					/>
						{:else if topOffset == 300}
						<SvelteScrollTypewriter
						fontSize={16}
						auto
						phrase={`This is a work-in-progress project where two or more users can find a meeting point where all users are aiming to walk to the same location. This will be cool once complete, trust me.`}
					/>
						{:else if topOffset == 400}
						<SvelteScrollTypewriter
						fontSize={16}
						auto
						phrase={`This is a small static page where I give people my workout split for no charge, how kind.`}
					/>
					{/if}
				</div>
			</div>
			<div class="subdomainHolder">
				<div class="subdomain" >
					<h3>WWW</h3>
				</div>
				<div class="subdomain">
					<h3>BLOG</h3>
				</div>
				<div class="subdomain">
					<h3>MUSIC</h3>
				</div>
				<div class="subdomain">
					<h3>PATH</h3>
				</div>
				<div class="subdomain">
					<h3>SPLIT</h3>
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
	:root {
		--leftPC: 100px;
		--leftPhone: 50px;
		--h2SizePC: 100px;
		--h2SizePhone: 50px;

		scrollbar-width: none;
	}

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
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	
	h3 {
		font-size: 70px  !important;
	}

	.subdomainDesc p {
		font-size: 16px !important;
		text-align: left;
	}

	.subdomainDesc {
		position: absolute;
		left: 326px;
		width: 360px;
	}

	.subdomain {
		width: 100vw;
		height: 100px;
		display: flex;
	}

	.subdomainHolder {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 350px;
		left: 50px;
		gap: 0px;
		height: 1000px;
		overflow: scroll;
	}

	.domainHolder {
		width: 100%;
		height: 70vh;
		border: 2px solid red;
		position: absolute;
		transition: top 0.3s ease; /* Smooth transition for top change */
	}

	#siteMap {
		height: 200vh;
		position: sticky;
		position: -webkit-sticky !important;
		top: 0px;

		z-index: 0 !important;
	}

	#descTypewriter {
		margin-top: 200px;
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
		max-width: 600px;
		width: 60vw;
		position: absolute;
		top: 0;
		left: var(--leftPC);
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
		font-size: var(--h2SizePC);
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

	#projectSection {
		height: 1800px;
		padding-bottom: 1000px;
	}

	#projects {
		width: 100vw;
		margin-top: 50px;
		padding: 50px;
		position: sticky;
		position: -webkit-sticky !important;
		top: 0px;

		z-index: 0 !important;
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
		z-index: 100;
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
		position: relative;
		top: 0px;
	}

	.adminHolder {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
		position: relative;
		bottom: -5px;
	}

	.post p {
		font-size: 20px;
		text-align: start;
		overflow: clip;
			white-space: nowrap;
			text-overflow: ellipsis;
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

	/* Responsive styles */

	/* Tablet */

	@media only screen and (max-width: 850px) {
	}

	/* Phone */

	@media only screen and (max-width: 800px) {
		* {
			font-size: 10px;
		}

		.typewriterHolderHero {
			left: 0 !important;
			bottom: 50px;
		}

		.typewriter {
			left: var(--leftPhone);
			width: 80vw;
		}

		h2 {
			font-size: var(--h2SizePhone);
			left: 40px;
		}

		#projects:before {
			padding: 80vh 70px 10px 5px;
			border-left: 15px solid white;
			border-top: 15px solid white;
			border-bottom: 15px solid white;
		}

		#projectsTitle {
			top: 70px;
			left: 50px;
		}

		#aboutMeTypewriter {
			top: 150px;
		}

		#aboutMe {
			height: 450px !important;
		}

		#projectSection {
			height: 1300px;
			padding-bottom: 0px;
			margin-bottom: 80vh;
		}

		.projectsHolder {
			top: 175px;
			left: 63px;
		}

		.project {
			height: 20vh;
			width: 270px;
		}

		h3 {
			font-size: 30px;
		}

		.projectImage {
			display: none;
		}

		#activity h2 {
			text-align: start;
			width: 50px;
		}

		.jaddblogHolder {
			left: var(--leftPhone);
			width: 70vw;
			max-width: 400px;
			top: 220px;
		}

		.contentHolder {
			max-height: 50px;
		}

		.post {
			height: 80px;
		}

		h4 {
			font-size: 20px;
		}

		.post p {
			font-size: 17px;
			max-width: 300px;
		}

		.adminHolder span {
			font-size: 14px;
		}

		.end {
			height: 150px;
		}
	}
</style>
