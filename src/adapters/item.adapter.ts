import {Item} from "../models/item.model";

export const itemAdapter = (item: any): Item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    auctionEnd: item.auction_end,
    imageUrl: item.image_url,
    itemOwner: item.item_owner,
    bids: item.bids
})