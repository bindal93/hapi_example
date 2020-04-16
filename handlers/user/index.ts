import * as Boom from '@hapi/boom';
import * as Hapi from "@hapi/hapi";
import { ServiceCahe } from '../../config'
const echo = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    try {
        const server = request.server;
        const serviceCache: ServiceCahe = server.app;
        if (!request.active()) {
            return h.close;
        }
        let { message } = request.params;
        console.log(serviceCache.findUser);
        let results = await Promise.all([
            serviceCache.findUser(`emaisl${message}`, '80123651425', { "a": "b" }),
            serviceCache.findAllUsers(`chandsigarh${message}`)
        ]);
        console.log("-----**results**-----", results);
        let { m, o = 10 } = request.query;
        return await new Promise((res, rej) => {
            setTimeout(() => {
                return res({
                    "message": message + m + o
                })
            }, 1 * 1e3);
        });
    } catch (error) {
        console.log("Error -----echo ", error);
        return Boom.badImplementation('terrible implementation');
    }

};
const ping = async (r: Hapi.Request, h: Hapi.ResponseToolkit) => {
    try {
        return "pong";
    } catch (error) {
        return Boom.badImplementation('terrible implementation');
    }

};
export {
    echo,
    ping
}