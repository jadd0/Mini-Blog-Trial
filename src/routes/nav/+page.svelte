<script>
	export let username;

	if (username == '') {
		username = undefined
	}

	// console.log(username);
	function b() {
		const nav = document.getElementById("navbar");
		if (nav.offsetTop >= 80) {
			document.getElementById("navbar").style.backgroundColor = "#1b1b1b";
		} else {
			document.getElementById("navbar").style.backgroundColor = "#141414";
		}
	}
	function h() {
		// console.log("hello");
	}
</script>

<div id="navbar">
	{#if username == undefined}
		<a href="/login" id="other">
			<div class="nav" id="home">Login</div>
		</a>
	{/if}
	{#if username != undefined}
		<a href="/search" id="other">
			<div class="nav" id="home">Search</div>
		</a>
		<a href="/newpost" id="other">
			<div class="nav" id="home">New Post</div>
		</a>
		<a href="/@{username}" id="other">
			<div class="nav" id="home">@{username}</div>
		</a>
	{/if}

	<a href="/" id="other">
		<div class="nav" id="home">Home</div>
	</a>
	<div />
</div>

<svelte:window on:scroll={b} />

<div id="navbarMobile">
	<section class="p-menu1">
		<nav id="navbarMobileNav" class="navigation" role="navigation">
			<input id="toggle1" type="checkbox" />
			<label class="hamburger1" for="toggle1">
				<div class="top" />
				<div class="meat" />
				<div class="bottom" />
			</label>
			{#if username == undefined}
				<nav class="menu1">
					<a href="/">Home</a>

					<a href="/login">Login</a>

					<!-- <div id="big"></div> -->
				</nav>
			{/if}
			{#if username != undefined}
				<nav class="menu2">
					<a href="/">Home</a>
					<a href="/@{username}"
						>@{username}</a>
					<a href="/newpost">New Post</a>
					<a href="/search">Search</a>
					
				</nav>
			{/if}
		</nav>
	</section>
</div>

<div id="lines">
	<div class="line" id="line1" />
	<div class="line not" id="line2" />
	<div class="line not" id="line3" />
</div>

<style>
	@font-face {
		font-family: "New-Inter";
		src: url("/fonts/Inter.ttf");
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
		font-family: "New-Inter";
		font-weight: 600;
	}

	body {
		height: 1000vh;
	}

	@media (min-width: 900px) {
		#navbarMobile {
			display: none;
		}
	}
	@media (max-width: 900px) {
		#navbar {
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
		z-index: 200;
	}

	#navbar div {
		/* min-width: 10%; */
		padding: 0 30px 0 0px;
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

	/* Hamburger */
	.hamburger1 {
		height: 45px;
		margin: 10px;
		display: -ms-grid;
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		justify-items: center;
		z-index: 120;
	}

	.hamburger1 div {
		background-color: rgb(255, 255, 255);
		position: relative;
		width: 40px;
		height: 5px;
		margin-top: 7px;
		-webkit-transition: all 0.2s ease-in-out;
		transition: all 0.2s ease-in-out;
	}

	#toggle1 {
		display: none;
	}

	#toggle1:checked + .hamburger1 .top {
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		margin-top: 22.5px;
	}

	#toggle1:checked + .hamburger1 .meat {
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
		margin-top: -5px;
	}

	#toggle1:checked + .hamburger1 .bottom {
		-webkit-transform: scale(0);
		transform: scale(0);
	}

	#toggle1:checked ~ .menu1 {
		min-height: 100px;
		overflow: hidden;
		/* min-height: 15vh; */
		/* height: auto; */
		/* margin-bottom: -200px; */
	}

	#toggle1:checked ~ .menu2 {
		min-height: 210px;
		overflow: hidden;
		/* min-height: 15vh; */
		/* height: auto; */
		/* margin-bottom: -200px; */
	}

	#small {
		width: 100vw;
		height: 100px;
	}

	#big {
		padding-bottom: 100px !important;
	}

	/* Menu */
	.menu1, .menu2 {
		width: 100%;
		margin: 0;
		display: -ms-grid;
		display: grid;
		grid-template-rows: 1fr repeat(8, 0.5fr);
		grid-row-gap: 25px;
		padding: 0;
		list-style: none;
		clear: both;
		width: auto;
		text-align: center;
		height: 0px;
		overflow: auto;
		transition: height 0.4s ease;
		z-index: 120;
		-webkit-transition: all 0.3s ease;
		transition: all 0.3s ease;
	}

	.menu1 a:first-child, .menu2 a:first-child {
		margin-top: 10px;
	}

	.menu1 a, .menu2 a {
		color: white;
		font-weight: bold;
		text-decoration: none;
	}

	.menu1 a:last-child {
		/* padding-bottom: 80px; */
	}
</style>
