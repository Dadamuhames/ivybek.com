<template>
  <section class="inner-gallery-second">
    <div class="container">
      <div class="grid">
        <div class="item" v-for="n in totalSlides" :key="n">
          <img
            :src="`https://picsum.photos/1200/700?random=${n}`"
            :alt="formatGalleryAlt(n)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();
const totalSlides = 14;

const formatGalleryAlt = (number) => {
  const template =
    currentLocaleData.value.common?.alts?.galleryImage ??
    en.common.alts.galleryImage;

  return template.replace("{number}", number);
};
</script>

<style scoped>
.container {
  padding: 120px 48px 120px 48px !important;
  border-inline: 1px solid var(--border-color);
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-auto-rows: 88px;
  gap: 16px;
}

.item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #f3f3f3;
}

.item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.item:nth-child(1) {
  grid-column: span 2;
  grid-row: span 4;
}
.item:nth-child(2) {
  grid-column: span 2;
  grid-row: span 3;
}
.item:nth-child(3) {
  grid-column: span 2;
  grid-row: span 2;
}
.item:nth-child(4) {
  grid-column: span 2;
  grid-row: span 3;
}
.item:nth-child(5) {
  grid-column: span 2;
  grid-row: span 4;
}
.item:nth-child(6) {
  grid-column: span 2;
  grid-row: span 3;
}
.item:nth-child(7) {
  grid-column: span 2;
  grid-row: span 3;
}
.item:nth-child(8) {
  grid-column: span 2;
  grid-row: span 3;
}
.item:nth-child(9) {
  grid-column: span 3;
  grid-row: span 3;
}
.item:nth-child(10) {
  grid-column: span 3;
  grid-row: span 3;
}
.item:nth-child(11) {
  grid-column: span 2;
  grid-row: span 4;
}
.item:nth-child(12) {
  grid-column: span 1;
  grid-row: span 2;
}
.item:nth-child(13) {
  grid-column: span 2;
  grid-row: span 2;
}
.item:nth-child(14) {
  grid-column: span 3;
  grid-row: span 2;
}
@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-auto-rows: 90px;
  }
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: minmax(140px, 28vw);
    gap: 12px;
  }
  .item:nth-child(n) {
    grid-column: span 1;
    grid-row: span 1;
  }
  .item:nth-child(3n) {
    grid-row: span 2;
  }
}

@media (max-width: 600px) {
  .container {
    padding: 80px 20px 80px 20px !important;
  }
  .grid {
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(180px, 56vw);
  }
  .item:nth-child(n) {
    grid-column: span 1;
    grid-row: span 1;
  }
}

@media (max-width: 420px) {
  .grid {
    grid-auto-rows: minmax(160px, 62vw);
    gap: 10px;
  }
}
</style>
