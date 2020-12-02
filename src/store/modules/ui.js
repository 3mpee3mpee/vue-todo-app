export default{
    state: {
        drawer: false,
        notification: {
            display: false,
            text: 'Notification placholder text',
            timeout: 3000,
            class: 'success'
        },
        displaySearchList: false,
        newListForm: false
    },
    getters: {
        drawer: state => {
            return state.drawer
        },
        NOTIFICATION: state => {
            return state.notification;
        },
        DISPLAY_SEARCH_LIST: state => {
            return state.displaySearchList
        },
        NEW_LIST_FORM: state =>{
            return state.newListForm
        }
    },
    mutations: {
        setDrawer: (state, payload) => {
            state.drawer = payload
        },
        SET_NOTIFICATION: (state, { display, text, alertClass }) => {
            state.notification.display = display;
            state.notification.text = text;
            state.notification.class = alertClass;
        },
        SET_DISPLAY_SEARCH_LIST: (state, payload) =>{
            state.displaySearchList = payload
        },
        SET_NEW_LIST_FORM: (state,payload) =>{
            state.newListForm = payload
        }
    },
    actions: {}
}