<script>
	export let height;
	export let furthestScrolled;
  $: console.log(height ); 
	$: if (furthestScrolled >= height && !isTyping) {
		typing();
	}

	export let phrase = ''; 
	let typedChar = '';
	let index = 0;
	let typewriter; 

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
		height: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	
	}

	section {
		display: flex;
		flex-direction: column;
		width: 80%;
		min-height: 50vh;
		margin: 2% 0 1%;
		padding: 20px;
		box-shadow: 0 -8px 10px -6px #000000, 8px 0 10px -6px #000000;
		overflow: scroll;
	}

	p {
		font-size: 1.2rem;
		line-height: 150%;
    color: white;
    text-align:left;
	}
</style>
