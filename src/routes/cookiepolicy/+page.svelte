<script>
</script>

<body>
	<main>
		<div class="terms">
			<h1>Terms of Service.</h1>
			<div class="section">
				<h2>1. Cookie Policy</h2>

				<p>
					Jadd.live ("we", "us", or "our") uses cookies on its website (the "Service"). This cookie
					policy explains what cookies are, how we use them, and your choices regarding these
					cookies.
				</p>
			</div>

			<div class="section">
				<h2>2. What are Cookies?</h2>

				<p>
					Cookies are small text files placed on your computer, mobile phone, or other device by a
					website when you visit the site. They store information about your website visit, such as
					your preferences and browsing history, which can then be used to improve your user
					experience.
				</p>
			</div>

			<div class="section">
				<h2>3. How We Use Cookies</h2>

				<p>
					We use cookies for the sole purpose of storing authentication information. We utilize two
					types of cookies:
				</p>

				<h3>Session Cookies:</h3>

				<p>
					These temporary cookies are erased once you close your web browser. We use them to
					remember your login information during your current session.
				</p>

				<h3>Persistent Cookies:</h3>

				<p>
					These cookies remain on your device for a predefined period even after you close your web
					browser or exit the website. We use persistent cookies to store your login information for
					future sessions, allowing you to stay logged in for a longer duration.
				</p>
			</div>

			<div class="section">
				<h2>4. Types of Cookies Used:</h2>

				<h3>Session Cookies:</h3>

				<p>As described above.</p>

				<h3>Persistent Cookies:</h3>

				<p>
					These cookies have a lifespan of [duration, e.g., one year]. We use them specifically for
					storing authentication information.
				</p>
			</div>

			<div class="section">
				<h2>5. Your Choices and Rights</h2>

				<p>
					You can manage your cookie preferences through your web browser settings. Most browsers
					allow you to block or delete cookies altogether, or to choose which cookies to
					accept/reject on a case-by-case basis.
				</p>

				<p>
					However, please be aware that disabling cookies, particularly persistent cookies, may
					significantly affect your experience on our website. You might need to log in more
					frequently, potentially disrupting your workflow.
				</p>
			</div>

			<div class="section">
				<h2>6. Changes to This Policy</h2>

				<p>
					We may update this cookie policy from time to time. We will notify you of any changes by
					posting the new cookie policy on the Service. Your continued use of the Service after the
					posting of the revised cookie policy means that you accept and agree to the changes.
				</p>
			</div>

			<div class="section">
				<h2>7. Contact Us</h2>

				<p>
					If you have any questions about this cookie policy, please contact us at jaddalkwork@gmail.com.
				</p>
			</div>
		</div>
	</main>
</body>

<style>
	:root {
		--leftPC: 100px;
		--leftPhone: 50px;
		--h2SizePC: 100px;
		--h2SizePhone: 50px;

		scrollbar-width: none;
	}

	@font-face {
		font-family: 'jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	body {
		margin: 0;
		padding: 0;
		border: 0;
		height: auto;
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
		height: auto;
		border-radius: 0px 30px 30px 0;
		background-color: #141414;
		padding-bottom: 200px;
	}

	.section {
		max-width: 900px;
		width: 75vw;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		gap: 15px;
	}

	p {
		text-align: start;
		color: #9d9d9d;
		font-size: 18px;
	}

	h1 {
		font-size: 80px;
		text-align: start;
	}

	h2 {
		font-size: 30px;
		text-align: start;
	}

	.terms {
		padding-top: 120px;
		padding-left: var(--leftPC);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		gap: 40px;
	}

	li {
		text-align: start;
		color: #9d9d9d;
		font-size: 18px;
		padding: 5px;
	}

	@media only screen and (max-width: 565px) {
		h1 {
			font-size: 65px;
		}

		.terms {
			padding-left: var(--leftPhone);
		}
	}
</style>
