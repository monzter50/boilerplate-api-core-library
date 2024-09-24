import { apiFactory } from '@/core';
import { DomFetchProvider } from './DomFetchProvider';
export const api = apiFactory(new DomFetchProvider());
export * from '@/core/types';
