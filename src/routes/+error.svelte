<script>
    import { page } from '$app/stores';
</script>

<div class="px-5 py-4 mb-5 w-100">
    <h3>{$page.status}. <span>Wystąpił błąd</span></h3>
    {#if $page.status == 404}
        URL <i>{$page.url.toString().substring($page.url.toString().indexOf("/", 7))}</i> nie zostało znalezione na stronie
    {:else}
        {$page.error?.message}
    {/if}
</div>

<style>
    span {
        color: #0007
    }
</style>