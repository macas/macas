<template>
  <div id="app">
    <div class="window">
      <router-view></router-view>
      <footer class="toolbar toolbar-footer">
        <div class="toolbar-actions">
          <div class="btn-group">
            <button class="btn btn-default" @click="open('https://github.com/ndelvalle/macas/')">
              <span class="icon icon-github"></span>
            </button>
            <button class="btn btn-default" @click="open('mailto:nicolas.delvalle@gmail.com')">
              <span class="icon icon-mail"></span>
            </button>
          </div>

          <button class="btn btn-default pull-right" @click="quit">
            Quit Macas
          </button>
          <button class="btn btn-default pull-right" @click="resetConfig">
            Reset configuration
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import spoof from './services/spoof'

  export default {
    name: 'macas',

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },

      resetConfig () {
        return spoof.resetAll()
      },

      quit () {
        ipcRenderer.send('quit-app')
      }
    }
  }
</script>

<style>
  @import '~@/assets/photon/photon.min.css';
</style>
