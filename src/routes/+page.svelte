<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
	import { SvelteSimpleMarquee } from 'sveltesimplemarquee';
	import { SvelteScrollTypewriter } from 'sveltescrolltypewriter';
  import { onMount } from 'svelte';

	export let data;


  let typewriter1, height1, innerh;
  let scroll = 0
  $: console.log((innerh+scroll));



  onMount(() => {
    height1 = typewriter1.getBoundingClientRect().top;
    console.log(height1, scroll, innerh);
  })

</script>

<svelte:window bind:scrollY={scroll} bind:innerHeight={innerh}/>



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
					furthestScrolled={scroll+innerh}
          height={height1}
					phrase={`Hi! I am Jadd, a freelance web developer. I am from the Wirral, United Kingdom and I am currently in ${data.area}, ${data.region} as of ${data.time}. As a current Computer Science student, I am very enthusiastic in the web development industry... lorem mkdfosdfmsdmf fjsdhfusdhf sdkjf ksjd fksdfk sdkjf ksd fksd fks dfk kfsd f kj`}
				/>
      </div>
      </div>
			
		</div>

		<div id="projects">
			<div class="inner">
				<h2 id="projectsTitle">Projects.</h2>
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
    bottom: 2000px;
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


</style>
