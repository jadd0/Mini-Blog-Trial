<script>
	import { onMount } from 'svelte';

	let sx = 0;
	let sy = 0;

	let dx = sx;
	let dy = sy;

	function render() {
		dx = lerp(dx, sx, 0.03);
		dy = lerp(dy, sy, 0.03);

		dx = Math.floor(dx * 100) / 100;
		dy = Math.floor(dy * 100) / 100;

		requestAnimationFrame(render);
	}

	function lerp(a, b, n) {
		return (1 - n) * a + n * b;
	}

	onMount(() => {
		requestAnimationFrame(render);
	});
</script>

<svelte:window bind:scrollY={sy} bind:scrollX={sx} />

<main style="transform: translate(-{dx}px, -{dy}px); z-index: 0;">
	<slot />
</main>