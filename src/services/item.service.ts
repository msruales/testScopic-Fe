import authAxios from "../config/axios/authAxios";
import {ItemFilter} from "../models/itemsFilter.model";
import {Item} from "../models/item.model";
import moment from "moment";

export class UserService {

    static async getAll (filter: ItemFilter, sort: 'asc' | 'desc' ){
        const {data} = await authAxios.get('items', { params: {...filter, sort}})
        return data
    }

    static async store(item: Partial<Item>){

        const body = {
            name: item.name,
            description: item.description,
            auction_end: moment(item.auctionEnd).format('YYYY-MM-DD'),
            image_url: item.imageUrl
        }

        const {data} = await authAxios.post('items', {...body})
        return data
    }

    static async update(item: Partial<Item>, id: number){
        const body = {
            name: item.name,
            description: item.description,
            auction_end: moment(item.auctionEnd).format('YYYY-MM-DD'),
            image_url: item.imageUrl
        }
        const {data} = await authAxios.patch(`items/${id}`, {...body})
        return data
    }

    static async delete(id: number){
        const {data} = await authAxios.delete(`items/${id}`)
        return data
    }

    static async showById(id: number){
        const {data} = await authAxios.post(`view_item/${id}`)
        return data
    }

    static async getAwardedItems (){
        const {data} = await authAxios.get('user/awarded_items')
        return data
    }

    static async showAwardedById(id: number){
        const {data} = await authAxios.get(`user/awarded_item/${id}`)
        return data
    }

}


export default UserService