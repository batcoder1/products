# Finton


Products CRUD, user signup and login. Application with jwt token authetication method. 


## Endpoints

### POST products/create
Create a new product in BD. Some field are required

Request example: 
```json
  headers.autentication: token *tokenAuth*

  body:{
    "name": "Trackpad mac",
    "description": "mouse trackpad"
  } 
```

### POST products/delete
Delete a product from DB. *ProductId* property are required in body section.

Request example:
```json
  headers.autentication: token *tokenAuth*

  body: {	
    "productId": "5c882bee5b0b834fbeca50ca" 
  } 
```


### GET products
Get all products

### POST user/signup
Create a new user in DB. Email and password are required in body section.

Request example:
```json
  body: {
    "email": "kike@localhost.com",
    "password": "pass1234"
  }
```

### POST user/login
Aplication login endpoint. Email and password data are required in body section. 
When login is succesfull the request responds with *tokenAuth* property that must be used to authenticate in follows requests.

Request example:
```json
  body:{	
    "email": "kike@localhost.com",
    "password": "pass1234"
  }
```

## Postman test 
### Collection (copy link and add to postman)
https://www.getpostman.com/collections/7361e018c8a0edd6c6ef

### Environment

VARIABLE  VALUE

url       http://localhost:3003

token     token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9....



