import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import axios from "axios";

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {

    let schedule = await axios.get(env.API_URL + "/majors/" + params.major + "/specializations/" + params.spec, { headers: {Authorization: "Bearer " + env.REMOTE_KEY}}).catch(err => {
        throw error(err.response.status, err.message)
    })

    if (!schedule.data.data.groups.length)
        throw error(404, "Not Found")

    return {
        spec: params.spec,
        schedule: schedule.data.data,
    };
}