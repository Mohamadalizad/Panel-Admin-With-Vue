import axios from "@/utilities/axios"

export const getComments = (postId) => {
    return axios.get(`/api/comment?postId=${postId}`)}

export const addComments = (comment) => {
    return axios.post(`/api/comment`, comment)}

export const deleteComments = (commentId) => {
    return axios.delete(`/api/comment/${commentId}`)}
