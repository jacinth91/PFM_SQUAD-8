const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Squad-8 Project API',
      version: '1.0.0',
      description: 'A comprehensive API for user authentication and private data access',
      contact: {
        name: 'Squad-8 Team',
        email: 'squad8@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['FIRST_NAME', 'LAST_NAME', 'EMAIL_ADDRESS', 'password'],
          properties: {
            FIRST_NAME: {
              type: 'string',
              description: 'User\'s first name',
              example: 'John'
            },
            LAST_NAME: {
              type: 'string',
              description: 'User\'s last name',
              example: 'Doe'
            },
            EMAIL_ADDRESS: {
              type: 'string',
              format: 'email',
              description: 'User\'s email address',
              example: 'john.doe@example.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User\'s password (minimum 6 characters)',
              example: 'password123'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['EMAIL_ADDRESS', 'password'],
          properties: {
            EMAIL_ADDRESS: {
              type: 'string',
              format: 'email',
              description: 'User\'s email address',
              example: 'john.doe@example.com'
            },
            password: {
              type: 'string',
              description: 'User\'s password',
              example: 'password123'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            token: {
              type: 'string',
              description: 'JWT token for authentication',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            user: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '507f1f77bcf86cd799439011'
                },
                FIRST_NAME: {
                  type: 'string',
                  example: 'John'
                },
                LAST_NAME: {
                  type: 'string',
                  example: 'Doe'
                },
                EMAIL_ADDRESS: {
                  type: 'string',
                  example: 'john.doe@example.com'
                },
                CREATED_ON: {
                  type: 'string',
                  format: 'date-time',
                  example: '2023-01-01T00:00:00.000Z'
                }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Invalid credentials'
            }
          }
        },
        PrivateDataResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'you got private data'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js', './models/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs; 