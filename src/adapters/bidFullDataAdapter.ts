import {Bid, BidFullData} from "../models/bid.model";
import {itemAdapter} from "./item.adapter";

export const bidFullDataAdapter = (bids: any): BidFullData => ({
    bids: bids.bids ? bids.bids.map( (bid: any):Bid => ({
        id: bid.id,
        bid: bid.bid,
        itemId: bid.item_id,
        userId: bid.user_id
    }) ) : [],
    item: itemAdapter(bids.item),
    state: bids.state
})