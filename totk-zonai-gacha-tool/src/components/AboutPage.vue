<script setup>
const appVersion = import.meta.env.VITE_APP_VERSION;
</script>

<template>
  <div class="about-container">
    <h2>關於本程式</h2>
    <p>這是個用來依照所需的左納烏裝置快速查找左納烏轉蛋機的程式，原先只是為了自用而寫的，但是花了這麼多時間，自己獨享太浪費了，於是放在網路上供所有玩家使用。</p>
    <p>資料來自 PTT 使用者 dbfox（來源<a href="https://www.ptt.cc/bbs/NSwitch/M.1685295609.A.269.html">見此文</a>）。</p>
    <p>如果這個程式對你有幫助，可以考慮到我的 GitHub Repo 給我一個星星喔🌟！</p>
    <small>{{ appVersion }}</small>
  </div>
</template>

<style scoped>
h2 {
  border-bottom: 1px solid var(--muted-border-color);
  padding-bottom: .25rem;
  margin-bottom: 1rem;
}

p {
  text-align: start;
}

small {
  display: block;
  margin-bottom: 3rem;
  color: var(--muted-color);
}
</style>
