<template>
  <div class="footer">
    <div class="links">
      <h2> Useful Links</h2>
      <ul>
        <li>
          <a
            href="https://github.com/JamesGDiaz/flare-snapshot-verifier"
            target="_blank"
            rel="noopen noreferrer"
          >Source Code</a>
        </li>
        <li>
          <a href="https://flare.xyz/" target="_blank" rel="noopen noreferrer">Flare Networks</a>
        </li>
        <li>
          <a href="https://wietse.com/" target="_blank" rel="noopen noreferrer">Wietse Wind</a>
        </li>
        <li>
          <a href="https://xrpl-labs.com/" target="_blank" rel="noopen noreferrer">XRPL Labs</a>
        </li>
      </ul>
    </div>
    <div class="acknowledgements">
      <h2>Acknowledgements</h2>
      <p>
        Thanks to
        <a href="https://twitter.com/wietsewind" target="_blank" rel="noopen noreferrer">@wietsewind</a>
        for developing the tools used here to communicate with the XRP Ledger :)
      </p>
    </div>
    <div class="donations">
      <h2 class="title">Donate</h2>
      <p>
        <span class="code address">rLSn6Z3T8uCxbcd1oxwfGQN1Fdn5CyGujK</span><br/><br/>
        Destination Tag: <span style="font-weight:bold;">38806694</span>
      </p>
      <div class="qrcode">
        <img src="../assets/donations-qr.png" />
      </div>
    </div>
    <div class="Contact">
      <h2 class="title">Contact</h2>
      <p>
        <a href="https://twitter.com/chicles_" target="_blank">Twitter</a>
        <br/><br/>
        <a href="mailto:francogiordanid@gmail.com" target="_blank">Email me</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 100px;
  ul {
    list-style: none;
    li {
      display: inline-block;
      margin: 12px 24px 24px 12px;
    }
  }
  .donations {
    display: flex;
    flex-direction: column;
    .title {
      height: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    .address {
      margin-bottom: 12px;
    }
    .qrcode {
      img {
        width: auto;
        height: 180px;
      }
    }
  }
}
</style>
