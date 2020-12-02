
export default {
    state: {
        lists: [],
        tasks: [],
        taskID: null,
        notes: [],
        modal: false
    },
    getters: {
        LISTS: state => {
            return state.lists
        },
        TASKS: state => {
            return state.tasks
        },
        TASKID: state => {
            return state.taskID
        },
        NOTES: state => {
            return state.notes
        },
        MODAL: state => {
            return state.modal
        }
    },
    mutations: {
        SET_LISTS: (state, payload) => {
            state.lists = payload
        },
        SET_TASKS: (state, payload) => {
            state.tasks = payload
        },
        SET_TASK_ID: (state, payload) => {
            state.taskID = payload
        },
        SET_NOTES: (state, payload) => {
            state.notes = payload
        },
        SET_MODAL: (state, payload) => {
            state.modal = payload
        }
    },

    
}