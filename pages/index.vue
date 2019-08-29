<template>
  <login v-if="!user" />
  <v-layout
    v-else
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card class="mx-auto amber lighten-3" tile style="background: transparent">
        <v-subheader>
          <span class="red--text">剩餘到站時間</span>
        </v-subheader>
        <v-list shaped class="deep-orange blue-grey lighten-5">
          <v-list-item>
            <v-list-item-icon @click="fetchApi(0)">
              <v-icon v-if="goLoading" class="red--text">
                fas fa-circle-notch fa-spin
              </v-icon>
              <v-icon v-else class="green--text">
                mdi-reload
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ lessTime(go.EstimateTime) }}</v-list-item-title>
              <v-list-item-subtitle>
                還有 {{ go.StopCountDown | stopCount }} 站到 {{ go.StopName.Zh_tw }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon @click="fetchApi(1)">
              <v-icon v-if="backLoading" class="red--text">
                fas fa-circle-notch fa-spin
              </v-icon>
              <v-icon v-else class="green--text">
                mdi-reload
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ lessTime(back.EstimateTime) }}</v-list-item-title>
              <v-list-item-subtitle>
                還有 {{ back.StopCountDown | stopCount }} 站到 {{ back.StopName.Zh_tw }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { interval, timer } from 'rxjs'
import { format, addSeconds } from 'date-fns'
import { mapState } from 'vuex'
import Login from '../components/Login'
import { AppContext } from '../core/AppContext'
import { fetchAll } from '../core/fetchAll'

const countdownTimer = interval(1000)
const loadingTimer = timer(1500)
let subscription

export default {
  components: {
    Login
  },
  filters: {
    stopCount (stopCountDown) {
      return stopCountDown || '?'
    }
  },
  data () {
    return {
      afterLoadSec: 0,
      go: { EstimateTime: null, StopName: {} },
      back: { EstimateTime: null, StopName: {} },
      goLoading: false,
      backLoading: false
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  beforeCreate () {
    AppContext.subscribeUserState(this.$store)
  },
  mounted () {
    this.fetchApi(0)
  },
  destroyed () {
    subscription.unsubscribe()
  },
  methods: {
    async fetchApi (position) {
      position === 0 ? this.goLoading = true : this.backLoading = true
      const res = await fetchAll(this.$axios)
      const list = res.data
      this.go = list.find(it => it.StopID === '290710' && it.Direction === 0)
      this.back = list.find(it => it.StopID === '300865' && it.Direction === 0)
      loadingTimer.subscribe(() => {
        this.goLoading = false
        this.backLoading = false
      })
      subscription && subscription.unsubscribe()
      subscription = countdownTimer.subscribe(() => this.afterLoadSec++)
    },
    lessTime (sec) {
      const date = addSeconds(null, sec - this.afterLoadSec)
      if (!sec) {
        return '未發車或已過站'
      } else if (sec - this.afterLoadSec < 60) {
        return '即將進站'
      } else {
        return `${format(date, 'm')}分`
      }
    }
  }
}
</script>
