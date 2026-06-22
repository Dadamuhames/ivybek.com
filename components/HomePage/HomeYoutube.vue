<template>
    <section class="home-youtube">
        <div class="container">
            <div class="top">
                <h2 class="section-title">{{ restContent.youtube_title }}</h2>
                <p class="subtitle">{{ restContent.youtube_desc }}</p>
                <a href="#" class="subscribe">
                    {{ restContent.youtube_link }}
                    <Icon name="lucide:circle-arrow-right" />
                </a>
            </div>
            <div class="items">
                <div
                    v-for="video in youtubeVideos"
                    :key="video.src"
                    class="item"
                >
                    <iframe
                        class="video"
                        :src="video.src"
                        :title="video.title"
                        frameborder="0"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const { currentLocaleData } = useLocaleData();

const youtubeVideos = [
    {
        title: "Ivybek YouTube video 1",
        src: "https://www.youtube.com/embed/CiSNTaWtr90?controls=0&modestbranding=1&rel=0",
    },
    {
        title: "Ivybek YouTube video 2",
        src: "https://www.youtube.com/embed/RvusvPXb2c0?controls=0&modestbranding=1&rel=0",
    },
    {
        title: "Ivybek YouTube video 3",
        src: "https://www.youtube.com/embed/vVEj3cF-exg?controls=0&modestbranding=1&rel=0",
    },
    {
        title: "Ivybek YouTube video 4",
        src: "https://www.youtube.com/embed/dab_qbs7jKo?controls=0&modestbranding=1&rel=0",
    },
];

const restContent = computed(() => {
    return (
        currentLocaleData.value.rest ?? {
            youtubeTitle: "",
            youtubeDesc: "",
            youtubeLink: "",
        }
    );
});
</script>

<style scoped>
.container {
    border-inline: 1px solid var(--border-color);
    padding: 0px 48px 120px 48px !important;
}
.subtitle {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0%;
    margin-bottom: 16px;
    color: var(--text-grey);
    text-align: center;
    max-width: 832px;
    margin-inline: auto;
}
.subscribe {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0%;
    background: var(--blue);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
}
.subscribe span {
    font-size: 20px;
}
.top {
    text-align: center;
    margin-bottom: 32px;
}
.items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}
.video {
    display: block;
    width: 100%;
    aspect-ratio: 8 / 5;
    border: 0;
    border-radius: 12px;
}

@media (max-width: 1024px) {
    .items {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
    .container {
        padding: 0px 20px 80px 20px !important;
    }
}
</style>
