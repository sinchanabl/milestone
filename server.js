const express = require("express");
const bodyParser = require("body-parser");
const expenseRoutes = require("./routes/expenses");
const generateReport = require("./cron/generateReport");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/expenses", expenseRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Start CRON jobs
generateReport();
