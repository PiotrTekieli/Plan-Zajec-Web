import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */

export function load({params}) {
    if (/^(wzi|wa|wm)$/.test(params.spec))
        return {
            spec: params.spec
        };
    else
        throw error(404, "Not Found")
}