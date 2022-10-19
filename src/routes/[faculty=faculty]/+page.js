import wzi from "$lib/mockJsonWzi.json"

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({params}) {
    return {
        faculty: params.faculty,
        data: params.faculty == "wzi" ? wzi.course : null
    };
}