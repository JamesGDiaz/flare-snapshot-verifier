<template>
  <div id="app">
    <Header />
    <Disclaimers v-show="!disclaimersAccepted" @disclaimers-accepted="test" />
    <Tool v-if="disclaimersAccepted" />
    <Footer />
  </div>
</template>

<script>
import Disclaimers from './components/Disclaimers.vue'
import Tool from './components/Tool.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {

  name: 'App',
  components: {
    Disclaimers,
    Tool,
    Header,
    Footer
  },
  data() {
    return {
      disclaimersAccepted: false
    }
  },
  methods: {
    test: function() {
      this.disclaimersAccepted = true
    }
  }
}
</script>

<style lang="scss">
*{
  font-family: Comfortaa, Avenir, Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $gray-dark;
  margin: 60px 5% 60px 5%;
}
</style>
