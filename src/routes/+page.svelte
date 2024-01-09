<script>
	import { onMount } from 'svelte';

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
	' Accountable   '
];

let lists;
let speeds;

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
    speeds.push(Math.floor(Math.random() * (40 - 20) + 20));
  }

  return speeds;
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

</script>

<body>
	<div class="container">
		<div class="content">
			<!-- <div class="welcome">
				<span> JADD </span>
				<span> AL-KHABBAZ </span>
			</div> -->
			<div class="background">
				{#each lists as list, i}
					<div class="marquee">
						<ul
							class="marquee__content"
							style="animation: scroll {speeds[
								i
							]}s linear infinite !important; color: rgb(82, 82, 82) !important"
						>
							{#each list as item}
								{item}
							{/each}

						</ul>
						<ul
							aria-hidden="true"
							class="marquee__content"
							style="animation: scroll {speeds[
								i
							]}s linear infinite !important; color: rgb(82, 82, 82) !important"
						>
							{#each list as item}
							{item}
							{/each}

						</ul>
					</div>
				{/each}
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
		max-width: 100vw;
		/* height: 1000vh; */
		background-color: #141414;
		overflow: hidden;
		scroll-behavior: smooth;
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

	.background {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		z-index: 0 !important;
	}

	.things {
		position: absolute;
		top: 0;
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

	span {
		font-size: 150px;
		background-color:rgba(255,0,0,0.3);/*background color and opacity together*/
		z-index: 900;
	}

	.welcome {
		/* margin-left: 40px; */
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
		background-color: none;
		z-index: 500 !important;
	}

	h1 {
		font-size: 75px;
	}

	.container,
	.content {
		max-width: 100vw;
		height: 100vh;
		font-size: 60px;
		overflow: hidden;
		/* padding: 30px; */
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
		/* color: white; */
		/* padding: 5vw; */
	}
</style>
