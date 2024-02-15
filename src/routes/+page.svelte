<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
	import Marquee from './marquee.svelte'
</script>

<SvelteInertiaScroll>
	<body>
		<div class="hero">
			<div class="marquee">
				<Marquee speed={20}>
				<h1>Jadd Al-Khabbaz</h1>
				<h1>Jadd Al-Khabbaz</h1>
				<h1>Jadd Al-Khabbaz</h1>
			</Marquee>
			</div>
			
		</div>
	</body>
</SvelteInertiaScroll>

<style>
	 @font-face {
  	font-family: 'circular';
  	src: url('/fonts/CircularStd-Medium.otf');
}

	body {
		margin: 0;
		padding: 0;
		width: 100vw;
		background: #121212;
    height: 10000vh;
	}

  .hero {
    width: 100vw;
    height: 100vh;
  }

	h1 {
		margin: 20px;
		font-size: 20vw;
		color: #d9d9d9;
		font-family: circular;
	}
</style>
