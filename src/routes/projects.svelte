<script>
	export let height
	export let scroll = 0
	$: if (Math.ceil(scroll) + 1000 <= height && height <= Math.ceil(scroll) - 10)  {
		console.log(true)
		sticky = true
	}
	$: if ((Math.ceil(scroll) + 1000 <= height && height <= Math.ceil(scroll) -10) == false) {
		sticky = false
	}

	let index = 0
	let sticky = false

	let projects
	let box

	console.log({height})

</script>

<div class="box"></div>

<div class="projects {sticky == true ? 'sticky' : ''}" bind:this={projects} >
	<div class="project" style="background: red" />
	<div class="project" style="background: blue" />
	<div class="project" style="background: purple" />
</div>

<style>
	#projectContent {
		display: flex;
		justify-content: start;
		align-items: start;
		flex-direction: column !important;
		gap: 30px;
		/* padding: 0 5vw; */
	}

	#projectContent h1 {
		/* position: fixed;
		top: 0; */
	}

	.box {
		width: 100vw;
		height: 100vh;
		background: red;
		display: none;
	}

	.projects {
		width: 100vw;
		height: 100vh;
		overflow: scroll;
		-webkit-scroll-snap-type: y mandatory;
		-ms-scroll-snap-type: y mandatory;
		scroll-snap-type: y mandatory;
		/* display: none; */
	}

	.project {
		width: 100%;
		height: 100vh;
		/* background: blue; */
		scroll-snap-align: start;
	}

	.sticky {
		position: fixed;
		top: 0;
	}
</style>
