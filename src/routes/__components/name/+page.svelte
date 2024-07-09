<script lang="ts">
  import { SvelteScrollTypewriter } from "sveltescrolltypewriter";

	let nameDone = false;
	let name = '';

  let furthestScrolled = 0;
  let scroll = 0;
  $: if (scroll > furthestScrolled) {
	  furthestScrolled = scroll;
  }

  let typewriter1;
  let height1 = 0;
</script>

<div class="container">
  <h2>Hey!</h2>
	<div class="intro" bind:this={typewriter1}>
    <SvelteScrollTypewriter 
              height={height1}
              {furthestScrolled}
              phrase="I want to listen to new music. Please help me by using this simple tool to recommend me some new music! Just choose either song/album and begin typing. To recommend me something, simply click on the song/album and it should turn green. This is then recommended to me. Thank you! - Jadd"
          />
    </div>
    
</div>

<style>
	@font-face {
		font-family: 'Circular';
		src: url('/fonts/CircularStd-Book.otf');
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 50px;
	}

  .intro {
    width: 400px;
  }

  @media (max-width: 500px) {
		.intro {
			width: 250px;
		}
	}
</style>
