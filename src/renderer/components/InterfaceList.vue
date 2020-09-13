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
        <div class="title-container">
          <div class="title-custom">MACAS</div>
          <div class="sub-title">spoof a mac address</div>
        </div>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(i, index) in filteredInterfaces"
            :key="index"
            @click="selectInterface(i.device)"
            :class="{ active : $route.params.device === i.device }"
          >
            <div class="media-body">
              <img src="../assets/icons/wifi.svg" width="15" height="15" alt="icon" v-if="i.port === 'Wi-Fi'">
              <img src="../assets/icons/blue.svg" width="15" height="15" alt="icon" v-if="i.port === 'Bluetooth PAN'">
              <img src="../assets/icons/thunder.svg" width="15" height="15" alt="icon" v-if="i.port !== 'Wi-Fi' && i.port !== 'Bluetooth PAN'">
              <div>
                <strong class="media-title-custom">{{ i.port }}</strong>
                <p class="media-address-custom">{{ i.address }}</p>
              </div>
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
  .title-container {
    font-family: 'Montserrat', sans-serif;
    display: flex;
    padding: 0 8px;
    height: 32px;
    background: var(--grey2);
    color: var(--white);
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
  }

  .title-custom {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    margin-right: 8px;
  }

  .sub-title {
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .list-group {
    padding: 10px 14px;
    background: var(--grey3);
    border: none !important;
  }

  .sidebar {
    background-color: var(--grey3);
    border: none !important;
  }

  .pane-group {
    border: none !important;
  }

  .list-group-item {
    border: none;
    padding: 3px 10px;
    margin-bottom: 8px;
  }

  .list-group-item.active, .list-group-item.selected {
    background-color: var(--grey);
    border-radius: 7px;
  }

  .media-body {
    display: flex;
    align-items: center;
  }

  .media-body img {
    margin-right: 3px;
  }

  .media-title-custom {
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: var(--white)
  }

  .media-address-custom {
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
    font-size: 11px;
    color: var(--light-text)
  }
</style>
