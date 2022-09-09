<script>
	// import { onMount } from "svelte";
	import Page from "./nav/+page.svelte";
	import Nav from "./nav/+page.svelte";
	export let data = [];

	function date(isoDate) {
		const date = new Date(isoDate);
		const newDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;

		return newDate
	}

</script>

<body>
	<Nav username={data.username} />
	<div id="whole">
		<h1>Home</h1>
		{#each data.data as d1}
			{#each d1 as d}
				<a href="/post/{d.id}" id="hello">
					<div id="postContainer" class="postContainer">
						<h1>
							{d.title}
						</h1>
						<div id="descriptionHolder">
							<h2>{d.metadata.description}</h2>
							<a href="/@{d.a}">
								<h2 id="name">@{d.a}</h2>
							</a>
							<h2 id="date">
								{date(new Date(d.created_at))}
							</h2>
						</div>
					</div>
				</a>
			{/each}
		{/each}
	</div>
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
		/* overflow-x: hidden */
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
		letter-spacing: -1px !important;
	}

	#date {
		margin: 0 auto;
		font-weight: 600;
		color: rgb(136, 136, 136);
		font-size: 20px;
	}

	#name {
		font-size: 20px;
		color: rgb(159, 159, 159);
		overflow: hidden;
		margin-top: 5px;
	}

	#whole {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-bottom: 20px;
	}

	#postContainer {
		width: 50vw;
		/* min-height: 20vh; */
		padding-bottom: 20px;
		background: #212121;
		margin-top: 20px;
		border-radius: 10px;
		transition: all 0.2s linear;
	}

	#postContainer:hover {
		background: rgb(56, 56, 56);
	}

	@media (max-width: 800px) {
		#postContainer {
			width: 75vw;
		}
	}

	@media (max-width: 520px) {
		h1 {
			font-size: 10vw !important;
		}
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
		color: white;
		padding-top: 10px;
		text-align: left;
		margin-left: 5vw;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 500;
		color: white;
		text-align: left;
		/* text-overflow: ellipsis; */
		/* margin-left: 1vw; */
	}

	#descriptionHolder {
		width: 80%;
		margin: 0 auto;
		font-size: 1.5rem;
		margin-left: 5vw !important;
	}

	a {
		text-decoration: none;
	}
</style>
