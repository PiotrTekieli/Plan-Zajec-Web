<script>
    /** @type {import('./$types').PageData} */
    export let data

    console.log(data.schedule)
    // @ts-ignore
    let groups = data.schedule.groups
</script>



<div class="px-5 py-4 mb-5 w-100">
    <h3>{data.spec}</h3>

    {groups[0].name}
    <table>
        <tr>
            <td>Poniedziałek {groups[0].days[0].date}</td>
        </tr>
        <tr>
            <td>{groups[0].days[0].schedule[0].teacher}</td>
        </tr>
    </table>
</div>