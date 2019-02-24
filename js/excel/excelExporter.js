const ExcelExporter = (() => {
    const exportExcel = table => {
        var result = "<table>"

        result = result + addHeaders(table)
        result = result + addBody(table)

        result = result + "</table>"

        console.log(result)
        exportFile(result)
    }

    const exportFile = result => {
        var link = document.createElement('a')
        link.href = 'data:application/vnd.ms-excel;charset=UTF-8,' +
            encodeURIComponent("\uFEFF" + result)
        link.download = 'exporter-result.xls'
        link.click()
    }

    const addHeaders = (table) => {
        var result = "<tr bgcolor='#87AFC6'>"

        var headers = $('#' + table + ' > thead > th').each(function (i) {
            result = result + "<td>" + $(this).text() + '</td>'
        })

        result + "</tr>"

        return result
    }

    const addBody = (table) => {
        var result = ''

        var rows = $('#' + table + ' > tbody > tr').each(function (i) {
            var tds = $('td', this)
            if (!$(tds.get(0)).hasClass('lineDivisor')) {
                result = result + '<tr>'
                $('td', this).each(function (j) {
                    result = result + '<td>' +
                        $(this).text() + '</td>'
                })
                result = result + '</tr>'
            }
        })

        return result
    }

    return {
        exportExcel: table => {
            exportExcel(table)
        }
    }
})()