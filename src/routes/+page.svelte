<script>
	import Lenis from '@studio-freight/lenis';
	import { onMount } from 'svelte';

	onMount(() => {
		const lenis = new Lenis();

		lenis.on('scroll', (e) => {
			console.log(e);
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});
</script>

<body>
	<div class="section">
		<h1>Split</h1>
		<p>
			Everything 2 sets til absolute failure
			<br />Usually finish each last set with a drop set or two (also til failure)
			<br />Everything in 6-8 rep range, when get to 9 reps up the weight
			<br />Usually drop the weight for the second set to still get 6-8 reps
		</p>
	</div>
	<div class="section">
		<h2>Monday</h2>
		<h3>Chest and Back</h3>
		<div class="ex">
			<ul>
				<li>wide pull-ups</li>
				<li>incline dumbell bench</li>
				<li>cable flyes (high to low)</li>
				<li>cable flyes (low to high) *1</li>
				<li>kneeling single arm pulldowns</li>
				<li>cable row (close grip)</li>
				<li>shrugs</li>
			</ul>
		</div>
	</div>
	<div class="section">
		<h2>Tuesday</h2>
		<h3>Shoulders and Arms</h3>
		<div class="ex">
			<ul>
				<li>shoulder press (dumbell)</li>
				<li>incline curl</li>
				<li>incline hammer curl</li>
				<li>tricep push down (single arm)</li>
				<li>lateral raise (dumbell)</li>
				<li>tricep extension (cable rope)</li>
				<li>rear delt flyes</li>
			</ul>
		</div>
	</div>
	<div class="section">
		<h2>Wednesday</h2>
		<h3>Legs and Chest</h3>
		<div class="ex">
			<ul>
				<li>romanian deadlift *2</li>
				<li>leg press</li>
				<li>leg curl</li>
				<li>leg extension</li>
				<li>dips</li>
				<li>chest press</li>
			</ul>
		</div>
	</div>
	<div class="section">
		<h2>Thursday</h2>
		<h3>Arms</h3>
		<div class="ex">
			<ul>
				<li>tricep push down</li>
				<li>tricep extension</li>
				<li>incline curl (dumbell)</li>
				<li>incline hammer curl</li>
				<li>wrist curl (cable, pronated)</li>
				<li>wrist curl (cable, supinated)</li>
			</ul>
		</div>
	</div>
	<div class="section">
		<h2>Friday</h2>
		<h3>Chest, Back and Delts</h3>
		<div class="ex">
			<ul>
				<li>wide pull-ups</li>
				<li>incline db bench</li>
				<li>dips</li>
				<li>cable flyes (high to low)</li>
				<li>cable flyes (low to high) *1</li>
				<li>seated cable row</li>
				<li>lateral raises (dumbell/cable)</li>
				<li>rear delt flyes (cable or machine)</li>
			</ul>
		</div>
	</div>
	<div class="section">
		<h2>Saturday</h2>
		<h3>Legs and Arms</h3>
		<div class="ex">
			<ul>
				<li>romanian deadlift</li>
				<li>leg press</li>
				<li>leg curl</li>
				<li>leg extension</li>
				<li>incline curl</li>
				<li>tricep pushdown</li>
				<li>wrist curl (cable, pronated) *3</li>
				<li>wrist curl (cable, supinated) *3</li>
			</ul>
		</div>
	</div>
	<div class="section">
		<p>
			*1 Only one set
			<br />
			*2 Do on a 25kg plate to add deficit
			<br />
			*3 I sometimes superset those two exercises to save time
			<br />
			I swap exercises in and out all the time as long as the premise is the same it does not matter
			at all, i just get bored of an exercise if I do it all the time
		</p>
	</div>
</body>

<!-- <svelte:window on:keyup={submit} /> -->

<style>
	@font-face {
		font-family: jakarta;
		src: url('/fonts/Jakarta.ttf');
	}
	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		padding-bottom: 100px;
		border: 0;
		/* height: 1000vh; */
		width: 100vw;
		background-color: #141414;
		/* overflow: hidden; */
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
		font-family: Jakarta;
		font-weight: 300;
	}

	.section {
		width: 100vw;
		height: auto;
		padding-top: 30px;
		padding-left: 60px;
		display: flex;
		justify-content: start;
		align-items: start;
		flex-direction: column;
	}

	h1 {
		font-size: 40px;
		font-weight: 600;
		color: white;
	}

	h2 {
		font-size: 30px;
		font-weight: 600;
		color: white;
	}

	h3 {
		font-size: 25px;
		font-weight: 600;
		color: white;
	}

	ul {
		margin-top: 10px;
	}

	li {
		font-size: 18px;
		text-align: start;
		padding-left: 5px;
		color: white;
	}

	p {
		color: rgb(142, 142, 142);
		font-size: 16px;
		font-weight: 400;
		text-align: start;
		padding-right: 30px;
	}
</style>
