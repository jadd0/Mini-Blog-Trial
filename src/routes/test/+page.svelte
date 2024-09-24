<body>
  <div class="subdomainHolder">
    <div class="subdomain">
      <h3>WWW</h3>
    </div>
    
    <h3>BLOG</h3>
    <h3>MUSIC</h3>
    <h3>PATH</h3>
    <h3>SPLIT</h3>
  </div>
</body>

<style>
  	.subdomainHolder {
		height: 100px;
    width: 200px;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 350px;
		left: 90px;
		gap: 200px;
	
  overflow: scroll !important; /* Ensure the section is scrollable */
		border: 2px solid blue;
    z-index: 100;
	}

  .subdomain {
		width: 100vw;
		height: 300px;
		display: flex;
    background: red;
	}
</style>