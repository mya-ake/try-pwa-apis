const CORS = {
  HEADERS: [
    'Origin',
    'Content-Type',
    'Content-Length',
    'Accept',
    'X-Api-Key',
  ].join(', '),
  METHODS: ['GET', 'POST'].join(', '),
  ORIGIN: process.env.CORS_ALLOW_ORIGIN || '*',
};

const exporter = serverless => {
  const exportData = {
    CORS,
  };

  serverless.cli.consoleLog(exportData);
  return exportData;
};

module.exports = {
  CORS,
  exporter,
};
