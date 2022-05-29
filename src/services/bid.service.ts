import authAxios from "../config/axios/authAxios";

export class AuctionService {

    static async getAllBidsForUser() {

        const {data} = await authAxios.get('user/bids')
        return data
    }

}

export default AuctionService