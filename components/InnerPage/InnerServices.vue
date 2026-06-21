<template>
  <section ref="rootEl" class="home-services">
    <div class="container">
      <h2 class="title">{{ servicesData.title }}</h2>
      <p class="description">
        {{ servicesData.description }}
      </p>

      <div class="items">
        <div
          v-for="(module, index) in servicesData.modules"
          :key="module.name"
          class="item"
        >
          <p class="number">{{ String(index + 2).padStart(2, "0") }}</p>
          <h3 class="item-title">{{ module.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const servicesData = computed(() => {
  return currentLocaleData.value.programme?.services ?? en.programme.services;
});

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
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(".title", {
          y: 20,
          opacity: 0,
          duration: 0.5,
        })
          .from(
            ".description",
            {
              y: 16,
              opacity: 0,
              duration: 0.45,
            },
            "-=0.28",
          )
          .from(
            ".item",
            {
              y: 16,
              opacity: 0,
              duration: 0.42,
              stagger: 0.08,
            },
            "-=0.16",
          );
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

<style scoped>
.home-services {
  background: linear-gradient(
    180deg,
    #0a0909 0%,
    #09101f 33%,
    #2955ba 66%,
    #7ca3ff 100%
  );
}
.container {
  border-inline: 1px solid var(--border-light);
  padding: 92px 48px 92px 48px;
  color: white;
}
.title {
  font-weight: 600;
  font-size: 40px;
  line-height: 120%;
  letter-spacing: -4%;
  margin-bottom: 16px;
  text-align: center;
}
.description {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
  text-align: center;
  max-width: 704px;
  margin: 0 auto 40px auto;
}
.items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.item {
  background: #ffffff29;
  padding: 32px;
  border-radius: 16px;
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  will-change: transform, opacity;
}
.number {
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -1.2%;
  color: var(--text-black);
  background: white;
  border-radius: 600px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 80px;
  padding: 6px;
}
.item-title {
  font-weight: 500;
  font-style: Medium;
  font-size: 30px;
  line-height: 38px;
}

@media (max-width: 1200px) {
  .container {
    padding: 80px 32px;
  }

  .title {
    font-size: 36px;
  }

  .item {
    height: 400px;
  }
}

@media (max-width: 992px) {
  .container {
    padding: 72px 24px;
  }

  .description {
    margin-bottom: 32px;
  }

  .items {
    grid-template-columns: 1fr;
  }

  .item {
    height: auto;
    min-height: 320px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 56px 16px;
  }

  .title {
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }

  .description {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .items {
    gap: 14px;
  }

  .item {
    padding: 22px;
    border-radius: 14px;
    min-height: 220px;
  }

  .number {
    font-size: 18px;
    line-height: 24px;
    max-width: 64px;
  }

  .item-title {
    font-size: 22px;
    line-height: 1.3;
  }
}
</style>
