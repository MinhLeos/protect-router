<template>
  <div class="main">
    <button class="main-btn" @click="handleClickCallApi">Call API</button>
    <content v-if="users.length > 0" class="flex flex-wrap">
      <div v-for="user in users" :key="user.id" class="mx-5">
        <img :src="user.avatar" :alt="user.name" />
        <p>{{ user.name }}</p>
      </div>
    </content>
  </div>
</template>

<script setup>
useHead({
  title: "Route Protect",
});
const { $notification } = useNuxtApp();
const isLogined = useSignIn();
const users = ref([]);

watch(isLogined, () => {
  if (!isLogined.value) {
    users.value = [];
  }
});

const handleClickCallApi = async () => {
  const tokenCookies = useTokenCookies();
  const { data, error } = await useFetch("/api/data", {
    headers: {
      authorization: tokenCookies.value || "",
    },
  });
  if (error.value) {
    $notification({
      active: true,
      status: "error",
      title: error.value.statusCode === 401 ? "Unauthorized" : "Fail",
      content: error.value.statusMessage || "Get data fail",
      timeout: 4000,
    });
    users.value = [];
    return;
  }
  $notification({
    active: true,
    status: "sucess",
    title: "Sucess",
    content: "Get data succes",
    timeout: 4000,
  });
  users.value = data.value;
  // $fetch("/api/data", {
  //   headers: {
  //     authorization: tokenCookies.value || "",
  //   },
  // })
  //   .then((res) => {
  //     console.log("res", res);
  //     $notification({
  //       active: true,
  //       status: "sucess",
  //       title: "Sucess",
  //       content: "Get data succes",
  //       timeout: 3000,
  //     });
  //     users.value = res;
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  //     $notification({
  //       active: true,
  //       status: "error",
  //       title: err?.statusMessage || "Fail",
  //       content: err?.message || "Get data fail",
  //       timeout: 4000,
  //     });
  //   });
};
</script>

<style scoped lang="scss">
.main {
  @apply flex flex-col items-center justify-center;

  &-btn {
    @apply outline-offset-0 border border-red-400 text-red-400 mt-40 mb-10 py-4 px-8 rounded-xl;
    @apply hover:bg-red-400 hover:text-white active:opacity-50;
  }
}
</style>
