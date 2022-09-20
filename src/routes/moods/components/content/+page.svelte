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

<button on:click={showSurprise} style="background: {moodColours[data.mood]}"
	><h2>{moods[data.mood]}</h2></button
>

<style>
	button {
		width: 76px !important;
		height: 70px;
		padding: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		/* margin-left: -1px; */
		outline: 1px solid rgb(77, 77, 77);
	}

	h2 {
		color: white;
		font-size: 25px;
		text-align: center;
		/* width: auto; */
	}
</style>
