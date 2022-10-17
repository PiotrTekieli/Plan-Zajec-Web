<script>
    /** @type {{ name: String; spec: Array<String> }} */
    export let data

    console.log(data.spec)
</script>

<style>
    div {
        background-color: rgba(var(--mainColorRGB), 0.1);
        width: 100%;
        max-width: 1000px;
        padding: 8px 16px;
        margin: 8px 0px;
        display:flex;
        justify-content: space-between;
    }

    a {
        text-decoration: none;
        color: #1786CA;
    }

    a:hover {
        text-decoration: underline;
    }

    span {
        display: inline-block;
        white-space: pre
    }

    .links {
        margin-left: 1em;
    }
</style>

<div>
    <span>
        {data.name}
    </span>
    <span class="links">
        {#each data.spec as link, i}
            <a href="/#">{link}</a>
            {#if data.spec.length-1 != i}{@html " | "}{/if}
        {/each}
    </span>
</div>