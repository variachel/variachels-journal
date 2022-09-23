import { log } from './util.js'
import { registerSettings } from './settings.js'

export class VariachelsJournal {
    static modulename = 'variachels-journal'
}

Hooks.once('init', async () => {
    registerSettings()
    log("Variachel's Journal v2.1.0 | Ready.")
})
