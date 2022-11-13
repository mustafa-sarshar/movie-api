const swaggerJsdoc = require("swagger-jsdoc");
const PORT = process.env.PORT || 3000;
    
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

const swaggerJSON = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "movie-API",
        "description": "Swagger documentation for API endpoints",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "host": `localhost:${PORT}`,
    "basePath": "",
    "tags"
    "definitions": {
        "_id": {
            "properties": {
                "ObjectId": {
                    "type": "string"
                }
            }
        },
        "username": {
            "properties": {
                "prop": {
                    "type": "string"
                }
            }
        }
    }
}

module.exports = { swaggerJsdocSpecs, swaggerJSON };