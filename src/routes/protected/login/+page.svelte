<script>
	let username;
	let password;

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
			window.location = '/protected'
		}
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
