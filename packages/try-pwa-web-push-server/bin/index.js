const app = require('./../app/app');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, host);
console.log(`Server listening on http://${host}:${port}`);
