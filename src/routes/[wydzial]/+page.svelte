<script>
	import ListElement from './ListElement.svelte';


  /** @type {import('./$types').PageData} */
  export let data

</script>



<div class="px-5 py-4 mb-5 w-100">
    {#if !data.data}
      Proszę wybirać wydział z menu po lewej stronie.
    {:else}


      <h5>Harmonogramy</h5>
      {#each data.data as elementData, i}
        <ListElement data={elementData}></ListElement>
      {/each}


    {/if}
</div>