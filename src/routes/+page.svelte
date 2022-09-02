<script>
  const submit = async () => {
		const response = await fetch("/api/createPost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		console.log(await response.json())
	};
  const submitTWO = async () => {
		const response = await fetch("/api/getPost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		console.log(await response.json())
	};
</script>

<button on:click={submit}>SEND</button>
<button on:click={submitTWO}>GET</button>
