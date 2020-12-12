<template>
  <div class="disclaimer-container">
    <div class="disclaimer">
      <p>
        This tool does
        <span style="font-weight:bold;">NOT</span> need nor ask for personal or private information such as private keys,
        account secrets, passwords, contact information. All the information gathered is publicly available in the XRP Ledger.
        This tool works by verifying that the
        <span
          class="code"
        >MessageKey</span> in the provided address complies with the format
        specified by the Flare Network developers. That is: 02 followed by 24 zeroes and then a valid ETH address withouth the 0x prefix.
        <br />
        <br />You should
        <span style="font-weight:bold;">NEVER</span> provide your account secrets to anyone, and you should keep them in a
        safe place, preferably offline.
      </p>
      <input type="checkbox" id="checkbox4" v-model="disclaimerAccept" />
      <label for="checkbox4">I have read and accept this.</label>
    </div>
    <div v-if="pleaseAccept" class="alert">
      <p>Please read and accept all the statements above before continuing</p>
    </div>
    <div class="continue">
      <button v-on:click="accept">Continue</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Disclaimers',
  data() {
    return {
      disclaimerAccept: false,
      pleaseAccept: false
    }
  },
  methods: {
    accept: function (event) {
      if (
        this.disclaimerAccept
      ) {
        this.$emit('disclaimers-accepted')
        console.log('Disclaimer accepted, show the tool!')
        if (window.outerHeight > 840) {
          window.scrollTo(0, 0)
        } else {
          window.scrollTo(0, 265)
        }
      } else {
        this.pleaseAccept = true
        setTimeout(() => {
          this.pleaseAccept = false
        }, 5 * 1000)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.disclaimer {
  border: 3px solid $primary-dark;
  border-radius: 6px;
  padding: 12px;
  margin: 15px 0;
  p {
    text-align: justify;
  }
  label {
    input {
    }
  }
}
.continue {
}
</style>
