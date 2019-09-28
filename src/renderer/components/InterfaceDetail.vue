<script>
  import spoof from '../services/spoof'

  export default {
    name: 'interface-detail',

    data () {
      return {
        target: spoof.findInterface(this.$route.params.target)
      }
    },

    computed: {
      isSpoofed () {
        const target = this.target
        return target.currentAddress && target.currentAddress !== target.address
      }
    },

    watch: {
      $route (to, from) {
        this.target = spoof.findInterface(to.params.target)
      }
    },

    methods: {
      randomize (device) {
        return spoof.randomize(this.target.device)
          .then(() => {
            this.target = spoof.findInterface(this.$route.params.target)
          })
          .catch(err => {
            // TODO: Implement an error handler
            console.error(err)
          })
      },

      reset () {
        return spoof.reset(this.target.device)
          .then(() => {
            this.target = spoof.findInterface(this.$route.params.target)
          })
          .catch(err => {
            // TODO: Implement an error handler
            console.error(err)
          })
      }
    }
  }
</script>

<template>
  <div>
    <h4> {{ target.port }} </h4>
    <p>Device: {{ target.device }} </p>
    <p>Address: {{ target.address }} </p>
    <p v-if="isSpoofed">Spoof Address: {{ target.currentAddress }} </p>

    <button class="btn btn-default" @click="randomize">
      Randomize
    </button>
    <button class="btn btn-default" @click="reset" v-if="isSpoofed">
      Reset to default
    </button>
  </div>
</template>


<style>
</style>
