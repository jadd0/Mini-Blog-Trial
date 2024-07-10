<script lang="ts">
	export let name = '';
  export let finished = false;

  function submit() {
    if (name.length > 0) {
      finished = true;
    }
  }
</script>

<div class="container">
	<h2>Before we continue...</h2>
	<p>Please enter your (full) name below so I know who to thank for the recommendation</p>

	<div class="nameInput">
		<div class="inputHolder">
			<input type="text" class="userInput" bind:value={name} required />
			<span class="floatingLabel">Name</span>
		</div>
		<div class="button" on:click={submit}>-></div>
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
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		padding: 50px;
    height: 500px;
    margin-top: 20px
	}

	p {
		margin-top: 10px;
		font-size: 15px;
		text-align: start;
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

	@media (max-width: 500px) {
		.intro {
			width: 250px;
		}
	}
</style>
