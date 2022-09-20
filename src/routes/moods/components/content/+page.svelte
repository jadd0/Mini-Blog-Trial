<script>
	import { getContext } from "svelte";
	import Popup from "../popup/+page.svelte";
	export let data;
	let message = data.message;

	// export let data;

	const moodColours = [
		"rgb(255, 0, 0)",
		"rgb(255, 136, 0)",
		"rgb(0, 153, 255)",
		"rgb(67, 211, 0)",
		"rgb(0, 100, 0)",
	];
	const moods = [":(", ":/", ":|", ":)", ":D"];

	const { open } = getContext("simple-modal");
	const showSurprise = () => open(Popup, { message });
</script>

<button on:click={showSurprise} style="background: none">
	<div id="circle" style="background: {moodColours[data.mood]}">
		<h2 style="color: white">{moods[data.mood]}</h2>
	</div>
	</button>

<style>
	button {
		width: 100% !important;
		height: 70px;
		padding: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		/* margin-left: -1px; */
		/* outline: 1px solid rgb(77, 77, 77); */
	}

	h2 {
		color: white;
		font-size: 22px;
		text-align: center;
		/* width: auto; */
	}

	#circle {
		width: 9vw;
    max-width: 69px;
		height: 9vw;
    max-height: 69px;
		border-radius: 60px;
		background: white;
    display: flex;
    justify-content: center;
    align-items: center;
	}
</style>
