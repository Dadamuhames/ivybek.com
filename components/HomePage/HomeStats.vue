<template>
    <section class="home-stats">
        <div class="container">
            <div class="top">
                <h4 class="title section-title">{{ stats.title }}</h4>
                <p class="subtitle">{{ stats.subtitle }}</p>
            </div>
            <div class="items">
                <div
                    class="item"
                    v-for="(item, index) in statsItems"
                    :key="index"
                >
                    <h4 class="number">
                        <span class="blue">{{ item.metric }}</span>
                        {{ item.name }}
                    </h4>
                    <p class="sub">{{ item.desc }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const { currentLocaleData } = useLocaleData();

const metricValues = ["15,000,000$", "150+", "19.8X", "60+"];

const stats = computed(() => {
    return (
        currentLocaleData.value.stats ?? {
            title: "",
            subtitle: "",
            items: Array.from({ length: metricValues.length }, () => ({
                name: "",
                desc: "",
            })),
        }
    );
});

const statsItems = computed(() => {
    return (stats.value.items ?? []).map((item, index) => ({
        name: item?.name ?? "",
        desc: item?.desc ?? "",
        metric: item?.metric ?? metricValues[index] ?? "",
    }));
});
</script>

<style scoped>
.container {
    border-inline: 1px solid var(--border-color);
    padding: 40px 48px 104px 48px !important;
}
.subtitle {
    font-size: 16px;
    line-height: 24px;
    color: #45556c;
    text-align: center;
    max-width: 640px;
    margin: 0 auto 48px auto;
}
.items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr));
    gap: 16px;
}
.item {
    background: var(--light-bg);
    padding: 36px 24px;
    border-radius: 16px;
    min-height: 212px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.number {
    font-weight: 500;
    font-style: Medium;
    font-size: 40px;
    line-height: 150%;
    letter-spacing: 0%;
    text-align: center;
    margin-bottom: 8px;
}
.blue {
    color: var(--blue);
}
.sub {
    font-size: 14px;
    line-height: 24px;
    color: var(--text-grey);
    text-align: center;
}
@media (max-width: 1024px) {
    .container {
        padding: 0 20px !important;
    }
    .items {
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        gap: 12px;
    }
    .item {
        min-height: 180px;
        padding: 28px 18px;
    }
    .number {
        font-size: 20px;
    }
    .sub {
        font-size: 14px;
        line-height: 20px;
    }
}
</style>
