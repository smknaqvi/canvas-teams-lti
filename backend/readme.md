### Configuration

Run db/init.sql to initialize database.

Configure caddy in order to serve the application over https as explained [here](https://auth0.com/docs/libraries/secure-local-development#running-your-application-behind-a-proxy).

Run caddy as follows,

```
/path/to/caddy reverse-proxy --from localhost:443 --to localhost:PORT
```

To test, visit `.../login`.

### Environment Variables

Sample .env below with AUTH0 specific settings

```
PORT=3000
HOST_ADDRESS=http://127.0.0.1
```
