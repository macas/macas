<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'interface-detail',

    computed: {
      ...mapGetters({ target: 'selected' }),

      isUpdating () {
        return this.$store.getters.isUpdating(this.target.device)
      },

      isSpoofed () {
        const target = this.target
        return target.currentAddress && target.currentAddress !== target.address
      }
    },

    created () {
      setTimeout(() => {
        this.$store.dispatch('selectInterface', this.$route.params.device)
      }, 0)
    },

    watch: {
      $route (to) {
        this.$store.dispatch('selectInterface', to.params.device)
      }
    },

    methods: {
      randomize () {
        this.$store.dispatch('randomize', this.target.device)
      },

      reset () {
        this.$store.dispatch('reset', this.target.device)
      }
    }
  }
</script>

<template>
  <div class="interface-detail">
    <h4 class="interface-title">{{ target.port }}</h4>
    <div class="device-table-custom">
      <div class="first-row row">
        <span class="title-custom-device">device</span>
        <span class="content-custom-table">{{ target.device }}</span>
      </div>
      <div class="second-row row">
        <span class="title-custom-device">default</span>
        <span class="content-custom-table">{{ target.address }}</span>
      </div>
      <div class="third-row row">
        <span class="title-custom-device">spoof</span>
        <span class="content-custom-table pink-custom"> {{ isSpoofed ? target.currentAddress : 'none' }}</span>
      </div>
    </div>
    <div class="mac-address-actions">
      <button
        class="btn btn-default"
        @click="randomize"
        :disabled="isUpdating"
        :class="{ disabled: isUpdating }"
      >
        <img src="../assets/icons/refresh.svg" width="14" height="14" alt="randomize">
        Randomize
      </button>
      <button
        class="btn btn-default"
        @click="reset"
        :disabled="!isSpoofed || isUpdating"
        :class="{ disabled: !isSpoofed || isUpdating }"
      >
        <img v-if="!isSpoofed || isUpdating" src="../assets/icons/home-disabled.svg" width="13" height="13" alt="randomize">
        <img v-else src="../assets/icons/home.svg" width="13" height="13" alt="randomize">
        Reset to default
      </button>
    </div>
  </div>
</template>


<style>
  .disabled {
    color : darkGray;
  }

  .interface-detail {
    padding-left: 8px;
    padding-right: 7px;
    margin-top: 38px;
  }

  .interface-title {
    text-align: center;
    font-weight: 800;
    font-size: 20px;
    color: var(--white)
  }

  .title-custom-device {
    color: var(--white);
    font-weight: 600;
    font-size: 14px;
    width: 45px;
    display: inline-block;
  }

  .content-custom-table {
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
    font-size: 12px;
    color: var(--light-text)
  }

  .pink-custom {
    color: var(--primary);
  }

  .row {
    padding-left: 5px;
  }

  .second-row {
    background-color: var(--grey-contrast);
    border-radius: 3px;
  }

  .mac-address-actions {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 58px;
    padding: 0 3px;
  }

  .mac-address-actions button {
    background-color: var(--white);
    border: none;
    height: 25px;
    color: var(--grey);
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    display: flex;
    justify-content: flex-start;
    padding-left: 33px;
    align-items: center;
  }

  .mac-address-actions button:hover {
    transform: scale(1.03);
  }

  .mac-address-actions button.disabled {
    color: rgba(0, 0, 0, .22);
    cursor: not-allowed;
    transform: none;
  }

  .mac-address-actions button img {
   margin-right: 3px;
  }

  .pane {
    background: var(--grey);
    border: none !important;
  }
</style>
