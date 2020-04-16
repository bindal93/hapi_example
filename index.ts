import * as Hapi from "@hapi/hapi";
import * as Path from 'path';
import { getConfig } from './config';
const config = getConfig();
import { echo, ping } from './routes/healthCheck/index';
const hapiOptions: Hapi.ServerOptions = {
    load: { sampleInterval: 1000 },
    app: { ...config },
    debug: { request: ['error'] },
    address: config.APP_HOST,
    port: config.APP_PORT,
    host: config.APP_HOST,
    router: { isCaseSensitive: false, stripTrailingSlash: true },
    routes: {
        cors: {
            origin: ["*"],
            exposedHeaders: ["Authorization"],
            additionalHeaders: ["device", "X-Auth-UserId"]
        },
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
};
const init = async () => {
    try {
        let apiServer = new Hapi.Server(hapiOptions);
        apiServer.ext('onPreResponse', (request, h) => {
            /**
             * 
             logging requests in prod environment:

             1) not recommended if the request contains sensitive data
             2) can reduce performace
             3) etc
             Is meant to be used in test and dev env only
             */
            console.log(request.headers || {});
            console.log(request.params || {});
            console.log(request.query || {});
            return h.continue;
        });
        apiServer.events.on('response', (request) => {
            /**
             * 
             logging requests in prod environment:

             1) not recommended if the request contains sensitive data
             2) can reduce performace
             3) etc
             Is meant to be used in test and dev env only
             */
            console.log(`Response sent for request: ${request.info.id}`, JSON.stringify(request.headers));
        });
        const routes: Hapi.ServerRoute[] = [ping, echo];
        apiServer.route(routes);
        await apiServer.start();
        console.log('Server running at:', apiServer.info.uri, new Date().toISOString());
        console.log('Server running on %s', apiServer.info.uri);
    } catch (error) {
        console.log("Error: ", error);
    }
}
process.on('unhandledRejection', (err) => {
    console.log(err);
});
init()