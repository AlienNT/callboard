import {createStore} from 'vuex'
import axios from "axios";

const store = createStore({
    state: {
        announcements: [],
        announcementsPages: {},
        APSort: {
            sortField: 'updated_at',
            sortMode: 'desc'
        },
        users: [
            {
                id: 1,
                name: 'Test User',
                phone: '+38000000000',
                email: 'test@test'
            }
        ],
        authUser: {},
    },
    getters: {
        getUserById: (state) => (user_id) => {
            return state.users.find(item => item.id === user_id)
        },
        getAuthUser: (state) => {
            return state.authUser
        },
        getToken: () => {
            return localStorage.getItem('token')
        },
        getAnnouncements: (state) => {
            return state.announcements
        },
        getAnnouncement: (state) => (id) => {
            return state.announcements.find(item => item._id === id)
        },
        getAnnouncementsPages: (state) => {
            return state.announcementsPages
        },
        getAPSortField: (state) => {
            return state.APSort.sortField
        },
        getAPSortMode: (state) => {
            return state.APSort.sortMode
        }
    },
    mutations: {
        setProducts: (state, payload) => {
            state.products = payload
        },
        setCategoriesFilter: (state, payload) => {
            state.categoriesFilter = payload
        },
        setCategoriesFilterStatusById: (state, id) => {
            const filter = state.categoriesFilter.find(item => item.id === id)
            filter.select = !filter.select
        },
        login: (state, payload) => {
            setToken(payload.token)
            state.authUser = payload.user
        },
        logout: (state) => {
            setToken('')
            state.authUser = {}
        },
        setAnnouncements: (state, payload) => {
            state.announcements = [...state.announcements, ...payload]
        },
        setAnnouncement: (state, payload) => {
            if (!state.announcements.find(item => item._id === payload._id)) {
                state.announcements.push(payload)
            }
        },
        updateAnnouncement: (state, payload) => {
            const index = state.announcements.findIndex(item => item._id === payload._id)
            if (index > -1) {
                state.announcements[index] = payload
            }
        },
        deleteAnnouncement: (state, id) => {
            const index = state.announcements.findIndex(item => item._id === id)
            if (index > -1) {
                state.announcements.splice(index, 1)
            }
        },
        resetAnnouncements: (state) => {
            state.announcements = []
        },
        setAnnouncementPages: (state, pages) => {
            state.announcementsPages = pages
        },
        setAPSortMode: (state, mode) => {
            state.APSort.sortMode = mode
        },
        setAPSortField: (state, mode) => {
            state.APSort.sortField = mode
        }
    },
    actions: {
        setCategoriesFilter({commit}, categories) {
            if (categories) {
                commit('setCategoriesFilter', categories.map(item => {
                    return {...item, select: false}
                }))
            }
        },
        setCategoriesFilterStatusById({commit}, id) {
            commit('setCategoriesFilterStatusById', id)
        },
        async registration({commit}, payload) {
            const response = await httpRequest('post', '/registration', payload)
            const {token, user} = response?.data

            if (user) {
                commit('login', {token, user})
            }

        },
        async signIn({commit}, payload) {
            const response = await httpRequest('post', '/login', payload)
            const {token, user} = response?.data
            if (token) {
                commit('login', {token, user})
            }
            return response
        },
        logout({commit}) {
            commit('logout')
        },
        async fetchAuthUser({commit}, payload) {
            const response = await httpRequest('get', '/auth-user', payload)
            const {token, user} = response?.data
            if (token) {
                commit('login', {token, user})
            }
        },
        async fetchAnnouncements({commit}, payload) {
            const params = {
                page: payload?.page || 1,
                limit: payload?.limit || 4,
                sortField: payload?.sortField || 'updated_at',
                sortMode: payload?.sortMode || 'desc'
            }
            const response = await httpRequest('get', '/announcements', null, params)
            const {data, pages} = response?.data

            if (data) {
                commit('setAnnouncements', data)
            }
            if (pages) {
                commit('setAnnouncementPages', pages)
            }
            return response
        },
        setAnnouncementPages({commit}, pages) {
            commit('setAnnouncementPages', pages)
        },
        setAnnouncements({commit}, payload) {
            commit('setAnnouncements', payload)
        },
        async fetchAnnouncementById({commit}, id) {
            const response = await httpRequest('get', `/announcements/${id}`)
            const {data} = response?.data
            if (data) {
                commit('setAnnouncement', data)
            }
        },
        async createAnnouncement(context, payload) {
            const response = await httpRequest('post', `/announcements`, payload)
            const {data} = response?.data
            if (data) {
                await context.dispatch('fetchAnnouncementById', data._id)

            }
            return response
        },
        async updateAnnouncement(context, payload) {
            const response = await httpRequest('patch', `/announcements/${payload._id}`, payload.data)
            const {data} = response?.data
            if (data) {
                await context.commit('updateAnnouncement', data)

            }
            return response
        },
        async deleteAnnouncement(context, id) {
            const response = await httpRequest('delete', `/announcements/${id}`)
            const {data} = response?.data
            if (data) {
                await context.commit('deleteAnnouncement', data._id)

            }
            return response
        },
        resetAnnouncements({commit}) {
            commit('resetAnnouncements')
        },
        setAPSortMode({commit}, payload) {
            return payload ? commit('setAPSortMode', payload) : null;
        },
        setAPSortField({commit}, payload) {
            return payload ? commit('setAPSortField', payload) : null;
        }
    }
})

export async function httpRequest(method, url, data, params) {
    return axios({
        method,
        url,
        baseURL: 'https://bulletin-board-api.onrender.com/api',
        // baseURL: 'http://localhost:4000/api',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` || '',
        },
        data,
        params
    });
}

export function checkAuthorship(postAuthorId) {
    const authUserId = store.getters['getAuthUser']?._id

    return postAuthorId && authUserId ?
        postAuthorId === authUserId :
        false

}

export function setToken(token) {
    localStorage.setItem('token', token)
}

export default store