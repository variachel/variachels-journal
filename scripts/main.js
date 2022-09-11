import { log } from './util.js'

const debouncedReload = foundry.utils.debounce(
    () => window.location.reload(),
    500
)

function injectCSS() {
    const head = document.getElementsByTagName('head')[0]
    const mainCss = buildCSSLink()
    head.append(mainCss, head.lastChild)
}

function buildCSSLink() {
    const mainCss = document.createElement('link')
    mainCss.setAttribute('rel', 'stylesheet')
    mainCss.setAttribute('type', 'text/css')
    mainCss.setAttribute('href', 'modules/variachels-journal/css/styles.css')
    mainCss.setAttribute('media', 'all')
    return mainCss
}

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
                        title: game.i18n.localize('variachels-journal.Base'),
                        block: 'div',
                        classes: 'variachels-journal',
                        wrapper: true,
                    },
                    {
                        title: game.i18n.localize('variachels-journal.Header'),
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
                            'variachels-journal.ImageWrapper'
                        ),
                        block: 'div',
                        classes: 'journal-image-margin',
                        wrapper: true,
                    },
                    {
                        title: game.i18n.localize(
                            'variachels-journal.CharacterImage'
                        ),
                        block: 'img',
                        classes: 'journal-image',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize(
                            'variachels-journal.Centered'
                        ),
                        block: 'div',
                        classes: 'centered',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize(
                            'variachels-journal.CircleImage'
                        ),
                        block: 'img',
                        classes: 'journal-image-circle',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize(
                            'variachels-journal.4ColGrid'
                        ),
                        block: 'div',
                        classes: 'grid-container',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize(
                            'variachels-journal.Information'
                        ),
                        block: 'div',
                        classes: 'highlight information',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize('variachels-journal.Warning'),
                        block: 'div',
                        classes: 'highlight warning',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize('variachels-journal.Error'),
                        block: 'div',
                        classes: 'highlight error',
                        wrapper: false,
                    },
                    {
                        title: game.i18n.localize('variachels-journal.Dark'),
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

    /*
        Error occurs without the game.ready check, however, the game is NOT ready at the point of calling the updateDefaultSheets.
        The following code therefore is placing an empty object in the sheets. Which, in fact, the call to Journal.registerSheet() already does
    */
    const settings = game.ready ? game.settings.get('core', 'sheetClasses') : {}
    DocumentSheetConfig.updateDefaultSheets(settings)
})

Hooks.once('init', async () => {
    game.settings.register('variachels-journal', 'disable-all-styles', {
        name: 'Disable all styles?',
        hint: 'Remove all journal styling.',
        scope: 'client',
        type: Boolean,
        default: false,
        config: true,
        onChange: () => {
            debouncedReload()
        },
    })

    if (!game.settings.get('variachels-journal', 'disable-all-styles')) {
        injectCSS()
        log("Variachel's Journal v2.0.1 | Ready.")
    }
})
