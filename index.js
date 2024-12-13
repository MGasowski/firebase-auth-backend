const express = require("express");
const admin = require("./firebase");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to fetch tasks
app.get("/tasks", async (req, res) => {
  const token = req.query.token;
  console.log({ token: JSON.stringify(token) });
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Verify the token sent from frontend
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // If valid, send mock tasks (replace with your own logic)
    res.json({
      userId,
      tasks: [
        { id: 1, name: "Task A", completed: false },
        { id: 2, name: "Task B", completed: true },
      ],
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
