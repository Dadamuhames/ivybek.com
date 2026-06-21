<template>
  <section class="inner-txt">
    <div class="container">
      <h4 class="title section-title">
        {{ introData.title }}
      </h4>
      <p
        v-for="paragraph in introData.paragraphs"
        :key="paragraph"
        class="subtitle"
      >
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<script setup>
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const introData = computed(() => {
  return currentLocaleData.value.programme?.intro ?? en.programme.intro;
});
</script>

<style scoped>
.container {
  padding: 320px 48px 120px 48px;
  border-inline: 1px solid var(--border-color);
}
.section-title {
  max-width: 880px;
  margin-inline: auto;
}
.subtitle {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: var(--text-grey);
  max-width: 880px;
  margin-inline: auto;
  margin-top: 16px;
  text-align: center;
}
@media (max-width: 1200px) {
  .container {
    padding: 40px 48px 80px 40px;
  }
}
</style>
