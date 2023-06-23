<template>
  <div class="header">
    <div>
      <p v-if="isLogined" class="header-icon header-icon-online"></p>
      <p v-else class="header-icon header-icon-offline"></p>
    </div>
    <div>
      <button v-if="isLogined" class="header-account" @click="logout">
        Log out
      </button>
      <button v-else class="header-account" @click="login">Log in</button>
    </div>
  </div>
</template>

<script setup>
const isLogined = useSignIn();
const tokenCookies = useTokenCookies();
if (tokenCookies.value) {
  isLogined.value = true;
}
const login = () => {
  isLogined.value = true;
  const cookie = useCookie("token");
  cookie.value = Math.random();
};
const logout = () => {
  isLogined.value = false;
  const cookie = useCookie("token");
  cookie.value = null;
};
</script>

<style scoped lang="scss">
.header {
  @apply flex items-center justify-around text-xl text-white fixed inset-x-0 top-0 h-20 px-20 bg-stone-400;

  &-icon {
    @apply w-6 h-6 rounded-full;

    &-online {
      @apply bg-lime-500;
    }
    &-offline {
      @apply bg-red-400;
    }
  }
  &-account {
    @apply px-6 py-2 cursor-pointer hover:text-orange-200 active:text-orange-500;
  }
}
</style>
