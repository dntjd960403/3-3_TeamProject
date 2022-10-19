const express = require('express');
const Http = require('http');
const routes = require('./routes');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3030;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//풀 되라~
app.use('/', routes);
app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
