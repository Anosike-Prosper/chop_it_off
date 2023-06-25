import {app} from "./app";
import * as dotenv from "dotenv";
dotenv.config();
import config from "./config/config";
// import swaggerDocs from "./utils/swagger";
// import { app } from "./app";
const PORT = config.PORT;

app.listen(config.PORT, () => {
  console.log(`App is running on PORT ${PORT} `);
// swaggerDocs(app, 5000)
});

