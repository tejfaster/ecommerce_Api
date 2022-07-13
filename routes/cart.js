const router = require('express').Router()
const Cart = require('../models/Cart')
const {verifyToken} = require('../utls/verifyToken')

// GET ALL CART
router.get('/', verifyToken, async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let carts
        if (qNew){
            products = await Cart.find().sort({createdAt: -1}).limit(5)
        }else if(qCategory){
            carts = await Cart.find({categories:{
                $in:[qCategory]
            }})
        }else{
            carts = await Cart.find()
        }
        //const product= query ? await Product.find({_id:-1}).limit(5) : await Product.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
})

//CREATE CART
router.post('/',verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save()
        res.status(201).json(savedCart)

    }catch(err){
        res.status(500).json(err.message)
    }
})

//UPDATE CART

router.put("/:id",verifyToken,async(req,res)=>{
    try{
      const updateCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateCart)
    }catch(err){
        res.status(500).json(err.message)
    }   
})

//DELETE CART

router.delete("/:id",verifyToken,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...")        
    }catch(err){
        res.sendStatus(500).json(err.message)
    }
})

//GET BY ID

router.get("/:id",verifyToken,async(req,res)=>{
    try{
        const cart = await Cart.findById(req.params.id)
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err.message)
    }
})
module.exports = router