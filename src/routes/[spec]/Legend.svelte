<script>
    /** @type {Array<any>} */
    export let data
    /** @type {Array<any>} */
    export let secondaryLegends = []

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
</script>

<link href="./table.css">

<div>
    <table>
        <tr>
            <th>Przedmiot</th>
            <th>Nazwa</th>
        </tr>

        {#each data as element}
        <tr>
            <td>{element.subject}</td>
            <td>{element.name}</td>
        </tr>
        {/each}
    </table>

    <span>Informacja "1h [x/-]" lub "1h [-/x]" oznacza, że zajęcią trwają w tym bloku 45 minut i zaplanowane są odpowiednio w pierwszej lub drugiej jego połowie.</span>

    {#if secondaryLegends.length}
        {#each secondaryLegends as legend}
            <h5>{legend.name}</h5>
            <table>
                <tr>
                    <th>Przedmiot</th>
                    <th>Nauczyciel</th>
                    <th>Sala</th>
                </tr>

                {#each legend.items as element}
                    <tr>
                        <td>{element.subject}</td>
                        <td>{element.teacher}</td>
                        <td>{element.classroom}</td>
                    </tr>
                {/each}

            </table>
        {/each}
    {/if}
</div>

<style>
    div {
        width: 300px;
        margin-top: 2em;
        margin-right: 12px;
    }

    table {
        width: 100%;
        border: 1px solid rgba(var(--mainColorRGB), 0.5);
    }

    table td, table th {
        padding: 8px 12px;
        border: 1px solid rgba(var(--mainColorRGB), 0.5);
        border-width: 1px 0px;
    }

    table th {
        background-color: var(--mainColor);
        color: white;
    }

    table tr:hover {
        background-color: rgba(var(--mainColorRGB), 0.1);
    }

    h5 {
        margin-top: 12px;
    }

    span {
        margin: 16px 0px;
        display: block;
    }

</style>