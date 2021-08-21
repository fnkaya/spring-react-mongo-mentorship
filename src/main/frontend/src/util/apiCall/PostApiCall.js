import axios from "axios";
import { BASE_URL } from "./ApiBaseUrl";

export const getPostById = async (id) => {
    const url = `${BASE_URL}/api/posts/${id}`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}

export const getAllPosts = async () => {
    const url = `${BASE_URL}/api/posts`;

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}

export const getAllPostsByCategory = async (category) => {
    const url = `${BASE_URL}/api/posts/category`;

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        params: {
            category,
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}

export const getAllPostsBySubject = async (subject) => {
    const url = `${BASE_URL}/api/posts/subject`;

    const httpOptions = {
        headers: {
          Accept: 'application/json'
        },
        params: {
            subject,
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}

export const searchPost = async (keyword) => {
    const url = `${BASE_URL}/api/posts/search`;

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        params: {
            desc: keyword
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}