import { useCallback, useEffect, useRef, useState } from 'react';
import { useCancellablePromise } from '../cancellable_promise';

/**
 * Generic Hooks to call api and get back the result, also return error and loading information
 * The hooks also cancel the promise when component unount to avoid memory leaks
 *
 * @param apiCall The function to call. This function must return a promise
 * @param successAction If you need to launch some custom action after success api call
 * @param errorAction If you need to launch some custom action after error api call
 *
 * @returns an array with in order:
 *      - a function to call the api
 *      - the data result of api, if error the data is null
 *      - a boolean to true during loading
 *      - a boolean to true true when finish
 *      - a boolean to true if an error occurs
 */
export const useApiCall = <API_PARAM, API_RESULT>(
  apiCall: (apiParam: API_PARAM) => Promise<API_RESULT>,
  successAction?: (result: API_RESULT) => void,
  errorAction?: (e: Error | string) => void
): [(apiParam: API_PARAM) => void, API_RESULT | null, boolean, boolean, boolean] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [finish, setFinish] = useState(false);
  const [param, setParam] = useState<API_PARAM | null>(null);
  const [data, setData] = useState<API_RESULT | null>(null);
  const { cancellablePromise } = useCancellablePromise<API_RESULT>();

  const ref = useRef(
    useCallback(
      async (apiParam: API_PARAM) => {
        setLoading(true);
        setError(false);
        const result: API_RESULT = await cancellablePromise(apiCall(apiParam));
        setData(result);
        setLoading(false);
        setFinish(true);
        if (successAction) {
          successAction(result);
        }
      },
      [apiCall, cancellablePromise, successAction]
    )
  );

  const errorActionRef = useRef(
    useCallback(
      (e: Error | string) => {
        if (errorAction) {
          errorAction(e);
        }
      },
      [errorAction]
    )
  );

  useEffect(() => {
    if (param !== null) {
      ref.current(param).catch((e) => {
        setParam(null);
        setLoading(false);
        setError(true);
        setFinish(true);
        errorActionRef.current(e);
      });
    }
  }, [param]);

  return [(apiParam: API_PARAM): void => setParam(apiParam), data, loading, finish, error];
};
