import { VariachelsJournal } from './main.js'
import { i18n } from './util.js'

export const registerSettings = function () {
    const debouncedReload = foundry.utils.debounce(function () {
        window.location.reload()
    }, 100)

    let backgroundOptions = {
        cobblestone: i18n('VariachelsJournal.cobblestone'),
        'dark-fish-skin': i18n('VariachelsJournal.dark-fish-skin'),
        'egg-shell': i18n('VariachelsJournal.egg-shell'),
        grunge: i18n('VariachelsJournal.grunge'),
        hexellence: i18n('VariachelsJournal.hexellence'),
        'little-plusses': i18n('VariachelsJournal.little-plusses'),
        'mocha-grunge': i18n('VariachelsJournal.mocha-grunge'),
        'old-moon': i18n('VariachelsJournal.old-moon'),
        paper: i18n('VariachelsJournal.paper'),
        sandpaper: i18n('VariachelsJournal.sandpaper'),
        'squared-metal': i18n('VariachelsJournal.squared-metal'),
        'vintage-concrete': i18n('VariachelsJournal.vintage-concrete'),
        'white-waves': i18n('VariachelsJournal.white-waves'),
    }

    game.settings.register(VariachelsJournal.modulename, 'disable-all-styles', {
        name: i18n('VariachelsJournal.disable-all-styling'),
        hint: i18n('VariachelsJournal.disable-all-styling-hint'),
        scope: 'world',
        type: Boolean,
        default: false,
        config: true,
        requiresReload: true,
    })

    const stylesDisabled = game.settings.get(
        VariachelsJournal.modulename,
        'disable-all-styles'
    )

    if (!stylesDisabled) {
        injectCustomCSS(buildCSS('styles'))
    }

    game.settings.register(VariachelsJournal.modulename, 'journal-background', {
        name: i18n('VariachelsJournal.change-background'),
        hint: i18n('VariachelsJournal.change-background-hint'),
        scope: 'world',
        config: true,
        default: 'egg-shell',
        choices: backgroundOptions,
        type: String,
        // onChange: debouncedReload,
        requiresReload: true,
    })

    const background = game.settings.get(
        VariachelsJournal.modulename,
        'journal-background'
    )

    if (!stylesDisabled && background) {
        injectCustomCSS(buildCSS(background))
    }
}

function injectCustomCSS(customCss) {
    const head = document.getElementsByTagName('head')[0]
    head.append(customCss, head.lastChild)
}

function buildCSS(style) {
    const css = document.createElement('link')
    css.setAttribute('rel', 'stylesheet')
    css.setAttribute('type', 'text/css')
    css.setAttribute('href', 'modules/variachels-journal/css/' + style + '.css')
    css.setAttribute('media', 'all')
    return css
}
