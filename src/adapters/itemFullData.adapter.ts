import {ItemFullData} from "../models/itemFullData.model";
import {itemAdapter} from "./item.adapter";

export const ItemFullDataAdapter = (item: any): ItemFullData => ({
    userAuction: item.user_auction ? {
        id: item.user_auction.id,
        bid: item.user_auction.bid,
        userId: item.user_auction.user_id,
        itemId: item.user_auction.item_id,
        item: item.user_auction.item ? itemAdapter( item.user_auction.item) : null,
    } : null,
    item: itemAdapter(item.item),
    history: item.history ? item.history.map((history: any) => ({
        id: history.id,
        bid: history.bid,
        userId: history.user_id,
        itemId: history.item_id,
        item: history.item ? itemAdapter(history.item): null,
    })) : null,
    timeLeft: item.time_left ? item.time_left : [0,0] ,
    itemOwner: item.item_owner,
    canBid: item.can_bid
})