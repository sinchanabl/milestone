const express = require("express");
const router = express.Router();

const expenses = [];
const categories = ["Food", "Travel", "Entertainment", "Bills"];

// Add a new expense
router.post("/", (req, res) => {
    const { category, amount, date } = req.body;

    // Validate data
    if (!categories.includes(category)) {
        return res.status(400).json({ status: "error", error: "Invalid category" });
    }
    if (amount <= 0) {
        return res.status(400).json({ status: "error", error: "Amount must be positive" });
    }

    // Add expense
    const expense = {
        id: Math.random().toString(36).substr(2, 9),
        category,
        amount,
        date,
    };
    expenses.push(expense);

    res.json({ status: "success", data: expense });
});

// Get expenses with filters
router.get("/", (req, res) => {
    const { category, startDate, endDate } = req.query;

    let filteredExpenses = expenses;

    if (category) {
        filteredExpenses = filteredExpenses.filter((exp) => exp.category === category);
    }
    if (startDate && endDate) {
        filteredExpenses = filteredExpenses.filter((exp) =>
            new Date(exp.date) >= new Date(startDate) && new Date(exp.date) <= new Date(endDate)
        );
    }

    res.json({ status: "success", data: filteredExpenses });
});

// Analyze spending
router.get("/analysis", (req, res) => {
    const totalsByCategory = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const totalSpending = expenses.reduce((acc, exp) => acc + exp.amount, 0);

    res.json({
        status: "success",
        data: {
            totalSpending,
            totalsByCategory,
        },
    });
});

module.exports = router;
