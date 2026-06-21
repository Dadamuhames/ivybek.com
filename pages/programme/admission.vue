<template>
  <div>
    <InnerHero />
    <InnerTxt />
    <InnerOffers />
    <InnerStats />
    <InnerGalleryFirst />
    <InnerGallerySecond />
    <InnerServices />
    <HomeTestimonials />
    <HomeForm />
    <HomeFAQ />
  </div>
</template>

<script setup>
import InnerHero from "~/components/InnerPage/InnerHero.vue";
import InnerOffers from "~/components/InnerPage/InnerOffers.vue";
import InnerServices from "~/components/InnerPage/InnerServices.vue";
import HomeTestimonials from "~/components/HomePage/HomeTestimonials.vue";
import HomeForm from "~/components/HomePage/HomeForm.vue";
import HomeFAQ from "~/components/HomePage/HomeFAQ.vue";
import InnerStats from "~/components/InnerPage/InnerStats.vue";
import InnerTxt from "~/components/InnerPage/InnerTxt.vue";
import InnerGalleryFirst from "~/components/InnerPage/InnerGalleryFirst.vue";
import InnerGallerySecond from "~/components/InnerPage/InnerGallerySecond.vue";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();
const route = useRoute();
const siteUrl = "https://ivybek.com";
const canonicalUrl = computed(() => `${siteUrl}${route.path}`);
const seoData = computed(
  () => currentLocaleData.value.seo?.admissions ?? en.seo.admissions,
);
const commonData = computed(() => currentLocaleData.value.common ?? en.common);

const admissionSchema = computed(() => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ivybek.com/#organization",
      name: commonData.value.brandName,
      url: `${commonData.value.siteUrl}/`,
      logo: commonData.value.ogImage,
    },
    {
      "@type": "Service",
      "@id": `${canonicalUrl.value}#service`,
      name: seoData.value.title,
      serviceType: seoData.value.serviceType,
      url: canonicalUrl.value,
      provider: { "@id": "https://ivybek.com/#organization" },
      areaServed: seoData.value.areaServed,
      description: seoData.value.description,
    },
  ],
}));

definePageMeta({
  layout: "inner",
});

useSeoMeta({
  title: computed(() => seoData.value.title),
  description: computed(() => seoData.value.description),
  ogTitle: computed(() => seoData.value.ogTitle),
  ogDescription: computed(() => seoData.value.description),
  ogSiteName: computed(() => commonData.value.brandName),
  ogLocale: "en_US",
  ogType: "website",
  ogUrl: canonicalUrl,
  ogImage: computed(() => commonData.value.ogImage),
  ogImageAlt: computed(() => seoData.value.imageAlt),
  twitterCard: "summary_large_image",
  twitterSite: computed(() => commonData.value.twitterHandle),
  twitterCreator: computed(() => commonData.value.twitterHandle),
  twitterTitle: computed(() => seoData.value.ogTitle),
  twitterDescription: computed(() => seoData.value.description),
  twitterImage: computed(() => commonData.value.ogImage),
  twitterImageAlt: computed(() => seoData.value.imageAlt),
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
  script: [
    {
      type: "application/ld+json",
      children: computed(() => JSON.stringify(admissionSchema.value)),
    },
  ],
});
</script>
