<script>
	import { autoresize } from 'svelte-textarea-autoresize';
	let name = '',
		email = '',
		enquiry = '',
		loading = false;

	async function submit() {
		loading = true;
		const response = await fetch('/api/sendEmail', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name, email, enquiry
			})
		});

		if (response.ok) location.reload();
	}
</script>

<body>
	<main>
		<div class="hero">
			<h1>Get in touch.</h1>
			<div class="paraBox">
				<p>
					Interested in working with me? Or simply want to get in contact? Great! Just fill in the
					form below and I will reply shortly
				</p>
			</div>
		</div>

		<div class="contactForm">
			<div class="fullInput">
				<h2>Full Name</h2>
				<div class="inputHolder">
					<textarea
						class="userInput"
						maxlength="70"
						placeholder="Full Name"
						bind:value={name}
						use:autoresize
					/>
				</div>
			</div>
			<div class="fullInput">
				<h2>Full Name</h2>
				<div class="inputHolder">
					<textarea
						class="userInput"
						maxlength="70"
						placeholder="Email Address"
						bind:value={email}
						use:autoresize
					/>
				</div>
			</div>
			<div class="fullInput">
				<h2>Full Name</h2>
				<div class="inputHolder" id="body">
					<textarea
						class="userInput"
						maxlength="450"
						placeholder="Enquiry"
						id="bodyInput"
						bind:value={enquiry}
						use:autoresize
					/>
					<h3 id="forBody">{enquiry.length}/450</h3>
				</div>
			</div>

			<button id="loginButton" on:click={submit}>Submit</button>
		</div>
	</main>
</body>

<style>
	@font-face {
		font-family: 'jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	body {
		margin: 0;
		padding: 0;
		border: 0;
		height: 103vh;
		background: #d9d9d9;
		overflow-x: clip;
		border-bottom-right-radius: 50px;
		border-bottom-left-radius: 50px;
	}

	/* Hide scrollbar for Chrome, Safari and Opera */
	body::-webkit-scrollbar {
		display: none !important;
	}

	* {
		font-size: 24px;
		text-align: center;
		color: #d9d9d9;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: jakarta;
		letter-spacing: -0px !important;
	}
	main {
		width: 100vw;
		height: 103vh;
		border-radius: 0px 30px 30px 0;
		background-color: #141414;
	}

	.hero {
		width: 100vw;
		height: 300px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		align-items: start;
		justify-content: start;
		padding: 100px;
	}

	p {
		text-align: start;
		color: #9d9d9d;
		font-size: 18px;
	}

	.paraBox {
		width: 600px;
	}

	h1 {
		font-size: 80px;
	}

	#bodyInput {
		min-height: 90px;
		width: 330px;
	}

	#body {
		height: auto !important;
		padding-bottom: 10px;
		padding-left: 5px;
	}

	h3 {
		font-weight: 600;
		color: rgb(112, 112, 112);
		font-size: 10px;
		height: 0px;
		width: 50px;
		position: relative;
		text-align: right;
		bottom: 20px;

		right: -330px;
		/* margin-top: 10%; */
		/* position: sticky; */
		/* bottom: 0px !important; */
		/* margin-top: 7.5%; */
	}

	.userInput {
		width: 365px;
		min-height: 25px;
		margin-left: 15px;
		margin-top: 10px;
		background: #212121;
		color: white;
		text-align: left;
		font-size: 16px;
	}

	.inputHolder {
		width: 400px;
		min-height: 55px;
		padding-bottom: 5px;
		margin: 0 auto;
		background: #212121;
		border-radius: 5px;
		color: white;
		text-align: left;
		border: 2px solid #333;
		transition: all 0.2s linear;
	}

	.inputHolder:focus-within {
		border: 2px solid rgb(90, 90, 90);
	}

	#bodyInput {
		margin-left: 8px;
	}

	textarea {
		resize: none;
		width: 400px;
		min-height: 100px;
		font-size: 16px;
		height: auto;
		padding: 5px;
		overflow: hidden;
		box-sizing: border-box;
	}

	#loginButton {
		margin: 0 auto;
		width: 75%;
		height: 50px;
		color: white;
		font-weight: 600;
		background-color: #212121;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s linear;
	}

	#loginButton:hover {
		background: rgb(56, 56, 56);
	}

	@media (max-width: 460px) {
		#loginForm {
			width: 325px !important;
		}
	}

	.shake {
		animation: shake2 0.2s linear;
	}

	.wrong {
		border: 2px solid red;
	}

	@keyframes shake2 {
		25% {
			transform: translateX(11px);
		}

		50% {
			transform: translateX(0px);
		}

		75% {
			transform: translateX(-11px);
		}
	}

	.contactForm {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
		width: 400px;
		margin-left: 100px;
		margin-top: 40px;
		gap: 20px;
	}

	.fullInput {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		gap: 5px;
	}

	h2 {
		font-size: 16px;
	}
</style>
