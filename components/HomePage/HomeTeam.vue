<template>
    <section
        class="home-team"
        :class="{ 'has-mentor-actions': showMentorActions }"
    >
        <div class="container">
            <div class="top">
                <h4 class="title section-title">
                    {{ teamData.title }}
                </h4>
            </div>
            <div
                class="bottom"
                :class="{ 'tabs-right': tabsPosition === 'right' }"
            >
                <div class="tabs">
                    <button
                        v-for="(mentor, index) in mentors"
                        :key="mentor.id"
                        class="tab"
                        :class="{ active: activeTab === index }"
                        type="button"
                        @click="activeTab = index"
                    >
                        <div class="tab-img">
                            <img
                                :src="mentor.image || '/img/default.webp'"
                                :alt="mentor.name"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div>
                            <p class="tab-name">{{ mentor.name }}</p>
                            <p class="tab-role">{{ mentor.role }}</p>
                        </div>
                    </button>
                </div>
                <div v-if="activeMentor" class="content">
                    <div class="image-wrap">
                        <div class="content-img">
                            <img
                                :src="activeMentor.image || '/img/default.webp'"
                                :alt="activeMentor.name"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div class="image-content"></div>
                    </div>

                    <div class="content-content">
                        <div>
                            <div class="content-info">
                                <h3 class="name">{{ activeMentor.name }}</h3>
                                <p
                                    class="position"
                                    v-if="activeMentor.position"
                                >
                                    {{ activeMentor.position }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div class="content-meta">
                                <div v-if="hasSocials" class="content-socials">
                                    <a
                                        v-if="activeMentor.socials.linkedin"
                                        :href="activeMentor.socials.linkedin"
                                        class="social"
                                        target="_blank"
                                    >
                                        <Icon name="mdi:linkedin" />
                                    </a>
                                    <a
                                        v-if="activeMentor.socials.instagram"
                                        :href="
                                            getSocialHref(
                                                'instagram',
                                                activeMentor.socials.instagram,
                                            )
                                        "
                                        class="social"
                                        target="_blank"
                                    >
                                        <Icon name="mdi:instagram" />
                                    </a>
                                    <a
                                        v-if="activeMentor.socials.telegram"
                                        :href="
                                            getSocialHref(
                                                'telegram',
                                                activeMentor.socials.telegram,
                                            )
                                        "
                                        class="social"
                                        target="_blank"
                                    >
                                        <Icon name="mdi:telegram" />
                                    </a>
                                </div>
                                <div
                                    v-if="showMentorActions"
                                    class="content-address"
                                >
                                    <a :href="`mailto:${activeMentor.email}`">
                                        <Icon
                                            name="fluent:mail-unread-28-regular"
                                        />
                                        {{ activeMentor.email }}</a
                                    >
                                </div>
                                <div class="content-tags">
                                    <span
                                        class="tag"
                                        v-if="activeMentor.experience"
                                        >{{ activeMentor.experience }}</span
                                    >
                                    <span
                                        class="tag"
                                        v-if="activeMentor.speciality"
                                        >{{ activeMentor.speciality }}</span
                                    >
                                </div>
                            </div>
                            <div v-if="hasActionBlocks" class="content-bottom">
                                <div
                                    v-if="activeMentor.university"
                                    class="content-companies"
                                >
                                    <div class="university-logo">
                                        <img
                                            :src="
                                                activeMentor.university.src ||
                                                '/img/default.webp'
                                            "
                                            :alt="activeMentor.university.alt"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                </div>
                            </div>
                            <a
                                v-if="showMentorActions"
                                href="https://student.ivybek.com"
                                class="consultation"
                                target="_blank"
                            >
                                {{ commonData.actions.consultation }}
                                <Icon name="lucide:arrow-right" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import en from "@/locales/en.json";
import defaultTeamTabsData from "@/data/home-team-tabs.json";

const props = defineProps({
    sectionKey: {
        type: String,
        default: "team",
    },
    tabsData: {
        type: Object,
        default: () => defaultTeamTabsData,
    },
    showMentorActions: {
        type: Boolean,
        default: false,
    },
    tabsPosition: {
        type: String,
        default: "left",
    },
});

const { currentLocaleData, selectedLanguage } = useLocaleData();

const teamData = computed(() => {
    return currentLocaleData.value[props.sectionKey] ?? en[props.sectionKey];
});

const commonData = computed(() => {
    const fallback = en.common;
    const localized = currentLocaleData.value.common ?? {};

    return {
        email: localized.email || fallback.email,
        actions: {
            downloadCv:
                localized.actions?.downloadCv || fallback.actions.downloadCv,
            consultation:
                localized.actions?.consultation ||
                fallback.actions.consultation,
        },
    };
});

const mentors = computed(() => {
    const teamTabs = props.tabsData ?? {};
    const defaultLocale = teamTabs.defaultLocale ?? "en";
    const teamMentors = Array.isArray(teamTabs.mentors) ? teamTabs.mentors : [];

    return teamMentors.map((mentor) => {
        const translations = mentor.translations ?? {};
        const localizedMentor =
            translations[selectedLanguage.value] ??
            translations[defaultLocale] ??
            {};

        return {
            id: mentor.id,
            name: localizedMentor.name ?? "",
            role: localizedMentor.role ?? "",
            experience: localizedMentor.experience ?? "",
            speciality: localizedMentor.speciality ?? "",
            position: localizedMentor.position ?? "",
            image: mentor.image ?? "/img/default.webp",
            email: mentor.email ?? commonData.value.email,
            socials: mentor.socials ?? {},
            university: mentor.university ?? mentor.companies?.[0] ?? null,
            files: mentor.files ?? [],
        };
    });
});

const activeTab = ref(0);

const activeMentor = computed(
    () => mentors.value[activeTab.value] ?? mentors.value[0],
);

const hasActionBlocks = computed(() => {
    const mentor = activeMentor.value;

    if (!mentor) {
        return false;
    }

    return Boolean(mentor.university);
});

const hasSocials = computed(() => {
    const socials = activeMentor.value?.socials ?? {};

    return Boolean(socials.linkedin || socials.instagram || socials.telegram);
});

const getSocialHref = (network, value) => {
    if (!value) {
        return "#";
    }

    if (value.startsWith("http") || value.startsWith("#")) {
        return value;
    }

    if (network === "telegram") {
        return `${value.replace("@", "")}`;
    }

    if (network === "instagram") {
        return `${value.replace("@", "")}`;
    }

    return value;
};

watch(
    mentors,
    (list) => {
        if (!list.length) {
            activeTab.value = 0;
            return;
        }

        if (activeTab.value > list.length - 1) {
            activeTab.value = 0;
        }
    },
    { immediate: true },
);
</script>

<style scoped>
.home-team {
    background: var(--light-bg);
}
.container {
    border-inline: 1px solid var(--border-color);
    padding: 80px 0px;
}
.bottom {
    max-width: 1280px;
    margin: 44px auto 0 auto;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
    height: 500px;
}
.bottom.tabs-right {
    grid-template-columns: 1fr 280px;
}
.bottom.tabs-right .tabs {
    order: 2;
}
.bottom.tabs-right .content {
    order: 1;
}
.tabs {
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow: auto;
}
.tab {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
    gap: 16px;
}
.tab.active .tab-name {
    color: var(--blue);
}
.tab-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
}
.tab-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.tab-name {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -4%;
    color: var(--dark-blue);
    margin-bottom: 8px;
}
.tab-role {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
    color: var(--text-grey);
}
.content {
    background: white;
    border-radius: 16px;
    padding: 24px;
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 24px;
    position: relative;
}
.ribbon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -16px;
    z-index: 1;
}
.image-wrap {
    position: relative;
}
.content-img {
    width: 100%;
    height: 480px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    z-index: 3;
}
.content-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.content-content {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.content-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
}
.content-tags {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}
.tag {
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 14px;
    background: #f6f9ff;
    border: 1px solid #e5efff;
    color: var(--dark-blue);
    max-width: 100%;
}
.content-info {
    margin-bottom: 24px;
}
.name {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -4%;
    margin-bottom: 16px;
}
.position {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
    color: var(--text-grey);
}
.image-content {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 0;
    z-index: 5;
    max-width: 340px;
}
.content-socials {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.social {
    background: #f6f9ff;
    border: 1px solid #e5efff;
    color: var(--dark-blue);
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: 0.3s;
    font-size: 22px;
}
.social:hover {
    background: var(--blue);
    color: white;
}
.content-address {
    background: #f6f9ff;
    border: 1px solid #e5efff;
    color: var(--dark-blue);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    transition: 0.3s;
    padding: 8px 12px;
}
.content-address a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
}
.content-address span {
    font-size: 20 px;
}
.content-address:hover {
    background: var(--blue);
    color: white;
}
.content-bottom {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
}
.content-companies {
    min-width: 0;
}
.file {
    border: 1px solid #e5efff;
    background: #fafcff;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 138px;
}
.university-logo {
    min-height: 138px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.file-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}
