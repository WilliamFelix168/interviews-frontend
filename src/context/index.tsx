import React, { createContext, Dispatch, ReactChild, useContext, useReducer } from 'react';
import { ActionProps, InitialValueProps } from './reducer'

const StateContext = createContext<React.ComponentState>([]);

export const useStateContext = ():
[InitialValueProps, Dispatch<ActionProps>] => useContext(StateContext);
interface ProviderProps {
  reducer: (state: InitialValueProps, action: ActionProps) => InitialValueProps;
  initialValue: InitialValueProps;
  children: ReactChild;
}

const Provider: React.FC<ProviderProps> = (props: ProviderProps) => {
  const { reducer, initialValue, children } = props;
  return (
    <StateContext.Provider value={useReducer(reducer, initialValue)}>
      {children}
    </StateContext.Provider>
  )
}

export default Provider;
