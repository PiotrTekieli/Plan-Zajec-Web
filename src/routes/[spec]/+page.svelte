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

    <button class="btn btn-secondary">&lt;</button>
    <select on:change={() => SubmitWeek()} bind:this={selectElement}>
        <option value=1>Tydzień 1 (2022-01-01 - 2022-01-07)</option>
        <option value=2>Tydzień 1 (2022-01-08 - 2022-01-14)</option>
    </select>
    <button class="btn btn-secondary">&gt;</button>


    <button class="btn btn-secondary">Cały Semestr</button>

    {#if data.schedule.groups.length > 1}
        <select>
            {#each data.schedule.groups as group}
                <option value={group.name}>{group.name}</option>
            {/each}
                <option value="all">Wszystkie grupy</option>
        </select>
    {/if}

    <div class="schedules">
        <Legend data={data.schedule.legend}></Legend>
        <ScheduleTable data={groups} legend={data.schedule.legend}></ScheduleTable>
    </div>
</div>

<style>
    .schedules {
        display: flex;
    }
</style>