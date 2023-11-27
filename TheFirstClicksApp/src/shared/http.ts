import {deepMerge, detectMobile} from './common-functions';
import AuthService from "./auth/auth.service";


export interface HttpParams {
    [key: string]: any;
}

export interface RequestOptions extends RequestInit {
    params?: HttpParams;
    body?: any,
    absoluteUrl?: boolean;
}

const HTTP = {
    baseURI: '/v1/',

    get: (uri: string, options?: RequestOptions): Promise<Response> => {
        const opts = buildOptions(options);
        const url = overridePageSize(uri);

        return fetch(prepareUrl(url, opts), {
            ...opts,
            method: 'GET'
        });
    },

    post: (uri: string, options?: RequestOptions): Promise<Response> => {
        const opts = buildOptions(options);

        return fetch(prepareUrl(uri, opts), {
            ...opts,
            method: 'POST',
            body: prepareBody(opts)
        });
    },

    put: (uri: string, options?: RequestOptions): Promise<Response> => {
        const opts = buildOptions(options);

        return fetch(prepareUrl(uri, opts), {
            ...opts,
            method: 'PUT',
            body: prepareBody(opts)
        });
    },

    patch: (uri: string, options?: RequestOptions): Promise<Response> => {
        const opts = buildOptions(options);

        return fetch(prepareUrl(uri, opts), {
            ...opts,
            method: 'PATCH',
            body: prepareBody(opts)
        });
    },

    delete: (uri: string, options: RequestOptions): Promise<Response> => {
        const opts = buildOptions(options);

        return fetch(prepareUrl(uri, opts), {
            ...opts,
            method: 'DELETE'
        });
    }
};

const getDefaultHeaders = () => {
    let token;

  ///  token = 'c6082084-3439-4ab6-8e41-270466f8507d'; ///AuthService.getToken();
    token = AuthService.getToken();

    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Device-Type': detectMobile() ? 'mobile' : 'desktop',
            'clientTimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'mode': 'cors',
            'credentials': 'include',
            ...(token && {'Authorization': `Basic ${token}`}),
        }
    };
};

const removeEmptyFields = (obj: any) => {
    Object.keys(obj).forEach((key: string) => {
        if (obj[key] && obj[key] instanceof Object) {
            return removeEmptyFields(obj[key]);
        }

        if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
            delete obj[key];
        }
    });

    return obj;
};

const prepareUrl = (uri: string, options?: RequestOptions): string => {
    let url: URL;

    if (options && options.absoluteUrl) {
        url = new URL(uri);
    } else {
        ////TODO must be   url = new URL(`${window.location.origin}${HTTP.baseURI}${uri}`); localhost node.js when stared = url = new URL(`http://localhost:8080/${uri}`);
        url = new URL(`http://localhost:8080/${uri}`);
            /// api url = new URL(`https://api.thefirstclicks.com${HTTP.baseURI}${uri}`);
    }
    if (options && options.params) {
        const params = removeEmptyFields(options.params);

        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key].toString());
        });
    }

    return url.toString();
};

const prepareBody = (options: any) => {
    let {body} = options;

    if (options && options.headers &&
        options.headers["Content-Type"] === getDefaultHeaders().headers["Content-Type"] &&
        options.body !== undefined) {

        body = JSON.stringify(removeEmptyFields(options.body));
    }

    return body;
};

const buildOptions = (options?: RequestOptions): RequestOptions => {
    return deepMerge(getDefaultHeaders(), options) as RequestOptions;
};

const overridePageSize = (url: string) => {
   /// console.log(url, 'overridePageSize')
    const externalPageSize = window.location.search.match(/pageSize=([^&]*)/);
    let pageSize: string = '';

    if (externalPageSize != null && externalPageSize[1] && parseInt(externalPageSize[1])) {
        pageSize = externalPageSize[1];
    }

    if (pageSize) {
        return url.replace(/size=([^&]*)/, `size=${pageSize}`);
    }

    return url;
};

export default HTTP;
