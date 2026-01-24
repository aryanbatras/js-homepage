import { deepCloneObject } from './deep-clone-object.js';
import { eventEmitterImplementation } from './event-emitter-implementation.js';
import { promiseChainImplementation } from './promise-chain-implementation.js';
import { functionComposition } from './function-composition.js';
import { memoizationImplementation } from './memoization-implementation.js';

export const coreJavascript = [
  deepCloneObject,
  eventEmitterImplementation,
  promiseChainImplementation,
  functionComposition,
  memoizationImplementation,
];
