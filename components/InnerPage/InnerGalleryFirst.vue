<template>
  <section class="inner-gallery-first">
    <div class="slider-wrapper">
      <Swiper
        :slides-per-view="4"
        :loop="true"
        :grab-cursor="true"
        :space-between="16"
        :breakpoints="{
          0: { slidesPerView: 2, spaceBetween: 12 },
          520: { slidesPerView: 3, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 14 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }"
        @swiper="onInit"
        @slideChange="onSlideChange"
        :speed="1000"
      >
        <SwiperSlide
          v-for="(n, idx) in totalSlides"
          :key="n"
          :class="slideClass(idx)"
        >
          <div class="slide-content">
            <img
              :src="`https://picsum.photos/1200/700?random=${n}`"
              :alt="formatGalleryAlt(n)"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const totalSlides = 20;
const activeIndex = ref(0);

const formatGalleryAlt = (number) => {
  const template =
    currentLocaleData.value.common?.alts?.galleryImage ??
    en.common.alts.galleryImage;

  return template.replace("{number}", number);
};

const onInit = (swiper) => {
  activeIndex.value = swiper.realIndex ?? swiper.activeIndex ?? 0;
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex ?? swiper.activeIndex ?? 0;
};

const slideClass = (idx) => {
  const firstCenter = (activeIndex.value + 1) % totalSlides;
  const secondCenter = (activeIndex.value + 2) % totalSlides;

  return idx === firstCenter || idx === secondCenter ? "is-feature" : "";
};
</script>

<style scoped>
.slider-wrapper {
  position: relative;
  overflow: hidden;
}
.slider-wrapper::before {
  content: "";
  position: absolute;
  top: -45%;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 275px;
  z-index: 2;
  background: white;
  border-radius: 50%;
}
.slider-wrapper::after {
  content: "";
  position: absolute;
  bottom: -45%;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 275px;
  z-index: 2;
  background: white;
  border-radius: 50%;
}
.inner-gallery-first {
  padding: 0px 0 180px 0 !important;
  border-inline: 1px solid var(--border-color);
}
.slide-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.slide-content img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
  transition: 0.6s;
}
.swiper-slide {
  height: 468px;
}
.is-feature img {
  height: 420px;
}
@media (max-width: 900px) {
  .slider-wrapper {
    clip-path: ellipse(100% 72% at 50% 50%);
  }
  .slide-content {
    width: min(78vw, 340px);
  }
  .swiper-slide {
    height: 380px;
  }
  .is-feature img {
    height: 360px;
  }
  .inner-gallery-first {
    padding: 0 0 140px 0 !important;
  }
  .slider-wrapper::before,
  .slider-wrapper::after {
    height: 220px;
    width: 150%;
  }
}

@media (max-width: 600px) {
  .swiper-slide {
    height: 300px;
  }
  .is-feature img {
    height: 280px;
  }
  .slider-wrapper::before,
  .slider-wrapper::after {
    height: 180px;
  }
  .inner-gallery-first {
    padding: 0 0 110px 0 !important;
  }
}
</style>
