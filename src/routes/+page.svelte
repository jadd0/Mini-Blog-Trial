<script>
	let roomCode = '';

  async function getRoom() {
    const data = await fetch(`/api/getRoom?roomCode=${roomCode}`);
    
    if (data.ok) {
      const parsed = data.json();

      location.href = `/room/${parsed.roomCode}`;
      return;
    }
  }

  async function makeRoom() {
    location.href = `/room/makeRoom`;
  }
</script>

<body>
  <div class="section">
    <h1>Friend Interceptor</h1>
    <p>Use this simple tool to find the shortest path to your destination whilst meeting your friend along the way.</p>
  </div>
	<div class="section">
		<div class="button" on:click={makeRoom}><span>Make room here</span></div>
	</div>
	<div class="section">
		<h1>Have a room code?</h1>
		<h2>Please enter it here:</h2>
		<div class="inputHolder">
			<input type="text" class="userInput" maxlength="5" bind:value={roomCode} />
		</div>

		<div class="button" id="enter"><span>Enter</span></div>
	</div>
</body>


<style>
	@font-face {
		font-family: 'Jakarta';
		src: url('/fonts/Jakarta.ttf');
	}
	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		/* height: 1000vh; */
		width: 100vw;
		height: 100vh;
		background-color: #212121;
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
		font-family: Jakarta;
		font-weight: 300;
	}

	.inputHolder {
		width: 150px;
		height: 55px;
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
		width: 120px;
		font-size: 28px !important;
    font-weight: 600;
		min-height: 35px;
		margin-left: 10px;
		margin-top: 8px;
		background: #212121;
		color: white;
		text-align: center;
	}
	.inputHolder .userInput:focus {
		border-color: blue;
		border-width: medium medium 2px;
	}

	.inputHolder:focus-within {
		border: 2px solid rgb(90, 90, 90);
	}

	input {
		font-size: 17px !important;
	}

  h1 {
    font-size: 40px;
    font-weight: 700;
  }

  .section {
    width: 100vw;
    height: auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button {
    width: auto;
    height: 60px;
    border-radius: 10px;
    background: #141414;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
    transition: linear 0.5s;
  }

  .button:hover {
    background: #343434;

    }

  .button > span {
    font-size: 25px;
    font-weight: 600;
  }

  #enter {
    margin-top: 20px;
  }
</style>
