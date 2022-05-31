import {useEffect, useState} from "react";
import {Item} from "../models/item.model";
import {parseArrayItems} from "../utils/parseItems";

export const useOrderItemsByBid = (items: Item[]) => {

    const [sortByBid, setSortByBid] = useState('asc');
    const [itemsSort, setItemsSort] = useState([] as (Item & { lastBid: number }) [])

    const handleChangeSort = (e: any) => {
        setSortByBid(e)
    }

    useEffect(() => {
        if (items.length) {
            const sortItems = parseArrayItems(items).sort((itemA, itemB) => {
                return sortByBid === 'desc' ? itemB.lastBid - itemA.lastBid : itemA.lastBid - itemB.lastBid
            })
            setItemsSort(sortItems)
        }
    }, [sortByBid, items])

    return {
        itemsSort,
        handleChangeSort
    }
}