<script>
	import { onMount } from "svelte";
	import Nav from "../nav/+page.svelte";

	import Content from './components/content/+page.svelte';
  import Modal from 'svelte-simple-modal';
	import New from './components/new/+page.svelte';


	export let data;

	let users = [];
	let value = [];
	let container;
	let div;

	let monthNum;
	let yearNum;

	const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
	const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
	const moodColours = ["rgb(255, 0, 0)", "rgb(255, 136, 0)", "rgb(0, 153, 255)", "rgb(67, 211, 0)", "rgb(0, 100, 0)"]
	const moods = [":(", ":/", ":|", ":)", ":D"]
	function checkMoods() {
		let arr = []
		for (let i of data.data) {
			const date = new Date(i.created_at)
			if (date.getMonth() == monthNum) {
				i.newDate = date.getDate()
				arr.push(i)	
			}
		}
		return arr
	}

	function date() {
		div.svelteHTML = '<svelte:component this={Modal}/>'
		const res = checkMoods()
		
		container.innerHTML = '';

		for (let i = 0; i < days.length; i++) {
			const day = document.createElement('h2');
			day.style.color = "white"
			day.style.fontSize = "25px";
			day.innerHTML = days[i]
			container.appendChild(day)
		}

		var month = monthNum 
		var year = yearNum

		const dt = new Date(year, month, 1); 

		var first_day = dt.getDay(); 
		if(first_day == 0) {
			first_day = 7
		}

		dt.setMonth(month + 1, 0);
		var last_date = dt.getDate();


		for (let i = 0; i < first_day - 1; i++) {
			const emptyDiv = document.createElement('div');
			emptyDiv.setAttribute("id", "emptyBox");
			container.appendChild(emptyDiv)
		}

		for (let i = 0; i < last_date; i++) {
			const box = document.createElement('div');
			box.setAttribute("id", "box");
			box.style.width = "73px"
			box.style.outline = "1px solid rgb(77, 77, 77)"
			box.innerHTML = `<h4 style="margin-top: 20px; left: 0; color:white">${i+1}</h4>`

			const data = res.find(
			(user) => user.newDate === i);

			if (data != undefined) {
				// box.style.backgroundColor = moodColours[data.mood]
				box.innerHTML = `<New/>`
				console.log(box.innerHTML)
			}
			container.appendChild(box)
		}
	}
	onMount(() => {
		monthNum = new Date().getMonth(); 
		yearNum = new Date().getFullYear();
		date()
	})
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
				<button on:click={() => {
					monthNum-=1
					
					if (monthNum == -1) {
						monthNum = 11
						yearNum -= 1
					}
					date()
				}}> 
					<h2>&#10094;</h2>
				</button>
			<div bind:this={div}>
			</div>
			
			<div id="monthTextHolder">
				<h1>{months[monthNum]}</h1>
			</div>
		
			<button on:click={() => {
				monthNum += 1
				

				if (monthNum == 12) {
						yearNum += 1
						monthNum = 0
					}
				date()
			}}> 
				<h2 id="right">&#10095;</h2>
			</button>
			</div>
			
			<div id="month" bind:this={container}>
				<h2>MON</h2>
				<h2>TUE</h2>
				<h2>WED</h2>
				<h2>THU</h2>
				<h2>FRI</h2>
				<h2>SAT</h2>
				<h2>SUN</h2>
			</div>
		</div>
	</div>
</body>

<style>
	@font-face {
		font-family: "New-Inter";
		src: url("/fonts/Inter.ttf");
	}

	body {
		margin: 0;
		padding: 0;
		border: 0;
		height: auto;
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
		gap: 10%;
		margin: 0 auto;
	}

	h2 {
		color: white;
		font-size: 25px;
		width: auto;
	}

	h5 {
		color: white;
		font-size: 25px;
		width: auto;
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

	#dates {
		width: 100%;
		height: 100%;
	}

	#month * {
		/* padding: 20px; */
		/* font-size: 30px; */
		text-align: center;
		width: 70px;
	}

	#month {
		/* margin-top: 25px; */
		height: 500px;
		display: grid;
		grid-template-rows: 60px 70px 70px 70px 70px 70px 70px;
		grid-template-columns: auto auto auto auto auto auto auto;
		row-gap: 0px;
		column-gap: -10px;
		padding: 40px;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 600;
		color: white;
	}

	h2 {
		font-size: 2.5rem;
		font-weight: 600;
		color: white;
		margin-left: -10px;
		/* margin-top: 20px; */
	}

	#all {
		width: 100vw;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 150;
	}

	#container {
		background: #1b1b1b;
		width: 600px;
		height: 80vh;
		/* display: inline-block; */
		overflow: hidden;
		border-radius: 20px;
		z-index: 0;
		margin-top: 3vh;
		padding: 0;
	}
</style>

<!-- <script>
  
</script>

<Modal><Content /></Modal> -->