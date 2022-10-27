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

  function UpdateFavoriteList() {
    data.favoriteList = JSON.parse(localStorage.getItem('favoriteList') ?? "")
  }
</script>



<div class="px-5 py-4 mb-5 w-100">

    {#if !data.data}
      Proszę wybrać wydział z menu po lewej stronie.
    {:else}
      <h3>{data.faculty}</h3>

      {#if data.favoriteList?.length}
        <h5>Ulubione</h5>
        {#each SearchThrough(data.data) as elementData}
          {#if data.favoriteList?.includes(elementData.name)}
            <ListElement data={elementData} favorite={true} on:favorite={UpdateFavoriteList}></ListElement>
          {/if}
        {/each}
      {/if}

      <h5>Harmonogramy</h5>
      {#each SearchThrough(data.data) as elementData}
        {#if !data.favoriteList?.includes(elementData.name)}
          <ListElement data={elementData} favorite={data.favoriteList?.includes(elementData.name)} on:favorite={UpdateFavoriteList}></ListElement>
        {/if}
      {/each}

    {/if}
</div>

<style>
  h5 {
    margin-left: 12px;
    margin-top: 12px;
  }
</style>