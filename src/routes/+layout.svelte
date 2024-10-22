<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
	import { page } from '$app/stores';
	import Lenis from '@studio-freight/lenis';
	import { onMount } from 'svelte';

	onMount(() => {
		const lenis = new Lenis();

		lenis.on('scroll', (e) => {

		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});
</script>


	<slot />
	<div class="nav">
		<a href="/"><div class="box">Home</div></a>
		<a href="/contact"><div class="box" id="contact">Contact Me</div></a>
	</div>
	<footer>
	<div class="footerContent">
		<h6>Hey you...</h6>
		<div class="button">
			<a class="contactForm" href="/contact">
				<span class="innerButton">Contact me</span>
			</a>
		</div>
	</div>
	<span class="endName">Jadd Al-Khabbaz</span>
	<span class="endDate">2024</span>
</footer>




<style>
	.nav {
		width: 100vw;
		height: 60px;
		background: #141414;
		position: absolute;
		top: 0;
		z-index: 1000;
		display: flex;
		justify-content: right;
		align-items: center;
		gap: 30px;
	}

	@media only screen and (max-width:700px) {
		.box {
			display: none;
		}
	}

	.box {
		color: #d9d9d9;
		transition: all .25s linear;
	}

	.box:hover {
		color: #8b8b8b;
	}

	a {
		text-decoration: none;
	}

	#contact {
		margin-right: 30px;
	}


	footer {
		width: 100vw;
		height: 400px;
		position: relative;
		display: flex;
		justify-content: center;
	}

	.footerContent {
		width: 100vw;
		height: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 40px;
	}

	footer h6 {
		color: #141414;
		font-size: 60px;
	}

	.contactForm {
		display: block;
		position: relative;
		text-decoration: none;
		color: black;
		padding: 20px;
		border: 2px solid #141414;
		text-transform: uppercase;
		font-size: 16px;
		font-weight: bold;
		width: 270px;
		overflow: hidden;
		border-radius: 30px;
		margin-top: -130px;
	}

	.innerButton {
		z-index: 5;
		position: relative;
		transition: color 350ms ease-in-out;
		color: #141414;
	}

	.contactForm:hover .innerButton {
		color: white;
	}

	.contactForm::after,
	.contactForm::before {
		content: ' ';
		display: block;
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
		right: 0;
		background: #141414;
		z-index: -1;
	}

	.contactForm::before {
		transform: translateX(100%);
		z-index: 1;
	}

	.contactForm:hover::before {
		transform: translateX(100%);
		transition: transform 350ms ease-in-out;
	}

	.contactForm::after {
		z-index: 0;
		transform: translateX(-100%); /* Changed to slide in from the left */
		opacity: 0; /* Set initial opacity */
		transition: transform 350ms ease-in-out, opacity 350ms ease-in-out 350ms; /* Add transition delay to opacity */
	}

	.contactForm:hover::after {
		opacity: 1;
		transform: translateX(0);
		transition: transform 350ms ease-in-out, opacity 350ms ease-in-out; /* Adjust transition */
	}

	.endName {
		position: absolute;
		bottom: 50px;
		margin: 0 auto;
		color: #141414;
	}

	.endDate {
		position: absolute;
		bottom: 20px;
		margin: 0 auto;
		color: #141414;
		font-size: 15px;
	}
</style>

