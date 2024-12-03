const cron = require("node-cron");

const expenses = []; // Import expenses array from a shared module in a real project

const generateReport = () => {
    cron.schedule("0 0 * * *", () => {
        const today = new Date().toISOString().split("T")[0];
        const todayExpenses = expenses.filter((exp) => exp.date === today);

        const totalSpentToday = todayExpenses.reduce((acc, exp) => acc + exp.amount, 0);

        console.log(`Daily Summary for ${today}: Total Spent = ${totalSpentToday}`);
    });
};

module.exports = generateReport;
