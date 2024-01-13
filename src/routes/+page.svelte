<script>
	export let data

	import { onMount } from 'svelte';
	import Typewriter from './typewriter.svelte';
	import Project from './project.svelte';

	let typewriter1, typewriter2, typewriter3;
	let height1, height2, height3;

	onMount(() => {
		console.log(data)
		height1 = typewriter1.getBoundingClientRect().top - 300;
		// height2 = typewriter2.getBoundingClientRect().top
		// height3 = typewriter3.getBoundingClientRect().top
	});

	const list = [
		' Freelance web developer   ',
		' Computer science student   ',
		' UX/UI designer   ',
		' Back-end developer   ',
		' Full-stack developer   ',
		' Computer scientist   ',
		' Tech enthusiast   ',
		' SEO specialist   ',
		' Aspiring software developer   ',
		' Front-end developer   ',
		' Javascript/Typescript developer   ',
		' Python developer   ',
		' Motivated   ',
		' Accountable   ',
		' Creative   ',
		' Detail oriented   ',
		' Problem solver   '
	];

	let lists;
	let speeds;

	let furthestScrolled = 0;
	let scroll = 0;
	$: if (scroll > furthestScrolled) {
		furthestScrolled = scroll;
		console.log(scroll);
	}

	const randomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	function shuffle(inputList) {
		// Copy the input list to avoid modifying the original array
		let shuffledList = [...inputList];

		// Fisher-Yates shuffle algorithm
		for (let i = shuffledList.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			// Swap elements at i and j indices
			[shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
		}

		return shuffledList.slice(0, 5);
	}

	function getSpeeds() {
		let speeds = [];

		for (let i = 0; i < 12; i++) {
			speeds.push(randomNumber(20, 40));
		}

		return speeds;
	}

	function containsArray(arrOfArrays, targetArray) {
		return arrOfArrays.some((arr) => arr.every((value, index) => value === targetArray[index]));
	}

	function distanceFromTop(x) {
		console.log(typewriter1.getBoundingClientRect());
		// const rect = x.getBoundingClientRect();
		// return rect.top;
	}

	function changeScroll(x) {
		console.log(x);
	}

	lists = [
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list),
		shuffle(list)
	];

	speeds = getSpeeds();

	let randomColours = [
		[randomNumber(0, 11), randomNumber(1, 5)],
		[randomNumber(0, 11), randomNumber(1, 5)],
		[randomNumber(0, 11), randomNumber(1, 5)],
		[randomNumber(0, 11), randomNumber(1, 5)],
		[randomNumber(0, 11), randomNumber(1, 5)]
	];
	console.log(randomColours);
</script>

<svelte:window bind:scrollY={scroll} />

<!-- TODO: every random word is a distinguishable colour -->
<body>
	<div class="first">
		<div class="imgHolder">
			<img src="/name.svg" alt="" />
		</div>
		<div class="background">
			{#each lists as list, i}
				<div class="marquee">
					<ul
						class="marquee__content"
						style="animation: scroll {speeds[
							i
						]}s linear infinite !important; color: rgb(82, 82, 82) !important"
					>
						{#each list as item, j}
							{#if containsArray(randomColours, [i, j])}
								<div style="color: rgb(0, 159, 255) !important; font-size: 40px !important;">
									{item}
								</div>
							{:else}
								{item}
							{/if}
						{/each}
					</ul>
					<ul
						aria-hidden="true"
						class="marquee__content"
						style="animation: scroll {speeds[
							i
						]}s linear infinite !important; color: rgb(82, 82, 82) !important"
					>
						{#each list as item, j}
							{#if containsArray(randomColours, [i, j])}
								<div style="color: rgb(0, 159, 255) !important; font-size: 40px !important;">
									{item}
								</div>
							{:else}
								{item}
							{/if}
						{/each}
					</ul>
				</div>
			{/each}
	</div>
	</div>
	<div class="container">
		<div class="content">
			<div class="innerContent" bind:this={typewriter1}>
				<h1 id="aboutMe">About Me.</h1>
				<Typewriter
					height={height1}
					{furthestScrolled}
					phrase="I am currently in {data.area}, {data.region} as of {data.time}. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
				/>
				<p />
			</div>
		</div>
		<div class="content" id="projectContent">
			<h1>My Projects.</h1>
			<div class="projects">
				<Project />
				<Project />
				<Project />
			</div>
		</div>
		<div class="content">
			<h1>My Expertise.</h1>
		</div>
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
		font-family: Circular-normal;
		letter-spacing: -0px !important;
	}

	.innerContent {
		width: 90vw;
		height: 80vh;
		display: flex;
		justify-content: start;
		align-items: start;
	}

	h1 {
		font-size: 70px;
	}

	#aboutMe {
		margin-top: 45px;
	}

	img {
		z-index: 1000;
	}

	.imgHolder {
		position: absolute;
		top: 150px;
		left: 40px;
		z-index: 1000;
	}

	.background {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		z-index: 0 !important;
	}

	/* Marquee styles */

	.marquee {
		--gap: 1rem;
		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
	}

	.marquee__content {
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		gap: var(--gap);
		min-width: 100%;
		/* color:rgb(82, 82, 82) !important; */
	}

	@keyframes -global-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	/* Pause animation when reduced-motion is set */
	@media (prefers-reduced-motion: reduce) {
		.marquee__content {
			animation-play-state: paused !important;
		}
	}

	@keyframes -global-scroll-abs {
		from {
			transform: translateX(calc(100% + var(--gap)));
		}
		to {
			transform: translateX(0);
		}
	}

	.marquee__content:last-child {
		animation-name: scroll-abs;
	}

	ul {
		list-style-type: none;
		/* color: #333 !important; */
		font-size: 40px;
	}

	/* START OF PROJECTS STYLES */

	#projectContent {
		flex-direction: column !important;
		gap: 30px;
	}

	.projects {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row !important;
		width: 100vw;
		height: 250px;
		gap: 40px;
	}

	
	/* END OF PROJECTS STYLES */

	.first {
		margin-bottom: 200px;
	}

	.container,
	.content {
		max-width: 100vw;
		height: 50vh;
		font-size: 60px;
		/* overflow: hidden; */
	}

	.container {
		/* overflow: scroll; */
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
		justify-content: center;
		margin-bottom: 70px;
	}
</style>
