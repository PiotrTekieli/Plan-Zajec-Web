<script>
	import { extractDate } from "$lib/DateHelper";
	import Tooltip from "../../../Tooltip.svelte";

    /** @type {Array<any>} */
    export let data

    /** @type {Array<any>} */
    export let legend

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


{#each data as group}
    <div>
        <h5>{group.name}</h5>
        <table>
            {#each group.schedule as day}
                <tr>
                    <th colspan="4" class:today={checkTodaysDate(extractDate(day.day))}>{day.day}</th>
                </tr>
                {#each day.rows as row, i}
                    <tr>
                        <td class="timeColumn">{row[0]}</td>
                        <td><Tooltip text={MatchLegend(row[1])}>{row[1]}</Tooltip></td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                    </tr>
                {/each}
            {/each}
        </table>
    </div>
{/each}

<style>
    div {
        width: 700px;
        margin-right: 12px;
    }

    table {
        width: 100%;
        border: 1px solid rgba(var(--mainColorRGB), 0.5);
        float: left;
    }

    table td, table th {
        padding: 8px 12px;
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

    .today {
        background-color: #4443a3 !important;
    }

    .timeColumn {
        width: 120px;
    }
</style>