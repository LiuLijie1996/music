let request = require("request");

module.exports = function (path, query,  headers, callback,method = 'GET') {
    if (method === 'GET' || method === 'get'){
        let options = {
            url:path,
            method:"GET",
            headers:headers,
            qs:query,
        };

        request(options, callback);
    }else{
        let options = {
            url:path,
            method:"POST",
            headers:headers,
            form:query,
        };

        request(options, callback);
    }
};