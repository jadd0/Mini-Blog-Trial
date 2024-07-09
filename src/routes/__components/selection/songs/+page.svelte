<script lang="ts">
	import Page from '../albums/+page.svelte';

	let songName = '';
	let isName: number = 0;
	let songs: {}[] = [];
	let selectedSongIndex: number | null = null;

	async function submit(e: any) {
    selectedSongIndex = null;
		if (songName.length < 1) {
			isName = 0;
			return;
		}
		const res = await fetch(`/api/getSong?query=${songName}`, {
			headers: { 'Content-Type': 'application/json' }
		});
		const parse = await res.json();
		if (parse[0] == null) {
			songs = [];
			return;
		}
		songs = parse;
		console.log(songs);
	}

	async function sendSong(song: any, index: number) {
    selectedSongIndex = index;

		const response = await fetch('/api/sendSong', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				song
			})
		});
	}
</script>

<svelte:window on:keyup={submit} />

<div class="inputHolder">
  <input
    type="text"
    class="userInput"
    bind:value={songName}
    required
  />
  <span class="floatingLabel">Title</span>
</div>

<div class="mainHolder">
	<div class="desc">
		<div class="empty" />
		<div class="titleHolder"><h4>TITLE</h4></div>
		<div class="albumTitle"><h4>ALBUM</h4></div>
	</div>

	<div class="songContainer">
		{#each songs as song, i}
			<div class="song {selectedSongIndex === i ? 'selected' : ''}" on:click={() => sendSong(song, i)}>
				<img src={song.album.images[0].url} class="thumbnail" />
				<div class="properties">
					<h2>{song.name}</h2>
					<div class="explicitAndArtist">
						{#if song.explicit}
							<div class="explicitHolder">
								<div class="explicit">
									<span class="explicitText">E</span>
								</div>
							</div>
						{/if}
						<h3 class="artist">
							{#each song.artists as artist, j}
								{artist.name}{j < song.artists.length - 1 ? ', ' : ''}
							{/each}
						</h3>
					</div>
				</div>
				<div class="albumHolder">
					<h3>{song.album.name}</h3>
				</div>
			</div>
		{/each}
	</div>
</div>

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

	.selected {
		background: green !important;
	}

	

	.desc {
		width: 700px;
		height: 30px;
		margin: 0 auto;
		/* background: white; */
		display: flex;
		margin-top: 20px;
		border-bottom: #727272;
	}

	.empty {
		width: 14%;
		height: 100%;
		/* background: green; */
	}

	.titleHolder {
		width: 39%;
		height: 100%;
		/* background: blue; */
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.albumTitle {
		width: 37.5%;
		height: 100%;
		/* background: yellow; */
		display: flex;
		justify-content: start;
		align-items: center;
	}

	h4 {
		color: rgb(142, 142, 142);
		font-size: 15px;
		font-weight: 700;
	}

	.songContainer {
		width: 700px;
		height: 500px;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin: 0 auto;
		border-radius: 15px;
		margin-top: 5px;
		/* background: red; */
	}

	.song {
		width: 100%;
		min-height: 60px;
		background: #181818;
		display: flex;
		border-radius: 6px;
		transition: 0.2s ease-in-out;
		cursor: pointer;
	}

	.song:nth-child(1) {
		margin-top: 900px;
	}

	.song:hover {
		background: #282828;
	}

	.thumbnail {
		width: 45px;
		height: 45px;
		/* float: left;
		margin-left: 20px;
		margin: 0 auto; */
		position: relative;
		top: 13.5%;
		left: 5%;
		border-radius: 5px;
	}

	.properties {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		margin-left: 7.5%;
		padding-right: 4.5%;
	}

	.albumHolder {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	h2 {
		font-size: 15px;
		text-align: left;
		margin-top: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-height: 18px;
		max-width: 250px;
	}

	h3 {
		font-size: 13px;
		text-align: left;
		float: left;
		color: rgb(142, 142, 142);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.artist {
		max-height: 18px;
		max-width: 230px;
	}

	.explicit {
		width: 14px;
		height: 14px;
		background: #a5a3a2;
		border-radius: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* margin-top: -1px; */
	}

	.explicitHolder {
		padding-right: 5px;
	}

	.explicitText {
		font-size: 8px;
		color: #121212;
		text-align: center;
		margin-top: 1px;
	}

	.explicitAndArtist {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		margin-top: 1px;
	}


  .inputHolder {
		width: 300px;
		height: 50px;
		padding-bottom: 5px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 5px;
		color: white;
		text-align: left;
		border: 2px solid #333;
		transition: all 0.2s linear;
	}
	.userInput {
		width: 92.5%;
		min-height: 35px;
		margin-left: 10px;
		margin-top: 10px;
		background: #212121;
		color: white;
		text-align: left;
	}
	.inputHolder .userInput:focus {
		border-color: blue;
		border-width: medium medium 2px;
	}
	.inputHolder .floatingLabel {
		position: relative;
		pointer-events: none;
		top: -40px;
		left: 10px;
		transition: 0.2s ease all;
		font-size: 15px;
		color: #727272;
	}
	.inputHolder input:focus ~ .floatingLabel,
	.inputHolder input:not(:focus):valid ~ .floatingLabel {
		top: -57px;
		left: 10px;
		font-size: 10px;
		opacity: 1;
	}

	.inputHolder:focus-within {
		border: 2px solid rgb(90, 90, 90);
	}

	input {
		font-size: 17px !important;
	}

  @media (max-width: 750px) {
		.desc {
			display: none;
		}

    .song {
      width: 100%;
    }

    .songContainer {
      width: 100%;
    }

    h3 {
      font-size: 13px;
    }

    .albumHolder {
      display: none;
    }

    .songContainer {
      height: 700px;
      padding-top: 0px !important;
      margin-top: 25px;
    }

    .song:nth-child(1) {
		margin-top: 750px;
	}
	}
	
  .albumContainer {
    padding-bottom: 50px;
    padding-top: 60px;

  }
	
  .songContainer {
    padding-bottom: 50px;
    padding-top: 60px;

  }
	
</style>
