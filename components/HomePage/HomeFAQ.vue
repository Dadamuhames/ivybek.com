<template>
  <div ref="rootEl" class="container">
    <h2 class="title section-title">{{ faqData.title }}</h2>

    <div class="accordion">
      <div
        v-for="(item, index) in faqItems"
        :key="item.question"
        class="accordion-item"
      >
        <h3
          class="accordion-header"
          :class="{ opened: openIndex === index }"
          @click="toggle(index)"
        >
          <span class="accordion-title">{{ item.question }}</span>
          <span class="accordion-icon" aria-hidden="true"></span>
        </h3>

        <Transition
          name="accordion"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @before-leave="onBeforeLeave"
          @leave="onLeave"
        >
          <div v-show="openIndex === index" class="accordion-content">
            <div class="accordion-content-inner">
              <p class="answer">{{ item.answer }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const normalizeFaqs = (localeData) => {
  const source = localeData?.faqs;

  if (!source || typeof source !== "object") {
    return null;
  }

  return {
    title: source.title ?? "",
    items: Array.isArray(source.items)
      ? source.items
          .map((item) => ({
            question: item?.question ?? "",
            answer: item?.answer ?? "",
          }))
          .filter((item) => item.question || item.answer)
      : [],
  };
};

const faqData = computed(() => {
  const fallback = normalizeFaqs(en) ?? {
    title: "Frequently Asked Questions",
    items: [],
  };

  const localized = normalizeFaqs(currentLocaleData.value);

  if (!localized) {
    return fallback;
  }

  return {
    title: localized.title || fallback.title,
    items: localized.items.length ? localized.items : fallback.items,
  };
});

const faqItems = computed(() => faqData.value.items);

const openIndex = ref(0);
const rootEl = ref(null);

let observer;
let ctx;

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

watch(
  faqItems,
  (items) => {
    if (!items.length) {
      openIndex.value = null;
      return;
    }

    if (openIndex.value === null || openIndex.value > items.length - 1) {
      openIndex.value = 0;
    }
  },
  { immediate: true },
);

function onBeforeEnter(el) {
  const target = el;
  target.style.height = "0";
  target.style.opacity = "0";
}

function onEnter(el) {
  const target = el;
  target.style.height = `${target.scrollHeight}px`;
  target.style.opacity = "1";
}

function onAfterEnter(el) {
  const target = el;
  target.style.height = "auto";
}

function onBeforeLeave(el) {
  const target = el;
  target.style.height = `${target.scrollHeight}px`;
  target.style.opacity = "1";
}

function onLeave(el) {
  const target = el;
  void target.offsetHeight;
  target.style.height = "0";
  target.style.opacity = "0";
}

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
        gsap.from(".title", {
          y: 18,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        });

        gsap.from(".accordion-item", {
          y: 16,
          opacity: 0,
          duration: 0.4,
          stagger: 0.07,
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

<style scoped>
.container {
  border-inline: 1px solid var(--border-color);
  padding: 120px 0;
}

.accordion {
  display: grid;
  gap: 14px;
  max-width: 992px;
  margin: 24px auto 0 auto;
}

.accordion-item {
  background: #f4f5f8;
  border-radius: 14px;
  overflow: hidden;
  will-change: transform, opacity;
}

.accordion-header {
  padding: 20px 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: color 0.24s ease;
  font-size: clamp(18px, 1.3vw, 24px);
  font-weight: 700;
  line-height: 1.45;
  color: #1b1a57;
  margin: 0;
}

.accordion-title {
  flex: 1;
}

.accordion-icon {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: #1b1a57;
  border-radius: 50%;
  transition: background-color 0.24s ease;
}

.accordion-icon::before,
.accordion-icon::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 2px;
  background: #fff;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  transition:
    transform 0.24s ease,
    opacity 0.24s ease;
}

.accordion-icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.accordion-content {
  overflow: hidden;
  will-change: height, opacity;
}

.accordion-enter-active,
.accordion-leave-active {
  transition:
    height 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
}

.accordion-content-inner {
  padding: 0 26px 20px;
}

.answer {
  margin: 0;
  font-size: clamp(15px, 1.08vw, 20px);
  line-height: 1.6;
  color: #657897;
}

.opened {
  color: #2d7ff9;
}

.opened .accordion-icon {
  background: #2d7ff9;
}

.opened .accordion-icon::after {
  transform: translate(-50%, -50%) rotate(90deg) scaleY(0);
  opacity: 0;
}

@media (max-width: 1024px) {
  .accordion-header {
    padding: 16px 20px;
  }

  .accordion-content-inner {
    padding: 0 20px 18px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 80px 24px;
  }
  .accordion {
    gap: 10px;
  }

  .accordion-item {
    border-radius: 12px;
  }

  .accordion-header {
    padding: 14px 16px;
    line-height: 1.4;
  }

  .accordion-content-inner {
    padding: 0 16px 16px;
  }
}
</style>
