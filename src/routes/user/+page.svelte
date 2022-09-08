<script>
	import { onMount } from "svelte";
	import Nav from '../nav/+page.svelte'

	export let data;
  let users = []
  let value = []

	
  const postQuery = async () => {
		const val = document.getElementById("userInput").value;

		if (val == "") {
			users = [];
			return;
		}

		const rawResponse = await self.fetch(
			"/api/getUsers",
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

    // console.log(users)
	};


</script>

<svelte:window on:keyup={postQuery} />

<body>
	<Nav username={data.username}/>
	<div id="all">
    <div id="container">
      <h1>Search...</h1>
			<div id="inputHolder">
				<input id="userInput" type="text" />
			</div> 
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
		overflow-x: hidden;
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


	h1 {
		font-size: 3rem;
		font-weight: 700;
		color: white;
		padding-top: 10px;
		text-align: left;
		margin-left: 5vw;
	}

	a {
		text-decoration: none;
	}

	#all {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -1;
	}

	#container {
		background: #1b1b1b;
		width: 400px;
		height: 80vh;
		display: grid;
		overflow: hidden;
		border-radius: 20px;
		z-index: 0;
		margin-top: -10vh;
	}

	@media (max-width: 460px) {
		#container {
			width: 325px !important;
		}
	}

	h1 {
		font-size: 50px;
		color: white;
		/* min-width: 500px; */
		margin: 0 auto;
		margin-top: 20px;
	}

	#userInput {
		width: 264px;
		height: 40px;
		margin-left: 19px;
		background: #212121;
		color: white;
		text-align: left;
	}

	#inputHolder {
		width: 300px;
		height: 40px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 20px;
		color: white;
		text-align: left;
		/* position: absolute;
		top: 30%;
		left: 26%; */
	}

	#friendContainer {
		/* width: 20vw; */
		position: relative;
		top: 2.5%;
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
