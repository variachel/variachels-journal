import { log } from './util.js'
import { registerSettings } from './settings.js'

Hooks.on('init', (documentTypes) => {
    libWrapper.register(
        'variachels-journal',
        'JournalSheet.prototype.activateEditor',
        function (wrapped, name, options = {}, ...args) {
            if (!options.style_formats) {
                options.style_formats = [
                    {
                        title: "Variachel's Journal",
                        items: [
                            {
                                title: 'Secret',
                                block: 'section',
                                classes: 'secret',
                                wrapper: true,
                            },
                        ],
                    },
                ]
            }

            options.style_formats.push({
                title: game.i18n.localize('variachels-journal.JournalStyles'),
                items: [
                    {
                        title: game.i18n.localize('VariachelsJournal.Base'),
                        block: 'div',
                        classes: 'variachels-journal',
                        wrapper: true,
                    },
                    {
                        title: game.i18n.localize('VariachelsJournal.Header'),
                        block: 'div',
                        classes: 'journal-header',
                        wrapper: true,
                    },
                    {
                        title: game.i18n.localize('variachels-journal.Content'),
                        block: 'div',
                        classes: 'journal-content',
                        wrapper: true,
                    },
                    {
                        title: game.i18n.localize(
                            'VariachelsJournal.ImageWrapper'
                        ),
                        block: 'div',
                        classes: 'journal-image-margin',
                        wrapper: true,
                    },
                    {
                        title: game.i18n.localize(
                            'VariachelsJournal.CharacterImage'
                        ),
                        block: 'img',
                        classes: 'journal-image',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize('VariachelsJournal.Centered'),
                        block: 'div',
                        classes: 'centered',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize(
                            'VariachelsJournal.CircleImage'
                        ),
                        block: 'img',
                        classes: 'journal-image-circle',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize('VariachelsJournal.4ColGrid'),
                        block: 'div',
                        classes: 'grid-container',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize(
                            'VariachelsJournal.Information'
                        ),
                        block: 'div',
                        classes: 'highlight information',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize('VariachelsJournal.Warning'),
                        block: 'div',
                        classes: 'highlight warning',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize('VariachelsJournal.Error'),
                        block: 'div',
                        classes: 'highlight error',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize('VariachelsJournal.Dark'),
                        block: 'div',
                        classes: 'highlight dark',
                        wrapper: false,
                    },
                ],
            })

            return wrapped(name, (options = {}), ...args)
        },
        'WRAPPER'
    )

    const settings = game.ready ? game.settings.get('core', 'sheetClasses') : {}
    DocumentSheetConfig.updateDefaultSheets(settings)
})

Hooks.once('init', async () => {
    registerSettings()
    log("Variachel's Journal v2.1.0 | Ready.")
})
