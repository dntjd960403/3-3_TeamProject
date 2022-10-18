const express = require('express');
const Http = require('http');
const routes = require('./routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;
//api는 스웨거 연동 때문에 추가
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile)) // docs 대신 swagger로 수정한다.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
