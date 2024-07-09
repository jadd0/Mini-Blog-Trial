<script>
  let password = "";
</script>

<div class="section">
  <h1>Room Password</h1>
  <div class="inputHolder">
    <input class="userInput" bind:value={password} />
  </div>
</div>


<style>
	@font-face {
		font-family: 'Jakarta';
		src: url('/fonts/Jakarta.ttf');
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
		width: 300px;
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
		width: 92.5%;
		font-size: 28px !important;
		font-weight: 600;
		min-height: 35px;
		margin-left: 10px;
		margin-top: 8px;
		background: #212121;
		color: white;
		text-align: left;
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
		font-size: 30px;
		font-weight: 700;
	}

	.section {
		width: 100vw;
		height: auto;
		padding-top: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.button {
		width: 200px;
		height: 60px;
		border-radius: 10px;
		background: #141414;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		cursor: pointer;
		transition: linear 0.5s;
		margin-top: 30px;
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

	#map {
		margin: 20px auto;
		width: 80%;
		height: 500px;
	}
</style>
