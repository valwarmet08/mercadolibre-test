module.exports = {
    apps : [
        {
            name: "myaplication",
            script: "./server.js",
            watch: true,
            env: {
                "NODE_ENV": "development",
                "ENVIRONMENT" : "development"
            },
            env_production: {
                "NODE_ENV": "production",
                "ENVIRONMENT" : "production"
            }
        }
    ]
}