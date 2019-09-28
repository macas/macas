<script>
  import { mapState } from 'vuex'
  import matchSorter from 'match-sorter'

  export default {
    name: 'interface-list',

    data () {
      return {
        search: ''
      }
    },

    created () {
      setTimeout(() => {
        const [interf] = this.interfaces
        this.$router.push({
          name: 'interface-detail',
          params: {
            device: interf.device
          }
        })
      }, 0)
    },

    computed: {
      ...mapState({ interfaces: state => state.interfaces.all }),

      filteredInterfaces () {
        const keys = ['port', 'address']
        return matchSorter(this.interfaces, this.search, { keys })
      }
    },

    methods: {
      selectInterface (device) {
        const params = { device }
        this.$router.push({ name: 'interface-detail', params })
      }
    }
  }
</script>

<template>
  <div class="window-content">
    <div class="pane-group">
      <div class="pane pane-sm sidebar interfaces-list">
        <ul class="list-group">
          <li class="list-group-header">
            <input class="form-control" type="text" placeholder="Search" v-model="search">
          </li>
          <li
            class="list-group-item"
            v-for="(i, index) in filteredInterfaces"
            :key="index"
            @click="selectInterface(i.device)"
            :class="{ active : $route.params.device === i.device }"
          >
            <div class="media-body">
              <strong>{{ i.port }}</strong>
              <p><code>{{ i.address }}</code></p>
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
