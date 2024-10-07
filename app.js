import express from "express";
import indexRoute from "./routes/index.js";
import cors from "cors";

const app = express();

//cors definition

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Use express.json() to parse JSON requests
app.use(express.json());

app.use("/api", indexRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
