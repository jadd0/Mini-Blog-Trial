<script>
	let username;
	let password;

	const submit = async () => {
		const rawResponse = await fetch("http://localhost:5173/api/login", {
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
	};
</script>

<body>
	<div>
		<input type="text" bind:value={username} />
		<input type="password" bind:value={password} />
		<button on:click={submit}>Submit</button>
	</div>
</body>

<style>
</style>
