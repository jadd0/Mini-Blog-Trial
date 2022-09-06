<script>
	import { onMount } from "svelte";
	// import Nav from './nav/+page.svelte'
	let data = ''
  let users = []
  let value = []

  const postQuery = async () => {
		const val = document.getElementById("userInput").value;

		if (val == "") {
			users = [];
			return;
		}

		const rawResponse = await self.fetch(
			"http://localhost:5173/api/getUsers",
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query: val }),
			}
		);
		const h = await rawResponse.json();
		users = h.data;

    console.log(users)
	};


</script>

<svelte:window on:keyup={postQuery} />

<body>
	<!-- <Nav/> -->
	<div id="all">
    <div id="container">
      <h1>Add Friend</h1>
      <input id="userInput" type="text" />
      <div id="friendContainer">
        {#each users as user}
          <div id="friend">
            <a href="/user/{user}">
              <span>{user}</span>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</body>

<style>
	@font-face {
		font-family: "New-Inter";
		src: url("/fonts/Inter.ttf");
	}

	body {
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
		font-family: New-Inter;
		letter-spacing: -1px !important;
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

  #wholePage {
		width: 100vw;
		height: 100vh;
		/* position: absolute; */
		display: flex;
		justify-content: center;
		align-items: center;
		background: #141414;
		opacity: 0.7;
		position: absolute;
		z-index: 0;
		margin-top: -27.33px;
	}

	#container {
		/* background-color: #393939; */
		background: #1b1b1b;
		width: 400px;
		height: 80vh;
		display: grid;
		overflow: hidden;
		position: absolute;
		/* margin: 0 auto; */
		top: 10%;
		left: 35%;
		z-index: 1;
		/* align-items: center; */
	}

	h1 {
		font-size: 50px;
		color: white;
		/* min-width: 500px; */
		margin: 0 auto;
		margin-top: 20px;
	}

	input {
		width: 300px;
		height: 20px;
		margin: 0 auto;
		margin-top: 10px;
		/* position: absolute;
		top: 30%;
		left: 26%; */
	}

	#friendContainer {
		/* width: 20vw; */
		position: relative;
		top: 16.5%;
		height: 70vh;
		/* background-color: #393939; */
		overflow: scroll;
	}

	a {
		text-decoration: none;
	}

	#friend {
		text-align: center;
		line-height: 5vh;
		width: 100%;
		height: 5vh;
		color: white;
		font-size: 30px;
		/* background: #1b1b1b; */
	}

	#friend:nth-child(2n) {
		background-color: #333 !important;
	}
</style>
