<style>
    .headerBackground {
        position: fixed;
        height: 5em;
        box-shadow: 0px -8px 4px 12px #0004;
        background-color: var(--mainColor);
        width:100%;
        z-index: 9;
    }
    .header {
        position: sticky;
        width: max-content;
        top: 0;
        left: 0;
        color: white;
        height: 5em;
        padding: 0;
        justify-content: flex-start;
        z-index: 10;
    }

    .header img {
        height: 100%;
        margin-left: 3em;
        z-index: 1;
    }

    .header span {
        letter-spacing: 0.12em;
        font-weight: lighter;
        font-size: 24px;
        text-transform: uppercase;
    }

    .sidebar {
        position: sticky;
        top: 5em;
        width: 280px;
        flex-shrink: 0;
        min-height: 500px;
    }

    .sidebarContent {
        position: sticky;
        top: calc(5em + 3em);
    }

    .content {
        display: flex;
    }

    .button {
        text-align: left;
        width: 100%;
        height: 65px;
        border-radius: 0;
    }

    .button:hover {
        background-color: rgba(var(--mainColorRGB), 0.1);
    }

    .button:active {
        background-color: rgba(var(--mainColorRGB), 0.2);
    }

    .active {
        background-color: rgba(var(--mainColorRGB), 0.1);
    }

    .active:hover {
        background-color: rgba(var(--mainColorRGB), 0.2);
    }

    :global(.top) {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        max-width: 1200px;
    }

    :global(.top input) {
        padding: 4px 8px;
        padding-right: 30px;
        width: 250px;
        margin-left: 12px;
        border-radius: 0.1rem;
        box-shadow: 0px 0px 0px 1px #000;
        border: none;
        background-image: url("/search.png");
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: right 6px top 50%;
    }

    :global(.top input:focus) {
        box-shadow: 0px 0px 0px 2px#1786CA;
        outline: none;
    }

    :global(a) {
        text-decoration: none;
        color: #1786CA;
    }

    :global(a:hover) {
        text-decoration: underline;
    }

</style>

<script>
    /** @type {import('./$types').LayoutData} */
    export let data
</script>

<div class="headerBackground"></div>

<div class="navbar header">
    <img src="/collegium.png" alt="Collegium Witelona"/>
    <span class="px-5">
        Harmonogram - Collegium Witelona
    </span>
</div>

<div class="content">
    <div class="sidebar">
        <div class="sidebarContent">
            <a href="/wa"><button class="btn button" class:active={data.faculty == 'wa'}>Wydział Nauk o Zdrowiu i Kulturze Fizycznej</button></a>
            <a href="/wzi"><button class="btn button" class:active={data.faculty == 'wzi'}>Wydział Nauk Technicznych i Ekonomicznych</button></a>
            <a href="/wm"><button class="btn button" class:active={data.faculty == 'wm'}>Wydział Nauk Społecznych i Humanistycznych</button></a>
            <a href="/wf"><button class="btn button" class:active={data.faculty == 'wf'}>Wychowanie Fizyczne</button></a>
            <a href="/era"><button class="btn button" class:active={data.faculty == 'era'}>Erasmus</button></a>
            <a href="/pracownik"><button class="btn button" class:active={data.faculty == 'pracownik'}>Szukaj Pracownika</button></a>
        </div>
    </div>

    <div class="px-5 py-4 mb-5 w-100">
        <slot></slot>
    </div>
</div>