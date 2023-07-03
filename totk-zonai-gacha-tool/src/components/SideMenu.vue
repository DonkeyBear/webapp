<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  show: Boolean
});

const links = [
  {
    text: '左納烏轉蛋助手',
    route: '/'
  },
  {
    text: '左納烏功耗助手',
    route: '/'
  },
  {
    text: '關於本程式',
    route: '/about'
  }
];
</script>

<template>
  <Transition name="side-menu">
    <div class="menu-container" v-show="show">
      <RouterLink v-for="link of links" :to="link.route" @click="$emit('close-menu')">
        <button>{{ link.text }}</button>
      </RouterLink>
    </div>
  </Transition>
</template>

<style scoped>
.menu-container {
  transition: all ease .2s;
  background-color: var(--background-color);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100dvh;
  padding: 2rem;
  padding-top: 4rem;
}

button {
  margin-top: var(--spacing);
}

.router-link-active,
.router-link-exact-active {
  text-decoration: none;
}

.side-menu-enter-from,
.side-menu-leave-to {
  left: 100vw
}
</style>
