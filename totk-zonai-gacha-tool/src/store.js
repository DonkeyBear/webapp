import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const selectedZonaiDevices = reactive([]);

  return { selectedZonaiDevices };
});
