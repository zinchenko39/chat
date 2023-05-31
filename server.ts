// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
