import {Item} from "./item.model";

export interface Bid {
    id: number,
    bid: number,
    itemId: number,
    userId: number
}

export interface BidFullData {
    bids: Bid[],
    item: Item,
    state: 'Won' | 'In progress' | 'Lost'
}