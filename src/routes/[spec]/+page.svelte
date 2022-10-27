<script>
	import { schedule_update } from 'svelte/internal';
    import Legend from './Legend.svelte';
	import ScheduleTable from './ScheduleTable.svelte';


    /** @type {import('./$types').PageData} */
    export let data

    console.log(data.schedule)
    // @ts-ignore
    let groups = data.schedule.groups
    groups = groups.slice(0,1)



    /** @type {HTMLSelectElement} */
    let selectElement
    function SubmitWeek() {
        console.log(selectElement.value)
    }
</script>



<div class="px-5 py-4 mb-5 w-100">
    <h3>{data.spec}</h3>
    <br>

    <div class="controls">
        <div>
            <button class="btn arrow reverse"></button>
            <select on:change={() => SubmitWeek()} bind:this={selectElement}>
                <option value=1>Tydzień 1 (2022-01-01 - 2022-01-07)</option>
                <option value=2>Tydzień 1 (2022-01-08 - 2022-01-14)</option>
            </select>
            <button class="btn arrow"></button>
        </div>


        <button class="btn button">Cały Semestr</button>

        {#if data.schedule.groups.length > 1}
            <select>
                {#each data.schedule.groups as group}
                    <option value={group.name}>{group.name}</option>
                {/each}
                    <option value="all">Wszystkie grupy</option>
            </select>
        {/if}

    </div>

    <div class="schedules">
        <Legend data={data.schedule.legend} secondaryLegends={data.schedule.secondaryLegends}></Legend>
        <ScheduleTable data={groups} legend={data.schedule.legend}></ScheduleTable>
    </div>
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
        /*border: 2px solid rgba(var(--mainColorRGB), 0.2);*/
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
        transition: background-color .15s ease-in-out !important;
        border-radius: 0.25rem;
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
        background-image: url("arrow.png");
        background-size: 31px;
        background-position: top;
        background-repeat: no-repeat;
    }

    .arrow.reverse {
        scale: -1 1;
    }
</style>