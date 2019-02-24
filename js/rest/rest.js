const userToken = Cookies.getCookie('token')

const execute = async (requestType, request, url) => {
    var result
    await $.ajax({
        type: requestType,
        url: window.location.origin+'/monitoring/'+url,
        data: JSON.stringify(request),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: {
            "token": userToken
        },
        success: function(data){
            result = data
        }
    })
    return result
}

async function get(url){
    return await execute('GET', [], url)
}
async function post(url,request) {
    return await execute('POST', request, url)
}
