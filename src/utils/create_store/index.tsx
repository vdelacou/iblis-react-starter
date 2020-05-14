import React, { createContext, Dispatch, FC, SetStateAction, useContext, useMemo, useState } from 'react';

const useApi = <S extends {}, C extends {}>(apiFactory: (state: S, setState: Dispatch<SetStateAction<S>>) => C, initialState: S): C => {
  const [state, setState] = useState<S>(initialState);
  return useMemo(() => apiFactory(state, setState), [state, setState, apiFactory]);
};

/**
 * A generic function to create a context store and context provider.
 * This allow us to have a global app state management system with strict typings
 *
 * see https://medium.com/free-code-camp/why-you-should-choose-usestate-instead-of-usereducer-ffc80057f815
 *
 * @param apiFactory
 * @param initialState
 */
export const createStore = <S extends {}, C extends {}>(apiFactory: (state: S, setState: Dispatch<SetStateAction<S>>) => C): { storeProvider: React.FC<S>; useStore: () => C } => {
  // need default value (to make the api more beautiful we dont ask a default implementation function)
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
  const intialContext = {} as C;
  const StoreContext = createContext<typeof intialContext>(intialContext);

  const StoreProvider: FC<S> = (props) => {
    const store = useApi(apiFactory, props);
    return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
  };

  const useStore = (): C => {
    return useContext(StoreContext);
  };

  return { storeProvider: StoreProvider, useStore };
};
