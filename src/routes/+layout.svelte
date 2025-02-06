<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;

  onMount(() => {
    const { data: { subscription } } = data.supabase.auth.onAuthStateChange(() => {
      invalidateAll(); // Refresh data on auth changes
    });
    return () => subscription?.unsubscribe();
  });
</script>
