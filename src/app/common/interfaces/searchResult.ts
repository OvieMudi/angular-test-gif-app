import { IGif } from './gif';

export interface ISearchResult {
  data: IGif[];
  pagination?: any;
  meta: any;
}

export interface ISingleResult {
  data: IGif;
  meta: any;
}
