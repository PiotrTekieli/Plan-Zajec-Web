import wzi from "$lib/mockJsonWzi.json"

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

    return {
        faculty: faculty,
        data: params.faculty == "wzi" ? wzi.course : null
    };
}