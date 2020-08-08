import { IGif } from '../interfaces/gif';
import { gifActionTypes } from '../redux/actions';

export interface IAppState {
  gifs: IGif[];
  searchTerm: string;
  isLoading: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}

export const initialState: IAppState = {
  gifs: [],
  searchTerm: 'skywalker',
  isLoading: false,
};

export function rootReducer(state: IAppState, action: IAction): IAppState {
  switch (action.type) {
    case gifActionTypes.UPDATE_GIFS:
      return {
        ...state,
        gifs: action.payload,
      };

    case gifActionTypes.UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    default:
      return state;
  }
}
