<script>
	import { onMount } from "svelte";
	import Nav from "../__nav/+page.svelte";

	import Content from "./components/content/+page.svelte";
	import Modal from "svelte-simple-modal";

	export let data;
	

	let users = [];
	let value = [];
	let container;
	let div;

	let boxes = [];
	let emptys = [];

	let monthNum;
	let yearNum;

	const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
	const months = [
		"JANUARY",
		"FEBRUARY",
		"MARCH",
		"APRIL",
		"MAY",
		"JUNE",
		"JULY",
		"AUGUST",
		"SEPTEMBER",
		"OCTOBER",
		"NOVEMBER",
		"DECEMBER",
	];

	function padTo2Digits(num) {
		return num.toString().padStart(2, "0");
	}

	function getDate(day, month, year) {
		const date = new Date(year, month, day);

		const newDay = padTo2Digits(date.getDate());
		const newMonth = padTo2Digits(date.getMonth() + 1);
		const newYear = padTo2Digits(date.getFullYear());

		const newDate = `${newYear}-${newMonth}-${newDay}`;
		return newDate;
	}

	function checkMoods() {
		let arr = [];
		for (let i of data.data) {
			const date = new Date(i.created_at);
			if (date.getMonth() == monthNum) {
				i.newDate = date.getDate();
				arr.push(i);
			}
		}
		return arr;
	}

	function date() {
		const res = checkMoods();
		boxes = [];
		emptys = [];

		let month = monthNum;
		let year = yearNum;

		const dt = new Date(year, month, 1);

		let firstDay = dt.getDay();
		if (firstDay == 0) {
			firstDay = 7;
		}

		dt.setMonth(month + 1, 0);
		let lastDate = dt.getDate();

		for (let i = 0; i < firstDay - 1; i++) {
			emptys.push(0);
		}
		emptys = emptys;
		for (let i = 0; i < lastDate; i++) {

			let box = 0;
			const data = res.find((user) => user.date === getDate(i+1, monthNum, yearNum));

			if (data != undefined) {
				box = {
					mood: data.mood,
					message: data.text,
				};
			}
			boxes.push(box);
		}
		boxes = boxes;
	}

	monthNum = new Date().getMonth();
	yearNum = new Date().getFullYear();
	date();
</script>

<svelte:head>
	<title>Search</title>
</svelte:head>

<body>
	<Nav username={data.username} />
	<div id="all">
		<!-- <Modal><Content message={"test"}/></Modal> -->
		<div id="container">
			<div id="monthHolder">
				<button
					on:click={() => {
						monthNum -= 1;

						if (monthNum == -1) {
							monthNum = 11;
							yearNum -= 1;
						}
						date();
					}}
				>
					<h2>&#10094;</h2>
				</button>
				<div bind:this={div} />

				<div id="monthTextHolder">
					<h1>{months[monthNum]}</h1>
				</div>

				<button
					on:click={() => {
						monthNum += 1;

						if (monthNum == 12) {
							yearNum += 1;
							monthNum = 0;
						}
						date();
					}}
				>
					<h2 id="right">&#10095;</h2>
				</button>
			</div>

			<h2>{yearNum}</h2>

			<div id="month" bind:this={container}>
				<!-- <div id="box"> -->
				<h3>MON</h3>
				<h3>TUE</h3>
				<h3>WED</h3>
				<h3>THU</h3>
				<h3>FRI</h3>
				<h3>SAT</h3>
				<h3>SUN</h3>
				{#each emptys as empty}
					<div id="empty" />
				{/each}
				{#each boxes as box, b}
					{#if box != 0}
						<Modal
							style="cursor: pointer;"
							styleWindow={{
								backgroundColor: "#1b1b1b",
								color: "white",
							}}><Content data={box} /></Modal
						>
					{:else}
						<div id="box"><h2>{b + 1}</h2></div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</body>

<!-- <script>
  
</script>

<Modal><Content /></Modal> -->
<style>
	@font-face {
		font-family: "New-Inter";
		src: url("/fonts/Inter.ttf");
	}

	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		/* height: 1000vh; */
		width: 100vw;
		background-color: #141414;
		overflow-x: hidden;
	}

	* {
		font-size: 24px;
		text-align: center;
		color: black;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: New-Inter;
		letter-spacing: -1px !important;
	}

	#box {
		/* width: 76px !important; */
		padding: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* outline: 1px solid rgb(77, 77, 77); */
	}

	#right {
		margin-left: 0px;
	}

	#monthTextHolder {
		width: 50%;
		margin-top: 20px;
	}

	#monthHolder {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		width: 90%;
		/* gap: 10%; */
		margin: 0 auto;
	}

	h2 {
		color: white;
		font-size: 25px;
		text-align: center;
		/* width: auto; */
	}

	button {
		width: 60px;
		height: 60px;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 40px;
		border-radius: 100px;
		background: none;
		transition: all 0.2s linear;
		cursor: pointer;
	}

	button:hover {
		background: #353535;
	}

	#month {
		/* margin-top: 25px; */
		margin: 0 auto;
		height: 500px;
		display: grid;
		grid-template-rows: 5vh 70px 70px 70px 70px 70px 70px 70px 70px 70px;
		grid-template-columns: 14.4% 14.4% 14.4% 14.4% 14.4% 14.4% 14.4%;
		/* row-gap: -10px; */
		padding: 35px;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 600;
		color: white;
	}

	h2,
	h3 {
		font-size: 25px;
		font-weight: 600;
		color: white;
	}

	#all {
		padding-bottom: 60px;
		width: 100vw;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -10;
	}

	@media (max-width: 650px) {
		#container {
			width: 90vw !important;
		}

		h1 {
			font-size: 5.5vw;
		}

		h2 {
			font-size: 5vw;
		}

		h3 {
			font-size: 4vw;
		}
	}

	#container {
		background: #1b1b1b;
		width: 600px;
		height: auto;
		/* display: inline-block; */
		overflow: hidden;
		border-radius: 20px;
		z-index: 0;
		margin-top: 3vh;
		padding: 0;
	}
</style>
