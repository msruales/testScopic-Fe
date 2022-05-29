import {Item} from "./item.model";
import {Bid} from "./bid.model";

export interface UserAuction extends Bid {
    item: Item | null
}
