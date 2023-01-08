<script>
  import ListElement from './ListElement.svelte';

  /** @type {import('./$types').PageServerData} */
  export let data

  /** @type {Array<any>}*/
  let pageData

  $: data.data, pageData = data.data

  /** @type {string[] | any[]} */
  let favoriteList = []
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('favoriteList'))
      favoriteList = JSON.parse(localStorage.getItem('favoriteList') ?? "{}")
  }




  let searchTerm = ""

  /** @param {{ id: Number, name: string; specializations: [{id: Number, name: String}]; }[]} data */
  function SearchThrough(data) {
    let normalizedSearchTerm = searchTerm.toLowerCase()
    return pageData = data.filter(item => item.name.toLowerCase().includes(normalizedSearchTerm) || item.specializations.some(item => item.name.toLowerCase().includes(normalizedSearchTerm)))
  }

  function UpdateFavoriteList() {
    favoriteList = JSON.parse(localStorage.getItem('favoriteList') ?? "")
  }
</script>



{#if !data.data}
  Proszę wybrać wydział z menu po lewej stronie.
{:else}
  <div class="top">
    <h3>{data.faculty}</h3>

    <input bind:value={searchTerm} on:input={() => SearchThrough(data.data)} placeholder="Wyszukaj..."/>
  </div>

  {#if pageData.length}

    {#if favoriteList?.length && pageData.some(element => favoriteList.includes(element.name))}

      <h5>Ulubione</h5>

      {#each pageData as elementData}
        {#if favoriteList.includes(elementData.name)}
          <ListElement data={elementData} favorite={true} on:favorite={UpdateFavoriteList}></ListElement>
        {/if}
      {/each}

    {/if}

    {#if pageData.some(element => !favoriteList.includes(element.name))}

      <h5>Harmonogramy</h5>

      {#each pageData as elementData}
        {#if !favoriteList.includes(elementData.name)}
          <ListElement data={elementData} favorite={favoriteList.includes(elementData.name)} on:favorite={UpdateFavoriteList}></ListElement>
        {/if}
      {/each}

    {/if}

  {:else}
    <h5>Brak wyników.</h5>
  {/if}
{/if}

<style>
  h5 {
    margin-left: 12px;
    margin-top: 12px;
  }

</style>