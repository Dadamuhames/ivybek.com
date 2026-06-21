<template>
    <div ref="rootEl" class="container">
        <Icon class="quote-logo" name="garden:quote-fill-16" />
        <p ref="quoteEl" class="quote-txt">"{{ quoteData.text }}"</p>

        <div class="person">
            <div class="person-info">
                <h4 class="name">
                    {{ quoteData.author }}
                </h4>
                <p class="position">
                    {{ quoteData.position }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { gsap } from "gsap";
import en from "@/locales/en.json";
const { currentLocaleData } = useLocaleData();

const FALLBACK_QUOTE_IMAGE = "/img/default.webp";
const quoteImageSrc = ref(
    currentLocaleData.value.quote?.image || "/img/person-1.png",
);

const quoteData = computed(() => {
    return currentLocaleData.value.quote ?? en.quote;
});

const commonData = computed(() => {
    const fallback = en.common;
    const localized = currentLocaleData.value.common ?? {};

    return {
        alts: {
            quotePortrait:
                localized.alts?.quotePortrait || fallback.alts.quotePortrait,
        },
    };
});

const handleQuoteImageError = () => {
    if (quoteImageSrc.value !== FALLBACK_QUOTE_IMAGE) {
        quoteImageSrc.value = FALLBACK_QUOTE_IMAGE;
    }
};

const rootEl = ref(null);
const quoteEl = ref(null);

let observer;
let ctx;

onMounted(() => {
    if (!rootEl.value || !quoteEl.value) {
        return;
    }

    const fullText = (quoteEl.value.textContent ?? "")
        .replace(/\s+/g, " ")
        .trim();
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
        quoteEl.value.textContent = fullText;
        return;
    }

    quoteEl.value.textContent = "";
    quoteEl.value.classList.add("is-typing");

    observer = new IntersectionObserver(
        (entries) => {
            if (!entries[0]?.isIntersecting) {
                return;
            }

            ctx = gsap.context(() => {
                const state = { chars: 0 };

                gsap.to(state, {
                    chars: fullText.length,
                    duration: 2,
                    ease: "none",
                    onUpdate: () => {
                        quoteEl.value.textContent = fullText.slice(
                            0,
                            Math.floor(state.chars),
                        );
                    },
                    onComplete: () => {
                        quoteEl.value.textContent = fullText;
                        quoteEl.value.classList.remove("is-typing");
                    },
                });

                gsap.from(".person", {
                    y: 16,
                    opacity: 0,
                    duration: 0.45,
                    delay: 0.25,
                    ease: "power2.out",
                });
            }, rootEl.value);

            observer?.disconnect();
        },
        { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
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
    padding: 0 48px 80px 48px;
    text-align: center;
}
.quote-logo {
    width: 56px;
    height: 56px;
    color: var(--dark-blue-50);
    transform: rotate(180deg);
    margin-bottom: 24px;
}
.quote-txt {
    min-height: 224px;
    font-weight: 500;
    font-style: Medium;
    font-size: 40px;
    line-height: 140%;
    letter-spacing: -4%;
    text-align: center;
    color: var(--dark-blue-50);
    max-width: 1104px;
    margin: 0 auto 40px auto;
}
.quote-txt.is-typing::after {
    content: "|";
    margin-left: 2px;
    color: var(--blue);
    animation: quoteCaretBlink 0.9s steps(1, end) infinite;
}
.person {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
.person-img {
    width: 104px;
    height: 104px;
    border-radius: 50%;
    object-fit: cover;
}
.name {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -4%;
    color: var(--dark-blue-50);
    margin-bottom: 8px;
}
.position {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
    color: var(--text-grey);
}

@keyframes quoteCaretBlink {
    0%,
    50% {
        opacity: 1;
    }
    51%,
    100% {
        opacity: 0;
    }
}

@media (max-width: 1200px) {
    .container {
        padding: 0 32px 72px 32px;
    }

    .quote-txt {
        font-size: 34px;
        max-width: 900px;
    }
}

@media (max-width: 992px) {
    .container {
        padding: 0 24px 64px 24px;
    }

    .quote-logo {
        width: 48px;
        height: 48px;
        margin-bottom: 20px;
    }

    .quote-txt {
        font-size: 30px;
        line-height: 1.35;
        margin-bottom: 32px;
    }

    .person-img {
        width: 92px;
        height: 92px;
    }
}

@media (max-width: 576px) {
    .container {
        padding: 0 16px 56px 16px;
    }

    .quote-logo {
        width: 40px;
        height: 40px;
        margin-bottom: 16px;
    }

    .quote-txt {
        font-size: 22px;
        line-height: 1.5;
        margin-bottom: 24px;
        letter-spacing: -0.02em;
    }

    .person {
        gap: 14px;
    }

    .person-img {
        width: 76px;
        height: 76px;
    }

    .name {
        font-size: 18px;
        margin-bottom: 6px;
    }

    .position {
        font-size: 14px;
    }
}
</style>
