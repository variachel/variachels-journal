import { log } from './util.js'

export const registerSettings = function () {
    let modulename = 'variachels-journal'

    const debouncedReload = foundry.utils.debounce(function () {
        window.location.reload()
    }, 100)

    let backgroundOptions = {
        cobblestone: game.i18n.localize('VariachelsJournal.cobblestone'),
        'dark-fish-skin': game.i18n.localize(
            'VariachelsJournal.dark-fish-skin'
        ),
        'egg-shell': game.i18n.localize('VariachelsJournal.egg-shell'),
        grunge: game.i18n.localize('VariachelsJournal.grunge'),
        hexellence: game.i18n.localize('VariachelsJournal.hexellence'),
        'little-plusses': game.i18n.localize(
            'VariachelsJournal.little-plusses'
        ),
        'mocha-grunge': game.i18n.localize('VariachelsJournal.mocha-grunge'),
        'old-moon': game.i18n.localize('VariachelsJournal.old-moon'),
        paper: game.i18n.localize('VariachelsJournal.paper'),
        sandpaper: game.i18n.localize('VariachelsJournal.sandpaper'),
        'squared-metal': game.i18n.localize('VariachelsJournal.squared-metal'),
        'vintage-concrete': game.i18n.localize(
            'VariachelsJournal.vintage-concrete'
        ),
        'white-waves': game.i18n.localize('VariachelsJournal.white-waves'),
    }

    game.settings.register(modulename, 'disable-all-styles', {
        name: game.i18n.localize('VariachelsJournal.disable-all-styling'),
        hint: game.i18n.localize('VariachelsJournal.disable-all-styling-hint'),
        scope: 'client',
        type: Boolean,
        default: false,
        config: true,
        onChange: debouncedReload,
    })

    const stylesDisabled = game.settings.get(modulename, 'disable-all-styles')

    if (!stylesDisabled) {
        injectCSS()
    }

    game.settings.register(modulename, 'journal-background', {
        name: game.i18n.localize('VariachelsJournal.change-background'),
        hint: game.i18n.localize('VariachelsJournal.change-background-hint'),
        scope: 'client',
        config: true,
        default: 'grunge',
        choices: backgroundOptions,
        type: String,
        onChange: debouncedReload,
    })

    const background = game.settings.get(modulename, 'journal-background')

    if (!stylesDisabled && background) {
        injectBackgroundCSS(background)
    }
}

function injectCSS() {
    const head = document.getElementsByTagName('head')[0]
    const mainCss = buildMainCSS()
    head.append(mainCss, head.lastChild)
}

function buildMainCSS() {
    const mainCss = document.createElement('link')
    mainCss.setAttribute('rel', 'stylesheet')
    mainCss.setAttribute('type', 'text/css')
    mainCss.setAttribute('href', 'modules/variachels-journal/css/styles.css')
    mainCss.setAttribute('media', 'all')
    return mainCss
}

function injectBackgroundCSS(bgStyle) {
    const head = document.getElementsByTagName('head')[0]
    const mainCss = buildBackgroundCSS(bgStyle)
    head.append(mainCss, head.lastChild)
}

function buildBackgroundCSS(bgStyle) {
    const mainCss = document.createElement('link')
    mainCss.setAttribute('rel', 'stylesheet')
    mainCss.setAttribute('type', 'text/css')
    mainCss.setAttribute(
        'href',
        'modules/variachels-journal/css/' + bgStyle + '.css'
    )
    mainCss.setAttribute('media', 'all')
    return mainCss
}
