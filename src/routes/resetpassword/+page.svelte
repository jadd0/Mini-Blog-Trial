<script>
	export let data;
	import { onMount } from "svelte";
	import Nav from "../__nav/+page.svelte";
	let email = "";
	let username = "";
	let loading = false;

	async function submit() {
		loading = true;
		const response = await fetch("/api/resetPassword", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				username,
			}),
		});
		if (response.ok) location.reload();
	}
</script>

<!-- <svelte:window on:keyup={submit} /> -->

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<body>
	<Nav username={data.username} />
	<div id="loginForm">
		<h1>Forgot Password</h1>
		<p>
			Type in your username and email address asssociated with your
			account. If the email address matches, an email will be sent with
			instructions on how to reset your password.
		</p>
		<div class="inputHolder">
			<input type="text" class="userInput" bind:value={email} required />
			<span class="floatingLabel">Your email address</span>
		</div>
		<div class="inputHolder">
			<input
				type="text"
				class="userInput"
				bind:value={username}
				required
			/>
			<span class="floatingLabel">Your username</span>
		</div>
		<button on:click={submit} id="loginButton"
			>{loading === true ? "Loading..." : "Send"}</button
		>
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
		margin-top: -15px;
		padding: 0px 20px 5px 20px;
		color: rgb(142, 142, 142);
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
		height: 375px;
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
