/** @type {import('./$types').PageData} */
import wzi from "$lib/mockJsonWzi.json"

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({params}) {
    if (/^(wzi|wa|wm)$/.test(params.wydzial))
        return {
            wydzial: params.wydzial,
            data: params.wydzial == "wzi" ? wzi.kierunek : null
        };
    else
        throw error(404, "Not Found")
}