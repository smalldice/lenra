import Vue from 'vue'
import App from './App.vue'
import router from './router'
import xp from '@heibanfe/xp-sdk'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Vue.config.productionTip = false
const env = process.env.NODE_ENV === 'development'

xp.config({
  baseURL: `${env ? '' : process.env.VUE_APP_API_DOMAIN}/api`,
  storageKey: process.env.VUE_APP_APP_ID,
  isDevelopment: env,
  router
}).then(() => {
  new Vue({
    router,
    created() {
      if (process.env.VUE_APP_IS_RELEASE === 'true') {
        const { sentryRelease } = require('../package.json')

        xp.getAppInfo().then(({ environment: appEnv }) => {
          Sentry.init({
            dsn: process.env.VUE_APP_SENTRY_DSN,
            environment: process.env.VUE_APP_APP_ID,
            integrations: [new Integrations.Vue({ Vue, attachProps: true })],
            release: sentryRelease
          })
        })
      }
    },
    render: h => h(App)
  }).$mount('#app')
})
