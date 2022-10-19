<script>
	import ListElement from './ListElement.svelte';


  /** @type {import('./$types').PageData} */
  export let data

  /** @type {Array<any>}*/
  let pageData

  if (data.data) {
    let searchTerm = ""
    pageData = data.data.filter(item => item.name.includes(searchTerm) || item.spec.some(item => item.includes(searchTerm)))
  }
</script>



<div class="px-5 py-4 mb-5 w-100">
    {#if !data.data}
      Proszę wybirać wydział z menu po lewej stronie.
    {:else}


      <h5>Harmonogramy</h5>
      {#each pageData as elementData, i}
        <ListElement data={elementData}></ListElement>
      {/each}


    {/if}
</div>