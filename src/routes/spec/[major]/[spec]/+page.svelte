<script>
	import { extractDate, getWeek, getWeeks, getDateString } from '$lib/DateHelper';
    import Legend from '../../../Legend.svelte';
	import ScheduleTable from './ScheduleTable.svelte';


    /** @type {import('./$types').PageServerData} */
    export let data

    let thisWeek = getWeek(new Date())
    let weekList = getWeeks(new Date(extractDate(data.schedule.groups[0].schedule[0].day)), new Date(extractDate(data.schedule.groups[0].schedule[data.schedule.groups[0].schedule.length-1].day)))

    // @ts-ignore
    let groups = [JSON.parse(JSON.stringify(data.schedule.groups[0]))]
    // $: console.log(groups)

    /** @type {HTMLSelectElement} */
    let selectWeek
    function SubmitWeek() {
        let weekIndex = Number.parseInt(selectWeek.value)
        thisWeek = weekList[weekIndex]
        SubmitGroup()
    }

    /** @type {HTMLSelectElement} */
    let selectGroup
    function SubmitGroup() {
        let groupIndex = Number.parseInt(selectGroup.value)
        if (groupIndex != -1) {
            groups = [JSON.parse(JSON.stringify(data.schedule.groups[groupIndex]))]
        } else {
            groups = JSON.parse(JSON.stringify(data.schedule.groups))
        }
    }

    $: groups, LimitWeeks()

    function LimitWeeks() {
        if (thisWeek.number == -1)
            return

        let start = new Date(thisWeek.start)
        let end = new Date(thisWeek.end)

        for (let i = 0; i < groups.length; i++) {
            for (let j = 0; j < groups[i].schedule.length; j++) {

                let date = new Date(extractDate(groups[i].schedule[j].day))

                if (date < start) {
                    groups[i].schedule.splice(j, 1)
                    j--
                } else if (date > end) {
                    groups[i].schedule.splice(j, groups[i].schedule.length)
                    break
                }
            }
        }
        FillWithEmptyDays()
    }

    function FillWithEmptyDays() {

        for (let i = 0; i < groups.length; i++) {
            let compare = new Date(thisWeek.start)
            for (let day = 0; day < 7; day++) {
                let date = new Date("0000-00-00")
                try {
                    date = new Date(extractDate(groups[i].schedule[day].day))
                }
                catch (e) {}
                // @ts-ignore
                if (date > compare || isNaN(date)) {
                    groups[i].schedule.splice(day, 0, GenerateDay(compare))
                }
                compare.setDate(compare.getDate() + 1)
            }
        }
    }

    /** @param {Date} date */
    function GenerateDay(date) {
        let rows = []
        for (let i = 0; i < 7; i++) {
            rows.push(["-", "-", "-", "-"])
        }

        let day = date.toLocaleDateString("pl-PL", { weekday: 'long' })
        day = day.charAt(0).toUpperCase() + day.slice(1);

        return {
            day: day + " " + getDateString(date),
            rows: rows,
        }
    }

</script>



<h3>{data.schedule.name}</h3>
<br>

<div class="controls">
    {#if thisWeek.number != -1}
    <div>
        <button class="btn arrow reverse" on:click={() => {
            if (weekList[0].number != thisWeek.number) {
                let weekIndex = Number.parseInt(selectWeek.value)
                thisWeek = weekList[weekIndex-1]
                SubmitGroup()
            }
        }}></button>
        <select on:change={() => SubmitWeek()} bind:this={selectWeek}>
            {#each weekList as week, i}
                <option value={i} selected={ thisWeek.number == week.number ? true : false }>Tydzień {week.number} ({week.start} - {week.end})</option>
            {/each}
        </select>
        <button class="btn arrow" on:click={() => {
            if (weekList[weekList.length-1].number != thisWeek.number) {
                let weekIndex = Number.parseInt(selectWeek.value)
                thisWeek = weekList[weekIndex+1]
                SubmitGroup()
            }
        }}></button>
    </div>
    {/if}


    <button class="btn button" on:click={() => {
        if (thisWeek.number != -1)
            thisWeek = { number: -1, start: null, end: null}
        else
            thisWeek = getWeek(new Date())

        SubmitGroup()
    }}>
    {#if thisWeek.number != -1}
        Cały Semestr
    {:else}
        Tygodniowo
    {/if}
    </button>

    {#if data.schedule.groups.length > 1}
        <select on:change={() => SubmitGroup()} bind:this={selectGroup}>
            {#each data.schedule.groups as group, i}
                <option value={i}>{group.name}</option>
            {/each}
                <option value={-1}>Wszystkie grupy</option>
        </select>
    {/if}

</div>

<div class="schedules">
    <Legend data={data.schedule.abbreviationLegend} secondaryLegends={data.schedule.subjectLegends}></Legend>
    <ScheduleTable data={groups} legend={data.schedule.abbreviationLegend}></ScheduleTable>
</div>


<style>
    .schedules {
        display: flex;
        margin-top: 12px;
    }

    .controls {
        display: flex;
        align-items: center;
        gap: 30px;
    }

    .button {
        border-radius: 0.1rem;
        background-color: var(--mainColor);
        color: white;
        transition: background-color .15s ease-in-out !important;
    }

    .button:hover {
        background-color: rgba(var(--mainColorRGB), 0.8);
    }

    .button:active {
        background-color: rgba(var(--mainColorRGB), 0.6);
    }

    select {
        background-color: transparent;
        padding: 7.5px;
        margin: 0px 4px;
        border: 1px solid #000;
        /* transition: background-color .15s ease-in-out !important; */
        border-radius: 0.1rem;
    }

    select:hover {
        background-color: rgba(var(--mainColorRGB), 0.1);
    }

    select:active{
        background-color: rgba(var(--mainColorRGB), 0.2);
    }

    option {
        background-color: white;
    }

    .arrow {
        height: 38px;
        width: 38px;
        background-image: url("/arrow.png");
        background-size: 31px;
        background-position: top;
        background-repeat: no-repeat;
    }

    .arrow.reverse {
        scale: -1 1;
    }
</style>