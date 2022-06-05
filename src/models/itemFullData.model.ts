import {Item} from "./item.model";
import {UserAuction} from "./auction.model";
import {User} from "./user.model";

export interface ItemFullData {
    userAuction: UserAuction | null
    item: Item,
    history: UserAuction[] | null
    timeLeft: [number,number],
    itemOwner: null | User,
    canBid: boolean
}