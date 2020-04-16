import * as Hapi from "@hapi/hapi";
import * as Joi from '@hapi/joi';
const echoQuerySchema = Joi.object().keys({
    o: Joi.string().optional(),
    m: Joi.string().required()
});
const echoParamsSchema = Joi.object().keys({
    message: Joi.string().alphanum().min(1).max(20).required(),
});
const ping: Hapi.ServerRoute = {
    method: 'GET',
    path: '/ping',
    options: {
        auth: false,
        description: "Check heartbeat",
        handler: (_, h: Hapi.ResponseToolkit): string => {
            return "pong";
        },
    }
}
const echo: Hapi.ServerRoute = {
    method: 'GET',
    path: '/echo/{message}',
    options: {
        auth: false,
        description: "Check heartbeat",
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit): Hapi.Util.Dictionary<string> => {
            let message: string = request.params.message;
            let { m, o = 10 } = request.query;
            return {
                "message": message + m + o
            };
        },
        validate: {
            params: echoParamsSchema,
            query: echoQuerySchema
        },
    }
}
export { ping, echo };