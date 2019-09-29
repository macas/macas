<script>
  import { ipcRenderer } from 'electron'

  export default {
    name: 'macas',

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      quit () {
        ipcRenderer.send('quit-app')
      }
    }
  }
</script>

<template>
  <div id="app">
    <div class="window">
      <router-view></router-view>
      <footer class="toolbar toolbar-footer">
        <div class="toolbar-actions">
          <div class="btn-group">
            <button class="btn btn-default" @click="open('https://macas.app')">
              <span class="icon icon-globe"></span>
            </button>
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
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
  @import '~@/assets/photon/photon.min.css';

  .pane-sm.interfaces-list {
    min-width: 144px;
    max-width: 144px;
  }
</style>
