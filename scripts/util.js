/* Just because I don't want to see console.log everywhere */
export function log(logSubject) {
    console.log(logSubject)
}

export function error(errorTxt) {
    console.error(errorTxt)
}

export let i18n = (key) => {
    return game.i18n.localize(key)
}
