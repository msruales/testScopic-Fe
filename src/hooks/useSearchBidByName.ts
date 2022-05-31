import {useEffect, useState} from "react";
import {BidFullData} from "../models/bid.model";

export const useSearchBidByName = (bids: BidFullData[]) => {

    const [valueSearch, setSearch] = useState('');
    const [bidsSearch, setBidsSearch] = useState([] as BidFullData[])

    const onChangeSearch = (e: any) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (bids.length) {
            const searchItems = bids.filter((bid) => (bid.item.name.toLowerCase().includes(valueSearch.toLowerCase())))
            setBidsSearch(searchItems)
        }
    }, [valueSearch, bids])

    return {
        valueSearch,
        bidsSearch,
        onChangeSearch
    }
}