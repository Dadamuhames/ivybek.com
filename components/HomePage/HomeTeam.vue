<template>
    <section class="home-team">
        <div class="container">
            <div class="top">
                <h4 class="title section-title">
                    {{ teamData.title }}
                </h4>
            </div>
            <div class="bottom">
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
                        <div class="image-content">
                            <div class="content-socials">
                                <a
                                    :href="activeMentor.socials.linkedin"
                                    class="social"
                                    target="_blank"
                                >
                                    <Icon name="mdi:linkedin" />
                                </a>
                                <a
                                    :href="activeMentor.socials.instagram"
                                    class="social"
                                    target="_blank"
                                >
                                    <Icon name="mdi:instagram" />
                                </a>
                            </div>
                            <div class="content-address">
                                <a :href="`mailto:${activeMentor.email}`">
                                    <Icon
                                        name="fluent:mail-unread-28-regular"
                                    />
                                    {{ activeMentor.email }}</a
                                >
                            </div>
                            <div class="content-tags">
                                <span class="tag">{{
                                    activeMentor.experience
                                }}</span>
                                <span class="tag">{{
                                    activeMentor.speciality
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="content-content">
                        <div>
                            <div class="content-info">
                                <h3 class="name">{{ activeMentor.name }}</h3>
                                <p class="position">
                                    {{ activeMentor.position }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div class="content-bottom">
                                <div class="content-companies">
                                    <div
                                        class="company"
                                        v-for="company in activeMentor.companies"
                                        :key="company.alt"
                                    >
                                        <img
                                            :src="
                                                company.src ||
                                                '/img/default.webp'
                                            "
                                            :alt="company.alt"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <p>
                                            {{ company.name }}
                                        </p>
                                    </div>
                                </div>
                                <div class="content-files">
                                    <a
                                        v-for="file in activeMentor.files"
                                        :key="file.src"
                                        :href="file.src"
                                        class="file"
                                        download
                                    >
                                        <div class="file-top">
                                            <Icon
                                                name="streamline-plump-color:file-check-alternate-flat"
                                            />
                                            <div class="download-icon">
                                                <Icon name="lucide:download" />
                                            </div>
                                        </div>
                                        {{ commonData.actions.downloadCv }}
                                    </a>
                                </div>
                            </div>
                            <button class="consultation">
                                {{ commonData.actions.consultation }}
                                <Icon name="lucide:arrow-right" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import en from "@/locales/en.json";
import teamTabsData from "@/data/home-team-tabs.json";

const { currentLocaleData, selectedLanguage } = useLocaleData();

const teamData = computed(() => {
    return currentLocaleData.value.team ?? en.team;
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
    const teamTabs = teamTabsData ?? {};
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
            companies: mentor.companies ?? [],
            files: mentor.files ?? [],
        };
    });
});

const activeTab = ref(0);

const activeMentor = computed(
    () => mentors.value[activeTab.value] ?? mentors.value[0],
);

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
    max-width: 1104px;
    margin: 44px auto 0 auto;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
}
.tabs {
    display: flex;
    flex-direction: column;
    gap: 24px;
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
    grid-template-columns: 340px 1fr;
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
.content-tags {
    display: flex;
    align-items: center;
    gap: 8px;
}
.tag {
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 14px;
    background: #ffffff29;
    border: 1px solid #f1f5f929;
    backdrop-filter: blur(8px);
    color: white;
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
    margin-bottom: 8px;
}
.social {
    background: #ffffff29;
    border: 1px solid #f1f5f929;
    backdrop-filter: blur(8px);
    color: white;
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
    margin-bottom: 8px;
    background: #ffffff29;
    border: 1px solid #f1f5f929;
    backdrop-filter: blur(8px);
    color: white;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
}
.company,
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
.file-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}
.file-top span {
    font-size: 24px;
}
.company img {
    max-width: 100px;
    height: 24px;
    object-fit: contain;
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

    .content {
        grid-template-columns: 300px 1fr;
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
