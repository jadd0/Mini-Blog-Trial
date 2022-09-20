<script>
  import { getContext } from 'svelte';
  import Popup from '../popup/+page.svelte';
  export let message
  const { open } = getContext('simple-modal');
  const showSurprise = () => open(Popup, { message });
</script>

<p><button on:click={showSurprise}>Press me</button></p>