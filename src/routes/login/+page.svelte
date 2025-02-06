<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  

  let email: string;
  let password: string;

  async function signInWithOAuth(provider: string) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: '/auth/callback' }
    });
    if (error) console.error('OAuth error:', error);
    else goto('/dashboard'); // Redirect after successful OAuth
  }
</script>

<form method="POST" use:enhance>
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Login</button>
</form>

<button on:click={() => signInWithOAuth('github')}>Sign in with GitHub</button>
<button on:click={() => signInWithOAuth('google')}>Sign in with Google</button>
