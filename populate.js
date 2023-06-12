const productsJson =require("./products.json")
const Product=require("./models/product")
const connectDB=require("./db/connect")
require("dotenv").config()


// à executer une seule fois
const start=async ()=>{
try {
    await connectDB(process.env.MONGO_URI)
    await Product.create(productsJson)
    console.log("succ")
    // en cas de succés, fermer la connexion
    process.exit(0)

} catch (error) {
    console.log(error)
    process.exit(1)
}

}

start()