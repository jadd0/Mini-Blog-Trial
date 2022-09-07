<script>
	function b() {
		const nav = document.getElementById("navbar");
		if (nav.offsetTop >= 80) {
			document.getElementById("navbar").style.backgroundColor = "#1b1b1b";
		} else {
			document.getElementById("navbar").style.backgroundColor = "#141414";
		}
	}
	function h() {
		console.log("hello")
	}
</script>



<div id="navbar">
	<a href="/" id="other">
		<div class="nav" id="home">Home</div>
	</a>
	<a href="/user" id="other">
		<div class="nav" id="home">Search</div>
	</a>
	<a href="/newpost" id="other">
		<div class="nav" id="home">New Post</div>
	</a>
	<div>
	
	</div>
</div>

<svelte:window on:scroll={b} />

<div id="navbarMobile">
	<section class="p-menu1">
		<nav id="navbarMobileNav" class="navigation" role="navigation">
			<input id="toggle1" type="checkbox" />
			<label class="hamburger1" for="toggle1">
				<div class="top"></div>
				<div class="meat"></div>
				<div class="bottom"></div>
			</label>

			<nav class="menu1">
				<a href="/">Home</a>
				<a href="/user">Search</a>
				<a href="/newpost">New Post</a>
			</nav>
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
		min-height: 15vh;
	}

	/* Menu */
	.menu1 {
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

	.menu1 a:first-child {
		margin-top: 10px;
	}

	.menu1 a {
		color: white;
		font-weight: bold;
		text-decoration: none;
	}

	.menu1 a:last-child {
		padding-bottom: 80px;
	}
</style>
