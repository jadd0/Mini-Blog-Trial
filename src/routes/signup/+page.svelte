<script>
	import Nav from "../nav/+page.svelte";
	import { onMount } from "svelte";

	let username = "";
	let password = "";
	let name = "";
	let email = "";

	export let data;

	let wrong = false;
	let wrongMessage = "";
	let passwordBool = false;
	let usernameBool = false
	let loading = false

	function enterQuery(event) {
		if (event.key == "Enter") {
			submit();
		}

		if (password.length != 0) {
			passwordChecker(password);
		}
	}

	function usernameChecker() {
		const usernameRegex = /^(?!\s)[a-zA-Z\d{._}]{1,17}$/

		if (!usernameRegex.test(username)) {
			usernameBool = true;
			return;
		}
		usernameBool = false;
	}

	function passwordChecker(password) {
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{6,}$/;

		if (regex.test(password)) {
			wrong=false
			passwordBool = false;
			return;
		}

		wrong = true;
		passwordBool = true;
		wrongMessage = "Password did not pass the test";
	}

	const submit = async () => {
		if (
			passwordBool ||
			usernameBool ||
			email.length == 0 ||
			name.length == 0 ||
			name.length > 10
		) {
			return;
		}
		loading = true
		const response = await fetch("/api/signUp", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
				name: name,
			}),
		});

		// (response);

		if (response.ok) {
			window.location = "/";
		}

		if (response.status == 401) {
			wrongMessage =
				"That email/username is already in use. Please try again";
			wrong = true;
			loading = false
			// (wrong);
		}
	};
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<svelte:window on:keyup={enterQuery} />

<body>
	<Nav username={data.username} />
	<div id="loginForm">
		<h1>Sign Up</h1>
		<div id="inputHolder">
			<input
				type="email"
				id="userInput"
				placeholder="email"
				bind:value={email}
			/>
		</div>
		<div id="inputHolder">
			<input
				type="text"
				id="userInput"
				placeholder="username"
				bind:value={username}
				on:input={usernameChecker}
			/>
		</div>

		<div id="passwordInfo">
			<h2>Username Rules:</h2>
			<li>1-17 characters</li>
			<li>Alpha-numeric</li>
			<li>Can contain DOT and UNDERSCORE</li>
		</div>
		{#if usernameBool}
			<h2 id="incorrect">
				Username did not pass the test
			</h2>
		{/if}
		<div id="inputHolder">
			<input
				type="text"
				id="userInput"
				placeholder="name (max length 10)"
				bind:value={name}
			/>
		</div>
		<div id="inputHolder" class="password">
			<input
				type="password"
				id="userInput"
				placeholder="password"
				on:input={passwordChecker}
				bind:value={password}
			/>
		</div>
		<div id="passwordInfo">
			<h2>Password must contain:</h2>
			<li>One upper and lower case character</li>
			<li>One of these special character (#, @, $, !, %, *, ?, &)</li>
			<li>One number</li>
			<li>Be between 6-50 characters</li>
		</div>
		{#if wrong == true}
			<h2 id="incorrect">
				{wrongMessage}
			</h2>
		{/if}
		<button on:click={submit} id="loginButton">{loading === true ? "Loading..." : "Sign Up"}</button>
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
		font-family: New-Inter;
		font-weight: 300;
	}

	@media (max-width: 460px) {
		#loginForm {
			width: 325px !important;
		}
	}

	#userInput {
		/* width: 264px; */
		width: 87.5%;
		height: 40px;
		margin-left: 19px;
		background: #212121;
		color: white;
		text-align: left;
	}

	#passwordInfo {
		margin-top: 10px;
	}

	#passwordInfo h2 {
		color: white;
	}

	h2 {
		font-size: 25px;
		margin-bottom: 10px;
		font-weight: 700;
		padding: 10px;
		margin-bottom: -5px;
	}

	li {
		color: white;
		text-align: left;
		margin-left: 40px;
		/* padding-left: 20px; */
		padding-right: 20px;
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

	/* .password {
		margin-top: 50px;
	} */

	h1 {
		font-size: 1.75em;
		font-weight: 800;
		padding-top: 20px;
		padding-bottom: 20px;
		color: white;
	}

	#incorrect {
		margin-top: 10px;
		color: red;
		/* display: none; */
	}

	#loginForm {
		margin: 0 auto;
		background: #1b1b1b;
		width: 400px;
		min-height: 680px;
		padding-bottom: 20px;
		margin-bottom: 30px;
		border-radius: 15px;
		margin-top: 15vh;
	}

	input {
		margin: 0 auto;
		line-height: 16px;
	}

	#loginButton {
		margin: 0 auto;
		margin-top: 20px;
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
