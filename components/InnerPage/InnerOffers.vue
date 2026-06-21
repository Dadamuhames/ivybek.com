<template>
  <section class="inner-offers">
    <div class="container">
      <div class="top">
        <h4 class="title section-title">{{ offersData.title }}</h4>
        <p class="subtitle">
          {{ offersData.subtitle }}
        </p>
      </div>
      <div class="items">
        <div
          v-for="(item, index) in offerItems"
          :key="`${item.title}-${index}`"
          class="item"
        >
          <div class="img">
            <img :src="item.image" alt="" />
          </div>
          <h4 class="name">{{ item.title }}</h4>
          <p class="sub">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const offerImages = [
  "/img/offer-1.png",
  "/img/offer-2.png",
  "/img/offer-3.png",
  "/img/offer-4.png",
];

const offersData = computed(() => {
  return currentLocaleData.value.programme?.offers ?? en.programme.offers;
});

const offerItems = computed(() => {
  return (offersData.value.items ?? []).map((item, index) => ({
    ...item,
    image: offerImages[index] ?? offerImages[0],
  }));
});
</script>

<style scoped>
.container {
  padding: 0px 48px 0px 48px !important;
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
.top {
  margin-bottom: 24px;
}
.items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.item {
  background: var(--light-bg);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.img {
  width: 144px;
  height: 144px;
  border-radius: 20px;
  overflow: hidden;
  object-fit: cover;
}
.name {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0%;
  color: var(--dark-blue-50);
}
.sub {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: var(--text-grey);
}
@media (max-width: 1024px) {
  .container {
    padding: 0px 24px 0px 24px !important;
  }
  .items {
    grid-template-columns: 1fr;
  }
  .item {
    padding: 20px;
  }
  .name {
    font-size: 22px;
    line-height: 30px;
  }
  .img {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0px 16px 0px 16px !important;
  }
  .subtitle {
    font-size: 15px;
    line-height: 22px;
  }
  .item {
    padding: 16px;
    gap: 12px;
  }
  .name {
    font-size: 20px;
    line-height: 28px;
  }
  .sub {
    font-size: 15px;
    line-height: 22px;
  }
  .img {
    width: 104px;
    height: 104px;
  }
}

@media (max-width: 480px) {
  .top {
    margin-bottom: 16px;
  }
  .subtitle {
    margin-top: 12px;
  }
  .item {
    border-radius: 12px;
  }
  .img {
    width: 88px;
    height: 88px;
    border-radius: 16px;
  }
}
</style>
