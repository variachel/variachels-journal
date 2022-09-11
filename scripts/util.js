/* Just because I don't want to see console.log everywhere */
export function log(logSubject) {
    console.log(logSubject)
}

export function error(errorTxt) {
    console.error(errorTxt)
}

export function createBaseJournalEntry(title, content) {
    return new JournalEntryPage({
        name: title,
        text: {
            content: content,
            markdown: '',
            format: 1,
        },
        type: 'text',
    })
}
