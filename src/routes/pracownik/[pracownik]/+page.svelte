<script>
	import { page } from '$app/stores';
	import { extractDate, getWeek, getWeeks, getDateString, reverseDate } from '$lib/DateHelper';
    import Legend from '../../Legend.svelte';
	import LecturerScheduleTable from './LecturerScheduleTable.svelte';
	// import ScheduleTable from './ScheduleTable.svelte';


    /** @type {import('./$types').PageServerData} */
    export let data

    let thisWeek = getWeek(new Date())
    let weekList = getWeeks(new Date(reverseDate(data.data.schedule.content[0].date)), new Date(reverseDate(data.data.schedule.content[data.data.schedule.content.length-1].date)))

    let pageData = JSON.parse(JSON.stringify(data.data.schedule.content))
    LimitWeeks()
    console.log(pageData)

    /** @type {HTMLSelectElement} */
    let selectWeek
    function SubmitWeek(offset = 0) {
        let weekIndex = Number.parseInt(selectWeek.value)
        thisWeek = weekList[weekIndex + offset]

        LimitWeeks()
    }


    function LimitWeeks() {
        pageData = JSON.parse(JSON.stringify(data.data.schedule.content))

        if (thisWeek.number == -1)
            return

        let start = new Date(thisWeek.start)
        let end = new Date(thisWeek.end)


        for (let i = 0; i < pageData.length; i++) {
            let date = new Date(reverseDate(pageData[i].date))

            if (date < start) {
                pageData.splice(i, 1)
                i--
            } else if (date > end) {
                pageData.splice(i, pageData.length)
                break
            }
        }
        console.log(pageData)
        FillWithEmptyDays()
    }

    function FillWithEmptyDays() {
        let compare = new Date(thisWeek.start)
        for (let day = 0; day < 7; day++) {
            let date = new Date("0000-00-00")
            try {
                date = new Date(reverseDate(pageData[day].date))
            }
            catch (e) {
                pageData.splice(day, 0, GenerateDay(compare))
                compare.setDate(compare.getDate() + 1)
                continue
            }
            // @ts-ignore
            if (date > compare) {
                pageData.splice(day, 0, GenerateDay(compare))
            }
            compare.setDate(compare.getDate() + 1)
        }
    }

    /** @param {Date} date */
    function GenerateDay(date) {
        let rows = []
        for (let i = 0; i < 7; i++) {
            rows.push({
                class: "",
                classroom: "",
                subject: "",
                hours: ""
            })
        }
        return {
            date: getDateString(date).split("-").reverse().join("-"),
            dailySchedule: rows,
        }
    }

</script>



<h3>{data.data.name}</h3>
<br>

<div class="controls">
    {#if thisWeek.number != -1}
    <div>
        <button class="btn arrow reverse" on:click={() => {
            if (weekList[0].number != thisWeek.number)
                SubmitWeek(-1)
        }}></button>
        <select on:change={() => SubmitWeek()} bind:this={selectWeek}>
            {#each weekList as week, i}
                <option value={i} selected={ thisWeek.number == week.number ? true : false }>Tydzień {week.number} ({week.start} - {week.end})</option>
            {/each}
        </select>
        <button class="btn arrow" on:click={() => {
            if (weekList[weekList.length-1].number != thisWeek.number)
                SubmitWeek(1)
        }}></button>
    </div>
    {/if}


    <button class="btn button" on:click={() => {
        if (thisWeek.number != -1)
            thisWeek = { number: -1, start: null, end: null}
        else
            thisWeek = getWeek(new Date())
        LimitWeeks()
    }}>

    {#if thisWeek.number != -1}
        Cały Semestr
    {:else}
        Tygodniowo
    {/if}
    </button>
</div>

<div class="schedules">
    <Legend data={data.data.schedule.legend}></Legend>
    <LecturerScheduleTable data={pageData} legend={data.data.schedule.legend}></LecturerScheduleTable>
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