function requestValidateApi(req, res) {
    try {
        let route = new(require("../routes/" + req.params.route + ".js"));
        return route[req.params.method](req, res);
    } catch (e) {
        console.log("API HAS CRASHED - " + e.message, req.params.route + "/" + req.params.method);
        res.status(500).json({
            success: false,
            data: "Internal error endpoint"
        });
    }
}

module.exports = requestValidateApi;
