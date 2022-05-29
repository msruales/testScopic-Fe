import {Item} from "./item.model";
import {UserAuction} from "./auction.model";

export interface ItemFullData {
    userAuction: UserAuction | null
    item: Item,
    history: UserAuction[] | null
    timeLeft: [number,number],
    itemOwner: null,
    canBid: boolean
}