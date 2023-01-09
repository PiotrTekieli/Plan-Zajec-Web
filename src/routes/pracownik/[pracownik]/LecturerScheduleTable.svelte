<script>
	import { extractDate, reverseDate } from "$lib/DateHelper";
	import Tooltip from "../../Tooltip.svelte";

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

    /** @param {String} _date */
    function getDate(_date) {
        let date = reverseDate(_date)
        let weekday = new Date(date).toLocaleDateString("pl-PL", { weekday: 'long' })
        weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
        return weekday + " " + date
    }
</script>


<div>
    <h5>Harmonogram</h5>
    <table>
        {#each data as day}
            <tr>
                <th colspan="4" class:today={checkTodaysDate(reverseDate(day.date))}>{getDate(day.date)}</th>
            </tr>
            {#each day.dailySchedule as row, i}
                <tr>
                    <td class="timeColumn">{row.hours || "-"}</td>
                    <td><Tooltip text={MatchLegend(row.subject)}>{row.subject || "-"}</Tooltip></td>
                    <td>{row.class || "-"}</td>
                    <td>{row.classroom || "-"}</td>
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

    .today {
        background-color: #4443a3 !important;
    }

    .timeColumn {
        width: 120px;
    }
</style>