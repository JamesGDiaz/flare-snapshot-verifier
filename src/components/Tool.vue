<template>
  <div class="tool">
    <p>Enter the XRP address you want to check</p>
    <input v-model="address" type="text" placeholder="Your XRP address here..." />
    <div v-if="error" class="alert">
      <p>{{errorMessage}}</p>
    </div>
    <button @click="go">Check!</button>
    <div class="output">
      <div class="loading" v-if="loading">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <div class="result" v-if="!loading">
        <div v-if="accountNotReadyMessage" class="not-ready">
          <p>
            This account is not configured.
            <br />
            <a
              href="https://flare.wietse.com/"
              target="_blank"
              rel="noopen noreferrer"
            >Set up your account here</a>
          </p>
        </div>
        <div v-if="wrongMessageKeyMessage" class="not-ready">
          <p>
            This account doesn't have the correct MessageKey, to properly configure it, please use
            <br />
            <a href="https://flare.wietse.com/" target="_blank" rel="noopen noreferrer">this tool</a>.
          </p>
        </div>
        <div v-if="accountReadyMessage" class="ready">
          <p>            
            Your account is set and configured to receive the Spark on the ETH address
            <br />
            <a
              v-bind:href="'https://etherscan.io/address/0x'+this.ethAddress"
              target="_blank"
              rel="noopen noreferrer"
            >0x{{this.ethAddress}}</a>
            <br />As of right now, you will receive
            <span style="font-weight:bold;">{{this.receiveAmount}}</span> Spark tokens &#x1F604;
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RippledWsClient from 'rippled-ws-client'

//const rippleRegExp = new RegExp('r[0-9a-zA-Z]{24,34}', 'g')
const messageKeyRe = /(0{1}2{1}0{24})([a-fA-F0-9]{40})/
const messageKeyRegExp = new RegExp(messageKeyRe, 'g')

export default {
  name: 'Tool',
  data() {
    return {
      address: '',
      errorMessage: '',
      error: false,
      loading: false,
      resultMessage: '',
      ethAddress: '',
      receiveAmount: '',
      accountReadyMessage: false,
      accountNotReadyMessage: false,
      wrongMessageKeyMessage: false
    }
  },
  methods: {
    showError(message) {
      this.errorMessage = message
      this.error = true
      setTimeout(() => {
        this.error = false
      }, 5 * 1000)
    },
    reset() {
      this.loading = true
      this.error = false
      this.accountReadyMessage = false
      this.accountNotReadyMessage = false
      this.wrongMessageKeyMessage = false
      this.resultMessage = ''
      this.ethAddress = ''
      this.receiveAmount = ''
    },
    go() {
      this.reset()
      console.log(`address: ${this.address}`)
      if (this.address.length > 0) {
        new RippledWsClient('wss://xrpl.ws')
          .then((connection) => {
            console.log('Connected to rippled')
            connection
              .send({
                id: 2,
                command: 'account_info',
                account: this.address,
                strict: true
              })
              .then((res) => {
                connection.close()
                this.processResult(res)
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
            this.showError(
              'An error ocurred, do we have a working internet connection here?'
            )
          })
      } else {
        this.loading = false
        console.error('Please enter a XRP address')
        this.showError('Please enter a XRP address')
      }
    },
    processResult(res) {
      this.loading = false
      console.debug('Data: ', res)
      if (res.error) {
        this.showError('Error: ' + res.error_message)
      } else if (res.account_data) {
        const accountData = res.account_data
        if (accountData.MessageKey) {
          if (new RegExp(messageKeyRe, 'g').test(accountData.MessageKey)) {
            this.ethAddress = accountData.MessageKey.match(messageKeyRe)[2]
            this.receiveAmount = accountData.Balance / 1e6
            console.log(`Found ETH address: ${this.ethAddress}`)
            console.log(`Balance: ${this.receiveAmount}`)
            this.accountReadyMessage = true
          } else {
            this.wrongMessageKeyMessage = true
          }
        } else {
          this.accountNotReadyMessage = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
.output {
    width: 80%;
  margin:0 auto;
  margin-top: 72px;
}
.result {
  div {
    padding: 6px 24px;
    width: 100%;
    &.ready {
      background: #cbffcb;
      border: 2px solid $green;
      border-radius: 6px;
    }
    &.not-ready {
      background: #ffedcb;
      border: 2px solid #ffb52b;
      border-radius: 6px;
    }
    p {
      line-height: 1.8;
      font-size: 1.15rem;
    }
  }
}
</style>
