<template>
    <div class="h-full">
        <img v-if="!loaded" src="../assets/img/static.gif" class="object-cover h-full" />
        <video v-show="loaded" ref="videoPlayer" class="object-cover h-full" :src="url" loop muted></video>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { isOpen } from '../composables/PhoneControls';
import { currentVideo, currentVideoStartTime } from '../composables/VisitorHub';

import Badger from '../assets/vid/badger.mp4';
import Cat from '../assets/vid/cat.mp4';
import Eren from '../assets/vid/eren.mp4';
import Rick from '../assets/vid/rick.mp4';

const videoPlayer = ref<HTMLVideoElement | undefined>(undefined);
const url = ref('');
const loaded = ref(false);
const isSynced = ref(false);

onMounted(() => {
    if (!videoPlayer.value) return;
    videoPlayer.value.addEventListener('loadeddata', videoLoaded);
    changeVideo();
});

watch(isOpen, () => {
    if (!videoPlayer.value) return;
    if (isOpen.value) {
        sync();
        unmute();
    } else {
        mute();
    }
});

watch(currentVideo, () => {
    changeVideo();
});

function changeVideo() {
    if (!videoPlayer.value) return;
    loaded.value = false;
    videoPlayer.value.pause();
    videoPlayer.value.currentTime = 0;
    isSynced.value = false;
    if (currentVideo.value === 0) {
        url.value = Badger;
    } else if (currentVideo.value === 1) {
        url.value = Cat;
    } else if (currentVideo.value === 2) {
        url.value = Eren;
    } else if (currentVideo.value === 3) {
        url.value = Rick;
    } else {
        url.value = '';
        return;
    };
}

function videoLoaded(_: Event) {
    loaded.value = true;
    if (!videoPlayer.value) return;
    if (isOpen.value) {
        unmute();
    } else {
        mute();
    }
    sync();
    videoPlayer.value.play();
}

function unmute() {
    if (!videoPlayer.value || !loaded.value) return;
    videoPlayer.value.muted = false;
    videoPlayer.value.volume = 0.5;
}

function sync() {
    if (!videoPlayer.value || !loaded.value || isSynced.value) return;
    const time = Date.now() - currentVideoStartTime.value.getTime();
    let progress = (time / 1000) % videoPlayer.value.duration;
    videoPlayer.value.currentTime = progress;
    isSynced.value = true;
}

function mute() {
    if (!videoPlayer.value || !loaded.value) return;
    videoPlayer.value.muted = false;
    videoPlayer.value.volume = 0.1;
}

</script>

<style scoped></style>