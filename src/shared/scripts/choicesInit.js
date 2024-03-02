const initChoices = (name) => {
    import('choices.js').then((module) => {
        if (typeof document !== 'undefined') {
            const selectElems = document.querySelectorAll(name)
            selectElems.forEach((select) => {
                new module.default(select, {
                    itemSelectText: '',
                    searchEnabled: false,
                    shouldSort: false,
                })
            })
        }
    })
}

export default initChoices