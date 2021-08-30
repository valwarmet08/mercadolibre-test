const request = require("../helpers/request.js").default;

export default new class Products{
    
    search = (product, callback) => {
        request.postJSON('/api/public/search_product',product).then((response) => {
            return callback(response);
        });
    }

    detailProduct = (data, callback) => {
        request.postJSON('/api/public/detail_product',data).then((response) => {
            return callback(response);
        });
    }

    desriptionProduct = (data, callback) => {
        request.postJSON('/api/public/description_product',data).then((response) => {
            return callback(response);
        });
    }

    categoryProduct = (data, callback) => {
        request.postJSON('/api/public/data_category',data).then((response) => {
            return callback(response);
        });
    }
    

}()