<style>
    .Tooltip {
        position: relative;
        display: inline-block;
    }

    .tooltiptext {
        visibility: hidden;
        white-space: nowrap;
        transition: opacity .15s ease-in-out !important;
        opacity: 0;
        background-color: #1F1F1F;
        color: #fff;
        text-align: center;
        padding: 5px 10px;
        border-radius: 6px;
        user-select: none;
        pointer-events: none;

        position: absolute;
        z-index: 1;
        bottom: 130%;
        left: 50%;
        margin-left: 0;
        translate: -50%;
    }

    .Tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }

    .tooltiptext::after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }
</style>

<script>
    /** @type {String} */
    export let text


</script>

{#if text}
    <div class="Tooltip">
        <slot></slot>
        <span class="tooltiptext">{text}</span>
    </div>
{:else}
    <slot></slot>
{/if}