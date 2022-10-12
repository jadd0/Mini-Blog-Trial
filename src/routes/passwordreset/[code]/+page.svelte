<script>
	export let data;
	const code = data.code
	const passwordUsername = data.passwordUsername
	import { onMount } from "svelte";
	import Nav from '../../__nav/+page.svelte'

	let password = ''
	let password1 = ''

	async function submit() {
		if (password1 !== password) return
		const response = await fetch("/api/changePassword", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: passwordUsername,
				code,
				password
			}),
		});
	}

	function checkSame() {
		if (password1 !== password) {
			console.log("different")
			return
		}
	}
</script>

<svelte:window on:keyup={checkSame} />

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<body>
	<Nav username={data.username}/>
	<div id="loginForm">
		<input type="text" bind:value={password}>
		<input type="text" bind:value={password1}>
		<button on:click={submit}>send</button>
	</div>
</body>

<style>
	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		/* height: 1000vh; */
		width: 100vw;
		background-color: #141414;
		/* overflow: hidden; */
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
		font-family: Jakarta;
		font-weight: 300;
	}

	#forgot {
		font-size: 15px;
		margin-top: 1.5vh;
	}

	@media (max-width: 460px) {
		#loginForm {
			width: 325px !important;
		}
	}

	.shake {
		animation: shake2 0.2s linear;
	}

	.wrong {
		border: 2px solid red;
	}

	@keyframes shake2 {
		25% {
			transform: translateX(11px);
		}

		50% {
			transform: translateX(0px);
		}

		75% {
			transform: translateX(-11px);
		}
	}

	p {
		margin-top: 20px;
		color: rgb(255, 255, 255);
		font-size: 30px;
		font-weight: 400;
		transition: all 0.2s linear;
	}

	p:hover {
		color: rgb(127, 127, 127);
	}

	#userInput {
		/* width: 264px; */
		width: 87.5%;
		height: 34px !important;
		margin-left: 19px;
		margin-top: 2px;
		background: #212121 !important;
		color: white;
		text-align: left;
	}

	#inputHolder {
		width: 75%;
		height: 40px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 20px;
		color: white;
		text-align: left;
	}

	h1 {
		font-size: 1.75em;
		font-weight: 600;
		padding-top: 20px;
		padding-bottom: 20px;
		color: white;
	}

	#loginForm {
		margin: 0 auto;
		background: #1b1b1b;
		width: 400px;
		height: 350px;
		border-radius: 15px;
		margin-top: 7vh;
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
		margin-top: 10px;
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
