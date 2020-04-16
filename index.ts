import * as Hapi from "hapi";
import * as Path from 'path';
import { getConfig } from './config';
import * as Joi from 'joi';
const config = getConfig();

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
            const response = request.response;
            console.log("PRE-RESPONSE");
            return h.continue;
        });
        apiServer.events.on('response', (request) => {
            console.log(`Response sent for request: ${request.info.id}`);
        });
        const routes: Hapi.ServerRoute[] = [{
            method: 'GET',
            path: '/ping',
            options: {
                auth: false,
                description: "Check heartbeat",
                handler: () => {
                    return "pong";
                }
            }
        }, {
            method: 'GET',
            path: '/echo/{message}',
            options: {
                auth: false,
                description: "Check heartbeat",
                handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                    let message: string = request.params.message;
                    return {
                        "message": message
                    };
                },
                validate: {
                    params: Joi.object().keys({
                        message: Joi.string().alphanum().min(1).max(20).required(),
                    })
                },
            }
        }];
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