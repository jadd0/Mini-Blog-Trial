<script>
	let title;
	let description;
	let body;

	let value;
	let options = [];

	let loading = false;

	const submit = async () => {
		if (title.length == 0 || description.length == 0 || body.length == 0)
			return;
		loading = true;
		const response = await fetch("/api/createVote", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title,
				description: description,
				body: body,
			}),
		});

		if (response.ok) {
			window.location = "/newpost";
		}

		if (response.ok == false) {
			loading = false;
			wrong = true;
		}
	};

	function addOption() {
		options = [...options, value];
		value = "";
	}

	function removeOption(i) {
		options.splice(i, 1);
		options = options;
	}
</script>

<div id="inputHolder">
	<textarea
		name="text"
		id="userInput"
		maxlength="500"
		placeholder="Question (10-500 chars)"
		bind:value={body}
		oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
	/>
</div>


<div id="optionHolder">
  <h2>Options</h2>
	<div id="inputHolder">
		<input id="userInput" type="text" bind:value />
	</div>

	<button on:click={addOption}>Submit</button>

	<div id="optionsHolder">
		{#each options as option, i}
			<div id="option">
				<p>{option}</p>
				<span on:click={() => removeOption(i)}>❌</span>
			</div>
		{/each}
	</div>
</div>

<button on:click={submit} id="loginButton"
	>{loading === true ? "Loading..." : "Send"}</button
>

<style>
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
		font-weight: 300;
	}
	@media (max-width: 930px) {
		#form {
			width: 340px !important;
		}

		#inputHolder {
			width: 90% !important;
		}
	}

  #option {
    width: 75%;
    min-height: 25px;
    background:rgb(56, 56, 56);
  }

	#userInput {
		width: 87.5%;
		min-height: 36px;
		margin-left: 19px;
		margin-top: 4px;
		background: #212121;
		color: white;
		text-align: left;
	}

	#inputHolder {
		width: 75%;
		min-height: 40px;
		padding-bottom: 5 px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 20px;
		color: white;
		text-align: left;
	}

	textarea {
		resize: none;
		width: 400px;
		min-height: 100px;
		height: auto;
		padding: 5px;
		overflow: hidden;
		box-sizing: border-box;
	}

	h1 {
		font-size: 1.75em;
		font-weight: 800;
		padding-top: 20px;
		padding-bottom: 20px;
		color: white;
	}

  h2 {
		font-size: 30px;
		font-weight: 500;
		color: white;
		border-bottom: 3px solid #1b1b1b;
	}

	#form {
		margin: 0 auto;
		background: #1b1b1b;
		width: 40vw;
		min-height: 400px;
		padding-bottom: 30px;
		margin-bottom: 30px;
		border-radius: 15px;
		margin-top: 5vh;
	}

	input {
		margin: 0 auto;
		line-height: 16px;
	}

	a {
		text-decoration: none;
	}

	#loginButton {
		margin: 0 auto;
		margin-top: 30px;
		width: 75%;
		height: 50px;
		color: white;
		font-weight: 600;
		background-color: #212121;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s linear;
	}

	#loginButton:hover {
		background: rgb(56, 56, 56);
	}
</style>
