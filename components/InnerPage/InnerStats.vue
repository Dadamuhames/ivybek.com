<template>
  <section ref="rootEl" class="inner-stats">
    <div class="container">
      <div class="top">
        <h4 class="title section-title">
          Flexible and personalised terms for partners
        </h4>
        <p class="subtitle section-subtitle">
          ivybek offers tailored collaboration terms individually for each
          client
        </p>
      </div>
      <div class="items">
        <div class="item">
          <p class="number js-stat" data-target="35">
            <span> > </span>
            <span class="value">0</span>%
          </p>
          <h3 class="item-title">
            the average increase in sales volume among partners after connecting
            to ivybek
          </h3>
        </div>
        <div class="item">
          <p class="number js-stat" data-target="50">
            <span> > </span>
            <span class="value">0</span>%
          </p>
          <h3 class="item-title">
            the average increase in sales volume among partners after connecting
            to ivybek
          </h3>
        </div>
        <div class="item">
          <p class="number js-stat" data-target="70">
            <span> > </span>
            <span class="value">0</span>%
          </p>
          <h3 class="item-title">
            the average increase in sales volume among partners after connecting
            to ivybek
          </h3>
        </div>
        <div class="item">
          <p class="number js-stat" data-target="90">
            <span> > </span>
            <span class="value">0</span>%
          </p>
          <h3 class="item-title">
            the average increase in sales volume among partners after connecting
            to ivybek
          </h3>
        </div>
        <div class="item">
          <p class="number js-stat" data-target="120">
            <span> > </span>
            <span class="value">0</span>%
          </p>
          <h3 class="item-title">
            the average increase in sales volume among partners after connecting
            to ivybek
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";

const FALLBACK_INNER_STATS_IMAGE = "/img/default.webp";
const innerStatsImageSrc = ref("/img/stat.png");

const handleInnerStatsImageError = () => {
  if (innerStatsImageSrc.value !== FALLBACK_INNER_STATS_IMAGE) {
    innerStatsImageSrc.value = FALLBACK_INNER_STATS_IMAGE;
  }
};

const rootEl = ref(null);
let observer;
let ctx;

onMounted(() => {
  if (!rootEl.value) {
    return;
  }

  const statEls = Array.from(rootEl.value.querySelectorAll(".js-stat"));
  const setFinalCounters = () => {
    statEls.forEach((el) => {
      const valueEl = el.querySelector(".value");
      const target = Number(el.dataset.target ?? 0);
      if (valueEl) {
        valueEl.textContent = String(target);
      }
    });
  };

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    setFinalCounters();
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting || !rootEl.value) {
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(".top .title, .top .subtitle", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        }).from(
          ".item",
          {
            y: 16,
            opacity: 0,
            duration: 0.4,
            stagger: 0.07,
          },
          "-=0.2",
        );

        statEls.forEach((el, index) => {
          const valueEl = el.querySelector(".value");
          const target = Number(el.dataset.target ?? 0);
          if (!valueEl) {
            return;
          }

          const state = { value: 0 };
          tl.to(
            state,
            {
              value: target,
              duration: 1,
              ease: "power3.out",
              onUpdate: () => {
                valueEl.textContent = String(Math.round(state.value));
              },
              onComplete: () => {
                valueEl.textContent = String(target);
              },
            },
            0.2 + index * 0.08,
          );
        });

        tl.from(
          ".img",
          {
            y: 22,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.35",
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
.inner-stats {
  background: white;
}
.container {
  border-inline: 1px solid var(--border-color);
  padding: 120px 48px 112px 48px;
}
.img {
  margin-top: 14px;
  width: 100%;
  height: 570px;
  border-radius: 16px;
  overflow: hidden;
  will-change: transform, opacity;
}
.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.items {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.item {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  will-change: transform, opacity;
}
.number {
  font-weight: 500;
  font-size: 48px;
  line-height: 150%;
  letter-spacing: 0%;
}
.number > span:first-child {
  color: var(--blue);
}
.item-title {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
  color: var(--text-grey);
  margin-top: 8px;
  max-width: 384px;
}

@media (max-width: 1200px) {
  .container {
    padding: 64px 32px 96px 32px;
  }

  .img {
    height: 480px;
  }

  .number {
    font-size: 42px;
  }
}

@media (max-width: 992px) {
  .container {
    padding: 64px 24px 88px 24px;
  }

  .items {
    justify-content: flex-start;
  }

  .item {
    flex: 1 1 calc(50% - 16px);
  }

  .img {
    height: 400px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 64px 16px 72px 16px;
  }

  .items {
    gap: 14px;
  }

  .item {
    flex: 1 1 100%;
    padding: 18px;
    border-radius: 12px;
  }

  .number {
    font-size: 32px;
  }

  .item-title {
    font-size: 14px;
    line-height: 1.6;
  }

  .img {
    height: 280px;
    border-radius: 12px;
  }
}
</style>
