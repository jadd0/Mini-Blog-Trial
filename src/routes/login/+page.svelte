<script>
	// import Nav from "../../components/nav.svelte";
	import { onMount } from "svelte";

	let username = "";
	let password = "";
	let wrong = false;

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

		console.log(response)
		
		if (response.ok) {
			window.location = '/newpost'
		}

		if (response.ok == false) {
			wrong = true
			console.log(wrong)
		}	
	};
</script>

<body>
	<!-- <Nav /> -->
	<div id="loginForm">
		<h1>Login</h1>
		<div class="inputDiv">
			<input
				type="username"
				id="email"
				placeholder="username"
				bind:value={username}
			/>
		</div>
		<div class="inputDiv">
			<input
				type="password"
				id="password"
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

<!-- <svelte:window on:scroll={b} /> -->
<style>
	/* @import url("https://rsms.me/inter/inter.css");
	* {
		font-family: "Inter", sans-serif;
		font-weight: regu;
	}
	@supports (font-variation-settings: normal) {
		* {
			font-family: "Inter var", sans-serif;
		}
	} */
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

	h1 {
		font-size: 1.75em;
		font-weight: 800;
		margin-top: 20px;
	}

	#incorrect {
		color: black;
		/* display: none; */
	}

	#loginForm {
		margin: 0 auto;
		border: 2px solid black;
		background: white;
		width: 400px;
		height: 400px;
		border-radius: 15px;
		margin-top: 20vh;
	}

	input {
		margin: 0 auto;
		line-height: 16px;
	}

	.inputDiv {
		margin: 0 auto;
		font-size: 17px;
		border: 1px solid #dddfe2;
		width: 364px;
		height: 50px;
		display: flex;
		margin-top: 20px;
	}

	.inputDiv:nth-child(1) {
		margin-top: 40px;
	}

	#loginButton {
		margin: 0 auto;
		margin-top: 40px;
		width: 364px;
		height: 50px;
	}
</style>
