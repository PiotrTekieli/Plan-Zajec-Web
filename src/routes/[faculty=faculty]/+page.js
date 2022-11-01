import wzi from "$lib/mockJsonWzi.json"
import { error } from "@sveltejs/kit"

/** @type {import('./$types').PageLoad} */
export function load({params}) {

    let pageData = params.faculty == "wzi" ? wzi.course : null
    let faculty = ""
    switch (params.faculty) {
        case 'wa':
            faculty = "Wydział Nauk o Zdrowiu i Kulturze Fizycznej"
            break
        case 'wzi':
            faculty = "Wydział Nauk Technicznych i Ekonomicznych"
            break
        case 'wm':
            faculty = "Wydział Nauk Społecznych i Humanistycznych"
            break
    }

    /** @type {string[] | null} */
    let favoriteList = null
    if (typeof window !== 'undefined') {
        favoriteList = JSON.parse(localStorage.getItem('favoriteList') ?? "")
    }

    if (params.faculty != "wzi")
        throw error(404, "Not Found")

    return {
        faculty: faculty,
        data: wzi.course,
        favoriteList: favoriteList
    };
}