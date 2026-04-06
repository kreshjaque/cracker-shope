const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const packagesRoot = path.join(workspaceRoot, 'packages');
const defaultConfig = getDefaultConfig(projectRoot);

module.exports = mergeConfig(defaultConfig, {
  projectRoot,
  watchFolders: [packagesRoot],
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (_, name) => path.join(workspaceRoot, 'node_modules', name),
      },
    ),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
  },
});
