import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createANewOrder = async (orderData: TOrder) => {
    const result = await OrderModel.create(orderData);
    return result;
}

export const OrderServices = {
    createANewOrder
}