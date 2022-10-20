<script>
	import Star from "./Star.svelte";


    /** @type {{ name: String; spec: Array<String> }} */
    export let data
    /** @type {Boolean} */
    export let favorite = false

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
        white-space: nowrap
    }

    .links {
        margin-left: 1em;
    }
</style>

<div>
    <span>
        <Star active={favorite}></Star>
        {data.name}
    </span>
    <span class="links">
        {#each data.spec as link, i}
            <a href={"/" + /^[a-z\dąęóśżźćńł]+/i.exec(link)}>{link}</a>
            {#if data.spec.length-1 != i}{@html " | "}{/if}
        {/each}
    </span>
</div>