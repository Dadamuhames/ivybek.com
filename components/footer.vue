<template>
    <footer class="footer">
        <div class="container">
            <div class="ribbon">
                <img src="/img/ribbon-white.svg" alt="" aria-hidden="true" />
            </div>
            <div class="top">
                <div class="item">
                    <h3 class="title">{{ footerData.number }}</h3>
                    <a :href="commonData.phoneHref" class="value">
                        {{ commonData.phone }}
                    </a>
                </div>
                <div class="item">
                    <h3 class="title">{{ footerData.email }}</h3>
                    <a :href="commonData.emailHref" class="value">
                        {{ commonData.email }}</a
                    >
                </div>
                <div class="item">
                    <h3 class="title">{{ footerData.social }}</h3>
                    <div class="socials">
                        <a
                            :href="commonData.socialLinks.youtube"
                            target="_blank"
                            class="value"
                            :aria-label="commonData.socialLabels.youtube"
                        >
                            <Icon name="mingcute:youtube-fill" />
                        </a>
                        <a
                            :href="commonData.socialLinks.facebook"
                            target="_blank"
                            :aria-label="commonData.socialLabels.facebook"
                        >
                            <Icon name="mingcute:facebook-fill" />
                        </a>
                        <a
                            :href="commonData.socialLinks.instagram"
                            target="_blank"
                            :aria-label="commonData.socialLabels.instagram"
                        >
                            <Icon name="mingcute:instagram-fill" />
                        </a>
                        <a
                            :href="commonData.socialLinks.linkedin"
                            target="_blank"
                            :aria-label="commonData.socialLabels.linkedin"
                        >
                            <Icon name="mingcute:linkedin-fill" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="mid">
                <div class="item">
                    <h3 class="title">{{ footerData.address }}</h3>
                    <p class="value">
                        {{ footerData.addressValue }}
                    </p>
                </div>
            </div>
            <div class="bottom">
                <div class="links">
                    <a
                        href="#partners"
                        class="link"
                        @click.prevent="scrollToSection('partners')"
                        >{{ currentLocaleData.partners }}</a
                    >
                    <a
                        href="#services"
                        class="link"
                        @click.prevent="scrollToSection('services')"
                        >{{ currentLocaleData.modules }}</a
                    >
                    <a
                        href="#about"
                        class="link"
                        @click.prevent="scrollToSection('about')"
                        >{{ currentLocaleData.about }}</a
                    >
                    <a
                        href="#resources"
                        class="link"
                        @click.prevent="scrollToSection('resources')"
                        >{{ currentLocaleData.resources }}</a
                    >
                    <a
                        href="#contact"
                        class="link"
                        @click.prevent="scrollToSection('contact')"
                        >{{ currentLocaleData.contact }}</a
                    >
                </div>
                <p class="copyright">© 2026 {{ footerData.rights }}</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import en from "@/locales/en.json";

const { currentLocaleData } = useLocaleData();
const route = useRoute();
const localePath = useLocalePath();

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

const scrollToSection = async (sectionId) => {
    const homePath = localePath("/");

    if (route.path !== homePath) {
        await navigateTo({ path: homePath, hash: `#${sectionId}` });

        requestAnimationFrame(() => {
            smoothScrollToId(sectionId);
        });

        return;
    }

    smoothScrollToId(sectionId);
};

const normalizeFooter = (localeData) => {
    const source = localeData?.footer;

    if (!source || typeof source !== "object") {
        return null;
    }

    return {
        number: source.number ?? "",
        email: source.email ?? "",
        address: source.address ?? "",
        addressValue: source.addressValue ?? "",
        social: source.social ?? "",
        rights: source.rights ?? "",
    };
};

const footerData = computed(() => {
    const fallback = normalizeFooter(en) ?? en.footer;

    const localized = normalizeFooter(currentLocaleData.value);

    if (!localized) {
        return fallback;
    }

    return {
        number: localized.number || fallback.number,
        email: localized.email || fallback.email,
        address: localized.address || fallback.address,
        addressValue: localized.addressValue || fallback.addressValue,
        social: localized.social || fallback.social,
        rights: localized.rights || fallback.rights,
    };
});

