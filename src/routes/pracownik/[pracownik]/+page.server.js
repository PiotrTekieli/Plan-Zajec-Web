import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import axios from "axios"

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {

    let pageData = await axios.get(env.API_URL + "/lecturers/" + params.pracownik, { headers: {Authorization: "Bearer " + env.REMOTE_KEY}}).catch(err => {
        throw error(err.response.status, err.message)
    })

    if (!pageData.data.data.schedule)
        throw error(404, "Not Found")

    return {
        data: pageData.data.data,
    };
}
