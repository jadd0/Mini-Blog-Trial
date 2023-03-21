<script>
	export let data;
	import { onMount } from "svelte";
	import Nav from "../../__nav/+page.svelte";

	const username = data.username
	const code = data.code
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~ `!@#$%^&*()_\-+={[\]}\|\\:;"'<,>.?\/])[A-Za-z\d#~ `!@#$%^&*()_\-+={[\]}\|\\:;"'<,>.?\/]{6,}$/;

	let same = true;
	let loading = false;
	let wrong = false;
	
	let password = "";
	$: password === password1 ? wrong = false : wrong = true
	$: if(regex.test(password) == false && password.length > 0) wrong = true
	
	let password1 = "";
	$: password === password1 ? wrong = false : wrong = true

	async function submit() {
		if (password != password1 || wrong == true) return
		loading = true
	
		const response = await fetch("/api/changePassword", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				code,
				password
			}),
		});
		if (response.ok ) location.href = '/login'
	}
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<body>
	<Nav username={data.username} />
	<div id="loginForm">
		<h1>Reset Password</h1>
		<p>Please type in your new password and confirm it by retyping it in. If both passwords are the same, you are able to reset your password by pressing the 'Reset' button.</p>
		<div class="inputHolder {wrong === true ? 'wrong' : ''}">
			<input type="text" class="userInput" bind:value={password} required />
			<span class="floatingLabel">Type in password</span>
		</div>
		<div class="inputHolder {wrong === true ? 'wrong' : ''}">
			<input type="text" class="userInput" bind:value={password1}	 required />
			<span class="floatingLabel">Retype in new password</span>
		</div>
		<h2>Password must contain:</h2>
			<li>One upper and lower case character</li>
			<li>One special character</li>
			<li>One number</li>
			<li>Be at least 6 characters</li>
		<button on:click={submit} id="loginButton">{loading === true ? "Loading..." : "Reset"}</button>
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

	h2 {
		font-size: 17px;
		color: white;
		font-weight: 500;
		margin-top: 10px !important;
		margin: 0 auto;
	}

	li {
		font-size: 15px;
		color: white;
		float: left;
		margin-left: 30px;
		padding-right: 75px;
	}

	.inputHolder {
		width: 78%;
		height: 50px;
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
		top: -41px;
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

	@media (max-width: 460px) {
		#loginForm {
			width: 325px !important;
		}
	}

	.shake {
		animation: shake2 0.2s linear;
	}

	.wrong {
		border: 2px solid red !important;
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
		margin-top: -20px;
		padding: 0px 20px 5px 20px;
		color: rgb(255, 255, 255);
		font-size: 14px;
		font-weight: 400;
		transition: all 0.2s linear;
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
		font-size: 35px;
		font-weight: 600;
		padding-top: 20px;
		padding-bottom: 20px;
		color: white;
	}

	#loginForm {
		margin: 0 auto;
		background: #1b1b1b;
		width: 400px;
		height: auto;
		padding-bottom: 20px;
		border-radius: 15px;
		margin-top: 7vh;
	}

	/* input {
		margin: 0 auto;
		line-height: 16px;
	} */

	a {
		text-decoration: none;
	}

	#loginButton {
		margin: 0 auto;
		margin-top: 30px;
		width: 78%; 
		height: 50px;
		color: white;
		font-weight: 600;
		background-color: #212121;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.2s linear;
	}

	#loginButton:hover {
		background: rgb(56, 56, 56);
	}
</style>
