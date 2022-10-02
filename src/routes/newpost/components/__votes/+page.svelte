<script>
	import { autoresize } from "svelte-textarea-autoresize";

	let value = "";
	let body = "";
	let options = [
		{
			value: "",
			votes: [],
		},
		{
			value: "",
			votes: [],
		},
	];

	let loading = false;

	const submit = async () => {
		if (body == undefined || body.length < 3) return;

		const res = options.find((item) => item.value.length < 1);
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
				options,
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
		if (options.length < 3) return;
		options.splice(i, 1);
		options = options;
	}
</script>

<div class="inputHolder">
	<textarea
		class="userInput"
		maxlength="250"
		placeholder="Question"
		bind:value={body}
		use:autoresize
	/>
	<h3 id="forTitle">{body.length}/250</h3>
</div>

<div id="optionHolder">
	<h2>Options</h2>

	<div id="optionsHolder">
		{#each options as item, i}
			<div class="inputHolder" id="optionHolder">
				<textarea
					class="userInput"
					maxlength="25"
					placeholder="Option {i + 1}"
					id="option"
					bind:value={item.value}
					use:autoresize
				/>
				<h3 id="optionNum">{item.value.length}/25</h3>
			</div>
			<span id="delete" on:click={() => removeOption(i)}>❌</span>
		{/each}
	</div>

	{#if options.length < 7}
		<button id="addOption" on:click={addOption}><h5>+</h5></button>
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

		.inputHolder {
			width: 90% !important;
		}

		#optionNum {
			right: -77% !important;
		}

		#optionHolder {
			width: 88% !important;
			margin-left: 9px !important;
		}

		#delete {
			margin-left: 5px;
		}
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

	#delete {
		position: relative;
		top: -9px;
		right: -92%;
		width: 30px;
		height: 30px;
		text-align: center;
	}

	#option {
		width: 80%;
		min-height: 25px;
	}

	#optionHolder {
		width: 85%;
		margin-left: 6%;
		margin-bottom: -29px;
	}

	h3 {
		font-weight: 600;
		color: rgb(112, 112, 112);
		font-size: 10px;
		height: 0px;
		width: 50px;
		position: relative;
		text-align: right;
		bottom: 20px;

		right: -81%;
		/* margin-top: 10%; */
		/* position: sticky; */
		/* bottom: 0px !important; */
		/* margin-top: 7.5%; */
	}

	.userInput {
		width: 80%;
		min-height: 25px;
		margin-left: 10px;
		margin-top: 4px;
		background: #212121;
		color: white;
		text-align: left;
	}

	.inputHolder {
		width: 78%;
		min-height: 30px;
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

	.inputHolder:focus-within {
		border: 2px solid rgb(90, 90, 90);
	}

	textarea {
		resize: none;
		font-size: 16px;
		height: auto;
		padding: 5px;
		overflow: hidden;
		box-sizing: border-box;
	}

	h5 {
		color: white;
		font-size: 50px;
		height: 45px;
		text-align: center;
		transition: all 0.2s linear;
	}

	h2 {
		font-size: 30px;
		font-weight: 500;
		color: white;
		border-bottom: 3px solid #1b1b1b;
		margin-top: 15px;
	}

	#loginButton {
		margin: 0 auto;
		margin-top: 40px;
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
