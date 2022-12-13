import mongoose from 'mongoose';
import orderModel from '../Models/order.model.js';
import vendorModel from '../Models/vendor.model.js';

export const createOrder = async(req, res) => {
    let order = req.body;
    await Promise.all(order.productLists.map((item)=>
        getBestVendor(item.name).then((res)=>{
            item.vendor = res.vendorId;
            item.price = res.price;
        })
    ));
    const newOrder = orderModel({...order});
    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

export const getOrders = async(req, res) => {
    try {
        const orders =  await orderModel.find();  
        return res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"});
    }
}

export const submitFinalOrder = async(req, res) => {
    try {
        const {id} = req.query;
        console.log(id);
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "User does not exist"});
        }
        const orders =  await orderModel.find();  
        const updatedData = {...orders,orderState:"Ready to fulfillment"}
        await orderModel.findByIdAndUpdate(id,updatedData,{new: true});
        return res.status(200).json({message: "Ready to fulfillment"});   
    } catch (error) {
        return res.status(404).json({message: "Something went wrong"});  
    }
} 
export const markOrderComplete = async(req, res) => {
    try {
        const {id} = req.query;
        console.log(id);
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "User does not exist"});
        }
        const orders =  await orderModel.find();  
        const updatedData = {...orders,orderState:"Completed"}
        await orderModel.findByIdAndUpdate(id,updatedData,{new: true});
        return res.status(200).json({message: "Order completed successfully"});   
    } catch (error) {
        return res.status(404).json({message: "Something went wrong"});  
    }
} 

const getBestVendor = async(itemName)=> {
    try {
        const vendors =  await vendorModel.find({product: itemName}).sort({avgRating: -1});
        const rating = vendors[0].avgRating;
        let highestRatingVendors = await vendorModel.find({avgRating: rating,product: itemName});
        highestRatingVendors = await vendorModel.find({product: itemName,avgRating:rating}).sort({deliveryRating: -1});
        return  {
            vendorId: highestRatingVendors[0]._id,
            price: highestRatingVendors[0].price
        }
    } catch (error) {
        return null;
    }
}