export class VariachelsJournalSheet extends JournalTextPageSheet {
    activateEditor(name, options = {}, initialContent = '') {
        const hasButton = button && button.classList.contains('editor-edit')
        options.plugins = _configureProseMirrorPlugins(name, hasButton)

        // {
        //     menu: APSJMenu.build(ProseMirror.defaultSchema, {
        //         onSave: () => this.saveEditor(name, { remove: false }),
        //     }),
        // }
        return super.activateEditor(name, options, initialContent)
    }

    _configureProseMirrorPlugins(name, { remove = true } = {}) {
        return {
            menu: ProseMirror.ProseMirrorMenu.build(ProseMirror.defaultSchema, {
                destroyOnSave: remove,
                onSave: () => this.saveEditor(name, { remove }),
            }),
            keyMaps: ProseMirror.ProseMirrorKeyMaps.build(
                ProseMirror.defaultSchema,
                {
                    onSave: () => this.saveEditor(name, { remove }),
                }
            ),
        }
    }
}
