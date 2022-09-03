<script>
  import { onMount } from 'svelte'
  let data = []

  onMount(async() => {
		const res = await fetch("/api/getPost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
    data = await res.json()
		console.log(data)
  })

</script>

<body>
  
  <div>
  {#each data as d}
  <a href='/post/{d.id}'>{d.title}</a>
  {/each}
</div>
</body>



<style>
  @font-face {
    font-family: 'New-Inter';
    src: url('/fonts/Inter.ttf');
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
