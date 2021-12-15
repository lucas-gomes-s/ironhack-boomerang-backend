const express = require("express")
const cors = require("cors")
require("dotenv").config();
const connectToDb = require("./configs/db.config")


const app = express()

const categoryRouter = require("./routes/categories.routes")
const productRouter = require("./routes/products.routes")
const storeRouter = require("./routes/stores.routes")
const checkoutRouter = require("./routes/checkout.routes")

app.use(express.json())
app.use(cors(
    {origin: process.env.FRONT_END_URL}
))

app.use("/category", categoryRouter)
app.use("/product", productRouter)
app.use("/store", storeRouter)
app.use("/checkout", checkoutRouter)


connectToDb
.then(
app.listen(process.env.PORT, ()=> console.log(`Listening to port ${process.env.PORT}`))
)
.catch(error => console.log(error))