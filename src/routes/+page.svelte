<script lang="ts">
	import Songs from './__components/selection/songs/+page.svelte';
	import Albums from './__components/selection/albums/+page.svelte';
	import Intro from './__components/intro/+page.svelte';
	import Name from './__components/name/+page.svelte';

	import { onMount } from 'svelte';

	let firstDone = false;
	let nameDone = false;
	let name = '';

	let selected = 'song';

	function intro() {
		firstDone = true;
	}

	onMount(() => {
		setTimeout(intro, 10000);
	})
</script>

<body>
	<div class="container">
		{#if firstDone == false}
			<Intro />
			
		{/if}

		{#if (nameDone == false && firstDone == true)} 
				<Name bind:finished={nameDone} bind:name={name} />
		{/if}
		{#if (nameDone && firstDone)}
			<div class="selector">
				<div class="options">
					<div
						class="option {selected == 'album' ? '' : 'selected'}"
						on:click={() => {
							selected = 'song';
						}}
					>
						<h2>SONGS</h2>
					</div>
					<div
						class="option {selected == 'song' ? '' : 'selected'}"
						on:click={() => {
							selected = 'album';
						}}
					>
						<h2>ALBUMS</h2>
					</div>
				</div>
			</div>
			{#if selected == 'song'}
				<Songs name={name} />
			{:else}
				<Albums name={name} />
			{/if}
			{/if}
	</div>
</body>

<style>
	@font-face {
		font-family: 'Circular';
		src: url('/fonts/CircularStd-Book.otf');
	}
	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		/* height: 1000vh; */
		width: 100vw;
		height: 100vh;
		background-color: #141414;
		/* overflow: hidden; */
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
		font-family: Circular;
		font-weight: 300;
	}

	.container {
		margin-top: 100px;
	}

	.options {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 50px;
		margin-bottom: 50px;
	}

	.option {
		width: 120px;
		height: 40px;
		border-radius: 25px;
		transition: all 0.2s linear;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.option:hover {
		background: #323232 !important;
	}

	.selected {
		background: #272727 !important;
	}

	h2 {
		font-size: 20px;
	}

	@media (max-width: 750px) {
		.container {
			margin-top: 50px;
		}
	}
</style>
