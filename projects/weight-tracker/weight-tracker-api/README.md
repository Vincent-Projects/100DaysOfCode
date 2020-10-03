# Weight Tracker App

# API Documentation

## Authentication

Authentification is required for most of the endpoints of this API. Endpoints that require authentification token is marked with : _auth_.

To access endpoints that require authentification you need to pass a headers to the request with the key `Authorization` and the value `Bearer <YOUR_TOKEN>`.

### Login

POST /v1/users/login

required :
**email** : String
**password** : String

```json
{
    "email": "sample@sample.com",
    "password": "samplepassword"
}
```

Response :
**success** : Boolean
**message**: String
**token**: String
**expireIn**: Number

```json
{
    "success": true,
    "message": "Successfully logged in",
    "token": "56dazdf6zg54f84ezf84ze6f8ze4fez68fez74f86zef4z6e8f4f8z4efez86fz48z4fez86fezf4zez8f46fze468f4",
    "expireIn": "3000"
}
```

### Signup

POST /v1/users/signup

required :
**username** : String
**email** : String
**password** : String
**confirmPassword** : String ( must be the same as **password** )

```json
{
    "username": "sample",
    "email": "sample@sample.com",
    "password": "samplepassword",
    "confirmPassword": "samplepassword"
}
```

Response :
**success** : Boolean
**message**: String
**user**: Object ( model type User )

```json
{
    "success": true,
    "message": "Successfully logged in",
    "user": {
        "_id": "5f198fzef984fze4f9z8e4f9z84",
        "username": "sample",
        "email": "sample@sample.com",
        "password": "2216f5ze98f4.fezf498ezf1.9ze84e9f84zef98ez4fez8f49.fez8f4ze9fe9zf4ez89f48ef4ez984f4ez9f4ez",
        "date": "2020 19 Sep, 11:35:06 GMT+0100"
    }
}
```
