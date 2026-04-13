import app from "./app.js";
import mongoose from "mongoose";

//run server:
app.listen(process.env.PORT, () => {
  console.log("server run at port " + process.env.PORT);
});

//connect to database:
mongoose
  .connect("mongodb://127.0.0.1:27017/NodejsDay3")
  .then(async () => {
    console.log("✓ connected to db");
  })

  .catch((err) => {
    console.log("❌ Database connection error:", err);
  });
