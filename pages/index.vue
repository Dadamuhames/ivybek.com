<template>
    <div class="home-page">
        <HomeHero />
        <section id="unis">
            <HomeUnis />
        </section>
        <section id="about">
            <HomeAbout />
        </section>
        <section id="stats">
            <HomeStats />
        </section>
        <section id="team">
            <HomeTeam />
        </section>
        <section id="mentors">
            <HomeTeam
                section-key="mentors"
                :tabs-data="homeMentorsTabs"
                show-mentor-actions
                tabs-position="right"
            />
        </section>
        <section id="how">
            <HomeHow />
        </section>
        <section id="quote">
            <HomeQuote />
        </section>
        <section id="services">
            <HomeServices />
        </section>
        <section id="testimonials">
            <HomeTestimonials />
        </section>
        <section id="resources">
            <HomeResources />
        </section>
        <section id="youtube">
            <HomeYoutube />
        </section>
        <section id="partners">
            <HomePartners />
        </section>
        <section id="contact">
            <HomeForm />
        </section>
        <section id="faq">
            <HomeFAQ />
        </section>
    </div>
</template>

<script setup>
import HomeHero from "@/components/HomePage/HomeHero.vue";
import HomePartners from "@/components/HomePage/HomePartners.vue";
import HomeAbout from "~/components/HomePage/HomeAbout.vue";
import HomeTeam from "~/components/HomePage/HomeTeam.vue";
import HomeHow from "~/components/HomePage/HomeHow.vue";
import HomeQuote from "~/components/HomePage/HomeQuote.vue";
import HomeServices from "~/components/HomePage/HomeServices.vue";
import HomeTestimonials from "~/components/HomePage/HomeTestimonials.vue";
import HomeResources from "~/components/HomePage/HomeResources.vue";
import HomeYoutube from "~/components/HomePage/HomeYoutube.vue";
import HomeUnis from "~/components/HomePage/HomeUnis.vue";
import HomeForm from "~/components/HomePage/HomeForm.vue";
import HomeFAQ from "~/components/HomePage/HomeFAQ.vue";
import HomeStats from "~/components/HomePage/HomeStats.vue";
import en from "@/locales/en.json";
import homeMentorsTabs from "@/data/home-mentors-tabs.json";

const { selectedLanguage, currentLocaleData } = useLocaleData();
const route = useRoute();
const siteUrl = "https://ivybek.com";
const canonicalUrl = computed(() => `${siteUrl}${route.path}`);

const seoData = computed(() => currentLocaleData.value.seo?.home ?? en.seo.home);
const commonData = computed(() => currentLocaleData.value.common ?? en.common);

const homeSchema = computed(() => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://ivybek.com/#organization",
            name: commonData.value.brandName,
            url: `${commonData.value.siteUrl}/`,
            logo: commonData.value.ogImage,
            description: seoData.value.description,
            sameAs: [commonData.value.siteUrl],
        },
        {
            "@type": "WebSite",
            "@id": "https://ivybek.com/#website",
            url: `${commonData.value.siteUrl}/`,
            name: commonData.value.brandName,
            publisher: { "@id": "https://ivybek.com/#organization" },
            inLanguage: selectedLanguage.value,
        },
    ],
}));

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
            children: computed(() => JSON.stringify(homeSchema.value)),
        },
    ],
});
</script>
