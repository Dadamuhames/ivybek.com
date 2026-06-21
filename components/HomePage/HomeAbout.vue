<template>
    <section ref="rootEl" class="about">
        <div class="container">
            <div class="top">
                <div class="top-left">
                    <p class="top-title">
                        {{ aboutComp.title }}
                    </p>
                    <p class="top-txt">
                        {{ aboutComp.description }}
                    </p>
                </div>
                <div class="top-right">
                    <div class="top-right-items">
                        <div
                            v-for="stat in aboutStats"
                            :key="stat.label"
                            class="top-item"
                        >
                            <h3
                                class="js-stat"
                                :data-target="`${stat.number}`"
                                :data-suffix="stat.suffix"
                            >
                                {{ stat.number }}{{ stat.suffix }}
                            </h3>
                            <p>{{ stat.label }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { gsap } from "gsap";
const { currentLocaleData } = useLocaleData();

const defaultStatSuffixes = ["%", "x", "x", "", "%"];

const aboutComp = computed(() => {
    return (
        currentLocaleData.value.aboutComp ?? {
            title: "",
            description: "",
            stats: [{ label: "" }, { label: "" }, { label: "" }],
            items: [
                { title: "", description: "" },
                { title: "", description: "" },
                { title: "", description: "" },
            ],
        }
    );
});

const aboutStats = computed(() => {
    return (aboutComp.value.stats ?? []).map((stat, index) => ({
        number: stat?.number ?? 0,
        label: stat?.label ?? "",
        suffix: stat?.suffix ?? defaultStatSuffixes[index] ?? "",
    }));
});

const rootEl = ref(null);

let observer;
let ctx;

onMounted(() => {
    if (!rootEl.value) {
        return;
    }

    const titleEl = rootEl.value.querySelector(".top-title");
    const statEls = Array.from(rootEl.value.querySelectorAll(".js-stat"));
    const featureEls = Array.from(rootEl.value.querySelectorAll(".js-feature"));
    const titleText = (titleEl?.textContent ?? "").replace(/\s+/g, " ").trim();

    const setFinalState = () => {
        if (titleEl) {
            titleEl.classList.remove("is-typing");
            titleEl.textContent = titleText;
        }

        statEls.forEach((el) => {
            const target = Number(el.dataset.target ?? 0);
            const suffix = el.dataset.suffix ?? "";
            el.textContent = `${target}${suffix}`;
        });
    };

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
        setFinalState();
        return;
    }

    if (titleEl) {
        titleEl.classList.add("is-typing");
        titleEl.textContent = "";
    }

    statEls.forEach((el) => {
        const suffix = el.dataset.suffix ?? "";
        el.textContent = `0${suffix}`;
    });

    observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (!entry?.isIntersecting) {
                return;
            }

            ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                });

                tl.from(".top-left", {
                    y: 28,
                    opacity: 0,
                    duration: 1,
                })
                    .from(
                        ".top-right",
                        {
                            y: 24,
                            opacity: 0,
                            duration: 0.8,
                        },
                        "-=0.35",
                    )
                    .from(
                        featureEls,
                        {
                            y: 20,
                            opacity: 0,
                            scale: 0.98,
                            duration: 0.4,
                            stagger: 0.5,
                        },
                        "-=0.25",
                    );

                if (titleEl && titleText) {
                    const typeState = { chars: 0 };
                    tl.to(
                        typeState,
                        {
                            chars: titleText.length,
                            duration: 2,
                            ease: "none",
                            onUpdate: () => {
                                titleEl.textContent = titleText.slice(
                                    0,
                                    Math.floor(typeState.chars),
                                );
                            },
                            onComplete: () => {
                                titleEl.textContent = titleText;
                                titleEl.classList.remove("is-typing");
                            },
                        },
                        0.08,
                    );
                }

                statEls.forEach((el, index) => {
                    const target = Number(el.dataset.target ?? 0);
                    const suffix = el.dataset.suffix ?? "";
                    const state = { value: 0 };

                    tl.to(
                        state,
                        {
                            value: target,
                            duration: 0.8,
                            ease: "power3.out",
                            onUpdate: () => {
                                el.textContent = `${Math.round(state.value)}${suffix}`;
                            },
                            onComplete: () => {
                                el.textContent = `${target}${suffix}`;
                            },
                        },
                        0.32 + index * 0.08,
                    );
                });
            }, rootEl.value);

            observer?.disconnect();
        },
        {
            threshold: 0.25,
            rootMargin: "0px 0px -8% 0px",
        },
    );

    observer.observe(rootEl.value);
});

