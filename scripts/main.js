import { log } from './util.js'
import { VariachelsJournalSheet } from './editor.js'
import { registerSettings } from './settings.js'

export class VariachelsJournal {
    static modulename = 'variachels-journal'
}

// DocumentSheetConfig.registerSheet(
//     JournalEntryPage,
//     VariachelsJournal.modulename,
//     VariachelsJournalSheet,
//     {
//         types: ['text'],
//         makeDefault: true,
//         label: 'Varis Editor',
//     }
// )

Hooks.once('init', async () => {
    registerSettings()
    log("Variachel's Journal v2.3.0 | Ready.")
})
