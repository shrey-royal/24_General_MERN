const express = require('express')
const app = express()
const PORT = 3000
const dbConnection = require('./util/DB')
dbConnection();

app.use(express.json());    // get data in req.body as json format

const userRoutes = require('./routes/UserRoutes');
const productCategoryRoutes = require('./routes/ProductCategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');

app.use("/users", userRoutes);
app.use("/category", productCategoryRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});