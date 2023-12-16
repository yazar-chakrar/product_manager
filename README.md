## Description

a robust Node.js (Nest.Js) REST-API for product management, providing full CRUD (Create, Read, Update, Delete) functionality for products.
The API built using Nest JS framework and MongoDB as the database.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# API endpoints

## Authentification

#### SignUp

Endpoint: `GET api/v01/auth/signup`

#### Body

- username
- password

#### Example

```http
Example 1:
GET api/v01/auth/signup
BODY 'password=Yasser123'; 'username=Yasser'

Example 2:
GET api/v01/auth/signup
BODY 'password=yasser'; 'username=Yasser'
response:= {
    "message": [
        "Password is too weak"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

#### SignIn

Endpoint: `GET api/v01/auth/signin`

#### Body

- username
- password

#### Example

```http
Example 1:
GET api/v01/auth/signin
BODY 'password=Yasser123'; 'username=Yasser'
response:= {
    "accesToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Illhc3NlciIsImlhdCI6MTcwMTU2Mzc4NCwiZXhwIjoxNzAxNTY3Mzg0fQ.PLeWvfGjN3o8KQtIehA2LaH33ZiqkNbBYv5o1BgnxM0"
}

Example 2:
GET api/v01/auth/signin
BODY 'password=Yasser123TTT'; 'username=Yasser'
response:= {
    "message": "Invalid crendentials",
    "error": "Unauthorized",
    "statusCode": 401
}
```

## Products managment

### Endpoints

#### Create Product

Endpoint: `POST /products`

#### Body

- name
- description
- price
- currency

#### Example

```http
Example 1:
POST api/v01/products
BODY name : "product 1", description: "des 1", price: 9000, "category": "Category 1",
Token '...'
response: {
    "name": "product 1",
    "description": "des 1",
    "category": "Category 1",
    "currency": "DA",
    "price": 9000,
    "_id": "656bf84a6d9224665e101cd8",
    "createdAt": "2023-12-03T03:38:50.038Z",
    "updatedAt": "2023-12-03T03:38:50.038Z",
    "__v": 0
}
```

#### Filter Products

Endpoint: `GET api/v01/products`

#### Parameters

- name
- max_price
- min_price
- sortField `field name`
- sortOrder `1 or -1
- limit `Page size`
- offset `Page number`

#### Example

```http
Example 1:
GET api/v01/products?sortField=name&sortField=name&sortOrder=-1&offset=1
Token '...'
response: {
    "total": 6,
    "data": [
        {
            "_id": "656bf8d56d9224665e101ce7",
            "name": "product 7",
            "description": "des 7",
            "category": "Category 2",
            "currency": "DA",
            "price": 2000,
            "createdAt": "2023-12-03T03:41:09.903Z",
            "updatedAt": "2023-12-03T03:41:09.903Z",
            "__v": 0
        },
        {
            "_id": "656bf8ce6d9224665e101ce4",
            "name": "product 6",
            "description": "des 6",
            ...
        }
        ...]}
```

#### Update Product

Endpoint: `PATCH api/v01/products/:id`

#### Body

- name
- description
- price
- currency
- category

#### Example

```http
Example 1:
PATCH api/v01/products/656bf8d56d9224665e101ce7
BODY name : "product 7 updated", description: "des 7 updated", price: 9089, "currency": "EUR",
Token '...'
response: {
    "_id": "656bf8d56d9224665e101ce7",
    "name": "product 7 updatedff",
    "description": "des 7 updated",
    "category": "Category 2",
    "currency": "EUR",
    "price": 9089,
    "createdAt": "2023-12-03T03:41:09.903Z",
    "updatedAt": "2023-12-03T04:04:14.205Z",
    "__v": 0
}
```

#### Delete Product

Endpoint: `DELETE api/v01/products/:id`

#### Get Product

Endpoint: `GET api/v01/products/:id`

## Purchases managment

### Endpoints

#### Create Purchase

Endpoint: `POST api/v01/purchases`

#### Body

- productId
- quantity

#### Example

```http
Example 1:
POST api/v01/products
BODY productId : "656bf8d56d9224665e101ce7", quantity: 2,
Token '...'
response: {
    "product": {
        "_id": "656bf8d56d9224665e101ce7",
        "name": "product 7 updatedff",
        "price": 9089
    },
    "quantity": 2,
    "userId": "656a77af7516db43d04975d3",
    "_id": "656c08509e40274c5b79bf63",
    "createdAt": "2023-12-03T04:47:12.348Z",
    "updatedAt": "2023-12-03T04:47:12.348Z",
    "__v": 0
}
```

## Credit Card API

This API provides information about credit cards. It uses the Random Data API to fetch randomly generated credit card data.

### Endpoints

#### Get All Credit Cards

Endpoint: `GET api/v01/credit-cards`

#### Parameters

- limit `Page size`
- offset `Page number`

Returns an array of randomly generated credit card data.

#### Example

```http
Example 1:
GET api/v01/credit_cards?limit=2&offset=1
Token '...'
response: [
    {
        "id": 7913,
        "uid": "fa789f0b-335d-4c2a-a39e-91a5d6f293cb",
        "credit_card_number": "1234-2121-1221-1211",
        "credit_card_expiry_date": "2026-12-02",
        "credit_card_type": "visa"
    },
    {
        "id": 2541,
        "uid": "0ee4e3a8-4bf3-4c7c-85a9-bec67f2e4de4",
        "credit_card_number": "1211-1221-1234-2201",
        "credit_card_expiry_date": "2027-12-02",
        "credit_card_type": "visa"
    }
]
```

# Docker

## Envirenments
### development
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```
### production
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

# Security
Some implemented security aspects in developing this application:

##### HTTPS
```
Nginx Proxy Manager
```
##### Authentication & Authorization
```
PassportModule, JwtModule
```
##### Data Validation
```
DTOs
```
##### Cross-Origin Resource Sharing (CORS)
```
CORS
```
##### Logging and Monitoring
```
WinstonModule
```
##### Rate Limiting
```
ThrottlerModule
```
##### Error Handling
```
With Logging
```


