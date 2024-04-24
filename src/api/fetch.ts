/** INTERFACE for Fetch result */
import { FetchResult, HeadersInterface } from './fetch.interface';

/**
 * Fetch function performs XMLHttpRequest
 * @param {string} url -> url address
 * @param {object} metaData -> config object for fetch
 * @param {function} Call -> {SHOULD NOT ENTERED} fetch funtion
 * @param {string} env -> {SHOULD NOT ENTERED} APPLICATION envirment
 */
export async function Fetch(
      url: string,
      metaData: HeadersInterface,
      Call: any = fetch,
      env: string = process.env.NODE_ENV,
): Promise<FetchResult> {
      // define fail result object
      let failResult: FetchResult = {
            status: 0,
            body: 'fail to fetch address',
      };

      try {
            let response = await Call(url, metaData); // call api
            let result;
            if (response.status !== 204) {
                  result = await response.json();
            }
            let headers = {};
            // show result in test and development mode
            if (env !== 'production') {
                  console.log('resposne-result', result);
            }
            if (
                  response.headers &&
                  response.headers.entries &&
                  response.headers.entries().next
            ) {
                  headers = response.headers.entries().next();
            }

            // result
            return {
                  status: response.status,
                  body: result,
                  ok: response.ok,
                  redirected: response.redirected,
                  statusText: response.statusText,
                  type: response.type,
                  url: url,
                  headers,
            };
      } catch (error) {
            console.error('error', error);
            return failResult;
      }
}
