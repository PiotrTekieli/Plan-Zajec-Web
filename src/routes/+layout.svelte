<style>
    .headerBackground {
        position: fixed;
        height: 5em;
        box-shadow: 0px -8px 4px 12px #0004;
        background-color: var(--mainColor);
        width:100%;
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
        z-index: 1;
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
        height: calc(100vh - 5em);
        width: 300px;
        box-shadow: -8px 0px 4px 12px #0004;
        flex-shrink: 0;
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
    }

    .button:hover {
        background-color: rgba(var(--mainColorRGB), 0.1);
    }

    .button:active {
        background-color: rgba(var(--mainColorRGB), 0.2);
    }


</style>

<div class="headerBackground"></div>

<div class="navbar header">
    <img src="collegium.png" alt="Collegium Witelona"/>
    <span class="px-5">
        Harmonogram - Collegium Witelona
    </span>
</div>

<div class="content">
    <div class="sidebar">
        <div class="sidebarContent">
            <a href="/wa"><button class="btn button">Wydział Nauk o Zdrowiu i Kulturze Fizycznej</button></a>
            <a href="/wzi"><button class="btn button">Wydział Nauk Technicznych i Ekonomicznych</button></a>
            <a href="/wm"><button class="btn button">Wydział Nauk Społecznych i Humanistycznych</button></a>
        </div>
    </div>


    <slot></slot>
</div>