onBeforeUnmount(() => {
    observer?.disconnect();
    ctx?.revert();
});
</script>

<style scoped>
.about {
    border-top: 1px solid var(--border-color);
}
.container {
    border-inline: 1px solid var(--border-color);
    padding: 72px 0 80px 0 !important;
}
.top {
    border-bottom: 1px solid var(--border-color);
    padding: 0 40px 44px 40px;
}
.top-title {
    font-weight: 500;
    font-style: Medium;
    font-size: 40px;
    line-height: 120%;
    letter-spacing: -4%;
    color: var(--dark-blue);
    max-width: 900px;
    margin-bottom: 12px;
    min-height: 144px;
}
.top-title.is-typing::after {
    content: "|";
    margin-left: 2px;
    color: var(--blue);
    animation: caretBlink 0.9s steps(1, end) infinite;
}
.top-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    display: none;
}
.top-right-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 132px), 1fr));
    gap: 16px;
    margin-bottom: 16px;
}
.top-txt {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0%;
    color: var(--text-grey);
    max-width: 656px;
}
.top-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.top-item h3 {
    font-weight: 600;
    font-size: 32px;
    line-height: 120%;
    letter-spacing: -4%;
    color: var(--dark-blue);
}
.top-item p {
    font-weight: 400;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: 0%;
    color: var(--text-grey);
    white-space: nowrap;
}
.bottom {
    border-bottom: 1px solid var(--border-color);
    padding: 40px 0;
}
.items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 1328px;
    margin: 0 auto;
}
.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
    will-change: transform, opacity;
}
.icon {
    width: 64px;
    height: 64px;
    background: var(--light-blue);
    color: var(--blue);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}
.name {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -4%;
    color: var(--dark-blue);
    margin-bottom: 8px;
}
.desc {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0%;
    color: var(--text-grey);
    max-width: 384px;
    margin: 0 auto;
}

@keyframes caretBlink {
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
        padding: 64px 0 72px 0;
    }

    .top {
        grid-template-columns: 1fr;
        gap: 28px;
    }

    .top-title {
        font-size: 36px;
    }

    .top-item h3 {
        font-size: 48px;
    }
}

@media (max-width: 992px) {
    .top {
        padding: 0 24px 36px 24px;
    }

    .top-right-items {
        gap: 16px 20px;
    }

    .items {
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 0 24px;
    }
}

@media (max-width: 576px) {
    .container {
        padding: 48px 0 56px 0;
    }

    .top {
        padding: 0 16px 28px 16px;
    }

    .top-title {
        font-size: 28px;
        line-height: 1.25;
        letter-spacing: -0.02em;
    }

    .top-item h3 {
        font-size: 40px;
    }

    .top-item p {
        font-size: 16px;
        line-height: 1.4;
    }

    .top-txt {
        font-size: 15px;
        line-height: 1.6;
    }

    .bottom {
        padding: 32px 0;
    }

    .items {
        grid-template-columns: 1fr;
        gap: 24px;
        padding: 0 16px;
    }

    .icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
    }

    .name {
        font-size: 17px;
        line-height: 1.4;
    }

    .desc {
        font-size: 15px;
        line-height: 1.6;
    }
}
</style>
