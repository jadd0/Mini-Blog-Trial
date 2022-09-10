<script>
	import Nav from "../../nav/+page.svelte";
 	const month = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	export let data;

	console.log(data.comments)
	let commentBody = ''


	let comments = [
		{
			username: "jadd28",
			body: "fsdhfjoshdpuhfsdiuhdiuhfisudxguisdhguihfguihsuoghuidhguihdfgh  gfoup gurd giury gur ygi yrg yr7g y7rd gy79rdy g79d ryg7 yrg79dgr97 ",
			created_at: new Date(),
		},
	];

	const submit = async () => {
		const response = await fetch("/api/newComment", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: data.id,
				commentBody: commentBody
			}),
		});

		if (response.ok) {
			location.reload();
		}	
	};

	const date = new Date(data.returnData.created_at);
	const dateMonth = month[date.getMonth()];
	const dateDay = date.getDate();
	const dateYear = date.getFullYear();
</script>

<Nav username={data.username} />
<body>
	<div id="whole">
		<div id="container">
			<h1>{data.returnData.title}</h1>
			<h2>{dateMonth} {dateDay}, {dateYear}</h2>
			<a href="/@{data.returnData.a}">
				<h2 id="name">@{data.returnData.a}</h2>
			</a>
			<div id="pHolder">
				<p>{data.returnData.body}</p>
			</div>

			<div id="comments">
				<h3 id="commentHeader">Comments</h3>
				<div id="commentInputHolder">
					<div id="inputHolder">
						<textarea
							name="text"
							id="userInput"
							maxlength="200"
							placeholder="(0-200 chars)"
							bind:value={commentBody}
							oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
						/>
					</div>
					<button on:click={submit} id="postButton">Post</button>
				</div>
				<div id="commentBox">
					{#each data.comments as comment}
					<div id="commentHolder">
						<a href="/@{comment.username}">
							<h4>{comment.username}</h4>
						</a>
						<h5>{comment.body}</h5>
						<!-- <h5>{comment.created_at}</h5> -->
					</div>
						
					{/each}
				</div>
			</div>
		</div>
	</div></body>

<style>
	@font-face {
		font-family: "New-Inter";
		src: url("/fonts/Inter.ttf");
	}

	body {
		margin: 0;
		padding: 0;
		border: 0;
		height: 1000vh;
		width: 100vw;
		background-color: #141414;
		overflow-x: hidden;
	}

	* {
		text-align: left;
		font-size: 24px;
		text-align: center;
		color: black;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: New-Inter;
		font-weight: 300;
		letter-spacing: -1px !important;
	}

	#commentHolder {
		margin-top: 20px;
		width: 300px;
	}

	h4 {
		font-size: 32px;
		color: white;
		font-weight: 600;
		text-align: left;
	}

	h5 {
		font-size: 20px;
		color: white;
		font-weight: 400;
		text-align: left;
		word-break: break-all;
	}

	#postButton {
		margin: 0 auto;
		margin-top: 10px;
		margin-left: -20vw;
		width: 60%;
		height: 50px;
		color: white;
		font-weight: 600;
		background-color: #212121;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s linear;
	}

	#postButton:hover {
		background: rgb(56, 56, 56);
	}
	#commentHeader {
		font-size: 3rem;
		color: white;
		font-weight: 600;
		margin-top: 3vh;
		text-align: left;
		/* margin-left: -10vw; */
	}

	#userInput {
		width: 87.5%;
		min-height: 36px;
		margin-left: 19px;
		margin-top: 4px;
		background: #212121;
		color: white;
		text-align: left;
	}

	#inputHolder {
		width: 60%;
		min-height: 40px;
		/* margin: 0 auto; */
		margin-top: 10px;
		background: #212121;
		border-radius: 20px;
		color: white;
		text-align: left;
	}

	textarea {
		resize: none;
		width: 400px;
		min-height: 100px;
		height: auto;
		padding: 5px;
		overflow: hidden;
		box-sizing: border-box;
	}

	#comments {
		margin-top: 20px;
		width: 50vw;
		height: 400px;
		margin-left: -10vw;
	}

	#addComment {
	}

	#commentBox {
	}

	#name {
		font-size: 20px;
		margin-top: 5px;
	}

	#whole {
		width: 100vw;
		height: auto;
		overflow-x: hidden;
	}

	@media (max-width: 800px) {
		h1 {
			font-size: 10vw !important;
		}

		h2 {
			font-size: 5vw !important;
		}

		p {
			width: 85vw;
			margin-top: 1vh !important;
		}
	}

	@media (max-width: 600px) {
		p {
			font-size: 5vw !important;
		}
	}

	#container {
		width: 60vw;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		/* align-items: left; */
		justify-content: flex-start;
	}

	h1 {
		font-size: 5rem;
		color: white;
		font-weight: 600;
		margin-top: 3vh;
		text-align: left;
		margin-left: -10vw;
	}

	h2 {
		/* position: absolute; */
		font-size: 2rem;
		color: white;
		font-weight: 600;
		float: left;
		text-align: left;
		margin-left: -10vw;
	}

	p {
		/* margin: 0 auto; */
		margin-top: 5vh;
		font-size: 1.5rem;
		font-weight: 300 !important;
		color: white;
		text-align: left;
		margin-left: -10vw;
	}
</style>
