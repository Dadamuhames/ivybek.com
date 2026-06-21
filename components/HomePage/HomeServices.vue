<template>
  <section class="home-services">
    <div class="container">
      <h2 class="title">{{ servicesData.title }}</h2>
      <p class="description">{{ servicesData.description }}</p>

      <div class="items">
        <component
          :is="index === 0 ? 'NuxtLink' : 'div'"
          v-for="(module, index) in serviceModules"
          :key="`${index}-${module}`"
          class="item"
          :to="index === 0 ? admissionPath : undefined"
        >
          <NuxtLink :to="admissionPath">
            <p class="number">{{ String(index + 1).padStart(2, "0") }}</p>
            <h3 class="item-title">{{ module }}</h3>
          </NuxtLink>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup>
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();
const localePath = useLocalePath();

const normalizeServices = (localeData) => {
  const source = localeData?.services;

  if (!source || typeof source !== "object") {
    return null;
  }

  const modulesRaw = Array.isArray(source.modules) ? source.modules : [];

  return {
    title: source.title ?? "",
    description: source.description ?? "",
    modules: modulesRaw.map((item) => item?.name ?? "").filter(Boolean),
  };
};

const servicesData = computed(() => {
  const fallback = normalizeServices(en) ?? en.services;

  const localized = normalizeServices(currentLocaleData.value);

  if (!localized) {
    return fallback;
  }

  return {
    title: localized.title || fallback.title,
    description: localized.description || fallback.description,
    modules: localized.modules.length ? localized.modules : fallback.modules,
  };
});

const serviceModules = computed(() => servicesData.value.modules.slice(0, 3));
const admissionPath = computed(() => localePath("/programme/admission"));
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
  grid-template-columns: repeat(3, 1fr);
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
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: 0.4s;
}
.item a {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.item::after {
  content: "";
  position: absolute;
  top: -40px;
  right: -100px;
  width: 120%;
  height: 55%;
  background: linear-gradient(180deg, #ff6969 30%, #ffa05f 70%, #ffbe73 90%);
  filter: blur(50px);
  opacity: 1;
  transition: 1s ease;
  border-radius: 50%;
  z-index: 1;
  transform: rotate(10deg) translate(100%, -100%);
}
.item::before {
  content: "";
  position: absolute;
  bottom: -40px;
  left: -100px;
  width: 120%;
  height: 55%;
  background: linear-gradient(180deg, #ff6969 30%, #ffa05f 70%, #ffbe73 90%);
  filter: blur(50px);
  opacity: 1;
  transition: 1s ease;
  border-radius: 50%;
  transform: rotate(10deg) translate(-120%, 100%);
}
.item:hover {
  background: #1c1d22;
}
.item:hover::after,
.item:hover::before {
  transform: rotate(10deg) translate(0, 0);
}
.item:nth-child(2)::after,
.item:nth-child(2)::before {
  background: linear-gradient(
    180deg,
    #a5e1f5 26.1%,
    #f5f0eb 68.08%,
    #fffacd 100%
  );
}
.item:nth-child(3)::after,
.item:nth-child(3)::before {
  background: linear-gradient(
    0deg,
    #ffa05f 0%,
    #0f3769 54.69%,
    #0a193c 109.39%
  );
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
  position: relative;
  z-index: 2;
}
.item-title {
  font-weight: 500;
  font-style: Medium;
  font-size: 30px;
  line-height: 38px;
  position: relative;
  z-index: 2;
  transition: 0.4s ease;
}
.item:nth-child(2):hover .item-title {
  color: var(--dark-blue);
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
    grid-template-columns: 1fr 1fr;
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
    grid-template-columns: 1fr;
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
