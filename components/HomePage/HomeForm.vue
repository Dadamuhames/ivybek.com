<template>
    <section ref="rootEl" class="home-form">
        <div class="container">
            <div class="grid">
                <div class="left">
                    <img
                        src="/img/blue-brand.svg"
                        :alt="commonData.alts.logo"
                        class="brand"
                    />

                    <h4 class="title">{{ formData.title }}</h4>
                    <p class="subtitle">{{ formData.description }}</p>

                    <form action="#">
                        <div class="top-form">
                            <input
                                type="text"
                                name="name"
                                autocomplete="name"
                                :placeholder="formData.fields.name"
                                :aria-label="formData.fields.name"
                                class="input"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                autocomplete="tel"
                                inputmode="tel"
                                :placeholder="commonData.phonePlaceholder"
                                :aria-label="formData.fields.email"
                                class="input"
                                required
                            />
                        </div>
                        <div class="bottom-form">
                            <p class="form-txt">
                                {{ formData.warn }}
                            </p>

                            <button type="submit" class="submit-button">
                                {{ formData.submit }}
                                <Icon name="lucide:circle-arrow-right" />
                            </button>
                        </div>
                    </form>

                    <div class="info">
                        <div>
                            <p class="info-title">{{ formData.support }}</p>
                            <p class="info-text">{{ commonData.phone }}</p>
                        </div>

                        <a
                            :href="commonData.telegramHref"
                            target="_blank"
                            class="btn"
                            :aria-label="commonData.aria.contactSupport"
                        >
                            {{ commonData.telegram }}
                            <Icon
                                name="icon-park-outline:telegram"
                                class="instagram-icon"
                            />
                        </a>
                    </div>
                </div>

                <div class="right">
                    <img src="/img/form.svg" alt="" class="form-img" />
                </div>
            </div>
            <img src="/img/snake.svg" alt="" class="snake" />
        </div>
    </section>
</template>

<script setup>
import { gsap } from "gsap";
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();

const normalizeForm = (localeData) => {
    const source = localeData?.form;

    if (!source || typeof source !== "object") {
        return null;
    }

    return {
        title: source.title ?? "",
        description: source.description ?? "",
        fields: {
            name: source.fields?.name ?? "",
            email: source.fields?.email ?? "",
        },
        warn: source.warn ?? "",
        submit: source.submit ?? "",
        support: source.support ?? "",
    };
};

const formData = computed(() => {
    const fallback = normalizeForm(en) ?? en.form;

    const localized = normalizeForm(currentLocaleData.value);

    if (!localized) {
        return fallback;
    }

    return {
        title: localized.title || fallback.title,
        description: localized.description || fallback.description,
        fields: {
            name: localized.fields.name || fallback.fields.name,
            email: localized.fields.email || fallback.fields.email,
        },
        warn: localized.warn || fallback.warn,
        submit: localized.submit || fallback.submit,
        support: localized.support || fallback.support,
    };
});

const commonData = computed(() => {
    const fallback = en.common;
    const localized = currentLocaleData.value.common ?? {};

    return {
        phone: localized.phone || fallback.phone,
        phonePlaceholder:
            localized.phonePlaceholder || fallback.phonePlaceholder,
        telegram: localized.telegram || fallback.telegram,
        telegramHref: localized.telegramHref || fallback.telegramHref,
        alts: {
            logo: localized.alts?.logo || fallback.alts.logo,
        },
        aria: {
            contactSupport:
                localized.aria?.contactSupport || fallback.aria.contactSupport,
        },
    };
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

                tl.from(".left .brand, .left .title, .left .subtitle", {
                    y: 18,
                    opacity: 0,
                    duration: 0.45,
                    stagger: 0.08,
                })
                    .from(
                        ".left .top-form .input, .left .bottom-form, .left .info",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.38,
                            stagger: 0.06,
                        },
                        "-=0.18",
                    )
                    .from(
                        ".right .form-img",
                        {
                            x: 20,
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
.home-form {
    overflow: hidden;
    background: var(--light-bg);
}
.container {
    border-inline: 1px solid var(--border-color);
    padding: 64px 48px 64px 48px;
    position: relative;
}
.grid {
    display: grid;
    grid-template-columns: 5fr 5fr;
    align-items: center;
    gap: 104px;
    position: relative;
    z-index: 3;
}
.brand {
    width: 100%;
    max-width: 120px;
    margin-bottom: 32px;
}
.title {
    font-weight: 500;
    font-style: Medium;
    font-size: 40px;
    line-height: 140%;
    letter-spacing: -4%;
    margin-bottom: 16px;
    color: var(--dark-blue);
}
.subtitle {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0%;
    margin-bottom: 32px;
    max-width: 502px;
}
.input {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    padding: 12px 0;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
    color: var(--dark-blue);
    background: transparent;
}
.input::placeholder {
    color: var(--text-grey);
}
.top-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 24px;
}
.form-txt {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0%;
    color: var(--text-grey);
}
.bottom-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.submit-button {
    padding: 16px 24px;
    background: var(--blue);
    color: white;
    border-radius: 12px;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        background-color 0.25s ease;
}
.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(41, 85, 186, 0.28);
}
.submit-button:active {
    transform: translateY(0);
}
.submit-button span {
    font-size: 20px;
}
.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    background: white;
    border-radius: 16px;
    padding: 28px 24px;
}
.info-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
    color: var(--text-grey);
    margin-bottom: 6px;
}
.info-text {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: 0%;
    color: var(--dark-blue);
}
.btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 18px 24px;
    background: var(--dark-blue);
    color: white;
    border-radius: 12px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-decoration: none;
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        background-color 0.25s ease;
}
.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(9, 16, 31, 0.22);
}
.btn:active {
    transform: translateY(0);
}
.btn span {
    font-size: 20px;
}
.right {
    display: flex;
    justify-content: center;
    position: relative;
}
.form-img {
    width: 100%;
    max-width: 590px;
    object-fit: contain;
    will-change: transform, opacity;
}
.snake {
    position: absolute;
    top: 0px;
    right: -16%;
    height: 100%;
    z-index: 1;
}

@media (max-width: 1200px) {
    .container {
        padding: 56px 32px;
    }

    .grid {
        gap: 64px;
    }

    .title {
        font-size: 36px;
    }

    .form-img {
        max-width: 520px;
    }
}

@media (max-width: 992px) {
    .container {
        padding: 56px 24px;
    }

    .grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .right {
        order: -1;
    }

    .form-img {
        max-width: 480px;
    }

    .bottom-form {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .info {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 576px) {
    .container {
        padding: 48px 16px;
    }

    .brand {
        max-width: 96px;
        margin-bottom: 24px;
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

    .top-form {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .input {
        font-size: 15px;
    }

    .form-txt {
        font-size: 14px;
        line-height: 1.5;
    }

    .submit-button {
        width: 100%;
        justify-content: center;
        padding: 14px 18px;
        border-radius: 10px;
    }

    .info {
        padding: 20px;
        border-radius: 14px;
    }

    .info-text {
        font-size: 20px;
        line-height: 1.3;
    }

    .btn {
        padding: 14px 18px;
        border-radius: 10px;
        font-size: 14px;
    }

    .form-img {
        max-width: 360px;
    }

    .snake {
        right: -28%;
    }
}
</style>
