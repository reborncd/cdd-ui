import installer from './defaults';

export const version = installer.version;
export { makeInstaller } from './make-installer';

export * from './component-auto';
export * from '../hooks/use-open-notification';

export default installer;
