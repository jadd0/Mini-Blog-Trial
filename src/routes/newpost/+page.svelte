<script>
	let title;
	let body;
	let description;
	let username;
	let data = [];

	const submit = async () => {
		const data = {
			title: title,
			body: body,
			description: description,
			username: username
		};

		const response = await fetch("/api/createPost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		// console.log(await response.json());
	};
	const submitTWO = async () => {
		const res = await fetch("/api/getPost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		data = await res.json();
		console.log(data);
	};
</script>

<body>
	<input bind:value={title} />
	<input bind:value={description} />
	<input bind:value={body} />
	<input bind:value={username} />

	<button on:click={submit}>SEND</button>
	<button on:click={submitTWO}>GET</button>
</body>

<style>
	@font-face {
		font-family: "New-Inter";
		src: url("/fonts/Inter.ttf");
	}

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
		/* font-family: New-Inter; */
		font-family: New-Inter;
		/* font-weight: 500;

		font-variation-settings: 'wght' 500; */

		letter-spacing: -2px;

		/* font-family: "fenix";
		font-weight: 500; */
	}

	p {
		font-weight: 250 !important;
	}
</style>
