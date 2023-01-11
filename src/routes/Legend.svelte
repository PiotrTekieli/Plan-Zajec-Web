<script>
    /** @type {Array<any>} */
    export let data
    /** @type {Array<any>}} */
    export let secondaryLegends = []

    console.log(secondaryLegends)
</script>

<link href="./table.css">

<div>
    <table>
        <tr style="overflow-wrap: normal">
            <th>Przedmiot</th>
            <th>Nazwa</th>
        </tr>

        {#each data as element}
        <tr>
            <td>{element.abbreviation}</td>
            <td>{element.fullname}</td>
        </tr>
        {/each}
    </table>

    <span>Informacja "1h [x/-]" lub "1h [-/x]" oznacza, że zajęcią trwają w tym bloku 45 minut i zaplanowane są odpowiednio w pierwszej lub drugiej jego połowie.</span>

    {#if secondaryLegends.length}
        {#each secondaryLegends as legend, i}
            <h5>{legend.name}</h5>
            <table>
                <tr style="overflow-wrap: normal">
                    <th>Przedmiot</th>
                    <th>Nauczyciel</th>
                    <th style="min-width: 55px">Sala</th>
                </tr>

                {#each legend.items as element}
                    <tr>
                        <td>{element[0]}</td>
                        <td>{element[1]}</td>
                        <td>{element[2]}</td>
                    </tr>
                {/each}

            </table>
        {/each}
    {/if}
</div>

<style>
    div {
        width: 325px;
        margin-top: 2em;
        margin-right: 12px;
    }

    table {
        width: 100% !important;
        overflow-wrap: anywhere;
        border: 1px solid rgba(var(--mainColorRGB), 0.5);
    }

    table td, table th {
        padding: 8px 8px;
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