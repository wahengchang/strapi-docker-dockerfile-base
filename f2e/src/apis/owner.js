import axios from 'axios'

const fetchList = () => {
    const url = '/owners'
    return axios.get(url)
}

const fetchDetail = (id = '') => {
    if(!id) {
        throw new Error(`[ERROR] id is required, id=${id}`)
    }
    const url = `/owners/${id}`
    return axios.get(url)
}

const pageInfo = () => {
    const url = '/owner-page'
    return axios.get(url)
}

export default {
    fetchList,
    pageInfo,
    fetchDetail
}
