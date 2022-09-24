<script>
	import { flip } from 'svelte/animate';
	
	let items = [1,2,3,4,5,6,7,8,9]
</script>

{#each items as item (item)}
  <h1 animate:flip>Hello {item}! <button type="button" on:click={() => { items = items.filter(i => i !== item) }}>Remove</button></h1>
  
{/each}

