<script lang="ts">
	import Songs from './__components/selection/songs/+page.svelte';
	import Albums from './__components/selection/albums/+page.svelte';

	let selected = 'song';

</script>

<body>
	<div class="container">
		<div class="selector">
			<div class="options">
				<div class="option {selected == 'album' ? '' : 'selected'}" on:click={() => {selected="song"}}>
					<h2>SONGS</h2>
				</div>
				<div class="option {selected == 'song' ? '' : 'selected'}"  on:click={() => {selected="album"}}>
					<h2>ALBUMS</h2>
				</div>
			</div>
		</div>
		{#if selected == 'song'}
			<Songs />
		{:else}
			<Albums />
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
</style>
