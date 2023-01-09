<script>
	import { extractDate } from "$lib/DateHelper";
	import { onMount } from "svelte/internal";
	import Tooltip from "../../../Tooltip.svelte";

    /** @type {Array<any>} */
    export let data

    /** @type {Array<any>} */
    export let legend

    /** @type {HTMLDivElement} */
    let mainTable

    onMount(() => {
        updateWidth()
    })

    $: data, updateWidth()

    function updateWidth() {
        if (mainTable)
            mainTable.style.width = 500 * data.length + "px";
    }

    /** @param {String} dateString */
    function checkTodaysDate(dateString) {
        return new Date(dateString).toDateString() == new Date().toDateString()
    }

    /** @param {String} subject */
    function MatchLegend(subject) {
        for (let i = 0; i < legend.length; i++) {
            if (legend[i].abbreviation == subject.substring(0, subject.indexOf(' ')))
                return legend[i].fullname
        }
        return null
    }
</script>


<div bind:this={mainTable}>
    {#if data.length > 1}
        <h5>Harmonogram</h5>
    {:else}
        <h5>{data[0].name}</h5>
    {/if}
    <table>
        {#each data[0].schedule as day, d}
            <tr>
                <th colspan={4 * data.length} class:today={checkTodaysDate(extractDate(day.day))}>{day.day}</th>
            </tr>
            {#if data.length > 1}
                <tr>
                    {#each data as group}
                        <td colspan="4" class="groupName">{group.name}</td>
                    {/each}
                </tr>
            {/if}
            <tr></tr>
            {#each day.rows as row, r}
                <tr>
                    {#each data as group, g}
                        <td class="timeColumn">{data[g].schedule[d].rows[r][0]}</td>
                        <td><Tooltip text={MatchLegend(data[g].schedule[d].rows[r][1])}>{data[g].schedule[d].rows[r][1]}</Tooltip></td>
                        <td>{data[g].schedule[d].rows[r][2]}</td>
                        <td>{data[g].schedule[d].rows[r][3]}</td>
                    {/each}
                </tr>
            {/each}
        {/each}
    </table>
</div>

<style>
    div {
        width: 500px;
        margin-right: 12px;
    }

    table {
        width: 100%;
        border: 1px solid rgba(var(--mainColorRGB), 0.5);
        float: left;
    }

    table td, table th {
        padding: 8px 8px;
        border: 1px solid rgba(var(--mainColorRGB), 0.5);
        border-width: 1px 0px;
        text-align: center;
    }

    table th {
        background-color: var(--mainColor);
        color: white;
    }

    table tr:hover {
        background-color: rgba(var(--mainColorRGB), 0.1);
    }

    table td {
        max-width: 200px;
        min-width: 100px;
    }

    table td:nth-child(4n) {
        border-right: black 1px solid;
    }

    table td.groupName {
        font-weight: bold;
        border-right: black 1px solid;
    }

    .today {
        background-color: #4443a3 !important;
    }

    .timeColumn {
        width: 120px;
    }
</style>