<template>
  <div ref="rootEl" class="container">
    <h4 class="title section-title">{{ howData.title }}</h4>
    <p class="subtitle">
      {{ howData.subtitle }}
    </p>
    <div class="cards-top">
      <div class="card" v-for="(step, index) in topSteps" :key="`top-${index}`">
        <div class="card-top">
          <div class="icon">
            <Icon :name="step.icon" />
          </div>
          <div class="card-content">
            <h3 class="name">{{ step.title }}</h3>
            <p class="desc">{{ step.description }}</p>
          </div>
        </div>
        <img :src="step.photo" alt="" class="card-img" />
      </div>
    </div>
    <div class="cards-bottom">
      <div
        class="card"
        v-for="(step, index) in bottomSteps"
        :key="`bottom-${index}`"
      >
        <div class="card-top">
          <div class="icon">
            <Icon :name="step.icon" />
          </div>
          <div class="card-content">
            <h3 class="name">{{ step.title }}</h3>
            <p class="desc">{{ step.description }}</p>
          </div>
        </div>
        <img :src="step.photo" alt="" class="card-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const stepIcons = [
  "lucide:bar-chart-big",
  "lucide:brain-cog",
  "lucide:lightbulb",
  "lucide:graduation-cap",
  "lucide:captions",
];

const stepPhotos = [
  "/img/capa-4.png",
  "/img/capa-1.png",
  "/img/capa-3.png",
  "/img/capa-2.png",
  "/img/capa-5.png",
];

const normalizeHowBlock = (localeData) => {
  const sourceHow = localeData?.how;

  if (!sourceHow || typeof sourceHow !== "object") {
    return null;
  }

  const title = sourceHow.title ?? "";
  const rawSteps = Array.isArray(sourceHow.steps) ? sourceHow.steps : [];

  const mappedSteps = rawSteps
    .map((step) => ({
      title: step?.title ?? "",
      description: step?.description ?? "",
    }))
    .filter((step) => step.title || step.description);

  return {
    title,
    subtitle: sourceHow.subtitle ?? "",
    steps: mappedSteps,
  };
};

const howData = computed(() => {
  const fallbackHow = normalizeHowBlock(en) ?? en.how;

  const localizedHow = normalizeHowBlock(currentLocaleData.value);

  if (!localizedHow) {
    return fallbackHow;
  }

  return {
    title: localizedHow.title || fallbackHow.title,
    subtitle: localizedHow.subtitle || fallbackHow.subtitle,
    steps: localizedHow.steps.length ? localizedHow.steps : fallbackHow.steps,
  };
});

const steps = computed(() => {
  const localeSteps = Array.isArray(howData.value.steps)
    ? howData.value.steps
    : [];

  return localeSteps.slice(0, 5).map((step, index) => ({
    title: step?.title ?? "",
    description: step?.description ?? "",
    icon: stepIcons[index] ?? stepIcons[0],
    photo: stepPhotos[index] ?? stepPhotos[0],
  }));
});

const topSteps = computed(() => steps.value.slice(0, 3));
const bottomSteps = computed(() => steps.value.slice(3, 5));

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
        const cards = rootEl.value.querySelectorAll(".card");

        gsap.from(".title", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.from(cards, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.1,
          ease: "power2.out",
        });
      }, rootEl.value);

      observer?.disconnect();
    },
    { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
  );

  observer.observe(rootEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  ctx?.revert();
});
</script>

<style scoped>
.container {
  border-inline: 1px solid var(--border-color);
  padding: 104px 48px;
}
.cards-top {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 40px 0 16px 0;
}
.cards-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}
.cards-bottom .card:last-child {
  grid-column: 2/4;
}
.cards-bottom .card:last-child .card-content {
  max-width: 340px;
}
.cards-bottom .card:last-child .card-top {
  justify-content: space-between;
  height: 100%;
}
.card-top {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card {
  background: var(--light-bg);
  border-radius: 16px;
  padding: 24px;
  height: 468px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  will-change: transform, opacity;
}
.card-img {
  height: 170px;
  width: 100%;
  z-index: 2;
  border-radius: 12px;
  object-fit: cover;
}
.cards-bottom .card:last-child .card-img {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: auto;
}
.icon {
  width: 64px;
  height: 64px;
  background: var(--blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: relative;
  z-index: 3;
}
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
.card-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
}
.name {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -4%;
  color: var(--dark-blue-50);
  margin-bottom: 12px;
}
.desc {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
  color: var(--text-grey);
}

@media (max-width: 1200px) {
  .container {
    padding: 88px 32px;
  }

  .card {
    height: 340px;
  }

  .name {
    font-size: 22px;
  }
}

@media (max-width: 1024px) {
  .cards-top {
    grid-template-columns: repeat(2, 1fr);
  }

  .cards-bottom {
    grid-template-columns: repeat(2, 1fr);
  }

  .cards-bottom .card:last-child {
    grid-column: auto;
  }

  .card {
    height: 420px;
  }
  .card-img {
    height: 150px;
    margin-top: 16px;
  }
  .cards-bottom .card:last-child .card-img {
    position: relative;
    height: 150px;
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--border-color);
  }
}

@media (max-width: 992px) {
  .container {
    padding: 72px 24px;
  }

  .cards-top {
    grid-template-columns: 1fr;
    margin: 32px 0 16px 0;
  }

  .cards-bottom {
    grid-template-columns: 1fr 1fr;
  }

  .card {
    height: auto;
    min-height: 320px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 56px 16px;
  }

  .cards-top,
  .cards-bottom {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .card {
    padding: 18px;
    min-height: 0;
  }

  .icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
  }

  .name {
    font-size: 20px;
    line-height: 1.3;
    margin-bottom: 10px;
  }

  .desc {
    font-size: 15px;
    line-height: 1.6;
  }
}
</style>
