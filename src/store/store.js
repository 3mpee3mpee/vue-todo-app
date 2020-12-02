import Vue from 'vue'
import Vuex from 'vuex'

import UIModule from './modules/ui.js'
import User from './modules/user'
import Lists from './modules/list'
import Options from './modules/options'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        ui: UIModule,
        user: User,
        lists: Lists,
        options: Options
    }
})