import { env } from '$env/dynamic/private';
import axios from "axios"

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {

    let pageData = await axios.get(env.API_URL + "/lecturers/" + params.pracownik, { headers: {Authorization: "Bearer " + env.REMOTE_KEY}})

    return {
        data: pageData.data.data,
    };
}
