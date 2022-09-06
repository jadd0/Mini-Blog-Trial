<script>
	// import Nav from "../../components/nav.svelte";
	import { onMount } from "svelte";

	let username = "";
	let password = "";

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
		
		if (response.ok) {
			window.location = '/newpost'
		}
	};
</script>

<body>
	<!-- <Nav /> -->
	<div id="loginForm">
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
		<h1 id="incorrect">
			Your email/password is incorrect. Please try again
		</h1>
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
		/* font-family: "fenix";
		font-weight: 500; */
	}

	h1 {
		color: black;
		display: none;
	}

	#loginForm {
		margin: 0 auto;
		border: 2px solid black;
		background: white;
		width: 400px;
		height: 400px;
		border-radius: 15px;
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
