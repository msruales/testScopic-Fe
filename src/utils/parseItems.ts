import {Item} from "../models/item.model";

export const parseItem = (item: Item): Item & { lastBid: number } => {
    return {...item, lastBid: item.bids && item.bids.length ? item.bids[0].bid : 0}
}
export const parseArrayItems = (items: Item[]) => {
    return items.map((item: Item) => parseItem(item))
}