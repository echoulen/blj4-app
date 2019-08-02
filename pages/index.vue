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
              <v-list-item-title>{{ go.EstimateTime }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ go.StopName.Zh_tw }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ back.EstimateTime }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ back.StopName.Zh_tw }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import getAuthorizationHeader from '~/core/getAuthorizationHeader'

export default {
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
}
</script>
