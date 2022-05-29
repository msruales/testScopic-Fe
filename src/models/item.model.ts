export interface Item {
    id: number,
    name: string,
    description: string,
    auctionEnd: Date,
    imageUrl: string,
    itemOwner: number,
    bids: any[]
}