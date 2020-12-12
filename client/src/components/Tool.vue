<template>
  <div class="tool">
    <div v-if="!inExchange && !selfCustody" style="margin-top:16px;padding:24px;">
      <div style="display:block;margin:24px 0;">
        <button @click="inExchange = true" style="width:300px">I keep my XRP in an exchange</button>
      </div>
      <div style="display:block;margin:24px 0;">
        <button @click="selfCustody = true" style="width:300px">I have my own wallet</button>
      </div>
    </div>
    <div v-if="inExchange"><exchanges /></div>
    <div v-if="selfCustody">
      <p>Enter the XRP address you want to check</p>
      <input v-model="address" type="text" placeholder="Your XRP address here..." />
      <div v-if="error" class="alert">
        <p>{{ errorMessage }}</p>
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
            <p style="text-align:center;">
              This account is not configured.
              <br />
              <a href="https://flare.wietse.com/" target="_blank" rel="noopen noreferrer">Set up your account here</a>
            </p>
          </div>
          <div v-if="wrongMessageKeyMessage" class="not-ready">
            <p style="text-align:center;">
              This account doesn't have the correct MessageKey, to properly configure it, please use
              <br />
              <a href="https://flare.wietse.com/" target="_blank" rel="noopen noreferrer">this tool</a>.
            </p>
          </div>
          <div v-if="accountReadyMessage" class="ready">
            <p style="text-align:center;">
              Your account is set and configured to receive the Spark on the address
              <br />
              <a
                v-bind:href="'https://www.flarescan.org/address/0x' + this.ethAddress"
                target="_blank"
                rel="noopen noreferrer"
                >0x{{ this.ethAddress }}</a
              >
              <br />You will receive at least
              <span style="font-size:large;font-weight:bold;">{{ this.receiveAmount }}</span> Spark tokens &#x1F604;
            </p>
          </div>
          <div v-if="notFoundInSnapshot" class="not-ready">
            <p style="text-align:center;">
              This address was not found in the snapshot.
              <br />
              Sorry &#x1F614;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RippledWsClient from 'rippled-ws-client'
import Exchanges from './Exchanges.vue'

//const rippleRegExp = new RegExp('r[0-9a-zA-Z]{24,34}', 'g')
const messageKeyRe = /(0{1}2{1}0{24})([a-fA-F0-9]{40})/
const messageKeyRegExp = new RegExp(messageKeyRe, 'g')

let host
if (process.env.NODE_ENV === 'development') {
  host = `http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}`
} else {
  host = `https://${process.env.VUE_APP_HOST}`
}

export default {
  name: 'Tool',
  components: { Exchanges },
  data() {
    return {
      inExchange: false,
      selfCustody: false,
      address: '',
      errorMessage: '',
      error: false,
      loading: false,
      resultMessage: '',
      ethAddress: '',
      receiveAmount: '',
      accountReadyMessage: false,
      accountNotReadyMessage: false,
      wrongMessageKeyMessage: false,
      notFoundInSnapshot: false
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
      this.notFoundInSnapshot = false
      this.resultMessage = ''
      this.ethAddress = ''
      this.receiveAmount = ''
    },
    go() {
      this.reset()
      console.log(`address: ${this.address}`)

      if (this.address.length > 0) {
        fetch(`${host}/api/get/${this.address}`).then(res => {
          res.json().then(snapshotData => {
            console.log(snapshotData)
            if (snapshotData.error) {
              this.loading = false
              this.notFoundInSnapshot = true
              return
            } else if (snapshotData) {
              console.log('found ya boi')
            }
            new RippledWsClient('wss://xrpl.ws')
              .then(connection => {
                console.log('Connected to rippled')
                connection
                  .send({
                    id: 2,
                    command: 'account_info',
                    account: this.address,
                    strict: true
                  })
                  .then(res => {
                    connection.close()
                    this.processResult(res, snapshotData)
                  })
                  .catch(error => {
                    console.log(error)
                  })
              })
              .catch(error => {
                this.loading = false
                console.error(error)
                this.showError('An error ocurred, do we have a working internet connection here?')
              })
          })
        })
      } else {
        this.loading = false
        console.error('Please enter a XRP address')
        this.showError('Please enter a XRP address')
      }
    },
    processResult(res, snapshotData) {
      this.loading = false
      console.debug('Data: ', res)
      if (res.error) {
        this.showError('Error: ' + res.error_message)
      } else if (res.account_data) {
        const accountData = res.account_data
        if (accountData.MessageKey) {
          if (new RegExp(messageKeyRe, 'g').test(accountData.MessageKey)) {
            this.ethAddress = accountData.MessageKey.match(messageKeyRe)[2]
            this.receiveAmount = snapshotData.balance
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
  margin: 0 auto;
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
