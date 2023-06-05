<script setup>
import { useGlobalStore } from '../store';

defineProps({
  location: String,
  items: Array
});

const global = useGlobalStore();
</script>

<template>
  <article>
    <header>{{ location }}</header>
    <code v-for="item of items" :class="{ 'highlight': global.selectedZonaiDevices.includes(item) }">{{ item }}</code>
  </article>
</template>

<style scoped>
article {
  margin: var(--spacing) 0;
}

header {
  font-weight: bold;
}

code {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border: 1px solid var(--card-border-color);
  color: var(--h6-color);
  margin-bottom: .25rem;
}

code:not(:first-of-type) {
  margin-left: .2rem;
}

code.highlight {
  border: 1px solid var(--code-color);
}
</style>
