<script lang="ts">
  let uri = '';

  async function submit() {
    console.log(uri);
    const res = await fetch(`/api/getURI?uri=${uri}`);
    console.log(await res.json());
  }
</script>

<body>
	<div class="container">
		<div class="nameInput">
      <div class="inputHolder">
        <input type="text" class="userInput" bind:value={uri} required />
        <span class="floatingLabel">Name</span>
      </div>
      <div class="button" on:click={submit}>-></div>
    </div>
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


	@media (max-width: 750px) {
		.container {
			margin-top: 50px;
		}
	}

  .inputHolder {
		width: 250px;
		height: 50px;
		padding-bottom: 5px;
		margin: 0 auto;
		margin-top: 30px;
		background: #212121;
		border-radius: 5px;
		color: white;
		text-align: left;
		border: 2px solid #333;
		transition: all 0.2s linear;
		margin-left: 0px;
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

	.nameInput {
		width: 300px;
		height: auto;
		display: flex;
		align-items: center;
    justify-content: center;
		gap: 10px;
	}

  .button {
		width: 30px;
		height: 30px;
		background-color: #333;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		cursor: pointer;
    margin-top: 28px;
	}
</style>
