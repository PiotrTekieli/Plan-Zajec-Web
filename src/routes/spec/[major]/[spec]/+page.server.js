import { env } from '$env/dynamic/private';
import axios from "axios";

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {

    let schedule = await axios.get(env.API_URL + "/majors/" + params.major + "/specializations/" + params.spec, { headers: {Authorization: "Bearer " + env.REMOTE_KEY}})


    return {
        spec: params.spec,
        schedule: schedule.data.data,
    };
}