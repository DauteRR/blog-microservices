import React, { Dispatch, useMemo, useReducer } from 'react';

/**
 * Establece el valor de la propiedad reloadNeeded
 */
type SetReloadNeededAction = {
  /**
   * Tipo de acción
   */
  type: 'SET_RELOAD_NEEDED';
  /**
   * New value
   */
  reloadNeeded: boolean;
};

/**
 * Acciones del reducer
 */
export type ReloadContextAction = SetReloadNeededAction;

interface ReloadContextState {
  reloadNeeded: boolean;
}

const DefaultReloadContextState: ReloadContextState = {
  reloadNeeded: true
};

interface ReloadContext {
  /**
   * Estado del contexto
   */
  state: ReloadContextState;
  /**
   * Función para disparar acciones que alteren el estado
   */
  dispatch: Dispatch<ReloadContextAction>;
}

export const ReloadContext = React.createContext<ReloadContext>({
  state: DefaultReloadContextState,
  dispatch: () => null
});

const Reducer = (
  state: ReloadContextState,
  action: ReloadContextAction
): ReloadContextState => {
  switch (action.type) {
    case 'SET_RELOAD_NEEDED':
      return {
        reloadNeeded: action.reloadNeeded
      };

    default:
      throw Error('ReloadContext reducer: Acción desconocida');
  }
};

export const ReloadContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, DefaultReloadContextState);

  const context = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <ReloadContext.Provider value={context}>{children}</ReloadContext.Provider>
  );
};
