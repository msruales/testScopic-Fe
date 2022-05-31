import authAxios from "../config/axios/authAxios";
import {Login} from "../models/login.model";
import {Register} from "../models/register.model";
import Axios from "axios";

const serverInfo = {
    grant_type: "password",
    client_id: 2,
    client_secret: "b7TQxIxetD19ieeR5PYbG7Q4M42cRRYGrJIuRQjr",
    scope: "*",
};

export class UserService {

    static async refreshUser() {
        const {data} = await authAxios.get('init')
        return data
    }

    static async login(values: Login) {
        return await Axios.post(`${process.env.REACT_APP_BASE_URL}/oauth/token`, {
            ...serverInfo,
            username: values.email,
            password: values.password
        })
    }

    static async register(values: Register) {
        const {data} = await authAxios.post('auth/register', {...values})
        return data
    }

    static async setAutomaticOffers(itemId: number) {
        const {data} = await authAxios.post('config', {item_id: itemId})
        return data
    }

    static async getAutomaticOffers(itemId: number) {
        const {data} = await authAxios.post('config', {item_id: itemId})
        return data
    }
}


export default UserService