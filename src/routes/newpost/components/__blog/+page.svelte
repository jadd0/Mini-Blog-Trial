<script>
	import { autoresize } from 'svelte-textarea-autoresize'
    let title = '';
    let body = '';

    let loading = false

    const submit = async () => {
		if (title.length == 0 || description.length == 0 || body.length == 0) return
		loading = true
		const response = await fetch("/api/createPost", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title,
				description: description,
				body: body
			}),
		});

		if (response.ok) {
			window.location = "/newpost";
		}

		if (response.ok == false) {
			loading = false
			wrong = true;
		}
	};
</script>

<div class="inputHolder">
	<textarea
	class="userInput"
	maxlength="70"
	placeholder="Title"
	bind:value={title}
	use:autoresize
/>
 <h3 id="forTitle">{title.length}/70</h3>
</div>
<div class="inputHolder" id="body">
  <textarea
	class="userInput"
	maxlength="450"
	placeholder="Body"
	id="bodyInput"
	bind:value={body}
	use:autoresize
/>
 <h3 id="forBody">{body.length}/450</h3>
</div>

<button on:click={submit} id="loginButton">{loading === true ? "Loading..." : "Send"}</button>

<style>

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
		font-weight: 300;
	}
  @media (max-width: 930px) {
		.form {
			width: 340px !important;
		}

		.inputHolder {
			width: 90% !important;
		}

		/* textarea {
			font-size: 3.75vw !important;
		}

		h3 {
					
		} */
	}

	#body {
		min-height: 100px;
	}

	#bodyInput {
		min-height: 90px;
	}

	#forBody {
		/* bottom: -40px !important;		 */
	}

	h3 {
		font-weight: 600;
		color: rgb(112, 112, 112);
		font-size: 10px;
		height: 0px;
		width: 30px;
		position: relative;
		/* top:0; */
		left: 84%;
		text-align: right;
		bottom: 20px;

		/* margin-top: 10%; */
		/* position: sticky; */
		/* bottom: 0px !important; */
		/* margin-top: 7.5%; */
	}

	.userInput {
		width: 79%;
		min-height: 25px;
		margin-left: 10px;
		margin-top: 4px;
		background: #212121;
		color: white;
		text-align: left;
	}

	.inputHolder {
		width: 75%;
		min-height: 30px;
		padding-bottom: 5px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 10px;
		color: white;
		text-align: left;
		/* display: flex; */
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
		margin-top: 30px;
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
</style>