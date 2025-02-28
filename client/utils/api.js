import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllPost = async (userId) => {
    try {
        const res = await axios.get(`${API_URL}/posts${userId ?`?userId=${userId}`: ''}`)
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getSinglePost = async (postId) => {
    try {
        const res = await axios.get(`${API_URL}/posts/${postId}`)
        return res.data.post
    } catch (error) {
        throw new Error(error.message)
    }
}
