<template>
  <div class="Header">
    <h1>XRP Address Flare Token Snapshot Verifier</h1>
    <div class="logos">
      <img alt="XRP logo" src="../assets/xrp-logo.png" />
      <img alt="Flare logo" src="../assets/flare-logo.png" />
    </div>

    <h2>Welcome!</h2>
    <p class="description">
      <br />This tool is meant to help you verify if an XRP account is properly set up to receive the
      corresponding Spark tokens coming from
      <a
        href="https://flare.ghost.io/"
        target="_blank"
        rel="noopen noreferrer"
      >Flare Networks</a>
      on Dec 12th 2020.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.Header {
  width: 100%;
  .logos {
    height: 100px;
    img:first-child {
      @media screen and (max-width: 400px) {
        margin-right: 60px;
      }
       @media screen and (max-width: 350px) {
        margin-right: 30px;
      }
      margin-right: 120px;
    }
    margin-bottom: 50px;
  }
  .description {
    font-size: 1.25rem;
  }
}
</style>
