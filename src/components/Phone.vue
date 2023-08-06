<template>
    <div id="ignore-img" class="relative">

        <img class="relative -z-10" src="../assets/img/phone.png" alt="Your phone">

        <div id="phone-screen" class="absolute top-[15px] w-[214px] h-[454px]  left-[54px] bg-transparent flex flex-col">
            <header class="h-[16px]">

            </header>
            <div class="h-[418px]">
                <PhoneVideo />
            </div>

            <footer class="flex-auto">

            </footer>
        </div>

    </div>
</template>

<script setup lang="ts">
//import PhoneChat from "./PhoneChat.vue"
import PhoneVideo from "./PhoneVideo.vue"


</script>

<style scoped>
#ignore-img {
    mask-mode: alpha;
}
</style>