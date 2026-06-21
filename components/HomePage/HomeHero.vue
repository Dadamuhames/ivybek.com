<template>
  <section ref="rootEl" class="home-hero">
    <div class="cover">
      <div class="grad"></div>
      <div class="container">
        <div class="grid">
          <div class="left">
            <h1 ref="titleEl" class="title">
              {{ currentLocaleData.hero.title }}
            </h1>
            <p ref="subtitleEl" class="subtitle">
              {{ currentLocaleData.hero.subtitle }}
            </p>
            <div ref="buttonsEl" class="buttons">
              <a
                href="https://ivibek.vercel.app"
                target="_blank"
                class="button"
                >{{ currentLocaleData.hero.freeDemo }}</a
              >
              <a
                href="#how"
                @click.prevent="scrollToHowSection"
                class="button secondary"
                >{{ currentLocaleData.hero.howWorks }}</a
              >
            </div>
          </div>
          <div class="right">
            <img
              src="/img/hero.svg"
              :alt="commonData.alts.homeHero"
              class="hero-image"
              ref="imageEl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import en from "@/locales/en.json";
const { currentLocaleData } = useLocaleData();

const rootEl = ref(null);
const titleEl = ref(null);
const subtitleEl = ref(null);
const buttonsEl = ref(null);
const imageEl = ref(null);

const commonData = computed(() => {
  const fallback = en.common;
  const localized = currentLocaleData.value.common ?? {};

  return {
    alts: {
      homeHero: localized.alts?.homeHero || fallback.alts.homeHero,
    },
  };
});

const route = useRoute();
const localePath = useLocalePath();

const FALLBACK_INNER_HERO_IMAGE = "/img/default.webp";
const innerHeroImageSrc = ref("/img/frame.png");

const handleInnerHeroImageError = () => {
  if (innerHeroImageSrc.value !== FALLBACK_INNER_HERO_IMAGE) {
    innerHeroImageSrc.value = FALLBACK_INNER_HERO_IMAGE;
  }
};

const HEADER_OFFSET = 96;

const smoothScrollToId = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  const top =
    section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
};

const scrollToHowSection = async () => {
  const homePath = localePath("/");

  if (route.path !== homePath) {
    await navigateTo({ path: homePath, hash: "#how" });

    requestAnimationFrame(() => {
      smoothScrollToId("how");
    });

    return;
  }

  smoothScrollToId("how");
};

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

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(titleEl.value, { y: 24, opacity: 0, duration: 0.6 })
    .from(subtitleEl.value, { y: 20, opacity: 0, duration: 0.65 }, "-=0.3")
    .from(buttonsEl.value, { y: 16, opacity: 0, duration: 0.7 }, "-=0.25")
    .from(
      imageEl.value,
      { y: 30, opacity: 0, scale: 0.98, duration: 0.75 },
      "-=0.4",
    );
});
</script>

<style scoped>
.home-hero {
  background: linear-gradient(180deg, #09101f, #2955ba, #7ca4ff80);
  padding: 64px 0;
  color: white;
  position: relative;
  overflow-x: clip;
  overflow-y: visible;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  position: relative;
  z-index: 1;
}
.hero-image {
  width: 100%;
  max-width: 745px;
  object-fit: contain;
}
.title {
  font-weight: 600;
  font-size: 44px;
  line-height: 120%;
  letter-spacing: -4%;
  margin-bottom: 24px;
}
.subtitle {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
  margin-bottom: 40px;
}
.buttons {
  display: flex;
  gap: 16px;
}
.button {
  padding: 12px 28px;
  background: white;
  color: var(--blue);
  border-radius: 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
}
.button:active {
  transform: translateY(0);
}
.button.secondary {
  background: transparent;
  border: 1px solid white;
  color: white;
}
.button.secondary:hover {
  background: rgba(255, 255, 255, 0.14);
}
.grad {
  background: linear-gradient(180deg, #c1ebff 0%, #ffffff 100%);
  box-shadow: 0px -468px 157.8px -62.17px #2955ba inset;
  box-shadow: 0px -239px 116.6px -16.58px #7ca4ff80 inset;
  box-shadow: 0px -118px 144px -12.43px #ffffff80 inset;
  box-shadow: 0px 12.43px 12.43px -4.14px #2365ff26 inset;
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 140%;
  height: 30%;
  z-index: 0;
  filter: blur(30px);
}

@supports not (overflow: clip) {
  .home-hero {
    overflow-x: hidden;
  }
}

@media (max-width: 1200px) {
  .home-hero {
    padding: 56px 0 64px;
  }

  .grid {
    gap: 32px;
  }

  .title {
    font-size: 40px;
  }

  .hero-image {
    max-width: 560px;
  }
}

@media (max-width: 992px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .left {
    text-align: left;
  }

  .buttons {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  .right {
    display: flex;
    justify-content: center;
  }

  .hero-image {
    max-width: 520px;
  }
}

@media (max-width: 576px) {
  .home-hero {
    padding: 44px 0;
  }

  .title {
    margin-bottom: 14px;
    font-size: 28px;
    line-height: 1.22;
    letter-spacing: -0.02em;
  }

  .subtitle {
    margin-bottom: 22px;
    font-size: 15px;
    line-height: 1.6;
  }

  .buttons {
    flex-direction: column;
    gap: 12px;
  }

  .button {
    width: 100%;
    text-align: center;
    padding: 14px 18px;
    border-radius: 10px;
  }

  .hero-image {
    width: min(100%, 420px);
    transform: translateX(-32px);
  }

  .grad {
    bottom: -46px;
    width: 120%;
    height: 24%;
    filter: blur(22px);
  }
}
</style>
