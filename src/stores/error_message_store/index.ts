import { Dispatch, SetStateAction } from 'react';
import { createStore } from '../../utils/create_store';

interface ErrorMessageStoreState {
  errorMessage: string | null;
}
interface ErrorMessageStoreApi {
  getErrorMessage: () => string | null;
  setErrorMessage: (errorMessage: string | null) => void;
}

const storeApi = (state: ErrorMessageStoreState, setState: Dispatch<SetStateAction<ErrorMessageStoreState>>): ErrorMessageStoreApi => {
  const getErrorMessage = (): string | null => {
    return state.errorMessage;
  };
  const setErrorMessage = (errorMessage: string | null): void => {
    setState({ errorMessage });
  };

  return {
    getErrorMessage,
    setErrorMessage,
  };
};

const store = createStore(storeApi, { errorMessage: null });

/**
 * Manage error globally
 */
export const ErrorMessageStoreProvider = store.storeProvider;
export const useErrorMessageStore = store.useStore;
