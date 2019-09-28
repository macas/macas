<script>
  import spoof from 'spoof'
  import matchSorter from 'match-sorter'

  const GET_INTERFACES_INTERVAL_TIMER = 5000

  export default {
    name: 'interface-list',

    data () {
      return {
        search: '',
        interfaces: spoof.findInterfaces()
      }
    },

    created () {
      const [target] = this.interfaces
      this.goTo(target.port)

      // Note: We need to continually check if there are new interfaces, a usual
      //       scenario is a user connecting a new device. This simulates a
      //       real time listener.
      setInterval(() => {
        this.interfaces = spoof.findInterfaces()
      }, GET_INTERFACES_INTERVAL_TIMER)
    },

    computed: {
      filteredInterfaces () {
        return matchSorter(this.interfaces, this.search, {
          keys: ['port', 'address']
        })
      }
    },

    methods: {
      goTo (target) {
        this.$router.push({
          name: 'interface-detail',
          params: {
            target
          }
        })
      }
    }
  }
</script>

<template>
  <div class="window-content">
    <div class="pane-group">
      <div class="pane pane-sm sidebar">
        <ul class="list-group">
          <li class="list-group-header">
            <input class="form-control" type="text" placeholder="Search" v-model="search">
          </li>
          <li
            class="list-group-item"
            v-for="(i, index) in filteredInterfaces"
            :key="index"
            @click="goTo(i.port)"
            :class="{ active : $route.params.target === i.port }"
          >
            <div class="media-body">
              <strong>{{ i.port }}</strong>
              <p>{{ i.address }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="pane">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style>
</style>
