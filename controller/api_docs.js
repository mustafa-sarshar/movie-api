const swaggerJsdoc = require("swagger-jsdoc");
    
const swaggerApiOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8080/movies",
            },
        ],
    },
    apis: ["../documentation/movies.js"],
};

const swaggerJsdocSpecs = swaggerJsdoc(swaggerApiOptions);

module.exports = { swaggerJsdocSpecs };