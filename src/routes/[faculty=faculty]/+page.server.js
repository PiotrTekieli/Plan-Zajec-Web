import { env } from '$env/dynamic/private';
import axios from "axios"

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {

    let facultyId = 0
    let faculty = ""
    switch (params.faculty) {
        case 'wa':
            facultyId = 1
            faculty = "Wydział Nauk o Zdrowiu i Kulturze Fizycznej"
            break
        case 'wzi':
            facultyId = 2
            faculty = "Wydział Nauk Technicznych i Ekonomicznych"
            break
        case 'wm':
            facultyId = 3
            faculty = "Wydział Nauk Społecznych i Humanistycznych"
            break
        case 'wf':
            facultyId = 4
            faculty = "Wychowanie Fizyczne"
            break
        case 'era':
            facultyId = 5
            faculty = "Erasmus"
            break
    }

    let pageData = await axios.get(env.API_URL + "/faculties/" + facultyId + "/majors", { headers: {Authorization: "Bearer " + env.REMOTE_KEY}})

    return {
        facultyId: facultyId,
        faculty: faculty,
        data: pageData.data.data,
    };
}
