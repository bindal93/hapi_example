import * as Hapi from "@hapi/hapi";
import * as Joi from '@hapi/joi';
import * as UserHandler from '../../handlers/user'
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
        handler: UserHandler.ping,
    }
}
const echo: Hapi.ServerRoute = {
    method: 'GET',
    path: '/echo/{message}',
    options: {
        auth: false,
        description: "Check heartbeat",
        handler: UserHandler.echo,
        validate: {
            params: echoParamsSchema,
            query: echoQuerySchema
        },
    }
}
export { ping, echo };