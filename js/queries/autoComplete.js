const AutoComplete = (() => {
    const init = (editor, datatables) => {
        
        var allTables = {}
        datatables.forEach(element => {
            allTables[element] = []
        });
        console.log(allTables)
        CodeMirror.commands.autocomplete = function (cm) {
            CodeMirror.showHint(cm, CodeMirror.hint.sql, { 
                tables: allTables
            })
            $('.CodeMirror-hints').css('z-index','99999')
        }
    }

    return {
        init: (editor, tables) => {
            init(editor, tables)
        }
    }
})()