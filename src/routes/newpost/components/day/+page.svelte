<script>
	let text;
	let num = 3;

	const moods = [
		[":(", "Bad"],
		[":/", "Kinda bad"],
		[":|", "Meh"],
		[":)", "Good"],
		[":D", "Really Good"],
	];
	const colors = ["red", "orange", "blue", "lightGreen", "green"];
	let loading = false;

	const submit = async () => {
		loading = true;
		const response = await fetch("/api/newMood", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				mood: num,
				text,
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
</script>

<h2>How was your day today?</h2>

<div id="moodHolder">
	<button
		id="moodButton"
		on:click={() => {
			if (num > 0) {
				num--;
			}
		}}
	>
		<h3>-</h3>
	</button>

	<div id="circle" class={colors[num]}>
		<h1 id="moodPic">{moods[num][0]}</h1>
	</div>
	<button
		id="moodButton"
		on:click={() => {
			if (num < 4) {
				num++;
			}
		}}
	>
		<h3>+</h3>
	</button>
</div>
<h1 id="moodText">{moods[num][1]}</h1>

<h2>What happened today?</h2>
<div id="inputHolder">
	<textarea
		name="text"
		id="userInput"
		maxlength="100"
		placeholder="(0-100 chars)"
		bind:value={text}
		oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
	/>
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

	/* @media (max-width: 930px) {
		#form {
			width: 340px !important;
		}

		#inputHolder {
			width: 90% !important;
		}
	} */

	.green {
		background-color: rgb(0, 100, 0) !important;
	}

	.lightGreen {
		background-color: rgb(67, 211, 0) !important;
	}

	.blue {
		background-color: rgb(0, 153, 255) !important;
	}

	.orange {
		background-color: rgb(255, 136, 0) !important;
	}

	.red {
		background-color: rgb(255, 0, 0) !important;
	}

	#moodPic {
		font-size: 30px;
	}

	#moodButton {
		width: 45px;
		height: 45px;
		/* margin-top: 20px; */
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 40px;
		border-radius: 100px;
    background: none;
		transition: all 0.2s linear;
		cursor: pointer;
	}

	#moodText {
		color: white;
		font-size: 30px;
		margin-top: 10px;
	}

	h3 {
		color: rgb(134, 134, 134);
		/* color: white; */
		font-size: 50px;
    height: 45px;
    /* line-height: 10px; */
    text-align: center;
		/* width: 40px; */
		transition: all 0.2s linear;
	}

	#moodButton:hover {
		background: #353535;
	}

	#moodHolder {
    padding-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* width: 50%; */
		height: 100px;
		margin: 0 auto;
		gap: 10px;
	}

	#circle {
		width: 100px !important;
		height: 100px !important;
		border: 3px solid rgb(75, 75, 75);
		background: white;
		margin: 0;
		border-radius: 200px;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
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
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 20px;
		color: white;
		text-align: left;
	}

	h2 {
		margin-top: 10px;
		font-size: 25px;
		font-weight: 500;
		color: white;
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