.file-top span {
    font-size: 24px;
}
.university-logo img {
    max-width: 360px;
    width: 100%;
    height: 104px;
    object-fit: contain;
    object-position: center;
}
.has-mentor-actions .university-logo img {
    max-width: 360px;
    height: 104px;
}
.consultation {
    width: 100%;
    margin-top: 16px;
    background: var(--blue);
    color: white;
    border: none;
    padding: 16px 16px;
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    border: 2px solid #cadfff;
}
@media (max-width: 1200px) {
    .container {
        padding: 72px 0;
    }

    .bottom {
        grid-template-columns: 240px 1fr;
        gap: 32px;
    }

    .bottom.tabs-right {
        grid-template-columns: 1fr 240px;
    }

    .content {
        grid-template-columns: 320px 1fr;
    }

    .content-img {
        height: 400px;
    }
}

@media (max-width: 992px) {
    .bottom {
        grid-template-columns: 1fr;
        gap: 28px;
    }

    .tabs {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
    }

    .tab {
        grid-template-columns: 64px 1fr;
        padding: 8px 0;
    }

    .tab-img {
        width: 64px;
        height: 64px;
    }

    .content {
        grid-template-columns: 1fr;
    }

    .content-img {
        height: 360px;
    }

    .content-socials {
        flex-wrap: wrap;
    }
}

@media (max-width: 576px) {
    .container {
        padding: 56px 0;
    }

    .bottom {
        margin-top: 32px;
        gap: 24px;
    }

    .tabs {
        grid-template-columns: 1fr;
    }

    .tab {
        grid-template-columns: 56px 1fr;
        gap: 12px;
    }

    .tab-img {
        width: 56px;
        height: 56px;
    }

    .tab-name {
        font-size: 18px;
        line-height: 1.3;
        margin-bottom: 4px;
    }

    .tab-role {
        font-size: 14px;
        line-height: 1.4;
    }

    .content {
        padding: 18px;
        gap: 18px;
    }

    .content-img {
        height: 360px;
    }

    .content-tags {
        gap: 10px;
        margin-bottom: 16px;
        flex-wrap: wrap;
    }

    .tag {
        font-size: 12px;
        padding: 6px 12px;
    }

    .name {
        font-size: 20px;
        line-height: 1.3;
        margin-bottom: 12px;
    }

    .position {
        font-size: 14px;
        line-height: 1.5;
    }

    .social {
        font-size: 15px;
    }

    .content-companies {
        gap: 18px;
        flex-wrap: wrap;
    }
}
</style>
