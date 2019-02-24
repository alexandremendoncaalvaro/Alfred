const ExecuteQuery = (() => {
    async function execute(request, token, url){
        var result
        await post(url,request).then(r => {
            result = {dataset: r.returnedData, message: r.message}
        })
        return result
    }

    async function getTables(token) {
        var result
        await get("v1/tables",null).then(r => {
            result = r.tables
        })
        
        return result
    }

    return {
        execute: (request, token, url) => {
            return execute(request, token, url)
        },
        getTables: (token) => {
            return getTables(token)
        }
    }
})()
