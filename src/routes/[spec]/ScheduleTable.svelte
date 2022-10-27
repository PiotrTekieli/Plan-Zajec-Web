<script>
	import Tooltip from "./Tooltip.svelte";

    /** @type {Array<any>} */
    export let data

    /** @type {Array<any>} */
    export let legend

    /** @param {String} dateString */
    function getDay(dateString) {
        let day = new Intl.DateTimeFormat('pl-PL', { weekday: 'long' }).format(new Date(dateString))
        day = day.charAt(0).toUpperCase() + day.slice(1);

        return day
    }

    /**	@param {number} index
     * @param {String} dateString */
    function getHours(index, dateString) {
        let isWeekend = new Date(dateString).getDay() > 5

        switch (index) {
            case 0:
                return "08:15-09:45"
            case 1:
                return "10:00-11:30"
            case 2:
                return "11:45-13:15"
            case 3:
                if (!isWeekend)
                    return "13:30-15:00"
                else
                    return "13:45-15:15"
            case 4:
                if (!isWeekend)
                    return "15:15-16:45"
                else
                    return "15:30-17:00"
            case 5:
                if (!isWeekend)
                    return "17:00-18:30"
                else
                    return "17:15-18:45"
            case 6:
                if (!isWeekend)
                    return "18:45-20:15"
                else
                    return "19:00-20:30"
        }
    }

    /** @param {String} dateString */
    function checkTodaysDate(dateString) {
        return new Date(dateString).toDateString() == new Date().toDateString()
    }

    /** @param {String} subject */
    function MatchLegend(subject) {
        for (let i = 0; i < legend.length; i++) {
            if (legend[i].subject == subject.substring(0, subject.indexOf(' ')))
                return legend[i].name
        }
        return null
    }

</script>

{#each data as group}
    <div>
        <h5>{group.name}</h5>
        <table>
            {#each group.days as day}
                <tr>
                    <th colspan="4" class:today={checkTodaysDate(day.date)}>{getDay(day.date)} {day.date}</th>
                </tr>
                {#each day.schedule as schedule, i}
                    <tr>
                        <td>{getHours(i, day.date)}</td>
                        <td><Tooltip text={MatchLegend(schedule.subject)}>{schedule.subject}</Tooltip></td>
                        <td>{schedule.teacher}</td>
                        <td>{schedule.classroom}</td>
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
</style>