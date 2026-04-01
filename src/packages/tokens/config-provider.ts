import type { InjectionKey, ExtractPropTypes } from 'vue';

export type ConfigProviderContext = ExtractPropTypes<any>;

export const configProviderContextKey: InjectionKey<ConfigProviderContext> = Symbol();
