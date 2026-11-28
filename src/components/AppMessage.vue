<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const message = ref(null);
let dismissTimer;

function showMessage(event) {
  const { text, type = "info", duration = 5000 } = event.detail;

  clearTimeout(dismissTimer);
  message.value = { text, type };
  dismissTimer = setTimeout(() => {
    message.value = null;
  }, duration);
}

function dismissMessage() {
  clearTimeout(dismissTimer);
  message.value = null;
}

onMounted(() => {
  window.addEventListener("app-message", showMessage);
});

onUnmounted(() => {
  window.removeEventListener("app-message", showMessage);
  clearTimeout(dismissTimer);
});
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex justify-center"
  >
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="message"
        class="app-message-toast pointer-events-auto"
        :class="`app-message-toast--${message.type}`"
        :role="message.type === 'error' ? 'alert' : 'status'"
        :aria-live="message.type === 'error' ? 'assertive' : 'polite'"
      >
        <span class="min-w-0 flex-1 text-sm leading-5">
          {{ message.text }}
        </span>
        <button
          type="button"
          class="shrink-0 rounded-md p-1 text-current/60 transition hover:bg-black/5 hover:text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          aria-label="Закрыть уведомление"
          @click="dismissMessage"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="m18 6-12 12M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>
