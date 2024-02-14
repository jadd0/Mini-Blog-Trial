<script>
	import { SvelteInertiaScroll } from 'svelteinertiascroll';
</script>

<SvelteInertiaScroll>
	<body>
		<div class="hero" />
	</body>
</SvelteInertiaScroll>

<style>
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		background: #121212;
    height: 10000vh;
	}

  .hero {
    width: 100vw;
    height: 100vh;
    background: white;
  }
</style>
