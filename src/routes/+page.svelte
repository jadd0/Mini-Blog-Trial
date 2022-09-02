<script>
  let title;
  let body;
  let description;
  let data =[];

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
		const res = await fetch("/api/getPost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
    data = await res.json()
		console.log(data)
	};
</script>
<input bind:value={title}>
<input bind:value={body}>
<input bind:value={description}>

<button on:click={submit}>SEND</button>
<button on:click={submitTWO}>GET</button>
<div>
  {#each data as d}
    <h1>{d.title}</h1>
  {/each}
</div>

