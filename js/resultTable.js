const ResultTable = (() => {
    const build = (table, result) => {
        if(result.dataset == null) {
            return
        }
        $('#'+table+'Div').css('display','block')
    
        $('#'+table).empty()
        $('#'+table).append("<thead>")
    
        for (var prop in result.dataset[0]) {
            $('#'+table+' > thead').append("<th>" + prop.toUpperCase() + "</th>")
        }
    
        $('#'+table).append("</thead>")
        $('#'+table).append("<tbody>")
    
        $('#'+table+' > tbody').append("<tr><td colspan='"+result.dataset.length+"' class='lineDivisor'></td></tr>")
    
    
        if(result.dataset.length > 0){
    
            for (i = 0; i < result.dataset.length; i++) {
    
                var $row = $('<tr>')
                for (var val in result.dataset[i]) {
                    $row.append($("<td>" + result.dataset[i][val] + "</td>"))
                }
                $row.append($('</tr>'))
    
                $('#'+table+' > tbody:last').append($row)
                $('#'+table+' > tbody:last').append("<tr><td colspan='"+result.dataset.length+"' class='lineDivisor'></td></tr>")    
            }
        }
        else {
            $('#'+table+' > tbody').append("<tr>")
            $('#'+table+' > tbody').append("<td>" + result.message + "</td>")
            $('#'+table+' > tbody').append("</tr>")
        }
        $('#'+table).append("</tbody>")
    }

    return {
        build: (table, result) => {
            build(table, result)
        }
    }
})()