const app = require("./app");
const { PORT } = require("../config/keys");

const port = PORT || 4000;

app.listen(port, () => console.log(`Listening on ${port}`));
