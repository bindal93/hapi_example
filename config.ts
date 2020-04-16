import * as Hapi from '@hapi/hapi';
interface AppConfig {
    APP_HOST: string
    APP_PORT: number,
    APP_MONGO_HOST: string,
    APP_MONGO_DB: string,
    APP_MONGO_USER: string,
    APP_MONGO_PASSW: string,
    APP_MONGO_PORT: number,
    APP_REDIS_HOST: string,
    APP_REDIS_DB: number,
    APP_REDIS_PASSW: string,
    APP_REDIS_PORT: number,
    MY_CACHE: string,
    REDIS_PARTITION: string;
}
interface ServiceCahe extends Hapi.ServerApplicationState {
    findUser?: any,
    findAllUsers?: any
}
const getConfig = (): AppConfig => {
    const appConfig = JSON.parse(<string>process.env["APP_CONFIG"]);
    return {
        "APP_HOST": appConfig["APP_HOST"],
        "APP_PORT": Number(appConfig["APP_PORT"]),
        "APP_MONGO_HOST": appConfig["MONGO_HOST"],
        "APP_MONGO_DB": appConfig["MONGO_DB"],
        "APP_MONGO_USER": appConfig["MONGO_USER"],
        "APP_MONGO_PASSW": appConfig["MONGO_PASSW"],
        "APP_MONGO_PORT": Number(appConfig["MONGO_PORT"]),
        "APP_REDIS_HOST": appConfig["REDIS_HOST"],
        "APP_REDIS_DB": Number(appConfig["REDIS_DB"]),
        "APP_REDIS_PORT": Number(appConfig["REDIS_PORT"]),
        "APP_REDIS_PASSW": appConfig["REDIS_PASSW"],
        "MY_CACHE": "hapi_cache",
        "REDIS_PARTITION": "hapi_node_app"
    }
};
export { getConfig, AppConfig, ServiceCahe }