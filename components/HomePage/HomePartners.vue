<script setup>
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import en from "@/locales/en.json";
const { currentLocaleData } = useLocaleData();

const partnerImages = [
  "/img/part-1.svg",
  "/img/part-2.svg",
  "/img/part-3.svg",
  "/img/part-4.svg",
  "/img/part-5.svg",
  "/img/part-6.svg",
  "/img/part-1.svg",
  "/img/part-2.svg",
  "/img/part-3.svg",
  "/img/part-4.svg",
  "/img/part-5.svg",
  "/img/part-6.svg",
];

const formatPartnerAlt = (number) => {
  const template =
    currentLocaleData.value.common?.alts?.partnerLogo ??
    en.common.alts.partnerLogo;

  return template.replace("{number}", number);
};

const rootEl = ref(null);
let observer;
let ctx;

onMounted(() => {
  if (!rootEl.value) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting || !rootEl.value) {
        return;
      }

      ctx = gsap.context(() => {
        gsap.from(".suptitle", {
          y: 16,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        });

        gsap.from(".swiper-slide", {
          y: 12,
          opacity: 0,
          duration: 0.35,
          stagger: 0.05,
          delay: 0.08,
          ease: "power2.out",
        });
      }, rootEl.value);

      observer?.disconnect();
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
  );

  observer.observe(rootEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  ctx?.revert();
});
</script>

<template>
  <section ref="rootEl" class="partners">
    <div class="container">
      <p class="suptitle">{{ currentLocaleData.partnersTitle }}</p>
      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="6"
        :space-between="40"
        :loop="true"
        :speed="1000"
        :breakpoints="{
          320: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 32,
          },
        }"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        class="mySwiper"
      >
        <SwiperSlide v-for="(image, index) in partnerImages" :key="`${image}-${index}`">
          <img :src="image" :alt="formatPartnerAlt(index + 1)" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
.partners {
  padding: 56px 0;
}
.container {
  position: relative;
  z-index: 9;
}
.suptitle {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: center;
  color: var(--text-grey);
  margin-bottom: 24px;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  height: 60px;
}
.item img {
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
}
.swiper-slide {
  will-change: transform, opacity;
}
@media screen and (max-width: 1024px) {
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }
}
</style>
