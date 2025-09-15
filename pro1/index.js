const express = require('express')
const app = express()
const PORT = 3000
const dbConnection = require('./util/DB')
dbConnection();

app.use(express.json());    // get data in req.body as json format

const userRoutes = require('./routes/UserRoutes');
const productCategoryRoutes = require('./routes/ProductCategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');
const questionRoutes = require('./routes/QuestionRoutes');
const examRoutes = require('./routes/ExamRoutes');

app.use("/users", userRoutes);
app.use("/category", productCategoryRoutes);
app.use("/products", productRoutes);
app.use("/employees", employeeRoutes);
app.use('/questions', questionRoutes);
app.use('/exams', examRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});