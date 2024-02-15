<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
	import Marquee from './marquee.svelte'
</script>

<SvelteInertiaScroll>
	<body>
		<div class="hero">
			<Marquee>Hello</Marquee>
		</div>
	</body>
</SvelteInertiaScroll>

<style>
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
</style>
