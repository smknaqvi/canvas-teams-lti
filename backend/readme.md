### Configuration

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
AUTH0_CLIENT_ID=4D5j7PdcJDRSkQhG17KtOc3b314N4acq
AUTH0_CLIENT_SECRET=bl17Xrlsa7LrblKW291RKo-YlX9gjKZsyGGnfo3BN0xXc0cfMrp0MNbwn9ZXVxoU
AUTH0_DOMAIN=https://dev-rrq-glwv.us.auth0.com
```
