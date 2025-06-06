import express from "express";
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { apiRouter } from "./routes/version_1/index.js";

const app = express();
const port = process.env.PORT;

const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];

// Configure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ], // Allowed headers
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

const db = connectDb;
db();

app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);

// Handle 404 errors
app.all("*", (req, res) => {
  res.status(404).json({ message: "End point does not exist" });
});