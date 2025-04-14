import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
    email: {
        type: String,
        require: true
    },
    productId: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
})

export const OrderModel = model<TOrder>('Order', OrderSchema)