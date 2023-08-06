<template>
  <div class="flex justify-center w-full h-screen">
    <aside class="hidden w-1/6 max-w-[200px] md:block bg-slate-900">

    </aside>
    <main class="w-full md:w-4/6 max-w-[800px] bg-slate-800">
      <!-- <router-view /> -->
      <h1 class="mt-8 text-[4rem] text-center">Work in progress</h1>
      <h3 class="text-[2rem] text-center">Meanwhile, why don't you check your phone.</h3>

    </main>
    <aside class="hidden w-1/6 max-w-[200px]  md:block bg-slate-900">

    </aside>
    <div ref="phoneDiv" @click="enablePhone" @mouseenter="hoveringPhone" @mouseleave="stopHoveringPhone"
      class="fixed -bottom-[450px] right-0 z-10 hidden transition-transform md:block w-96 cursor-pointer">
      <Phone></Phone>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initHub } from "./composables/VisitorHub";
import Phone from "./components/Phone.vue";
import { isOpen, isActivated } from './composables/PhoneControls';


const phoneDiv = ref<HTMLDivElement | undefined>(undefined);

onMounted(() => {
  initHub();
});

function enablePhone() {
  // Add the class hover:-translate-y-[420px] to the phone div
  if (!phoneDiv.value || isActivated.value) return;
  isActivated.value = true;
  phoneDiv.value.classList.add("hover:-translate-y-[420px]");
  phoneDiv.value.classList.remove("cursor-pointer");

  hoveringPhone();

}

function hoveringPhone() {
  if (!isActivated.value) return;
  isOpen.value = true;
}

function stopHoveringPhone() {
  if (!isActivated.value) return;
  isOpen.value = false;
}


</script>

<style scoped>
h1,
h3 {
  font-family: 'VT323', monospace;
}
</style>
