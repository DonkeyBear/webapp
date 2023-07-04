<script setup>
import { useGlobalStore } from '../../store';
import gachaTable from '../../assets/gacha-table.json';
import GachaInfoCard from '../GachaInfoCard.vue';

const global = useGlobalStore();

const getSortedGachaTable = () => {
  if (!global.selectedZonaiDevices.length) { return gachaTable }
  const filteredGachaTable = [...gachaTable];
  filteredGachaTable.sort((a, b) => {
    const countSelectedItems = (array) => {
      let count = 0;
      for (const item of array) {
        if (global.selectedZonaiDevices.includes(item)) { count++ }
      };
      return count;
    };
    return countSelectedItems(b.items) - countSelectedItems(a.items);
  });
  return filteredGachaTable;
};
</script>

<template>
  <div class="card-container">
    <GachaInfoCard v-for="item of getSortedGachaTable()" :location="item.location" :items="item.items" />
  </div>
</template>
