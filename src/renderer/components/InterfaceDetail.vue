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

    <table class="table-striped mac-address-table">
      <tbody>
        <tr>
          <td class="mac-address-table-td"><strong>device</strong></td>
          <td class="mac-address-table-td"><code>{{ target.device }}</code></td>
        </tr>
        <tr>
          <td class="mac-address-table-td"><strong>default</strong></td>
          <td class="mac-address-table-td"><code>{{ target.address }}</code></td>
        </tr>
        <tr>
          <td class="mac-address-table-td"><strong>spoof</strong></td>
          <td class="mac-address-table-td">
            <code>
              {{ isSpoofed ? target.currentAddress : '-' }}
            </code>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="btn-group mac-address-actions">
      <button
        class="btn btn-default"
        @click="randomize"
        :disabled="isUpdating"
        :class="{ disabled: isUpdating }"
      >
        Randomize
      </button>
      <button
        class="btn btn-default"
        @click="reset"
        :disabled="!isSpoofed || isUpdating"
        :class="{ disabled: !isSpoofed || isUpdating }"
      >
        Reset to default
      </button>
    </div>
    <p class="macas-explain">
      MAC spoofing is a technique for changing a factory-assigned Media Access Control (MAC) address of a network interface on a networked device.
    </p>
  </div>
</template>


<style>
  .disabled {
    color : darkGray;
  }

  .interface-detail {
    padding-left: 10px;
    padding-right: 10px;
  }

  .interface-title {
    text-align: center;
  }

  .mac-address-table {
    font-size: 11px;
  }

  .mac-address-table-td {
    padding: 2px 8px;
  }

  .mac-address-actions {
    padding-top: 12px;
  }

  .macas-explain {
    font-size: 9px;
  }
</style>
