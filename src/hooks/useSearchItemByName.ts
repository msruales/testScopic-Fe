import {useEffect, useState} from "react";
import {Item} from "../models/item.model";

export const useSearchItemByName = (items: Item[]) => {

    const [valueSearch, setSearch] = useState('');
    const [itemsSearch, setItemSearch] = useState([] as Item[])

    const onChangeSearch = (e: any) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (items.length) {
            const searchItems = items.filter((item) => (item.name.toLowerCase().includes(valueSearch.toLowerCase())))
            setItemSearch(searchItems)
        }
    }, [valueSearch, items])

    return {
        valueSearch,
        itemsSearch,
        onChangeSearch
    }
}