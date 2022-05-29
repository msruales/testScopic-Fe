import authAxios from "../config/axios/authAxios";

export class AutomaticOfferService {

    static async setAutomaticOffers(itemId: number){
        const {data} = await authAxios.post('automatic_offer', {item_id: itemId})
        return data
    }
    static async getAutomaticOffers(itemId: number){
        const {data} = await authAxios.get('automatic_offer', {params: {item_id: itemId}})
        return data
    }
}


export default AutomaticOfferService