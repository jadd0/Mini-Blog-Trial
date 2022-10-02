<script>
	import { onMount } from "svelte";
	import { page } from '$app/stores';
	export let username;

	let homeSrc = '/homeHollow.png';
	let searchSrc = '/searchHollow.png';
	let newSrc = '/pencilHollow.png';
	let userSrc = '/userHollow.png';

	if (username == "") {
		username = undefined;
	}

	// (username);
	function b() {
		const nav = document.getElementById("navbar");
		const top = window.pageYOffset + nav.getBoundingClientRect().top;
		if (top >= 80) {
			document.getElementById("navbar").style.backgroundColor = "#212121";
		} else {
			document.getElementById("navbar").style.backgroundColor = "#141414";
		}
	}

	const logout = async () => {
		const response = await fetch("/api/logout", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			location.reload();
		}
	};

	function changeImage() {
		const url = $page.url.pathname

		switch(url) {
			case '/':
				homeSrc = '/home.png'
				break
			case '/search':
				searchSrc = '/search.png'
				break
			case '/newpost':
				newSrc = 'pencil.png'
				break
			case `/@${username}`:
				userSrc = 'user.png'
				break
		}

		const brokenUrl = url.split('/')
		if (brokenUrl[1] == `@${username}`) {
			userSrc = '/user.png'
		}
	}
	changeImage();
	onMount(() => {
		b();
		
	});
</script>

<div id="navbar">
	{#if username == undefined}
		<a href="/login" id="other">
			<div class="nav" id="home">Login</div>
		</a>
	{/if}
	{#if username != undefined}
		<a on:click={logout} id="other" style="cursor:pointer">
			<div class="nav" id="home">Logout</div>
		</a>
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
<div id="underNav" />
<div id="space" />

<svelte:window on:scroll={b} />

<!-- <div id="navbarMobile">
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
				</nav>
			{/if}
			{#if username != undefined}
				<nav class="menu2">
					<a href="/">Home</a>
					<a href="/@{username}">@{username}</a>
					<a href="/newpost">New Post</a>
					<a href="/search">Search</a>
					<a on:click={logout} style="cursor:pointer">Logout</a>
				</nav>
			{/if}
		</nav>
	</section>
</div> -->

<div id="navbarMobile">
	<a href="/">
		<div class="nav home" id="home">
			<img src={homeSrc} alt="" class="icon home" />
		</div>
	</a>
	<a href="/search">
		<div class="nav search" id="search">
			<img src={searchSrc} alt="" class="icon search" />
		</div>
	</a>
	<a href="/newpost">
		<div class="nav newpost" id="newpost">
			<img src={newSrc} alt="" class="icon new" />
		</div>
	</a>

	<a href="/@{username}">
		<div class="nav user" id="user">
			<img src={userSrc} alt="" class="icon user" />
		</div>
	</a>
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

	#space {
		height: 60px;
		width: 100vw;
		background: none;
	}

	@media (min-width: 900px) {
		#navbarMobile {
			display: none;
		}
	}
	@media (max-width: 900px) {
		#navbar,
		#underNav,
		#space {
			display: none;
		}
	}

	#navbar {
		width: 100vw;
		height: 60px;
		padding: 0;
		background-color: #141414;
		position: fixed;
		top: 0;
		transition: all 0.4s 0.1s ease-in-out;
		z-index: 200;
		overflow-x: hidden;
		opacity: 0.9;
		/* padding-bottom: 60px; */
		/* padding-bottom: 80px; */
	}

	#underNav {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 60px;
		z-index: 150;
		/* background-color: white; */
		/* margin-top: -60px; */
		backdrop-filter: blur(17px);
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
		color: #00dbdb;
	}

	#navbarMobile {
		width: 100vw;
		height: 70px;
		position: fixed;
		/* top:90vh; */
		bottom: 0;
		background: #141414;
		z-index: 400;
		border-top: 1px solid #585858;
		display: flex;
	}

	.nav {
		width: 25vw;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background: blue; */
	}

	.icon {
		width: 7.5vw;
		/* position: */
	}

	/* 
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
	}

	#toggle1:checked ~ .menu2 {
		min-height: 265px;
		overflow: hidden;
	}

	.menu1,
	.menu2 {
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

	.menu1 a:first-child,
	.menu2 a:first-child {
		margin-top: 10px;
	}

	.menu1 a,
	.menu2 a {
		color: white;
		font-weight: bold;
		text-decoration: none;
	} */
</style>
