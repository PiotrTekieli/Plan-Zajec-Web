<script>
	import ListElement from './ListElement.svelte';


  /** @type {import('./$types').PageData} */
  export let data

</script>

<div class="p-4 w-100">
    {#if !data.data}
    Proszę wybirać wydział z menu po lewej stronie.
    {:else}


      <h5>Harmonogramy</h5>

      {#each data.data as elementData}
        <ListElement data={elementData}></ListElement>
      {/each}


    {/if}
</div>