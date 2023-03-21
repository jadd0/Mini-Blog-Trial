<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	export let username;

	let homeSrc = "/homeHollow.png";
	let searchSrc = "/searchHollow.png";
	let newSrc = "/pencilHollow.png";
	let userSrc = "/userHollow.png";

	if (username == "") {
		username = undefined;
	}

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
		const response = await fetch("/api/logout");
		if (response.ok) {
			location.reload();
		}
	};

	function changeImage() {
		const url = $page.url.pathname;

		switch (url) {
			case "/":
				homeSrc = "/home.png";
				break;
			case "/search":
				searchSrc = "/search.png";
				break;
			case "/newpost":
				newSrc = "pencil.png";
				break;
			case `/@${username}`:
				userSrc = "user.png";
				break;
		}

		const brokenUrl = url.split("/");
		if (brokenUrl[1] == `@${username}`) {
			userSrc = "/user.png";
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

<div id="navbarMobile">
	{#if username != undefined}
		<a href="/">
			<div class="nav1 home" id="home">
				<img src={homeSrc} alt="" class="icon home" />
			</div>
		</a>
		<a href="/search">
			<div class="nav1 search" id="search">
				<img src={searchSrc} alt="" class="icon search" />
			</div>
		</a>
		<a href="/newpost">
			<div class="nav1 newpost" id="newpost">
				<img src={newSrc} alt="" class="icon new" />
			</div>
		</a>

		<a href="/@{username}">
			<div class="nav1 user" id="user">
				<img src={userSrc} alt="" class="icon user" />
			</div>
		</a>
		{:else}
		<div id="loginSignupHolder">
			<a href="/login">
			<div class="nav1 login" id="login">
				<h2>Login</h2>
			</div>
		</a>
		<a href="/signup">
			<div class="nav1 signup" id="signup">
				<h2>Signup</h2>
			</div>
		</a>
		</div>
		
	{/if}
</div>

<style>
	@font-face {
		font-family: "Jakarta";
		src: url("/fonts/Jakarta.ttf");
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
		font-family: "Jakarta";
		letter-spacing: -0px !important;
		font-weight: 600;
	}

	a {
		text-decoration: none;
	}

	#loginSignupHolder {
		height: 80%;
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 30px;
	}

	h2 {
		color: white;
		font-size: 30px;
	}

	#space {
		height: 60px;
		width: 100vw;
		background: none;
	}

	@media (min-width: 900px) {
		#navbarMobile {
			display: none !important;
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
	}

	#underNav {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 60px;
		z-index: 150;
		backdrop-filter: blur(17px);
	}

	#navbar div {
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
		height: 85px;
		position: fixed;
		bottom: 0;
		background: #141414;
		z-index: 400;
		border-top: 1px solid #585858;
		display: flex;
	}

	.nav1 {
		width: 25vw;
		height: 70%;
		margin-top: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon {
		width: 5.75vw;
		max-width: 30px;
	}
</style>