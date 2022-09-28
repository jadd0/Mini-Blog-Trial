<script>
	import { fade } from "svelte/transition";
	import { flip } from "svelte/animate";

	let value;
	let body;
	let options = [
		{
			value: '',
			votes: [],
		},
		{
			value: '',
			votes: [],
		}
	];

	let loading = false;

	const submit = async () => {
		if (body == undefined || body.length < 3) return;

		const res = options.find((item) => (item.value).length < 1)
		if (res != undefined) return;

		loading = true;

		const response = await fetch("/api/createVote", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				body,
				options
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
		const obj = {
			value,
			votes: [],
		};

		options = [...options, obj];
	}

	function removeOption(i) {
		if(options.length < 3) return
		options.splice(i, 1);
		options = options;
	}
</script>

<div id="inputHolder" style="margin-top: 10px">
	<textarea
		name="text"
		id="userInput"
		maxlength="500"
		placeholder="Question (3-500 chars)"
		bind:value={body}
		oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
	/>
</div>

<div id="optionHolder">
	<h2>Options</h2>

	<div id="optionsHolder">
		{#each options as item, i}
			<div id="inputHolder" class="smallHolder">
				<input
					id="userInput"
					class="small"
					type="text"
					placeholder="Option {i+1} (1-25 chars)"
					bind:value={item.value}
				/>
			</div>
			<span id="delete" on:click={() => removeOption(i)}>❌</span>
		{/each}
	</div>

	{#if options.length < 7}
		<button id="addOption" on:click={addOption}><h3>+</h3></button>
	{/if}
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

	h3 {
		color: white;
		/* color: white; */
		font-size: 50px;
		height: 45px;
		/* line-height: 10px; */
		text-align: center;
		/* width: 40px; */
		transition: all 0.2s linear;
	}

	#addOption {
		width: 80px;
		height: 45px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 40px;
		border-radius: 100px;
		background: none;
		transition: all 0.2s linear;
		cursor: pointer;
		margin-top: 5px;
	}

	#addOption:hover {
		background: rgb(71, 71, 71);
	}

	#optionsHolder {
		display: flex;
		flex-direction: column;
		gap: 0px;
	}

	.smallHolder {
		margin-top: 10px !important;
		margin-bottom: -27px !important;
	}

	.small {
		width: 75% !important;
	}

	#delete {
		position: relative;
		top: -13px;
		right: -78%;
		width: 30px;
		height: 30px;
		text-align: center;
	}

	#option {
		width: 75%;
		min-height: 25px;
		background: rgb(56, 56, 56);
	}

	#userInput {
		width: 87.5%;
		min-height: 36px;
		margin-left: 19px;
		margin-top: 4px;
		font-size: 19px;
		background: #212121;
		color: white;
		text-align: left;
	}

	#inputHolder {
		width: 75%;
		min-height: 40px;
		padding-bottom: 5px;
		margin: 0 auto;
		/* margin-top: 10px; */
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
		margin-top: 15px;
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
