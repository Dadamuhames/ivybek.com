<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
});

useHead(() => i18nHead.value);
</script>
