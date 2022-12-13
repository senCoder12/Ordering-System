import express from "express";
import { createVendor, createVendors, getVendor, submitVendorReview } from "../Controllers/vendorController.js";

const vendorRouter = express.Router();

vendorRouter.post('/', createVendor);
vendorRouter.post('/multiple', createVendors);
vendorRouter.get('/',getVendor);
vendorRouter.patch('/', submitVendorReview);

export default vendorRouter;