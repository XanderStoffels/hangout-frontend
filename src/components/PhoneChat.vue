<template>
    <div ref="messageContainer" class="h-full overflow-y-auto break-words">
        <button @click="boom">Test</button>
        <ul class="text-[0.75em]">
            <li v-for="message in messages">
                {{ message.message }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import { Ref, ref, watch } from "vue";
import { messages } from "../composables/VisitorHub";

const messageContainer: Ref<HTMLDivElement | undefined> = ref(undefined);

watch(messages.value, () => {
    scrollToBottom();
});

function scrollToBottom() {
    // The timeout is needed because the messages are not yet rendered when the watch is triggered
    setTimeout(() => {
        if (!messageContainer.value) return;
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }, 0);
}

function boom() {
    console.log("boom");
}

</script>

<style scoped>
.relative::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

::-webkit-scrollbar {
    display: none;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: transparent;
}


input {
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    padding-left: 0.5rem;
    font-size: 1rem;
    height: 100%;
}
</style>