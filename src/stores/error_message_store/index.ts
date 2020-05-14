import { Dispatch, SetStateAction } from 'react';
import { createStore } from '../../utils/create_store';
import { ErrorMessage } from './model';

interface ErrorMessageStoreState {
  errorMessage: ErrorMessage;
}
interface ErrorMessageStoreApi {
  getErrorMessage: () => ErrorMessage;
  setErrorMessage: (errorMessage: ErrorMessage) => void;
}

const storeApi = (state: ErrorMessageStoreState, setState: Dispatch<SetStateAction<ErrorMessageStoreState>>): ErrorMessageStoreApi => {
  const getErrorMessage = (): ErrorMessage => {
    return state.errorMessage;
  };
  const setErrorMessage = (errorMessage: ErrorMessage): void => {
    setState({ errorMessage });
  };

  return {
    getErrorMessage,
    setErrorMessage,
  };
};

const store = createStore(storeApi);

/**
 * Manage error globally
 */
export const ErrorMessageStoreProvider = store.storeProvider;
export const useErrorMessageStore = store.useStore;
