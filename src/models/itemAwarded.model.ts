import {Item} from "./item.model";

export interface ItemAwarded {
    item: Item,
    lastBid: number
}