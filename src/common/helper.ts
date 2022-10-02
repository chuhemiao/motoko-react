export const isDev = import.meta.env.DEV;

// deploy test canister
export const isTestCanister = process.env.canisterType === 'test';
