<script>
	import { afterUpdate, onMount } from 'svelte';


    /** @type {import('./$types').PageServerData} */
    export let data

    let pageData = data.data

    function handleClick() {
        // @ts-ignore
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null
            content.style.marginTop = "-30px"
        } else {
            content.style.maxHeight = content.scrollHeight + "px"
            content.style.marginTop = "-8px"
        }
    }

    /** @param {{ nextElementSibling: any; }} button */
    function updateSize(button) {
        var content = button.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = content.scrollHeight + "px"
        }
    }

    let searchTerm = ""
    /** @type {HTMLDivElement} */
    let lecturersList
    /** @type {HTMLCollectionOf<HTMLButtonElement>} */
    let pageButtons

    // @ts-ignore
    function SearchThrough(data) {
        let normalizedSearchTerm = searchTerm.toLowerCase()
        pageData = []
        for (let i = 0; i < data.length; i++) {
            // @ts-ignore
            pageData.push({facultyId: data[i].facultyId, data: data[i].data.filter(lectuerer => lectuerer.name.toLowerCase().includes(normalizedSearchTerm))})
        }
        console.log(pageData)
        return pageData
    }

    onMount(() => {
        pageButtons = lecturersList.getElementsByTagName("button")
    })

    afterUpdate(() => {
        if (pageButtons.length) {
            for (let i = 0; i < pageButtons.length; i++) {
                updateSize(pageButtons[i])
            }
        }
	})


</script>

<div class="top">
    <h3>{data.faculty}</h3>

    <input bind:value={searchTerm} on:input={() => SearchThrough(data.data)} placeholder="Wyszukaj..."/>
</div>

<div bind:this={lecturersList}>
    {#each pageData as faculty, i}
        <button on:click={handleClick}>{data.facultyData[faculty.facultyId-1].name}</button>
        <div class="collapsable">
            {#each faculty.data as lecturer}
                <a href="/pracownik/{lecturer.id}">{lecturer.name}</a> <br>
            {/each}
            {#if !faculty.data.length}
                Brak wyników.
            {/if}
        </div>
    {/each}
</div>

<style>
    button, .collapsable {
        width: 100%;
        min-width: 850px;
        max-width: 1200px;
        padding: 8px 16px;
    }

    button {
        background-color: #E7E6ED;
        margin: 8px 0px;
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border: none;
        position: relative;
        z-index: 1;
    }

    a {
        text-decoration: none;
        color: #1786CA;
    }

    a:hover {
        text-decoration: underline;
    }

    .collapsable {
        margin-top: -30px;
        max-height: 0;
        transition: max-height ease-in-out 0.3s, margin ease-in-out 0.3s;
        overflow: hidden;
        border: 1px black solid;
        border-top: none;
    }
</style>