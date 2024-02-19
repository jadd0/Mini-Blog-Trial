<body>
	<main>
    <div class="hero">
		<h1>Get in touch.</h1>
    <div class="paraBox">
      <p>Interested in working with me? Or simply want to get in contact? Great! Just fill in the form below and I will reply shortly</p>
    </div>
    
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
		height: 85vh;
		background: #d9d9d9;
		overflow-x: clip;
		border-radius: 20px;
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
		height: 101vh;
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
    color:#9d9d9d;
  }

  .paraBox {
    width: 600px;
  }

  h1 {
    font-size: 80px;
  }
</style>
