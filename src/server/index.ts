import { apiFactory } from '@/core';
import { NodeFetchProvider } from './NodeFecthProvider';

export const nodeApi = apiFactory(new NodeFetchProvider());
export * from '@/core/types';
