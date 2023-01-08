/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return /^(wzi|wa|wm|wf|era)$/.test(param)
}