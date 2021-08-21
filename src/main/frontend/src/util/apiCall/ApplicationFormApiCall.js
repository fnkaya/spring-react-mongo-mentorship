import axios from "axios";
import { BASE_URL } from "./ApiBaseUrl";

export const postApplicationForm = async (id, categoryName, subjects, description) => {
    const url = `${BASE_URL}/api/applications`

    const httpOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        validateStatus: status => true
    }
    const body = {
        owner: {id},
        category: {
                name: categoryName,
                subjects: subjects
            },
        description,
    }

    return await axios.post(url, body, httpOptions)
}

export const updateApplicationStatus = async (applicationId, status) => {
    const url = `${BASE_URL}/api/applications/${applicationId}`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        params: {
            status
        },
        validateStatus: status => true
    }

    return await axios.patch(url, {}, httpOptions)
}

export const getApplicationById = async (id) => {
    const url = `${BASE_URL}/api/applications/${id}`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}

export const getAllApplicationForms = async () => {
    const url = `${BASE_URL}/api/applications`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        params: {
            sort: 'date,desc'
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}

export const getAllApplicationFormsByOwnerId = async (ownerId) => {
    const url = `${BASE_URL}/api/applications/owner/${ownerId}`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        params: {
            sort: 'date,desc'
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}

export const getAllApplicationFormsByStatus = async (status) => {
    const url = `${BASE_URL}/api/applications/status`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        params: {
            status,
            sort: 'date,desc'
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}
