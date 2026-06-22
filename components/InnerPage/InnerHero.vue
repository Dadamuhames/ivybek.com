<template>
    <section ref="rootEl" class="inner-hero">
        <img src="/img/inner-ribbon.svg" alt="" class="ribbon" />
        <div class="container">
            <div class="top">
                <h1 class="title">{{ heroData.title }}</h1>
                <p class="subtitle">
                    {{ heroData.subtitle }}
                </p>
                <div class="buttons">
                    <a
                        href="https://ivibek.vercel.app"
                        target="_blank"
                        class="button"
                        >{{ heroData.freeDemo }}</a
                    >
                    <a
                        href="#how"
                        class="button secondary"
                        @click.prevent="scrollToHowSection"
                        >{{ heroData.howWorks }}</a
                    >
                </div>
            </div>
            <div class="img">
                <img
                    :src="innerHeroImageSrc"
                    :alt="commonData.alts.innerHero"
                    width="1156"
                    height="754"
                    sizes="(max-width: 576px) 100vw, (max-width: 1200px) 960px, 1156px"
                    loading="eager"
                    decoding="async"
                    @error="handleInnerHeroImageError"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { gsap } from "gsap";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();
const route = useRoute();
const localePath = useLocalePath();

const FALLBACK_INNER_HERO_IMAGE = "/img/default.webp";
const innerHeroImageSrc = ref("/img/frame.png");

const heroData = computed(() => {
    return currentLocaleData.value.programme?.hero ?? en.programme.hero;
});

const commonData = computed(() => {
    const fallback = en.common;
    const localized = currentLocaleData.value.common ?? {};

    return {
        alts: {
            innerHero: localized.alts?.innerHero || fallback.alts.innerHero,
        },
    };
});

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

const rootEl = ref(null);
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

    ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(".title", {
            y: 24,
            opacity: 0,
            duration: 0.6,
        })
            .from(
                ".subtitle",
                {
                    y: 16,
                    opacity: 0,
                    duration: 0.45,
                },
                "-=0.35",
            )
            .from(
                ".buttons .button",
                {
                    y: 12,
                    opacity: 0,
                    duration: 0.35,
                    stagger: 0.08,
                },
                "-=0.2",
            )
            .from(
                ".img",
                {
                    y: 24,
                    opacity: 0,
                    duration: 0.55,
                },
                "-=0.1",
            );
    }, rootEl.value);
});

onBeforeUnmount(() => {
    ctx?.revert();
});
</script>

<style scoped>
.inner-hero {
    height: 1080px;
    background: #f8fafc;
    margin-top: -92px;
    position: relative;
}
.ribbon {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 1;
}
.container {
    padding-top: 204px;
}
.top {
    max-width: 980px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
}
.title {
    font-weight: 500;
    font-size: 56px;
    line-height: 120%;
    letter-spacing: 0%;
    text-align: center;
    color: var(--dark-blue-50);
    margin-bottom: 24px;
}
.subtitle {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0%;
    text-align: center;
    color: var(--text-grey);
    margin-bottom: 40px;
}
.buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 84px;
}
.button {
    padding: 12px 28px;
    background: var(--blue);
    color: white;
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
    box-shadow: 0 10px 22px rgba(41, 85, 186, 0.25);
}
.button:active {
    transform: translateY(0);
}
.button.secondary {
    background: white;
    border: 1px solid var(--border-color);
    color: var(--dark-blue);
}
.button.secondary:hover {
    background: #f8fafc;
}
.img {
    position: relative;
    z-index: 2;
    border: 2pt solid #2b7fff1f;
    border-radius: 12px;
    width: 100%;
    max-width: 1156px;
    height: 754px;
    overflow: hidden;
    margin: 0 auto;
    will-change: transform, opacity;
}
.img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.01);
}

@media (max-width: 1200px) {
    .inner-hero {
        height: auto;
        padding-bottom: 64px;
    }

    .container {
        padding-top: 180px;
    }

    .title {
        font-size: 48px;
    }

    .img {
        max-width: 960px;
        height: 620px;
    }
}

@media (max-width: 992px) {
    .container {
        padding-top: 160px;
    }

    .title {
        font-size: 40px;
        margin-bottom: 18px;
    }

    .subtitle {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 28px;
    }

    .buttons {
        margin-bottom: 56px;
    }

    .img {
        max-width: 820px;
        height: 520px;
    }
}

@media (max-width: 576px) {
    .inner-hero {
        margin-top: -72px;
        padding-bottom: 48px;
    }

    .container {
        padding-top: 132px;
    }

    .title {
        font-size: 28px;
        line-height: 1.25;
        margin-bottom: 14px;
    }

    .subtitle {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 22px;
    }

    .buttons {
        gap: 12px;
        margin-bottom: 36px;
    }

    .button {
        width: 100%;
        text-align: center;
        padding: 14px 18px;
        border-radius: 10px;
    }

    .img {
        height: 300px;
        border-radius: 10px;
    }
}
</style>
