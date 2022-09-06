<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	onMount(() => {
		b()
	// 	const color = "rgb(255, 112, 17)";
	// 	console.log("hello");
	// 	switch ($page.url.pathname) {
	// 		case "/about":
	// 			console.log("about");
	// 			// document.getElementById("line1").style.display = "block";
	// 			document.getElementById("about").style.color = color;
	// 			break;
	// 		case "/":
	// 			console.log("home");
	// 			document.getElementById("home").style.color = color;

	// 			break;
	// 		case "/login":
	// 			console.log("login");
	// 			document.getElementById("login").style.color = color;

	// 			break;
	// 	}
	});
	function b() {
		const nav = document.getElementById("navbar");
		if (nav.offsetTop >= 80) {
			document.getElementById("navbar").style.backgroundColor = "#1b1b1b";
		} else {
			document.getElementById("navbar").style.backgroundColor = "#141414";
		}
	}
</script>

	<div id="navbar">
		<a href="/" id="other">
			<div class="nav" id="home">Home</div>
		</a>
		<a href="/" id="other">
			<div class="nav" id="home">Search</div>
		</a>
		<div>
			<!-- <input /> -->

	</div>
</div>



<!-- <div id="lines">
	<div class="line" id="line1" />
	<div class="line not" id="line2" />
	<div class="line not" id="line3" />
</div> -->

<svelte:window on:scroll={b} />

<style>
	* {
		font-size: 24px;
		text-align: center;
		color: black;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: "inter";
		font-weight: 600;
		position: sticky;
		top: 0;
	}

	body {
		height: 1000vh;
	}

	@media (max-width: 1000px) {
		#other {
			display: none;
		}
	}

	#navbar {
		width: 100vw;
		height: 60px;
		padding: 0;
		background-color: #141414;
		position: sticky;
		top: 0;
		transition: all 0.4s 0.1s ease-in-out;
	}


	#navbar div {
		min-width: 10%;
		height: 100%;
		margin: 0 auto;
		text-align: center;
		vertical-align: middle;
		line-height: 60px;
		color: white;
		float: right;
	}

	#home {
		transition: all 0.5s ease-in-out;
	}

	#home:hover {
		color: rgb(153, 153, 153);
	}
</style>
