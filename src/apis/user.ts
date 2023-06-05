import axios from 'axios'

import { IUrlParams, ISearchParams } from './../types/api.d';
import { IUser } from '../types/user';

const baseURL = 'http://localhost:3004/users'
const api = axios.create({ baseURL })

export const list = async (urlParams: IUrlParams) => {
    const { page, limit = 10, search } = urlParams
    const url = `?_page=${page}&_limit=${limit}`
    const searchQuery = buildSearchQuery(search)

    return await api.get(url + searchQuery)
}

export const create = async (user: IUser) => {
    return await api.post('', user)
}

export const update = async (user: IUser) => {
    return await api.put(`/${user.id}`, user)
}

export const remove = async (id: number) => {
    return await api.delete(`/${id}`)
}

const buildSearchQuery = (searchParams: ISearchParams = {}) => {
    return Object.keys(searchParams)
        .reduce((searchBuilder, currentKey) => searchBuilder + `&${currentKey}_like=${searchParams[currentKey]}`, "")
}




