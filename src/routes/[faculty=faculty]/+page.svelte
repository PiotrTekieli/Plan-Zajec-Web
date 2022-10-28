<script>
  import ListElement from './ListElement.svelte';

  /** @type {import('./$types').PageData} */
  export let data

  /** @type {Array<any>}*/
  let pageData = data.data ?? []

  let searchTerm = ""

  /** @param {{ name: string; spec: string[]; }[]} data */
  function SearchThrough(data) {
    let normalizedSearchTerm = searchTerm.toLowerCase()
    return pageData = data.filter(item => item.name.toLowerCase().includes(normalizedSearchTerm) || item.spec.some(item => item.toLowerCase().includes(normalizedSearchTerm)))
  }

  function UpdateFavoriteList() {
    data.favoriteList = JSON.parse(localStorage.getItem('favoriteList') ?? "")
  }
</script>



<div class="px-5 py-4 mb-5 w-100">

    {#if !data.data}
      Proszę wybrać wydział z menu po lewej stronie.
    {:else}
      <div class="top">
        <h3>{data.faculty}</h3>

        <input bind:value={searchTerm} on:input={() => SearchThrough(data.data ?? [])} placeholder="Wyszukaj..."/>
      </div>

      {#if pageData.length}

        {#if data.favoriteList?.length && pageData.some(element => data.favoriteList?.includes(element.name))}

          <h5>Ulubione</h5>

          {#each pageData as elementData}
            {#if data.favoriteList?.includes(elementData.name)}
              <ListElement data={elementData} favorite={true} on:favorite={UpdateFavoriteList}></ListElement>
            {/if}
          {/each}

        {/if}

        {#if pageData.some(element => !data.favoriteList?.includes(element.name))}

          <h5>Harmonogramy</h5>

          {#each pageData as elementData}
            {#if !data.favoriteList?.includes(elementData.name)}
              <ListElement data={elementData} favorite={data.favoriteList?.includes(elementData.name)} on:favorite={UpdateFavoriteList}></ListElement>
            {/if}
          {/each}

        {/if}

      {:else}
        <h5>Brak wyników.</h5>
      {/if}
    {/if}
</div>

<style>
  h5 {
    margin-left: 12px;
    margin-top: 12px;
  }

  .top {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    max-width: 1000px;
  }

  .top input {
    padding: 4px 8px;
    padding-right: 30px;
    width: 250px;
    margin-left: 12px;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 0px 1px #000;
    border: none;
    background-image: url("search.png");
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: right 6px top 50%;
  }

  .top input:focus{
    box-shadow: 0px 0px 0px 2px#1786CA;
    outline: none;
  }
</style>