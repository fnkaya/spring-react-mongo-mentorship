import axios from "axios";
import { BASE_URL } from "./ApiBaseUrl";
import {createAuthToken} from "../AuthToken";

export const saveMentorship = async (mentorId, menteeId, categoryName, subject) => {
    const url = `${BASE_URL}/api/mentorships`

    const body = {
        mentor: {
            id: mentorId
        },
        mentee: {
            id: menteeId
        },
        category: {
            name: categoryName,
                subject
        }
    }

    const httpOptions = {
        headers: {
            Accept: 'application/json',
        },
        validateStatus: status => true
    }

    return await axios.post(url, body, httpOptions)
}

export const getMentorshipsByMenteeId = async (id) => {
    const url = `${BASE_URL}/api/mentorships/mentee/${id}`

    const httpOptions = {
        headers: {
            Accept: 'application/json',
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions);
}

export const getMentorshipsByMentorId = async (id) => {
    const url = `${BASE_URL}/api/mentorships/mentor/${id}`

    const httpOptions = {
        headers: {
            Accept: 'application/json',
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions);
}

export const getMentorshipById = async (id) => {
    const url = `${BASE_URL}/api/mentorships/${id}`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        validateStatus: status => true
    }

    return await axios.get(url, httpOptions)
}

export const updateMentorshipStatus = async (id, status) => {
    const url = `${BASE_URL}/api/mentorships/${id}`

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

export const saveMentorshipPhases = async (id, phases) => {
    const url = `${BASE_URL}/api/mentorships/${id}/phases`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        validateStatus: status => true
    }

    return await axios.patch(url, phases, httpOptions)
}

export const updateMentorshipPhaseStatus = async (id, phase) => {
    const url = `${BASE_URL}/api/mentorships/${id}/phases/status`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        validateStatus: status => true
    }

    return await axios.patch(url, phase, httpOptions)
}

export const updateMentorshipPhaseComment = async (id, phase) => {
    const url = `${BASE_URL}/api/mentorships/${id}/phases/comment`

    const httpOptions = {
        headers: {
            Accept: 'application/json'
        },
        validateStatus: status => true
    }

    return await axios.patch(url, phase, httpOptions)
}