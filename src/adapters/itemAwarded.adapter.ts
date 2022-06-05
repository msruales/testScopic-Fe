import {ItemAwarded} from "../models/itemAwarded.model";
import {itemAdapter} from "./item.adapter";

export const itemAwardedAdapter = (itemAwarded: any): ItemAwarded => ({
    item: itemAdapter(itemAwarded.item),
    lastBid: itemAwarded.last_bid
})