const commonData = computed(() => {
    const fallback = en.common;
    const localized = currentLocaleData.value.common ?? {};

    return {
        phone: localized.phone || fallback.phone,
        phoneHref: localized.phoneHref || fallback.phoneHref,
        email: localized.email || fallback.email,
        emailHref: localized.emailHref || fallback.emailHref,
        socialLinks: {
            youtube:
                localized.socialLinks?.youtube || fallback.socialLinks.youtube,
            facebook:
                localized.socialLinks?.facebook ||
                fallback.socialLinks.facebook,
            instagram:
                localized.socialLinks?.instagram ||
                fallback.socialLinks.instagram,
            linkedin:
                localized.socialLinks?.linkedin ||
                fallback.socialLinks.linkedin,
        },
        socialLabels: {
            youtube:
                localized.socialLabels?.youtube ||
                fallback.socialLabels.youtube,
            facebook:
                localized.socialLabels?.facebook ||
                fallback.socialLabels.facebook,
            instagram:
                localized.socialLabels?.instagram ||
                fallback.socialLabels.instagram,
            linkedin:
                localized.socialLabels?.linkedin ||
                fallback.socialLabels.linkedin,
        },
    };
});
</script>

<style scoped>
footer {
    background: var(--light-bg);
    position: relative;
    overflow: hidden;
    padding: 72px 0;
}
.ribbon {
    position: absolute;
    top: 0;
    right: 0%;
    width: 40%;
    z-index: 1;
}
.ribbon img {
    width: 100%;
    height: auto;
}
.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 44px;
    position: relative;
    z-index: 2;
}
.item {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.title {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0%;
    color: var(--text-grey);
}
.value {
    font-weight: 500;
    font-style: Medium;
    font-size: 32px;
    line-height: 120%;
    letter-spacing: -4%;
}
.mid {
    position: relative;
    z-index: 2;
    margin-bottom: 64px;
}
.socials {
    display: flex;
    gap: 16px;
}
.socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s ease;
}
.socials a:hover {
    transform: translateY(-2px) scale(1.04);
}
.socials span {
    color: var(--blue);
    font-size: 32px;
    transition: color 0.25s ease;
}
.bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 2;
}
.links {
    display: flex;
    gap: 64px;
    flex-wrap: wrap;
}
.links a {
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0%;
    color: var(--blue);
    text-decoration: none;
    border-bottom: 1px solid currentColor;
    transition:
        color 0.25s ease,
        transform 0.25s ease,
        border-color 0.25s ease;
}
.links a:hover {
    color: #1c4ccf;
    border-color: #1c4ccf;
    transform: translateY(-1px);
}
.copyright {
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0%;
    color: var(--text-grey);
}

@media (max-width: 1200px) {
    footer {
        padding: 64px 0;
    }

    .ribbon {
        width: 48%;
    }

    .value {
        font-size: 28px;
    }

    .links {
        gap: 40px;
    }
}

@media (max-width: 992px) {
    footer {
        padding: 56px 0;
    }

    .top {
        flex-direction: column;
        align-items: flex-start;
        gap: 28px;
    }

    .value {
        font-size: 24px;
    }

    .mid {
        margin-bottom: 48px;
    }

    .bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }

    .links {
        gap: 28px;
    }
}

@media (max-width: 576px) {
    footer {
        padding: 48px 0;
    }

    .ribbon {
        width: 70%;
        right: -10%;
    }

    .title {
        font-size: 14px;
    }

    .value {
        font-size: 20px;
        line-height: 1.3;
    }

    .socials span {
        font-size: 26px;
    }

    .links {
        gap: 16px 24px;
    }

    .links a,
    .copyright {
        font-size: 14px;
    }
}
</style>
