const CURRENT_ENV = process.env.ENVIRONMENT || 'development';
const CONFIG = require('../config.json');
const ur_api = CONFIG[CURRENT_ENV].URL_ML;

class Public {
    constructor() { }

    async search_product(req, res) {
        let query = req.body.product;
        if (!query) {
            return res.status(200).json({
                success: false
            });
        }

        let url = `${ur_api}/sites/MLC/search?q=${query}`,
        ml_api_products = await request_search(url)
        
        return res.status(200).json({
            success: ml_api_products.success ? ml_api_products.success : false,
            data : ml_api_products.data 
        });
    }

    async detail_product(req, res) {
        let query = req.body.id;
        if (!query) {
            return res.status(200).json({
                success: false
            });
        }
        let url = `${ur_api}/items?ids=${query}`,
        ml_api_products = await request_search(url)
        
        return res.status(200).json({
            success: ml_api_products.success ? ml_api_products.success : false,
            data : ml_api_products.data 
        });
       
    }

    async description_product(req, res) {
        let query = req.body.id;
        if (!query) {
            return res.status(200).json({
                success: false
            });
        }
        let url = `${ur_api}/items?ids=${query}/description`,
        ml_api_products = await request_search(url)
        
        return res.status(200).json({
            success: ml_api_products.success ? ml_api_products.success : false,
            data : ml_api_products.data 
        });
       
    }

    async data_category(req, res) {
        let query = req.body.id;
        if (!query) {
            return res.status(200).json({
                success: false
            });
        }

        let url = `${ur_api}/categories/${query}`,
        ml_api_products = await request_search(url)
        
        console.log({ml_api_products})
        return res.status(200).json({
            success: ml_api_products.success ? ml_api_products.success : false,
            data : ml_api_products.data 
        });
       
    }
    
    
}

module.exports = Public;

function request_search ( url ) {
    return new Promise( async (resolve, reject) => {
        const superagent = require('superagent');
        
        superagent
            .get(url)
            .end((err, res) => {
                if (!err) {
                    return resolve({
                        success: true,
                        data : res.body
                    });
                }else{
                    return resolve({
                        success: false,
                        data : err
                    });
                }
            });
    });
}