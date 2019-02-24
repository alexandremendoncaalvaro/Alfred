const Query = (() => {
    let sqlEditor
    let queryType
    let currentQueryType

    const userToken = Cookies.getCookie('token')

    const begin = () => {
        setDomReferences()
    }

    const setDomReferences = () => {
        sqlEditor = CodeMirror.fromTextArea(document.getElementById('text'), {
            lineNumbers: true,
            theme: "blackboard",
            mode: "text/x-sql",
        })
        sqlEditor.focus()
    }

    const events = () => {
        sqlEditor.on('change', instance => {
            Gotham.validateEasterEggs(instance.getValue())
            queryType = definirTipo(instance.getValue())
            startQueryTypeAlfredAnimation(queryType)
            parameters = createParameters(instance.getValue())
        })
        ExecuteQuery.getTables(userToken).then(tables => {
            AutoComplete.init(sqlEditor, tables)
            sqlEditor.setOption('extraKeys', {
                'F5': editor => {
                    var query = editor.getSelection()
                    console.log('selection: '+query)
                    if(!query)
                        query = editor.getValue()

                    console.log('final: '+query)                    
                    executar(query, parameters)
                },
                'Ctrl-S': editor => {
                    alert('Você está salvando a query')
                },
                'Ctrl-H': () => {
                    window.location.href = "\history.html"
                },
                'Shift-Ctrl-S': () => {
                    console.log('asdasdasd')
                    ExcelExporter.exportExcel('resultTable')
                },
                'Ctrl-Space':"autocomplete"
            })
        })
    }

    const definirTipo = query => {
        query = query.toUpperCase()

        if (queryDeleteValida(query)) {
            queryType = "DELETE"
        } else if (queryUpdateValida(query)) {
            queryType = "UPDATE"
        } else if (queryInsertValida(query)) {
            queryType = "INSERT"
        } else if (querySelectValida(query)) {
            queryType = "SELECT"
        } else {
            queryType = null
        }

        return queryType
    }

    const executar = (query, parameters) => {
        definirTipo(query)
        const queryParameters = getParametersValues(parameters)

        switch (queryType) {
            case "DELETE":
                deleteQuery(query, queryParameters)
                break
            case "UPDATE":
                updateQuery(query, queryParameters)
                break
            case "INSERT":
                insertQuery(query, queryParameters)
                break
            case "SELECT":
                selectQuery(query, queryParameters)
                break
            default:
                alert("Query inválida")
        }
    }

    const deleteQuery = (query, queryParameters) => {
        const requestBody = {
            query: query,
            parameters: queryParameters
        }
        ExecuteQuery.execute(requestBody, userToken, 'v1/delete').then(r => {
            alert(r.message)
        })
    }

    const updateQuery = (query, queryParameters) => {
        const requestBody = {
            query: query,
            parameters: queryParameters
        }
        ExecuteQuery.execute(requestBody, userToken, 'v1/update').then(r => {
            alert(r.message)
        })
    }

    const insertQuery = (query, queryParameters) => {
        const requestBody = {
            query: query,
            parameters: queryParameters
        }
        ExecuteQuery.execute(requestBody, userToken, 'v1/insert').then(r => {
            alert(r.message)
        })
    }

    const selectQuery = (query, queryParameters) => {
        const requestBody = {
            query: query,
            parameters: queryParameters
        }
        ExecuteQuery.execute(requestBody, userToken, 'v1/select').then(r => {
            ResultTable.build('resultTable',r)
            $('.CodeMirror').css('height','200px')
        })
    }

    const queryDeleteValida = query => {
        query = query.toUpperCase()
        const deleteComWhere = validateOrderInString(["DELETE ", "FROM ", "WHERE "], query)
        const deleteSemWhere = validateOrderInString(["FORCE ","DELETE ", "FROM "], query)
        return deleteComWhere || deleteSemWhere
    }

    const queryUpdateValida = query => {
        query = query.toUpperCase()
        const updateComWhere = validateOrderInString(["UPDATE ", "SET ", "WHERE "], query)
        const updateSemWhere = validateOrderInString(["FORCE ","UPDATE ", "SET "], query)
        return updateComWhere || updateSemWhere
    }

    const queryInsertValida = query => {
        query = query.toUpperCase()
        const result = validateOrderInString(["INSERT ", "INTO ", "VALUES","(",")"], query)
        return result
    }

    const querySelectValida = query => {
        query = query.toUpperCase()
        const result = validateOrderInString(["SELECT ", "FROM "], query)
        return result
    }

    const startQueryTypeAlfredAnimation = (queryType) => {
        if (currentQueryType == queryType) {
            return currentQueryType
        }
        currentQueryType = queryType
        switch (queryType) {
            case "DELETE":
                Alfred.setBatsignDelete()
                break
            case "UPDATE":
                Alfred.setBatsignUpdate()
                break
            case "INSERT":
                Alfred.setBatsignInsert()
                break
            case "SELECT":
                Alfred.setBatsignSelect()
                break
            default:
                Alfred.setBatsignOff()
                break
        }
        return currentQueryType
    }

    return {
        start: () => {
            begin()
            events()
        },
        definirTipo: query => {
            return definirTipo(query)
        },
        executar: (query, parameters) => {
            executar(query, parameters)
        },
        startQueryTypeAlfredAnimation: (queryType) => {
            startQueryTypeAlfredAnimation(queryType)
        },
        sqlEditor: sqlEditor,
        queryType: queryType
    }
})()