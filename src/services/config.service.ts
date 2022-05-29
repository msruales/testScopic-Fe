import authAxios from "../config/axios/authAxios";
import {Config} from "../models/config.model";

export class configService {

    static async setConfig(config: Config) {
        const body = {
            amount: config.amount,
            percentage_amount: config.percentageAmount
        }
        const {data} = await authAxios.post('config', {...body})
        return data
    }

    static async getConfig() {
        const {data} = await authAxios.get('config')
        return data
    }
}


export default configService