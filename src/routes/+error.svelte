<script>
    import { page } from '$app/stores';
</script>

<h3>{$page.status}. <span>Wystąpił błąd</span></h3>
{#if $page.status == 404}
    URL <i>{$page.url.toString().substring($page.url.toString().indexOf("/", 7))}</i> nie zostało znalezione na stronie
{:else}
    {$page.error?.message}
{/if}

<style>
    span {
        color: #0007
    }
</style>