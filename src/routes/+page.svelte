<script>
  let title;
  let body;
  let description;

  const submit = async () => {
    const data = {
      title: title,
      body: body,
      description: description
    }

		const response = await fetch("/api/createPost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
      body: JSON.stringify(data),
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
<input bind:value={title}>
<input bind:value={body}>
<input bind:value={description}>

<button on:click={submit}>SEND</button>
<button on:click={submitTWO}>GET</button>
