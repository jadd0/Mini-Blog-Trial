<script>
  import { page } from '$app/stores';
</script>

<body>
  <h1>404</h1>
  <h2>{$page.error.message}</h2>
  <div id="homeButton">
    <a href='/'>Go back home</a>
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
		height: 100vh;
		width: 100vw;
		background-color: #141414;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
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
		/* font-family: New-Inter; */
		font-family: New-Inter;
    font-weight: 300;
		/* font-weight: 500;

		font-variation-settings: 'wght' 500; */

		letter-spacing: -2px;

		/* font-family: "fenix";
		font-weight: 500; */
	}

  h1 {
    font-size: 10rem;
    color: white;
    font-weight: 800;
    /* padding-left: 100vw; */
  }

  h2 {
    font-size: 5rem;
    color: white;
    font-weight: 500;
  }

  a {
    font-size: 3rem;
    color: #141414;
    font-weight: 800;
    text-decoration: none;
    
  }

	#homeButton {
    background-color: white;
    margin-top: 20px;
    height: 10vh;
    width: 350px;
    line-height: 10vh;
    border-radius: 20px;
  }
</style>
