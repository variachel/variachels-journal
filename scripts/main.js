import {VariachelsJournalSheet} from './editor.js'
import {registerSettings} from './settings.js'
import {log} from './util.js'

export class VariachelsJournal {
    static _moduleName = 'variachels-journal'
}

Hooks.on('init', async () => {
    Journal.registerSheet(VariachelsJournal._moduleName, VariachelsJournalSheet, {
        makeDefault: true, label: "variachels-journal.sheet-label",
    })
    registerSettings();
})

Hooks.once('ready', async () => {
    const ready = "variachels-journal.on-start.message";
    log(ready);
})
