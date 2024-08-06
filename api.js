const api = require("./thunder-collection_elecload.json")
let allApis = []
if (Array.isArray(api.requests)){
    api.requests.forEach((e)=>{
        allApis.push({
            url:e.url,
            method:e.method,
            body:e.body,
            name:e.name
        })
    })
}

console.log(allApis)