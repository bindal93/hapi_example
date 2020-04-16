import * as service from '../services/user';
import * as Hapi from '@hapi/hapi';
import { AppConfig } from '../config';
/**
 * 
 * @param cacheConnectionName
  segment that allow you to further isolate caches within one client partition. If you want to cache results from two different methods, you usually don't want to mix the results together. In redis, segment is an additional prefix along with the partition option. The default value for segment when server.cache() is called inside of a plugin will be '!pluginName'. When creating server methods, the segment value will be '#methodName'. If you have a use case for multiple policies sharing one segment there is a shared option available as well.
 */
let findUserCache = (cacheConnectionName?: string) => {
    return {
        name: 'findUser',
        method: service.findUser,
        options: {
            cache: {
                /**
                 * Cannot set generateFunc with method caching
                 */
                // generateFunc: () => {},
                // cache: cacheConnectionName,//an optional string with the name of the cache connection configured on your server to use
                expiresIn: 8 * 1e3,
                /**
                <-- Number of milliseconds to mark an item stored in cache as stale -->
                Must be less than expiresIn


                after the cache has become stale and the 'expiresIn' time has not yet arrived i-e the data has expired,
                there is no way to refresh the 'server method' data.

                Hence, it is better that we set a good value for 'expiresIn' so that when the 'staleIn' in has reached,
                we don't kee sending the stale data until the 'expiresIn' is reached and the data is refreshed by calling the corresponding 
                function set in 'server method'
                */
                staleIn: 6 * 1e3,
                /**
                  staleTimeout must be less than the delta between expiresIn and staleIn.

                <-- Number of milliseconds to wait before checking if an item is stale. -->
                 */
                staleTimeout: 1 * 1e3,
                generateTimeout: 4 * 1e3,
                getDecoratedValue: true,
                segment: "my_segment_one"//an optional segment name used to isolate cache items.,,
            },
            generateKey: (a: string, b: number, o: object) => {
                const k = Buffer.from(`${a}${b}${JSON.stringify(o)}`).toString('hex');
                return k;
            }
        }
    }
}
let findAllUsersCache = (cacheConnectionName?: string) => {
    return {
        name: 'findAllUsers',
        method: service.findAllUsers,
        options: {
            cache: {
                // cache: cacheConnectionName,//an optional string with the name of the cache connection configured on your server to use
                expiresIn: 3600 * 1e3,
                staleIn: 9 * 1e3,//Must be less than expiresIn
                staleTimeout: 2 * 1e3,//staleTimeout must be less than the delta between expiresIn and staleIn
                generateTimeout: 3 * 1e3,
                getDecoratedValue: true,
                segment: "my_segment_two",//an optional segment name used to isolate cache items.,
            }
        }
    }
}

const timeSaver = (apiServer: Hapi.Server) => {
    //Hapi.ServerOptionsApp
    const settings = <AppConfig>apiServer.settings.app;
    apiServer.method(findUserCache(settings.MY_CACHE));
    apiServer.method(findAllUsersCache(settings.MY_CACHE));

    /**
     * https://hapi.dev/api/?v=19.1.1#server.method()
     * https://hapi.dev/api/?v=19.1.1#server.methods
     * the segment value will be '#methodName'
     * a unique method name used to invoke the method via server.methods[name]
     * 
     * 
     * created a new policy with segment: '#findUser'
     * 
     */
    let serviceCache: Hapi.ServerApplicationState = {
        findUser: apiServer.methods.findUser,
        findAllUsers: apiServer.methods.findAllUsers,
    };
    apiServer.app = serviceCache;
    return true;
}

export { timeSaver };