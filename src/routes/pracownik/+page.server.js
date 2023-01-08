import { env } from '$env/dynamic/private';
import axios from "axios"

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {

    let facultyId = 6
    let faculty = "Szukaj Pracownika"

    console.log(facultyId)
    let pageData = []
    let facultyData = await axios.get(env.API_URL + "/faculties", { headers: {Authorization: "Bearer " + env.REMOTE_KEY}})
    for(let i = 1; i <= 5; i++) {
        let facultyData = await axios.get(env.API_URL + "/lecturers?faculty=" + i, { headers: {Authorization: "Bearer " + env.REMOTE_KEY}})
        pageData.push({facultyId: i, data: facultyData.data.data})
    }


    // if (params.faculty != "wzi")
    //     throw error(404, "Not Found")

    return {
        facultyId: facultyId,
        faculty: faculty,
        data: pageData,
        facultyData: facultyData.data.data
    };
}
