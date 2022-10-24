<script>
  import ListElement from './ListElement.svelte';


  /** @type {import('./$types').PageData} */
  export let data

  /** @type {Array<any>}*/
  let pageData

  /** @param {{ name: string; spec: string[]; }[]} data */
  function SearchThrough(data) {
    let searchTerm = ""
    return pageData = data.filter(item => item.name.includes(searchTerm) || item.spec.some(item => item.includes(searchTerm)))
  }
</script>



<div class="px-5 py-4 mb-5 w-100">

    {#if !data.data}
      Proszę wybrać wydział z menu po lewej stronie.
    {:else}
      <h3>{data.faculty}</h3>

      <h5>Harmonogramy</h5>
      {#each SearchThrough(data.data) as elementData, i}
        <ListElement data={elementData}></ListElement>
      {/each}

    {/if}
</div>