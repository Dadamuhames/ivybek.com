<template>
    <Transition name="page-loader-fade">
        <div
            v-if="isPageReloading"
            class="page-loader"
            aria-live="polite"
            aria-busy="true"
        >
            <img
                src="/img/brand.svg"
                :alt="commonData.alts.logo"
                class="loader-logo"
            />
        </div>
    </Transition>
    <header class="header">
        <div class="container">
            <div class="grid">
                <div class="left">
                    <NuxtLink :to="localePath('/')" class="title">
                        <img
                            src="/img/brand.svg"
                            :alt="commonData.alts.logo"
                            class="brand"
                        />
                        <img
                            src="/img/blue-brand.svg"
                            alt=""
                            class="blue"
                            aria-hidden="true"
                        />
                    </NuxtLink>
                </div>
                <div class="burger">
                    <a
                        :href="commonData.phoneHref"
                        class="tel"
                        :aria-label="commonData.aria.call"
                    >
                        <Icon name="mdi:phone" />
                    </a>
                    <button
                        class="burger-btn"
                        type="button"
                        :aria-expanded="isMobileMenuOpen"
                        aria-controls="mobile-menu"
                        @click="toggleMobileMenu"
                    >
                        <Icon v-if="isMobileMenuOpen" name="mdi:close" />
                        <Icon v-else name="mdi:menu" />
                    </button>
                </div>
                <div class="right">
                    <!-- <div class="lang">
            <button @click="handleDropdown()">
              {{ currentLanguage.name }}
              <Icon
                v-if="currentLanguageCode === 'ru'"
                name="circle-flags:ru"
              />
              <Icon
                v-else-if="currentLanguageCode === 'uz'"
                name="circle-flags:uz"
              />
              <Icon v-else name="circle-flags:gb" />
            </button>
            <div class="dropdown">
              <button @click="changeLanguage('en')">
                {{ commonData.languages.en }}
                <Icon name="circle-flags:gb" />
              </button>
              <button @click="changeLanguage('ru')">
                {{ commonData.languages.ru }}
                <Icon name="circle-flags:ru" />
              </button>
              <button @click="changeLanguage('uz')">
                {{ commonData.languages.uz }}
                <Icon name="circle-flags:uz" />
              </button>
            </div>
          </div> -->
                    <nav class="nav">
                        <ul>
                            <li>
                                <a
                                    href="#about"
                                    @click.prevent="scrollToSection('about')"
                                    >{{ currentLocaleData.about }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#partners"
                                    @click.prevent="scrollToSection('partners')"
                                    >{{ currentLocaleData.partners }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    @click.prevent="scrollToSection('services')"
                                    >{{ currentLocaleData.modules }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#resources"
                                    @click.prevent="
                                        scrollToSection('resources')
                                    "
                                    >{{ currentLocaleData.resources }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    @click.prevent="scrollToSection('contact')"
                                    >{{ currentLocaleData.contact }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://ivybek.com"
                                    target="_blank"
                                    class="button"
                                    >{{ currentLocaleData.login }}</a
                                >
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <Transition name="mobile-menu-fade">
            <div
                v-if="isMobileMenuOpen"
                id="mobile-menu"
                class="mobile-menu"
                role="dialog"
                aria-modal="true"
            >
                <div class="mobile-menu-inner">
                    <nav class="mobile-nav">
                        <ul>
                            <li>
                                <a
                                    href="#about"
                                    @click.prevent="scrollToSection('about')"
                                    >{{ currentLocaleData.about }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#partners"
                                    @click.prevent="scrollToSection('partners')"
                                    >{{ currentLocaleData.partners }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    @click.prevent="scrollToSection('services')"
                                    >{{ currentLocaleData.modules }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#resources"
                                    @click.prevent="
                                        scrollToSection('resources')
                                    "
                                    >{{ currentLocaleData.resources }}</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    @click.prevent="scrollToSection('contact')"
                                    >{{ currentLocaleData.contact }}</a
                                >
                            </li>
                        </ul>
                    </nav>

                    <!-- <div class="mobile-lang">
                        <button type="button" @click="changeLanguage('en')">
                            {{ commonData.languages.en }}
                            <Icon name="circle-flags:gb" />
                        </button>
                        <button type="button" @click="changeLanguage('ru')">
                            {{ commonData.languages.ru }}
                            <Icon name="circle-flags:ru" />
                        </button>
                        <button type="button" @click="changeLanguage('uz')">
                            {{ commonData.languages.uz }}
                            <Icon name="circle-flags:uz" />
                        </button>
                    </div> -->

                    <a
                        href="https://student.ivybek.com"
                        target="_blank"
                        class="mobile-login"
                        @click="closeMobileMenu"
                        >{{ currentLocaleData.login }}</a
                    >
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup>
import en from "@/locales/en.json";

const { selectedLanguage, currentLocaleData } = useLocaleData();
const route = useRoute();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const languages = {
    en: { icon: "circle-flags:gb" },
    ru: { icon: "circle-flags:ru" },
    uz: { icon: "circle-flags:uz" },
};

const isPageReloading = ref(false);
const isMobileMenuOpen = ref(false);

const currentLanguageCode = computed(() => {
    return selectedLanguage.value;
});

const currentLanguage = computed(() => {
    return {
        ...(languages[currentLanguageCode.value] || languages.en),
        name:
            commonData.value.languages[currentLanguageCode.value] ||
            commonData.value.languages.en,
    };
});

const commonData = computed(() => {
    const fallback = en.common;
    const localized = currentLocaleData.value.common ?? {};

    return {
        phoneHref: localized.phoneHref || fallback.phoneHref,
        alts: {
            logo: localized.alts?.logo || fallback.alts.logo,
        },
        aria: {
            call: localized.aria?.call || fallback.aria.call,
        },
        languages: {
            en: localized.languages?.en || fallback.languages.en,
            ru: localized.languages?.ru || fallback.languages.ru,
            uz: localized.languages?.uz || fallback.languages.uz,
        },
    };
});

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};

const handleDropdown = () => {
    const dropdown = document.querySelector(".dropdown");
    dropdown?.classList.toggle("active");
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

const scrollToSection = async (sectionId) => {
    closeMobileMenu();

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

const changeLanguage = async (language) => {
    closeMobileMenu();

    const targetPath = switchLocalePath(language);

    if (!targetPath) {
        return;
    }

    isPageReloading.value = true;

    const dropdown = document.querySelector(".dropdown");
    dropdown?.classList.remove("active");

    try {
        await navigateTo(targetPath);
    } finally {
        isPageReloading.value = false;
    }
};

watch(isMobileMenuOpen, (isOpen) => {
    if (!process.client) {
        return;
    }

    document.body.style.overflow = isOpen ? "hidden" : "";
});

watch(
    () => route.fullPath,
    () => {
        closeMobileMenu();
    },
);

onBeforeUnmount(() => {
    if (!process.client) {
        return;
    }

    document.body.style.overflow = "";
});
</script>

<style scoped>
.header {
    background: var(--dark-blue);
    padding: 20px 0;
    border-bottom: 1px solid var(--border-light);
    position: sticky;
    top: 0;
    z-index: 100;
}

.page-loader {
    position: fixed;
    inset: 0;
    background: var(--dark-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.page-loader-fade-enter-active,
.page-loader-fade-leave-active {
    transition: opacity 0.35s ease;
}

.page-loader-fade-enter-from,
.page-loader-fade-leave-to {
    opacity: 0;
}

.page-loader-fade-enter-to,
.page-loader-fade-leave-from {
    opacity: 1;
}

.loader-logo {
    width: 140px;
    animation: pulse 1.1s ease-in-out infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 0.6;
        transform: scale(0.95);
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
}
.title {
    width: 120px;
    display: flex;
}
.brand {
    display: block;
    width: 100%;
}
.blue {
    display: none;
    width: 100%;
}
.white {
    background: #f8fafc;
    border-bottom: 1px solid var(--border-color);
}
.grid {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.nav ul {
    display: flex;
    align-items: center;
    gap: 32px;
}
.nav a {
    font-weight: 500;
    font-style: Medium;
    font-size: 14px;
    line-height: 20%;
    letter-spacing: 0%;
    color: white;
    position: relative;
    transition:
        color 0.25s ease,
        transform 0.25s ease,
        opacity 0.25s ease;
}
.nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
}
.nav a:hover {
    transform: translateY(-1px);
}
.nav a:hover::after {
    transform: scaleX(1);
}
.button {
    border-radius: 12px;
    background: var(--surface-default, #f1f5f9);
    color: var(--text-black) !important;
    padding: 12px 24px;
    transition: 0.4s !important;
}
.button::after {
    display: none;
}
.button:hover {
    background: var(--blue);
    color: white !important;
}
.white .nav a {
    color: var(--dark-blue);
}
.white .brand {
    display: none;
}
.white .blue {
    display: block;
}
.burger {
    display: none;
}
.burger-btn {
    color: white;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.24);
    font-size: 28px;
}
.tel {
    color: var(--blue);
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    font-size: 24px;
}
.white .tel {
    color: var(--dark-blue);
    background: var(--light-bg);
}
.right {
    display: flex;
    align-items: center;
    gap: 32px;
}
.lang {
    display: flex;
    gap: 16px;
    position: relative;
}
.lang button {
    color: white;
    font-weight: 500;
    font-style: Medium;
    font-size: 14px;
    line-height: 20%;
    letter-spacing: 0%;
    display: flex;
    align-items: center;
    gap: 8px;
}
.white .lang button {
    color: var(--dark-blue);
}
.lang span {
    font-size: 20px;
}
.lang .dropdown {
    position: absolute;
    background: var(--blue);
    padding: 8px;
    border-radius: 8px;
    display: none;
    top: 150%;
    left: 0;
    gap: 8px;
    flex-direction: column;
}
.lang .dropdown.active {
    display: flex;
}
.lang .dropdown button {
    color: white;
    font-weight: 500;
    font-style: Medium;
    font-size: 14px;
    line-height: 20%;
    letter-spacing: 0%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.mobile-menu {
    position: fixed;
    top: 89px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(9, 22, 46, 0.92);
    backdrop-filter: blur(8px);
    z-index: 99;
    overflow-y: auto;
}

.mobile-menu-inner {
    padding: 24px 20px 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.mobile-nav ul {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.mobile-nav a {
    color: white;
    font-size: 18px;
    line-height: 1.3;
    font-weight: 600;
}

.mobile-lang {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.mobile-lang button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 15px;
}

.mobile-login {
    border-radius: 12px;
    background: var(--surface-default, #f1f5f9);
    color: var(--text-black);
    padding: 12px 16px;
    text-align: center;
    font-weight: 600;
}

.mobile-menu-fade-enter-active,
.mobile-menu-fade-leave-active {
    transition: opacity 0.25s ease;
}

.mobile-menu-fade-enter-from,
.mobile-menu-fade-leave-to {
    opacity: 0;
}

.mobile-menu-fade-enter-to,
.mobile-menu-fade-leave-from {
    opacity: 1;
}

@media screen and (max-width: 768px) {
    .right {
        display: none;
    }
    .burger {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}

@media screen and (min-width: 769px) {
    .mobile-menu {
        display: none !important;
    }
}
</style>
