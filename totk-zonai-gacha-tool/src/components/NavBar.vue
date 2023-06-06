<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import FilterModal from './FilterModal.vue';
import SideMenu from './SideMenu.vue';

const isPopupShow = reactive({
  filterModal: false,
  sideMenu: false
});
const togglePopup = (popupName, isShow) => {
  // 當有窗口彈出時禁止 body 捲動
  isShow ? document.body.classList.add('disable-scroll') : document.body.classList.remove('disable-scroll');
  isPopupShow[popupName] = isShow;
};
</script>

<template>
  <nav>
    <ul>
      <li>
        <!-- 於主畫面時顯示搜尋鈕 -->
        <a v-if="!useRoute().path.includes('/about')" class="secondary" @click="togglePopup('filterModal', true)">
          <svg class="icon-search" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path
              d="M783.522-110.913 529.848-364.587q-29.761 23.044-68.642 36.565-38.88 13.522-83.119 13.522-111.152 0-188.326-77.174Q112.587-468.848 112.587-580q0-111.152 77.174-188.326Q266.935-845.5 378.087-845.5q111.152 0 188.326 77.174Q643.587-691.152 643.587-580q0 44.478-13.522 83.12-13.521 38.641-36.565 68.163l253.913 254.152-63.891 63.652ZM378.087-405.5q72.848 0 123.674-50.826Q552.587-507.152 552.587-580q0-72.848-50.826-123.674Q450.935-754.5 378.087-754.5q-72.848 0-123.674 50.826Q203.587-652.848 203.587-580q0 72.848 50.826 123.674Q305.239-405.5 378.087-405.5Z" />
          </svg>
        </a>
        <!-- 於非主畫面時顯示 GitHub 連結 -->
        <a v-else class="secondary" href="https://github.com/DonkeyBear/webapp/tree/main/totk-zonai-gacha-tool"
          target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-github"
            viewBox="0 0 16 16">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </li>
    </ul>
    <div class="title">
      <div class="top">—— 王國之淚 ——</div>
      <div class="bottom">左納烏轉蛋助手</div>
    </div>
    <ul>
      <li>
        <a v-if="!isPopupShow.sideMenu" class="secondary" @click="togglePopup('sideMenu', true)">
          <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path
              d="M160-230.913q-19.152 0-32.326-13.174T114.5-276.413q0-19.152 13.174-32.326T160-321.913h640q19.152 0 32.326 13.174t13.174 32.326q0 19.152-13.174 32.326T800-230.913H160Zm0-203.587q-19.152 0-32.326-13.174T114.5-480q0-19.152 13.174-32.326T160-525.5h640q19.152 0 32.326 13.174T845.5-480q0 19.152-13.174 32.326T800-434.5H160Zm0-203.587q-19.152 0-32.326-13.174T114.5-683.587q0-19.152 13.174-32.326T160-729.087h640q19.152 0 32.326 13.174t13.174 32.326q0 19.152-13.174 32.326T800-638.087H160Z" />
          </svg>
        </a>
        <a v-else class="secondary" @click="togglePopup('sideMenu', false)">
          <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path
              d="M480-416.348 287.826-224.174Q275.152-211.5 256-211.5t-31.826-12.674Q211.5-236.848 211.5-256t12.674-31.826L416.348-480 224.174-672.174Q211.5-684.848 211.5-704t12.674-31.826Q236.848-748.5 256-748.5t31.826 12.674L480-543.652l192.174-192.174Q684.848-748.5 704-748.5t31.826 12.674Q748.5-723.152 748.5-704t-12.674 31.826L543.652-480l192.174 192.174Q748.5-275.152 748.5-256t-12.674 31.826Q723.152-211.5 704-211.5t-31.826-12.674L480-416.348Z" />
          </svg>
        </a>
      </li>
    </ul>
  </nav>

  <Teleport to="body">
    <FilterModal :show="isPopupShow.filterModal" @close-modal="togglePopup('filterModal', false)" />
    <SideMenu :show="isPopupShow.sideMenu" @close-menu="togglePopup('sideMenu', false)" />
  </Teleport>
</template>

<style scoped>
nav {
  align-items: center;
  position: fixed;
  padding-left: 2rem;
  padding-right: 2rem;
  top: 0;
  left: 0;
  width: 100vw;
  border-bottom: 1px solid var(--muted-border-color);
  background-color: var(--background-color);
  z-index: 500;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  height: 4rem;
}

.top {
  font-size: .75rem;
  line-height: 1.1;
}

.bottom {
  font-size: 1.15rem;
  line-height: 1;
}</style>
