<script>
  let username
  let name
  let password
  let email
  async function send() {
    const response = await fetch("/api/signUp", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
        name: name,
				password: password,
        email: email
			}),
		});
  }
</script>

<input bind:value={email}>
<input bind:value={password}>
<input bind:value={name}>
<input bind:value={username}>
<button on:click={send}>Here</button>