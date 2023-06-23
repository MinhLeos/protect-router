<template>
  <div
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
    ref="el"
    class="noti-item"
    :class="customClass"
  >
    <div>
      <h4>{{ props.title }}</h4>
      <p>{{ props.content }}</p>
    </div>
    <div class="noti-btn-close" @click="handleClose">+</div>
  </div>
</template>
<script setup>
const props = defineProps({
  status: String,
  title: String,
  content: String,
  count: Number,
  timeout: Number,
});
const el = ref();
const customClass = computed(() => {
  let classes = ``;
  props.status === "error" ? (classes += " info-error") : (classes += "");
  return classes;
});
function handleClose(e) {
  e.target?.parentNode?.parentNode?.remove();
  const divContainer = document.querySelector(".noti-container");
  const divNoti = document.querySelector(".notification");
  if (!divNoti && divContainer) {
    divContainer.remove();
  }
  // document.querySelector(".notification")?.remove();
}
let timer;

function handleMouseEnter() {
  if (timer) {
    clearTimeout(timer);
  }
}
function handleMouseLeave() {
  if (props.timeout) {
    timer = setTimeout(() => {
      el.value?.parentNode?.remove();
    }, props.timeout);
  }
}

onMounted(() => {
  if (props.timeout) {
    timer = setTimeout(() => {
      el.value?.parentNode?.remove();
    }, props.timeout);
  }
});
onUnmounted(() => {
  if (timer) {
    console.log("clear timeout");
    clearTimeout(timer);
  }
});
</script>
