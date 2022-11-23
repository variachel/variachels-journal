export class VariachelsJournalSheet extends JournalSheet {
    _getPageData() {
        const _pageData = super._getPageData()
        if (_pageData[0]?.number === 0) _pageData.forEach((p) => p.number++)
        return _pageData
    }
}
