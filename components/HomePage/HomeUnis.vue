<template>
  <section class="home-universities">
    <div class="container">
      <div class="top">
        <h4 class="title section-title">{{ restContent.top }}</h4>
      </div>
      <div class="slider">
        <Swiper
          :modules="[Autoplay]"
          :slides-per-view="7"
          :space-between="-16"
          :loop="true"
          :speed="1000"
          centered-slides="true"
          :breakpoints="{
            320: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
          class="mySwiper"
        >
          <SwiperSlide v-for="(image, index) in universityImages" :key="`${image}-${index}`">
            <img :src="image" :alt="formatUniversityAlt(index + 1)" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const universityImages = [
  "/img/universities/mit.png",
  "/img/universities/hkust.png",
  "/img/universities/UTORONTO.png",
  "/img/universities/LSE.png",
  "/img/universities/NUS.png",
  "/img/universities/Harvard.png",
  "/img/universities/DKU.png",
  "/img/universities/Imperial%20college%20london.png",
  "/img/universities/CUHK.png",
  "/img/universities/UChicago.png",
  "/img/universities/NTU.png",
  "/img/universities/Columbia%20University.png",
  "/img/universities/ucl.png",
  "/img/universities/UBC.png",
  "/img/universities/GUQ.png",
  "/img/universities/HKU.png",
  "/img/universities/Amherst.png",
  "/img/universities/Poly%20U%20HK.png",
  "/img/universities/NYU.png",
  "/img/universities/UVirginia.png",
  "/img/universities/Kings%20college%20london.png",
  "/img/universities/CMUQ.png",
  "/img/universities/USydney.png",
];

const restContent = computed(() => {
  return (
    currentLocaleData.value.rest ?? {
      top: "",
    }
  );
});

const formatUniversityAlt = (number) => {
  const template =
    currentLocaleData.value.common?.alts?.universityLogo ??
    en.common.alts.universityLogo;

  return template.replace("{number}", number);
};
</script>

<style scoped>
.home-universities {
  margin-top: 56px;
}
.container {
  border-inline: 1px solid var(--border-color);
  padding: 0px 0px 120px 0px !important;
}
.title {
  margin-bottom: 40px;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--border-color);
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 50%;
}
.swiper-slide img {
  width: 80%;
  height: auto;
  max-height: 80px;
  object-fit: contain;
}

@media (max-width: 1024px) {
  .home-universities {
    margin-top: 40px;
  }

  .container {
    padding-bottom: 80px !important;
  }

  .swiper-slide {
    aspect-ratio: 1 / 1;
  }

  .swiper-slide img {
    max-height: 60px;
  }
}
</style>
