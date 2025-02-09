const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./model/employes");
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newEmployee = new EmployeeModel({ name, email, password });
    await newEmployee.save();

    res.status(201).json({
      message: "Employee created successfully!",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("❌ Error creating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.password === password) {
        return res.status(200).json({
          status: "success",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error("Database error:", err);
      res.status(500).json({ error: "Server error" });
    });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
