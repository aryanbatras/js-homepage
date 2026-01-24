import { reactMemoImplementation } from './react-memo-implementation.js';
import { useCallbackOptimization } from './usecallback-optimization.js';
import { virtualListImplementation } from './virtual-list-implementation.js';
import { lazyComponentLoading } from './lazy-component-loading.js';
import { debouncedSearchInput } from './debounced-search-input.js';

export const reactPerformance = [
  reactMemoImplementation,
  useCallbackOptimization,
  virtualListImplementation,
  lazyComponentLoading,
  debouncedSearchInput,
];
