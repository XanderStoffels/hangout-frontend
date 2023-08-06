<template>
    <div id="terminal" class="flex flex-col bg-black rounded-sm">
        <div class="flex items-center h-8 bg-slate-900">
            <span class="ml-3">C.H.A.T.</span>
        </div>
        <div ref="messageContainer" class="flex-auto overflow-y-auto h-52">
            <ul>
                <li v-for="message in messages">
                    {{ message.message }}
                </li>
            </ul>
        </div>
        <div class="flex h-8">
            <input readonly type="text" value=">" class="w-4">
            <input class="terminal-input" type="text" v-model="input" @keydown.enter="sendInput">
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { sendTerminalMessage, messages } from "../composables/VisitorHub";

const messageContainer: Ref<HTMLDivElement | undefined> = ref(undefined);
const input = ref("test");

watch(messages.value, () => {
    scrollToBottom();
});

async function sendInput() {
    if (!input.value || input.value.length == 0) return;

    await sendTerminalMessage(input.value);
    input.value = "";
}

function scrollToBottom() {
    // The timeout is needed because the messages are not yet rendered when the watch is triggered
    setTimeout(() => {
        if (!messageContainer.value) return;
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }, 0);
}

</script>

<style scoped>
#terminal {
    font-family: 'VT323', monospace;
}

::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: black;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(15 23 42);
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

.terminal-input {
    width: 100%;
}
</style>