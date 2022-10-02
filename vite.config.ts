import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const prodEnv = mode === 'production' && process.env.canisterType === 'online';
  console.log('command,mode', command, mode, process.env.canisterType, prodEnv);
  return {
    publicDir: 'src/public',
    envDir: 'env',
    envPrefix: ['VITE_', 'DEV_', 'TEST_'],
    plugins: (plugin => {
      if (prodEnv) {
        // @ts-ignore
        plugin.push(
          // @ts-ignore
          visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
          })
        );
      }
      return plugin;
    })([react()]),
    // resolve: {
    //   alias: {
    //     // Here we tell Vite the "fake" modules that we want to define
    //     '@': path.resolve(__dirname, './src/'),
    //     '@common': path.resolve(__dirname, './src/common'),
    //     '@idlFactory': path.resolve(__dirname, './src/idlFactory'),
    //   },
    // },
    build: {
      outDir: 'dist',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 500,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: prodEnv,
          drop_debugger: prodEnv,
        },
      },
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
        },
      },
    },

    server: {
      fs: {
        strict: false,
      },
      proxy: {
        '/api/v2': {
          target: 'https://ic0.app',
          changeOrigin: true,
          rewrite: path => path.replace(/^api\//, '/api/v2/canister'),
        },
      },
    },
    define: {
      // dfx rely on this
      'process.env': {
        canisterType: process.env.canisterType || 'online',
      },
    },
  };
});
