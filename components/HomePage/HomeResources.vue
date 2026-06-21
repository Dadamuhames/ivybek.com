<template>
  <div ref="rootEl" class="container">
    <div class="card">
      <img src="/img/ribbon-for-blue.svg" alt="" class="ribbon" />

      <h2 class="title">{{ resourcesData.title }}</h2>
      <p class="subtitle">{{ resourcesData.description }}</p>

      <div class="items">
        <div class="item" v-for="(item, index) in resourceItems" :key="index">
          <div class="item-icon">
            <img :src="item.icon" alt="" />
          </div>

          <h3 class="item-title">{{ item.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const resourceIcons = ["/img/icon-3.svg", "/img/icon-1.svg"];

const normalizeResources = (localeData) => {
  const source = localeData?.resourcesBlock;

  if (!source || typeof source !== "object") {
    return null;
  }

  return {
    title: source.title ?? "",
    description: source.description ?? source["ta'rif"] ?? "",
    items: Array.isArray(source.items)
      ? source.items
          .map((item) => item?.name ?? item?.nomi ?? "")
          .filter(Boolean)
      : [],
  };
};

const resourcesData = computed(() => {
  const fallback = normalizeResources(en) ?? {
    title: "Free Resources",
    description: "",
    items: [],
  };

  const localized = normalizeResources(currentLocaleData.value);

  if (!localized) {
    return fallback;
  }

  return {
    title: localized.title || fallback.title,
    description: localized.description || fallback.description,
    items: localized.items.length ? localized.items : fallback.items,
  };
});

const resourceItems = computed(() => {
  return resourcesData.value.items.slice(0, 3).map((name, index) => ({
    name,
    icon: resourceIcons[index] ?? resourceIcons[resourceIcons.length - 1],
  }));
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

        tl.from(".card", {
          y: 24,
          opacity: 0,
          duration: 0.55,
        })
          .from(
            ".title, .subtitle",
            {
              y: 16,
              opacity: 0,
              duration: 0.42,
              stagger: 0.08,
            },
            "-=0.32",
          )
          .from(
            ".item",
            {
              y: 16,
              opacity: 0,
              duration: 0.4,
              stagger: 0.08,
            },
            "-=0.2",
          );
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
  padding: 60px 48px 120px 48px;
}
.card {
  background: linear-gradient(219.09deg, #0152ee -9.14%, #5f95fe 100.95%);
  padding: 80px 64px;
  border-radius: 16px;
  color: white;
  position: relative;
  overflow: hidden;
}
.ribbon {
  position: absolute;
  top: 0;
  right: -16px;
}
.title {
  font-weight: 500;
  font-size: 40px;
  line-height: 140%;
  letter-spacing: -4%;
  margin-bottom: 16px;
}
.subtitle {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
  margin-bottom: 40px;
}
.items {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.item {
  border-radius: 12px;
  padding: 24px;
  border: 2px solid #ffffff3d;
  background: linear-gradient(
    244.65deg,
    rgba(255, 255, 255, 0.24) -0.33%,
    rgba(255, 255, 255, 0) 121.47%
  );
  backdrop-filter: blur(24px);
  width: 100%;
  max-width: 388px;
  height: 188px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  will-change: transform, opacity;
}
.item:last-child {
  max-width: 587px;
}
.item-icon {
  width: 100%;
  height: 48px;
  max-width: 110px;
}
.item-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.item-title {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0%;
}

@media (max-width: 1200px) {
  .container {
    padding: 56px 32px 104px 32px;
  }

  .card {
    padding: 64px 48px;
  }

  .title {
    font-size: 36px;
  }
}

@media (max-width: 992px) {
  .container {
    padding: 48px 24px 88px 24px;
  }

  .card {
    padding: 56px 32px;
  }

  .items {
    grid-template-columns: 1fr 1fr;
  }

  .item {
    height: auto;
    min-height: 170px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 40px 16px 72px 16px;
  }

  .card {
    padding: 40px 20px;
    border-radius: 14px;
  }

  .ribbon {
    right: -24px;
    width: 140px;
  }

  .title {
    font-size: 28px;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .items {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .item {
    padding: 18px;
    border-radius: 10px;
    min-height: 220px;
  }

  .item-icon {
    max-width: 90px;
    height: 40px;
  }

  .item-title {
    font-size: 18px;
    line-height: 1.4;
  }
}
</style>
