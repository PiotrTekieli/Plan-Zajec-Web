<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    /** @type {Boolean} */
    export let active
    /** @type {String} */
    export let name

    let fill = ""
    let stroke = ""

    UpdateColor()

    function Favorite() {
        active = !active

        /** @type {Array<String> | null} */
        let favoriteList

        try {
            favoriteList = JSON.parse(localStorage.getItem('favoriteList') ?? "")
        }
        catch (error) {
            favoriteList = null
        }
        if (!favoriteList)
            favoriteList = []


        if (active)
            favoriteList.push(name)
        else
            favoriteList.splice(favoriteList.indexOf(name), 1)


        localStorage.setItem('favoriteList', JSON.stringify(favoriteList))

        console.log(active, favoriteList)

        UpdateColor()
        dispatch('favorite', {
			name: name
		});
    }

    function UpdateColor() {
        if (active) {
            fill = "#F3C74B"
            stroke = "#0000"
        }
        else {
            fill = "#160E4A20"
            stroke = "#160E4A40"
        }
    }

</script>

<style>
    button {
        border: none;
        background-color: transparent;
    }
    button:hover {
        background-color: transparent;
    }

    button:hover path {
        transition: fill .15s ease-in-out !important;
        fill: #F3C74B !important;
        stroke: #160E4A40 !important;
    }

    button:active {
        background-color: transparent;
    }
</style>

<button on:click={Favorite}>
    <svg id="stars"  viewBox="-1 -1 18 18" width=16 height=16 version="1.1">
        <path fill={fill} stroke={stroke} stroke-width=2
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
        />
    </svg>
</button>