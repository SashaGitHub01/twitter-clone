export enum Actions {
   SET_IS_LOADING = 'trands/SET_IS_LOADING',
   SET_ITEMS = 'trands/SET_ITEMS',
   SET_ERROR = 'trands/SET_ERROR',
}

export interface ITrand {
   name: string,
   _id: string,
   count: number
}

export interface IState {
   items: ITrand[],
   isLoading: boolean,
   error: string | null
}

export interface setItems {
   type: Actions.SET_ITEMS,
   payload: ITrand[],
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string,
}

export type ActionTypes = setItems | setIsLoading | setError;