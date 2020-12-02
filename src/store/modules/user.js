// import axios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise'
import {db} from '@/firebase/db'


export default{
    state: {
        user: {
            
            email: '',
            pass: '',
            
            
        },
        currUser: '',
        login: [],
        isLoggedIn: false
    },
    getters: {
        LOGIN: state => {
            return state.login
        },
        EMAIL: state => {
            return state.email
        },
        PASSWORD: state => {
            return state.pass
        },
        IS_LOGGED: state => {
            return state.isLoggedIn
        },
        CURR_USER: state => {
            return state.currUser
        }
    },
    mutations: {
        SET_LOGIN: (state, payload) => {
            state.login = payload
        },
        SET_EMAIL: (state, payload) => {
            state.email = payload
        },
        SET_PASS: (state, payload) => {
            state.pass = payload
        },
        SET_IS_LOGGED: (state, payload) =>{
            state.isLoggedIn = payload
        },
        SET_CURR_USER: (state, payload) => {
            state.currUser = payload
        }
    },
    actions: {
        REGISTER: ({commit}, {username, email, password}) =>{
            commit('SET_LOGIN', username)
            commit('SET_EMAIL', email)
            commit('SET_PASS', password)
        },
        LOGIN: ({commit}, username) => {
        db
        .collection("Users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            username = doc.data().username
            
            
            commit('SET_LOGIN', username)
            console.log(username)
            
            
            
            
          });
          
          
        })
        
        },
        

    }
}