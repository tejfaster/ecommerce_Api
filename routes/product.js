const router = require('express').Router()
const Product = require('../models/Product')
const {verifyTokenAndAdmin} = require('../utls/verifyToken')

// GET ALL PRODUCT
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products
        if (qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory]
            }})
        }else{
            products = await Product.find()
        }
        //const product= query ? await Product.find({_id:-1}).limit(5) : await Product.find()
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})

//CREATE
router.post('/',verifyTokenAndAdmin,async(req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)

    }catch(err){
        res.status(500).json(err.message)
    }
})

//UPDATE PRODUCT

router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
      const updateProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateProduct)
    }catch(err){
        res.status(500).json(err.message)
    }   
})

//DELETE PRODUCT

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")        
    }catch(err){
        res.sendStatus(500).json(err.message)
    }
})

//GET BY ID

router.get("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err.message)
    }
})
module.exports = router