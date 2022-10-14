<style>
    .header {
        background-color: var(--mainColor);
        color: white;
        height: 5em;
        padding: 0;
        box-shadow: 0px -8px 4px 12px #0004;
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
        height: calc(100vh - 5em);
        width: 300px;
        box-shadow: -8px 0px 4px 12px #0004;
    }

    .content {
        display: flex;
    }

    .button {
        text-align: left;
    }

    .button:hover {
        background-color: #160E4A20;
    }

    .button:active {
        background-color: #160E4A40;
    }
</style>

<div class="navbar header">
    <img src="collegium.png" alt="Collegium Witelona"/>
    <span class="px-5">
        Harmonogram - Collegium Witelona
    </span>
</div>

<div class="content">
    <div class="py-5 sidebar">
        <a href="/wa"><button class="btn button">Wydział Nauk o Zdrowiu i Kulturze Fizycznej</button></a>
        <a href="/wzi"><button class="btn button">Wydział Nauk Technicznych i Ekonomicznych</button></a>
        <a href="/wm"><button class="btn button">Wydział Nauk Społecznych i Humanistycznych</button></a>
    </div>

    <slot></slot>
</div>