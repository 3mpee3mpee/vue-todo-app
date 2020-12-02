export default{
    state: {
        isFilter: false,
        isSorted: false,
        filteredTasks: [],
        imgUrl: ''
    },
    getters: {
        IS_FILTER: state => {
           return state.isFilter
        },
        IS_SORTED: state => {
            return state.isSorted
        },
        FILTERED: state => {
            return state.filteredTasks
        },
        IMG_URL: state => {
            return state.imgUrl
        }
    },
    mutations: {
        SET_FILTER: (state,payload) => {
            state.isFilter = payload
        },
        SET_SORTED: (state, payload) => {
            state.isSorted = payload
        },
        SET_FILTERED_TASKS: (state, payload) => {
            state.filteredTasks = payload
        },
        SET_IMG: (state, payload) => {
            state.imgUrl = payload
        }
    },
    actions: {}
}