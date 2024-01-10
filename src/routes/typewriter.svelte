<script>
	export let height;
	export let furthestScrolled;
  $: console.log(height ); 
	$: if (furthestScrolled >= height && !isTyping) {
		typing();
	}

	export let phrase = ''; // text to be typed
	let typedChar = '';
	let index = 0;
	// $: console.log(index);
	let typewriter; // for setInterval/clearInterval

	// Disable START button; prevent clicking twice
	let isTyping = false;

	const typeChar = () => {
		if (index < phrase.length) {
			isTyping = true;
			typedChar += phrase[index];
			index += 1;
		} else {
			return;
		}
	}

	const typing = () => (typewriter = setInterval(typeChar, 20));
</script>

<main>
	<section>
		<p>{typedChar}</p>
	</section>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	
	}

	section {
		display: flex;
		flex-direction: column;
		width: 80%;
		height: 800px;
		margin: 2% 0 1%;
		padding: 10px;
		box-shadow: 0 -8px 10px -6px #000000, 8px 0 10px -6px #000000;
		overflow: scroll;
	}

	p {
		font-size: 1.2rem;
		line-height: 150%;
    color: white;
	}

	form {
		width: 90%;
		display: flex;
		flex-direction: column;
	}

	input[type='text'] {
		padding: 10px;
		box-shadow: inset 0 1px 3px black;
	}

	button {
		font-size: 1.3rem;
		color: white;
		box-shadow: 0 1px 3px black;
		cursor: pointer;
	}

	button:active {
		box-shadow: inset 1px 0 3px black;
	}

	button#startBtn {
		background: hsla(72, 29%, 43%, 1);
	}

	button#stopBtn {
		background: hsla(0, 90%, 29%, 1);
	}

	button#startBtn:disabled {
		background: #ddd;
		cursor: auto;
		box-shadow: none;
	}
</style>
