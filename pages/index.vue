<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card class="mx-auto" tile>
        <v-subheader>剩餘到站時間</v-subheader>
        <v-list shaped>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ lessTime(go.EstimateTime) }}</v-list-item-title>
              <v-list-item-subtitle>
                還有 {{ go.StopCountDown | stopCount }} 站到 {{ go.StopName.Zh_tw }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
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
import { interval } from 'rxjs'
import { format, addSeconds } from 'date-fns'
import getAuthorizationHeader from '~/core/getAuthorizationHeader'

const timer = interval(1000)
let subscription

export default {
  filters: {
    stopCount (stopCountDown) {
      return stopCountDown || '?'
    }
  },
  data () {
    return {
      afterLoadSec: 0
    }
  },
  asyncData ({ $axios }) {
    const headers = getAuthorizationHeader()
    const filter = `StopID%20eq%20'290710'%20or%20StopID%20eq%20'290780'`
    return $axios.get(`https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/InterCity/1088?$filter=${filter}&$top=2&$format=JSON`, { headers })
      .then((res) => {
        const list = res.data
        return {
          go: list.find(it => it.StopID === '290710'),
          back: list.find(it => it.StopID === '290780')
        }
      })
  },
  mounted () {
    subscription = timer.subscribe(() => this.afterLoadSec++)
  },
  destroyed () {
    subscription.unsubscribe()
  },
  methods: {
    lessTime (sec) {
      const date = addSeconds(null, sec - this.afterLoadSec)
      if (!sec) {
        return '未發車或已過站'
      } else if (sec - this.afterLoadSec < 60) {
        return '即將進站'
      } else {
        return `${format(date, 'mm')}分`
      }
    }
  }
}
</script>
