import vendorModel from '../Models/vendor.model.js';

export const createVendors = async(req, res) => {
    const vendors = req.body;
    try {
        const vendorsSave = await vendorModel.insertMany(vendors);
        res.status(201).json(vendorsSave);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

export const createVendor = async(req, res) => {
    const vendor = req.body;
    const newVendor = vendorModel({...vendor});
    try {
        await newVendor.save();
        res.status(201).json(newVendor);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

export const getVendor = async(req, res) => {
    try {
        const {id} = req.query;
        const vendor = await vendorModel.findById(id);
        res.status(201).json(vendor);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

export const submitVendorReview = async (req, res) => {
    try {
        const {vendorId} = req.query;
        let {deliveryRating,overallVendorRating} = req.body;
        const getVendor = await vendorModel.findById(vendorId);
        const count = getVendor.count;
        deliveryRating = (getVendor.deliveryRating*count + deliveryRating) / (count+1);
        getVendor.deliveryRating = Math.round(deliveryRating*100)/100;
        overallVendorRating = (getVendor.overallVendorRating*count + overallVendorRating) / (count+1);
        getVendor.overallVendorRating = Math.round(overallVendorRating*100) /100;
        const avgRating = (deliveryRating+overallVendorRating)/ 2; 
        getVendor.avgRating = Math.round(avgRating*100) /100;
        getVendor.count = getVendor.count + 1;
        await vendorModel.findByIdAndUpdate(vendorId,getVendor,{new: true});
        return res.json(getVendor);   
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}