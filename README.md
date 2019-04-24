# BE-Project-authentication

Authentication service for the BE-Project stack. It will receive user credentials to test it against the authentication database.

## Technologies

- **[Moleculer](https://github.com/moleculerjs/moleculer)**
- **[NATS](https://nats.io)**

## Description

### Service

Auth

### Actions

#### login

- **Params:**

    ```js
    { username: String, password: String }
    ```

- **Return:**

    ```js
    { username: String, id: String, updatedAt: Date, createdAt: Date }
    ```

#### register

- **Params:**

    ```js
    { username: String, password: String }
    ```

- **Return:**

    ```js
    { username: String, id: String, updatedAt: Date, createdAt: Date }
    ```

## Test

Run `npm test`

### Development

Run `npm run dev` to run tests with files watch

This is the bottom of the documentation ! Have a cookie: 🍪
