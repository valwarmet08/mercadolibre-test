const SecureLS = require('secure-ls');

/**
 * 
 *  This class is in charge of generating the localstorage 
 *  keys through the following method
 *  @class
 * 
 * 
 */
export default new class LocalStorage {
    constructor() {
        this.secure = new SecureLS({ encodingType: 'aes' });
    }
    
    setValue(key, value) {  
        /**
         * @function setValue
         * @memberof LocalStorage.setValue
         *
         * @desc This function is responsible for creating a localstorage variable securely on the client side
         *
         *
         * @param key {string} key to save on localstorage  
         * @param value {string} value to encrypt  
         * 
         * @return response none
        */
        this.secure.set( key , value );
    }

    getValue(key) {        
        /**
         * @function setValue
         * @memberof LocalStorage.setValue
         *
         * @desc This function is responsible for return a localstorage variable securely on the client side
         *
         *
         * @param key {string} key to save on localstorage  
         * 
         * @return  response { string }
        */
        return this.secure.get( key ); 
    }

    saveUser(object) {
        /**
         * 
         * @function saveUser
         * @memberof LocalStorage.saveUser
         *
         * @desc This function is responsible to set localstorage variables securely on the client side from user
         *
         * @param object {object} key to save on localstorage  
         * 
         * @return response none
         * 
        * **/
        for (var i in object) {
            //window.localStorage.setItem(i, object[i]);
            this.secure.set( i ,  object[i] );
        }
    }

    getUser(object) {
        let data = [];
        for (var key in object) {
            data.push( { [ key ] : this.secure.get( key ,  object[key] ) } );
        }
        return data
    }

    clearLocalStorage () {
        /**
         * 
         * @function clearLocalStorage
         * @memberof LocalStorage.clearLocalStorage
         *
         * @desc This function is responsible to clear all localstorage
         * 
         * @return response none
         * 
        * **/
        return this.secure.clear()
    }

}

