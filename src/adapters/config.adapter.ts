import {Config} from "../models/config.model";

export const configAdapter = (config: any):Config => ({
    amount: config.amount,
    percentageAmount: config.percentage_amount
})