<script>
	// import Nav from "../../components/nav.svelte";
	import { onMount } from "svelte";
	import Nav from '../nav/+page.svelte'
	let username = "";
	let password = "";
	let wrong = false;

	function enterQuery(event) {
		if (event.key == "Enter") {
			submit();
		}
		wrong = false
	}

	// function wrongDetails() {
	// 	const uId = document.getElementsByClassName("username")[0]
	// 	const pId = document.getElementsByClassName("password")[0]

	// 	uId.style.border = "2px solid red"
	// 	pId.style.border = "2px solid red"

	// 	uId.classList.add("hello")
	// 	console.log(uId.classList)
	// }

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
		}
	};
</script>

<svelte:window on:keyup={enterQuery} />

<body>
	<Nav />
	<div id="loginForm">
		<h1>Login</h1>
		<div id="inputHolder" class:shake1={wrong}>
			<input
				type="username"
				id="userInput"
				placeholder="username"
				bind:value={username}
			/>
		</div>
		<div id="inputHolder" class:shake1={wrong}>
			<input
				type="password"
				id="userInput"
				placeholder="password"
				bind:value={password}
			/>
		</div>

		<button on:click={submit} id="loginButton">Login</button>
		<a href="/signup">
			<p>Sign up here</p>
		</a>
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

	.shake1 {
		border: 2px solid red;
		animation: shake2 0.2s linear;
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

	.wrong {
		
	}

	p {
		/* position: absolute;
		top: 90%;
		left: 0;
		right: 0;

		margin-left: 0 auto;
		margin-right: 0 auto; */

		margin-top: 20px;
		color: rgb(255, 255, 255);
		font-size: 30px;
		font-weight: 700;
		transition: all 0.2s linear;
	}

	p:hover {
		color: rgb(127, 127, 127);
	}

	#userInput {
		/* width: 264px; */
		width: 87.5%;
		height: 36px;
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
		/* position: absolute;
		top: 0vw; */
		margin-top: 20px;
		color: white;
		/* display: none; */
	}

	#loginForm {
		margin: 0 auto;
		background: #1b1b1b;
		width: 400px;
		height: 350px;
		border-radius: 15px;
		margin-top: 20vh;
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
