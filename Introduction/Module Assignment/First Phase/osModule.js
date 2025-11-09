import os from 'os';

export const getOSInfo = () => ({
    platform: os.platform(),
    arch: os.arch(),
    totalMemory: os.totalmem(),
});

export const toMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;