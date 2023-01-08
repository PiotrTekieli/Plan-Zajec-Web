<script>
	import Star from "./Star.svelte";


    /** @type {{ id: Number; name: String; specializations: [{id: Number, name: String}] }} */
    export let data
    /** @type {Boolean} */
    export let favorite = false
</script>

<style>
    div {
        background-color: rgba(var(--mainColorRGB), 0.1);
        width: 100%;
        min-width: 850px;
        max-width: 1200px;
        padding: 8px 16px;
        margin: 8px 0px;
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    span {
        display: inline-block;
        white-space: nowrap
    }

    .links {
        margin-left: auto;
        padding-left: 1em;
    }
</style>

<div>
    <span>
        <Star active={favorite} name={data.name} on:favorite></Star>
        {data.name}
    </span>
    <span class="links">
        {#each data.specializations as spec, i}
            <a href={"/spec/" + data.id + "/" + spec.id}>{spec.name}</a>
            {#if data.specializations.length-1 != i}{@html " | "}{/if}
        {/each}
    </span>
</div>