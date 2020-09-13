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
          <div class="left-buttons">
            <img src="./assets/icons/web.svg" width="15" height="15" alt="close" @click="open('https://macas.app')" class="first-img">
            <img src="./assets/icons/github.svg" width="15" height="15" alt="close" @click="open('https://github.com/ndelvalle/macas/')" class="second-img">
            <img src="./assets/icons/question.svg" width="14" height="14" alt="close" @click="open('https://wikipedia.org/wiki/MAC_spoofing')" class="question-img">
          </div>
          <img src="./assets/icons/close.svg" width="15" height="15" alt="close" @click="quit">
      </footer>
    </div>
  </div>
</template>

<style>
  @import '~@/assets/photon/photon.min.css';
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&family=Nunito:wght@400;600;800&display=swap');

  * {
    font-family: 'Nunito', 'Montserrat', sans-serif;
    box-sizing: border-box;
  }

  :root {
    --primary: #f15f79;
    --white: #fff;
    --light-text: rgba(241, 241, 241, 0.9);
    --grey: #626262;
    --grey2: #373737;
    --grey3: #222323;
    --grey-contrast: #797979;
  }

  .pane-sm.interfaces-list {
    min-width: 51%;
    max-width: 51%;
  }

  .left-buttons {
    height: 100%;
    align-items: center;
    display: flex;
    flex: 1;
  }

  .toolbar.toolbar-footer {
    border: none;
    background: var(--grey2);
    height: 30px;
    display: flex;
    background-color: var(--grey2);
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0 15px;
    box-shadow: none;
  }

  .toolbar.toolbar-footer img {
    cursor: pointer;
    transition: all .2s ease-in-out;
  }

  .toolbar.toolbar-footer img:hover {
    transform: scale(1.15);
  }

  .first-img {
    margin-right: 8px;
  }

  .second-img {
    margin-right: 6px;
  }

  .question-img {
    position: relative;
    top: 1px;
  }

  .window {
    background-color: var(--grey2);
    background: var(--grey2);
  }
</style>
