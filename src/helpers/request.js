import LocalStorage from '../helpers/localstorage';
const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://production.com";

export default new class Request {

    constructor(props) {
        this.loading = new CustomEvent("loading", {
            "detail": "Start request"
        });
        this.ended = new CustomEvent("ended", {
            "detail": "Finish Request"
        });
    }

    postJSON(url, data) {
        if(process.env.NODE_ENV === "development"){
            if(url.search(':') == -1) url = baseURL + url;
        }
        return new Promise(function(resolve, reject) {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'access-method': 'api-json'
                },
                credentials: 'same-origin',
                method: "POST",
                body: JSON.stringify(data)
            }).then(function(response) {
                response.json().then(function(res) {
                    resolve(res);
                }).catch(function(res) {
                    reject(res);
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    getJSON(url) {
        var me = this;
        document.dispatchEvent(this.loading);
        return new Promise(function(resolve, reject) {
            fetch(url, {
                headers: {
                    'access-method': 'api-json'
                },
                credentials: "same-origin"
            }).then(function(response) {
                response.json().then(function(res) {
                    document.dispatchEvent(me.ended);
                    resolve(res);
                }).catch(function(res) {
                    document.dispatchEvent(me.ended);
                    reject(res);
                });
            });
        });
    }


}
