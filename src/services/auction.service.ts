import authAxios from "../config/axios/authAxios";
import {AuctionRequest} from "../models/AuctionRequest.model";

export class AuctionService {

    static async store(auction: AuctionRequest) {

        const body = {
            bid: auction.bid,
            item_id: auction.itemId,
        }

        const {data} = await authAxios.post('auctions', {...body})
        return data
    }
}

export default AuctionService