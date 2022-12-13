import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer_info: {
        email: {
            type: "String",
            required: true,
        },
        name: {
            type: 'string',
            required: true,
        },
        address: {
            type: 'string',
            required: true, 
        },
    },
    productLists: [
        {
            name: String,
            vendor: String,
            price: Number,
        }
    ],
    orderState: {
        type: 'string',
        default: "In Progress",
    },
    timeToDeliver: {
        type: Date,
        default: new Date(),
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
const orderModel = mongoose.model("OrderItem", orderSchema);

export default orderModel;
