import { VariachelsJournalSheet } from './editor.js'
import { registerSettings } from './settings.js'
import { i18n, log } from './util.js'

export class VariachelsJournal {
    static _moduleName = 'variachels-journal'
}

Hooks.on('init', async () => {
    Journal.registerSheet(
        VariachelsJournal._moduleName,
        VariachelsJournalSheet,
        {
            makeDefault: true,
            label: i18n('VariachelsJournal.sheet-label'),
        }
    )
    registerSettings()
})

Hooks.once('ready', async () => {
    log("Variachel's Journal v2.5.0 | Ready.")
})
