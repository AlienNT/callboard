import {createStore} from 'vuex'

export default createStore({
    state: {
        products: [
            {
                id: 1,
                title: 'asd',
                image: 'https://m.media-amazon.com/images/I/61qgVEqsVDL._AC_UY1000_.jpg',
                description: 'asdasdad asdasd asda',
                price: 1223,
                user_id: 1,
                category_id: 1
            },
            {
                id: 2,
                title: 'asd',
                image: 'https://ae04.alicdn.com/kf/Scc7929a7ad364e45808cb128b8a25f51C.jpg_640x640.jpg',
                description: 'asdasdad asdasd asda',
                price: 1223,
                user_id: 1,
                category_id: 1
            },
            {
                id: 3,
                title: 'asd',
                image: 'https://preview.redd.it/77gjf1ohe1q91.jpg?width=640&crop=smart&auto=webp&s=7e8ff6981c1c509a6d7f00c41266721585a2204a',
                description: 'asdasdad asdasd asda',
                price: 1223,
                user_id: 1,
                category_id: 2
            },
            {
                id: 4,
                title: 'asd',
                image: 'https://cdn.shopify.com/s/files/1/0618/9275/5701/products/shenhe-gradient-silver-gray-braid-cosplay-wig-c17006-422_533x.jpg?v=1656320876',
                description: 'asdasdad asdasd asda',
                price: 1223,
                user_id: 1,
                category_id: 2
            },
            {
                id: 5,
                title: 'asd',
                image: 'https://ih1.redbubble.net/image.2984845336.0789/st,small,507x507-pad,600x600,f8f8f8.jpg',
                description: 'asdasdad asdasd asda',
                price: 1223,
                user_id: 1,
                category_id: 2
            },
            {
                id: 6,
                title: 'asd',
                image: 'https://i.etsystatic.com/35786495/r/il/0cbd54/4012785026/il_fullxfull.4012785026_c6fr.jpg',
                description: 'asdasdad asdasd asda',
                price: 1223,
                user_id: 1,
                category_id: 2
            },
            {
                id: 7,
                title: 'asd',
                image: '',
                description: 'asdasdad asdasd asda',
                price: 1223,
                user_id: 1,
                category_id: 3
            },
        ],
        users: [
            {
                id: 1,
                name: 'Test',
                phone: '+38000000000',
                email: 'test@test'
            }
        ],
        categories: [
            {
                id: 1,
                title: 'clothes'
            },
            {
                id: 2,
                title: 'accessories'
            },
            {
                id: 3,
                title: 'other'
            }
        ],
        categoriesFilter: []
    },
    getters: {
        getProducts: (state) => {
            return state.products
        },
        getProductsByCategory: (state) => (category_id) => {
            return state.products.filter(item => item.category_id === category_id)
        },
        getProductById: (state) => (id) => {
            const result = state.products.find(item => item.id === id)
            console.log('getProductById', state.products, id, result)
            return result
        },
        getUserById: (state) => (user_id) => {
            return state.users.find(item => item.id === user_id)
        },
        getCategories: (state) => {
            return state.categories
        },
        getCategoriesFilter: (state) => {
            return state.categoriesFilter
        }
    },
    mutations: {
        setProducts: (state, payload) => {
            console.log('setProducts', payload)
            state.products = payload
        },
        setCategoriesFilter: (state, payload) => {
            state.categoriesFilter = payload
        },
        setCategoriesFilterStatusById: (state, id) => {
            const filter = state.categoriesFilter.find(item => item.id === id)
            filter.select = !filter.select
            console.log('categoriesFilter', state.categoriesFilter)
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
            console.log('setCategoriesFilterStatusById', id)
            commit('setCategoriesFilterStatusById', id)
        }
    }
})
