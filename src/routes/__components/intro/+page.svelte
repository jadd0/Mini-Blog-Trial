<script lang="ts">
  export let finished = false;
  import { onMount } from 'svelte';

	let greeting = 'Hello';

	let iteration = 0;

	const greetings = [
		'Hello', // English
		'Hola', // Spanish
		'Bonjour', // French
		'Hallo', // German
		'Ciao', // Italian
		'Olá', // Portuguese
		'Привет', // Russian
		'こんにちは', // Japanese (Konnichiwa)
		'안녕하세요', // Korean (Annyeonghaseyo)
		'你好', // Chinese (Nǐ hǎo)
		'Merhaba', // Turkish
		'नमस्ते', // Hindi (Namaste)
		'Salam', // Arabic
		'Hej', // Swedish
		'Hallo', // Dutch
		'Selam', // Persian
		'Zdravstvuyte', // Ukrainian
		'Kamusta', // Filipino
		'Hi.'
	];
	// 18

	function setT(i: number, time: number) {
		setTimeout(() => {
			greeting = greetings[i];
		}, time);
	}

	onMount(() => {
		const times = [500, 400, 300, 250, 200, 200, 250, 300, 350, 400, 450, 500]; 
		// Gradual decrease towards the middle, then increase
		let totalTime = 0;

		for (let i = 0; i < greetings.length; i++) {
			let time = times[Math.floor(i * times.length / greetings.length)]; // Interpolating the time pattern
			totalTime += time;
			setT(i, totalTime);
		}
		
		setTimeout(() => {
			iteration += 1;
			finished = true;
		}, totalTime + 2000); // Optional: marking finished after all greetings
		
	});
</script>

<main>
	<div class="content"><h1>{greeting}</h1></div>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		background: #212121;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
