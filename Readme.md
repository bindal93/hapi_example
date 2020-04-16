first do an:
    npm install

Then run your server like so:    
    APP_CONFIG='{"APP_HOST":"0.0.0.0","APP_PORT":"9000"}' npm run dev


try the api:
curl -H 'authorization:mytoken' -v 'http://127.0.0.1:6002/echo/hi'
curl -H 'authorization:mytoken' -v 'http://127.0.0.1:6002/echo/hi?m=30'
curl -H 'authorization:mytoken' -v 'http://127.0.0.1:6002/echo/hi?m=30&o=18'

