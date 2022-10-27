import mockSchedule from "$lib/mockSchedule.json"

/** @type {import('./$types').PageLoad} */
export function load({params}) {
    return {
        spec: params.spec,
        schedule: mockSchedule,
    };
}