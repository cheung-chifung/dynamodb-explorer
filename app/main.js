import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

import App from './app'

import Connection from './components/views/connection'
import Table from './components/views/table'
import Query from './components/views/query'
import Help from './components/views/help'

import 'app/node_modules/semantic-ui-css/semantic.min.css'

$.fn.sidebar = require('app/node_modules/semantic-ui-sidebar')
$.fn.transition = require('app/node_modules/semantic-ui-transition')
$.fn.dimmer = require('app/node_modules/semantic-ui-dimmer')
$.fn.modal = require('app/node_modules/semantic-ui-modal')

Vue.use(VueRouter)
Vue.use(VueValidator)

var router = new VueRouter()

router.map({
  '/connection': {
    component: Connection
  },
  '/table': {
    component: Table
  },
  '/query': {
    component: Query
  },
  '/help': {
    component: Help
  }
})

router.start(App, '#app')

