const QueryHistory = (()=> {
    const load = userToken =>{
        get("v1/query-history").then(r => {
            result = {dataset: r.returnedData};
            ResultTable.build('queryHistory', result)
        })
    }
    
    return {
        load: token => {
            load(token)
        }
    }
})();