<script>
	import { onMount } from "svelte";
	import Nav from '../__nav/+page.svelte'
	export let data = [];

  function remove() {

  }
</script>

<body>
	<Nav username={data.username}/>
  <div id="warning">
    <h1>Delete this post?</h1>
    <button>Yes</button>
    <button>No</button>
  </div>

	<!-- <Nav username={data.username}/> -->
	<div id="whole">
		{#each (data.data) as d}
			<a on:click={remove} id="hello">
				<div id="postContainer" class="postContainer">
					<h1>
						{d.title}
					</h1>
					<div id="descriptionHolder">
						<h2>{d.metadata.description}</h2>
					</div>
				</div>
			</a>
		{/each}
	</div>
</body>

<style>
	@font-face {
		font-family: "Jakarta";
		src: url("/fonts/Jakarta.ttf");
	}

	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		height: 100vh;
		width: 100vw;
		background-color: #141414;
		overflow-x: hidden
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
		letter-spacing: -0px !important;
	}

  #warning {
    width: 350px;
    height: 500px;
    position: absolute;
    z-index: 100;
    left: 30vw;
    background: #212121;
  }

	#whole {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-bottom: 20px;
	}

	#postContainer {
		width: 50vw;
		/* min-height: 20vh; */
		padding-bottom: 20px;
		background: #212121;
		margin-top: 20px;
		border-radius: 10px;
		transition: all 0.2s linear;
	}	

	#postContainer:hover {
		background: rgb(56, 56, 56);
	}

	@media (max-width: 800px) {
		#postContainer {
			width: 75vw;
		}
	}

	@media (max-width: 520px) {
		h1 {
			font-size: 10vw !important;
		}
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
		color: white;
		padding-top: 10px;
		text-align: left;
		margin-left: 5vw;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 500;
		color: white;
		text-align: left;
		/* margin-left: 1vw; */
	}

	#descriptionHolder {
		width: 80%;
		margin: 0 auto;
		font-size: 1.5rem;
		margin-left: 5vw !important;
	}

	a {
		text-decoration: none;
	}
</style>
