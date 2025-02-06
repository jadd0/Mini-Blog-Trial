<script lang="ts">
  import { enhance } from '$app/forms';

  let email: string;
  let password: string;
</script>

<form method="POST" use:enhance>
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Register</button>
</form>
