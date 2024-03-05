<script>
</script>

<body>
	<main>
		<div class="terms">
			<h1>Terms of Service.</h1>
			<div class="section">
				<h2>1. Account Creation and Sign-in Options</h2>
				<p>
					You can create an account on Jadd.live using either a traditional username and password
					method or by signing in with your existing Google or Github account. When signing in with
					Google or Github, we will only access your basic profile information, such as your name
					and email address. This information is solely used to verify your identity and facilitate
					your use of the Service. We do not share this data with any external sources.
				</p>
			</div>
			<div class="section">
				<h2>2. The Service</h2>

				<p>Jadd.live offers various features through sub-apps, including:</p>

				<ul>
					<li>
						Jaddblog: Allows users to post text content, discover posts from other users, like and
						comment on those posts.
					</li>
					<li>
						Organization App: Enables users to create circles (groups), share ideas within those
						circles, and allow circle members to comment, like, and vote on those ideas.
					</li>
				</ul>
			</div>

			<div class="section">
				<h2>3. User Content</h2>

				<p>
					You are responsible for all content you post on the Service ("User Content"). You retain
					all ownership rights to your User Content, but by posting it on the Service, you grant us
					a non-exclusive, worldwide, royalty-free license to use, modify, publish, and distribute
					your User Content in connection with the operation and maintenance of the Service.
				</p>
			</div>
			<div class="section">
				<h2>4. User Conduct</h2>

				<p>You agree to use the Service in a respectful and lawful manner. You will not:</p>

				<ul>
					<li>
						Post any content that is hateful, threatening, defamatory, obscene, infringing on
						intellectual property rights, or otherwise illegal.
					</li>
					<li>Disrupt or interfere with the Service or its servers.</li>
					<li>Impersonate another user or attempt to gain unauthorized access to an account.</li>
					<li>Collect or store personal data about other users without their consent.</li>
				</ul>

				<p>
					We reserve the right to remove any User Content that violates these Terms or that we deem
					inappropriate. We may also suspend or terminate your account for any violation of these
					Terms.
				</p>
			</div>
			<div class="section">
				<h2>5. Disclaimer of Warranties</h2>

				<p>
					The Service is provided "as is" and without warranties of any kind, express or implied. We
					disclaim all warranties, including, but not limited to, warranties of merchantability,
					fitness for a particular purpose, and non-infringement.
				</p>
			</div>
			<div class="section">
				<h2>6. Limitation of Liability</h2>

				<p>
					We will not be liable for any damages arising out of your use of the Service, including,
					but not limited to, direct, indirect, incidental, consequential, or punitive damages.
				</p>
			</div>

			<div class="section">
				<h2>7. Termination</h2>

				<p>
					We may terminate your access to the Service at any time, with or without cause. You may
					also terminate your account at any time.
				</p>
			</div>

			<div class="section">
				<h2>8. Changes to the Terms</h2>

				<p>
					We may update these Terms from time to time. We will notify you of any changes by posting
					the new Terms on the Service. Your continued use of the Service after the posting of the
					revised Terms means that you accept and agree to the changes.
				</p>
			</div>

			<div class="section">
				<h2>9. Governing Law</h2>

				<p>
					These Terms shall be governed by and construed in accordance with the laws of The United Kingdom.
				</p>
			</div>

			<div class="section">
				<h2>10. Contact Us</h2>

				<p>
					If you have any questions about these Terms, please contact us at jaddalkwork@gmail.com.
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

  @media only screen and (max-width:565px) {
    h1 {
      font-size: 65px;
    }

    .terms {
      padding-left: var(--leftPhone);
    }
  }
</style>
