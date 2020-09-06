<template>
  <div class="disclaimer-container">
    <div class="disclaimer">
      <p>
        The information provided by this tool (the Site) is for general informational purposes only.All information on
        this tool is provided in good faith and in a best-effort basis,however we make no representation or warranty of
        any kind, express or implied,regarding the accuracy, adequacy, validity, reliability, availability or
        completeness of any information on this tool. Under no circumstance shall we have any liabilityto you for any
        loss or damage of any kind incurred as aresult of the use of the site or reliance on any information provided on
        the site.Your use of the site is solely at your own risk.
      </p>
      <input type="checkbox" id="checkbox1" v-model="disclaimer1Accept" />
      <label for="checkbox1">I have read and accept this.</label>
    </div>
    <div class="disclaimer">
      <p>
        The Site may contain links to other websites or content belonging to or originating from third parties or links
        to websites and features in banners or other advertising. Such external links are not investigated, monitored,
        or checked for accuracy, adequacy, validity, reliability, availability or completeness by us. We do not warrant,
        endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by
        third-party websites linked through the site or any website or feature linked in any banner or other
        advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you
        and third-party providers of products or services.
      </p>
      <input type="checkbox" id="checkbox2" v-model="disclaimer2Accept" />
      <label for="checkbox2">I have read and accept this.</label>
    </div>
    <div class="disclaimer">
      <p>
        The Site cannot and does not contain financial advice. The financial information is provided for general
        informational and educational purposes only and is not a substitute for professional advice. Accordingly, before
        taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
        We do not provide any kind of financial advice. The use or reliance of any information contained on this site is
        solely at your own risk.
      </p>
      <input type="checkbox" id="checkbox3" v-model="disclaimer3Accept" />
      <label for="checkbox3">I have read and accept this.</label>
    </div>
    <div class="disclaimer">
      <p>
        This tool does <span style="font-weight:bold;">NOT</span> need nor ask for personal or private information such as private keys,
        account secrets, passwords, contact information. All the information gathered is publicly available in the XRP Ledger.
        This tool works by verifying that the <span class="code">MessageKey</span> in the provided address complies with the format
        specified by the Flare Network developers. That is: 02 followed by 24 zeroes and then a valid ETH address withouth the 0x prefix.<br /><br />
        You should <span style="font-weight:bold;">NEVER</span> provide your account secrets to anyone, and you should keep them in a
        safe place, preferably offline.
      </p>
      <input type="checkbox" id="checkbox3" v-model="disclaimer4Accept" />
      <label for="checkbox3">I have read and accept this.</label>
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
      disclaimer1Accept: false,
      disclaimer2Accept: false,
      disclaimer3Accept: false,
      disclaimer4Accept: false,
      pleaseAccept: false
    }
  },
  methods: {
    accept: function (event) {
      if (
        this.disclaimer1Accept &&
        this.disclaimer2Accept &&
        this.disclaimer3Accept &&
        this.disclaimer4Accept
      ) {
        this.$emit('disclaimers-accepted')
        console.log('Disclaimers accepted, show the tool!')
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
