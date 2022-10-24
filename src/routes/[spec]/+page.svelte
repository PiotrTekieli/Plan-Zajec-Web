<script>
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

    <select on:change={() => SubmitWeek()} bind:this={selectElement}>
        <option value=1>Test 1</option>
        <option value=2>Test 2</option>
    </select>

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