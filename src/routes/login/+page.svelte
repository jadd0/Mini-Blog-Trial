<script>
	// import Nav from "../../components/nav.svelte";
	import { onMount } from "svelte";

	let username = "";
	let password = "";
	let wrong = false;

	function enterQuery(event) {
		if (event.key == "Enter") {
			submit()
		}
	}

	const submit = async () => {
		const response = await fetch("/api/login", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		console.log(response);

		if (response.ok) {
			window.location = "/newpost";
		}

		if (response.ok == false) {
			wrong = true;
			console.log(wrong);
		}
	};
</script>

<svelte:window on:keyup={enterQuery} />

<body>
	<!-- <Nav /> -->
	<div id="loginForm">
		<h1>Login</h1>
		<div id="inputHolder">
			<input
				type="username"
				id="userInput"
				placeholder="username"
				bind:value={username}
			/>
		</div>
		<div id="inputHolder">
			<input
				type="password"
				id="userInput"
				placeholder="password"
				bind:value={password}
			/>
		</div>

		<button on:click={submit} id="loginButton">Login</button>
		{#if wrong == true}
			<h2 id="incorrect">
				Your email/password is incorrect. Please try again
			</h2>
		{/if}
	</div>
</body>

<style>
	body {
		margin: 0;
		padding: 0;
		border: 0;
		height: 1000vh;
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
		width: 80%;
		height: 40px;
		margin-left: 19px;
		background: #212121;
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
		font-weight: 800;
		padding-top: 20px;
		padding-bottom: 20px;
		color: white;
	}

	#incorrect {
		margin-top: 20px;
		color: white;
		/* display: none; */
	}

	#loginForm {
		margin: 0 auto;
		background: #1b1b1b;
		width: 400px;
		height: 400px;
		border-radius: 15px;
		margin-top: 20vh;
	}

	input {
		margin: 0 auto;
		line-height: 16px;
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
	}
</style>
