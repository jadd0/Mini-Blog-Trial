<script>
  let inp;

  function check() {
    const regex =  /^(?!\s)[a-z\d{._}]{1,10}$/

    if (regex.test(password)) {
			// ("yEs")
			wrong = false;
			passwordBool = true;
			return;
		}

		// ("no")
		wrong = true;
		passwordBool = false;
		wrongMessage = "Password did not pass the test";
  }

</script>

<input type="text" bind:value={inp} on:input={check}>
<h1>{test}</h1>