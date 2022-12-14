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
        onChange: debouncedReload,
    })

    const stylesDisabled = game.settings.get(
        VariachelsJournal.modulename,
        'disable-all-styles'
    )

    if (!stylesDisabled) {
        injectCustomCSS(buildMainCSS())
    }

    game.settings.register(VariachelsJournal.modulename, 'journal-background', {
        name: i18n('VariachelsJournal.change-background'),
        hint: i18n('VariachelsJournal.change-background-hint'),
        scope: 'world',
        config: true,
        default: 'egg-shell',
        choices: backgroundOptions,
        type: String,
        onChange: debouncedReload,
    })

    const background = game.settings.get(
        VariachelsJournal.modulename,
        'journal-background'
    )

    if (!stylesDisabled && background) {
        injectCustomCSS(buildBackgroundCSS(background))
    }
}

function injectCustomCSS(customCss) {
    const head = document.getElementsByTagName('head')[0]
    head.append(customCss, head.lastChild)
}

function buildMainCSS() {
    const mainCss = document.createElement('link')
    mainCss.setAttribute('rel', 'stylesheet')
    mainCss.setAttribute('type', 'text/css')
    mainCss.setAttribute('href', 'modules/variachels-journal/css/styles.css')
    mainCss.setAttribute('media', 'all')
    return mainCss
}

function buildBackgroundCSS(bgStyle) {
    const backgroundCss = document.createElement('link')
    backgroundCss.setAttribute('rel', 'stylesheet')
    backgroundCss.setAttribute('type', 'text/css')
    backgroundCss.setAttribute(
        'href',
        'modules/variachels-journal/css/' + bgStyle + '.css'
    )
    backgroundCss.setAttribute('media', 'all')
    return backgroundCss
}
