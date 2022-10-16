/** @type {import('./$types').PageData} */
import wzi from "$lib/mockJsonWzi.json"

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({params}) {
    if (/^(wzi|wa|wm)$/.test(params.kierunek))
        return {
            kierunek: params.kierunek,
            data: params.kierunek == "wzi" ? wzi.group : null
        };
    else
        throw error(404, "Not Found")
}