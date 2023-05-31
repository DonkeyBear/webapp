<script setup>
import { useGlobalStore } from '../store';
import zonaiDevices from '../assets/zonai-devices.json';

defineProps({
  show: Boolean
});

const global = useGlobalStore();
</script>

<template>
  <Transition name="filter-modal">
    <dialog open v-show="show">
      <article>
        <header>
          <a aria-label="Close" class="close" @click="$emit('close-modal')"></a>
          搜尋
        </header>
        <div class="modal-body">
          <div class="label-container" v-for="device of zonaiDevices">
            <label :for="device">
              <input type="checkbox" :id="device" :value="device" v-model="global.selectedZonaiDevices">
              {{ device }}
            </label>
          </div>
        </div>
        <footer>
          <button type="button" class="secondary" @click="global.selectedZonaiDevices = []">清空已選</button>
          <button type="button" @click="$emit('close-modal')">確認</button>
        </footer>
      </article>
    </dialog>
  </Transition>
</template>

<style scoped>
dialog {
  transition: all .3s ease;
}

article {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;
}

header {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  font-weight: bold;
  margin-bottom: 0;
}

.close {
  cursor: pointer;
}

.modal-body {
  overflow-y: auto;
  margin: 0 -1rem 0 -1rem;
  padding: .5rem 1rem;
}

footer {
  margin-top: 0;
}

footer>button {
  margin-bottom: 0;
  display: inline;
  width: auto;
}

footer>button:not(:first-of-type) {
  margin-left: calc(var(--spacing) * .5);
}

label {
  width: 100%;
  display: inline-flex;
  align-items: center;
  background-color: var(--card-sectionning-background-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: calc(var(--spacing) * .5);
  border: 1px solid var(--card-border-color);
}

.label-container {
  width: 50%;
  display: inline-block;
}

.label-container:nth-of-type(odd) {
  padding-right: .25rem;
}

.label-container:nth-of-type(even) {
  padding-left: .25rem;
}

[type="checkbox"] {
  margin-top: 0;
  margin-right: .75rem;
}

.filter-modal-enter-from,
.filter-modal-leave-to {
  opacity: 0;
}
</style>
