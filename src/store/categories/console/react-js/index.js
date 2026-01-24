import { useStateHookImplementation } from './usestate-hook-implementation.js';
import { customUseEffectHook } from './custom-useeffect-hook.js';
import { virtualDomImplementation } from './virtual-dom-implementation.js';
import { contextApiImplementation } from './context-api-implementation.js';
import { componentLifecycleMethods } from './component-lifecycle-methods.js';

export const reactJs = [
  useStateHookImplementation,
  customUseEffectHook,
  virtualDomImplementation,
  contextApiImplementation,
  componentLifecycleMethods,
];
