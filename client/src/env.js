const { VITE_EXPRESS_SERVER_HOST, VITE_EXPRESS_SERVER_PORT, VITE_AUTO_SYNC_REMAINING } = import.meta.env;

const expressOptions = {
  host: VITE_EXPRESS_SERVER_HOST,
  port: VITE_EXPRESS_SERVER_PORT || 3000,
  autoSyncRemaining: VITE_AUTO_SYNC_REMAINING || 3600,
};

export { expressOptions };
