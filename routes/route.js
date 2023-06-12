const express=require("express")
const router=express.Router()
const {getAllProducts}=require('../controllers/controller')

router.get('/',getAllProducts)

// router.get('/:company',getProductByCompany)



module.exports=router