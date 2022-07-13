const router = require('express').Router()
const Order = require('../models/Order')
const {verifyToken} = require('../utls/verifyToken')

// GET ALL ORDERS
router.get('/', verifyToken, async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let orders
        if (qNew){
            orders = await Order.find().sort({createdAt: -1}).limit(5)
        }else if(qCategory){
            orders = await Order.find({categories:{
                $in:[qCategory]
            }})
        }else{
            orders = await Order.find()
        }
        //const product= query ? await Product.find({_id:-1}).limit(5) : await Product.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

//CREATE ORDER
router.post('/',verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder)

    }catch(err){
        res.status(500).json(err.message)
    }
})

//UPDATE ORDER

router.put("/:id",verifyToken,async(req,res)=>{
    try{
      const updateOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateOrder)
    }catch(err){
        res.status(500).json(err.message)
    }   
})

//DELETE ORDDER

router.delete("/:id",verifyToken,async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")        
    }catch(err){
        res.sendStatus(500).json(err.message)
    }
})

//GET BY ID

router.get("/:id",verifyToken,async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err.message)
    }
})
module.exports = router