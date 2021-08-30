const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const randomstring = require("randomstring");
const AuthUser = require('../dao/auth_user.js')
const {encrypt,decrypt} = require('../helpers/driver_encription.js')
class AuthMiddleware{
 
    generateRandomHash = () => {
        return randomstring.generate(10);
    }


    addDays = (date, days) => {
        let new_date = new Date(date)
        new_date.setDate(new_date.getDate() + days);
        return new Date(new_date).getTime();
    }

    GenerateTokenSession (userId) {
        return new Promise(async (resolve) => {
            let expired_token = '5d';
            let primary_cript_hash = this.generateRandomHash()

            let user_uuid = String(uuidv4())
            let expire_date = this.addDays(new Date(), 2)

            let encrypted_uuid = await encrypt(user_uuid, primary_cript_hash)
            let encrypted_user_id = await encrypt(userId, primary_cript_hash)

            let data = {
                uuid: encrypted_uuid,
                user_id: encrypted_user_id,
                expence_date: expire_date
            }
            
            let encrypted_payload = {
                payload: JSON.stringify(data)
            }

            jwt.sign(encrypted_payload, primary_cript_hash, {
                algorithm: "HS512",
                expiresIn: expired_token
            },  async function (err, token) {
                if (err) return resolve({error: "Error generating token"});

                AuthUser.DeleteOneLastSession(userId).then(response => {
                    AuthUser.InsetOne({
                        USER_ID: userId,
                        UUID: user_uuid,
                        HASH: primary_cript_hash,
                        TOKEN: token
                    }).then(response => {
                        if (response.severity != 'ERROR'){
                            return resolve({token});
                        }else{
                            return resolve({error: response});
                        }
                    })
                })
            });
        });
    }

    ValidateSessionAndToken = (token) => {
        return new Promise((resolve) => {
            AuthUser.findOnePerToken(token).then(response => {
                if (response.length > 0) {
                    let current = response[0];

                    jwt.verify(token, current.hash, {
                        algorithms: ["HS512"]
                    }, (err, decodedToken) => {
                        if (err) {
                            resolve({
                                error: "no session"
                            });
                        }else{
                            let data = JSON.parse(decodedToken.payload)
                            decrypt(data.user_id, current.hash).then((user_id) => {
                                decrypt(data.uuid, current.hash).then((uuid) => {
                                    AuthUser.findOnePerTokenAndUser(user_id, uuid).then(user_response => {
                                        if (user_response.length > 0) {
                                            resolve({session: true})
                                        } else {
                                            resolve({
                                                error: "token invalid"
                                            })
                                        }
                                    })
                                })
                            })
                        }
                    });

                } else {
                    resolve({
                        error: "no session"
                    })
                }
            })
        })
    }
}


module.exports = new AuthMiddleware();