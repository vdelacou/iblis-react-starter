import { useEffect, useRef } from 'react';

const makeCancelable = <T>(promise: Promise<T>): CancellablePromise<T> => {
  let isCanceled = false;

  const cancellablePromise = new Promise<T>((resolve, reject) => {
    promise
      .then((result) => {
        if (!isCanceled) {
          resolve(result);
        }
      })
      .catch((e) => {
        if (!isCanceled) {
          reject(e);
        }
      });
  });

  return {
    promise: cancellablePromise,
    cancel(): void {
      isCanceled = true;
    },
  };
};

/**
 * Create a cancellable promise (eg: unmount component when navigate before get the answer from server )
 */
export const useCancellablePromise = <T>(): { cancellablePromise: (promiseToCancel: Promise<T>) => Promise<T> } => {
  const promiseListTocancel = useRef<Array<CancellablePromise<T>>>([]);

  useEffect(() => {
    const cancelWhenUnmount = promiseListTocancel;
    return (): void => {
      // everytime we unmount the component we cancell all promise
      cancelWhenUnmount.current.forEach((p) => p.cancel());
    };
  }, []);

  const cancellablePromise = (promiseToCancel: Promise<T>): Promise<T> => {
    // we transform the promise to cancellable promoise
    const cPromise = makeCancelable(promiseToCancel);
    promiseListTocancel.current.push(cPromise);
    return cPromise.promise;
  };

  return { cancellablePromise };
};

interface CancellablePromise<T> {
  promise: Promise<T>;
  cancel(): void;
}
