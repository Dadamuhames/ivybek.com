<template>
    <section ref="rootEl" class="home-testimonials">
        <div class="container">
            <div class="top">
                <h2 class="title section-title">
                    {{ testimonialsData.title }}
                </h2>
                <p class="description section-subtitle">
                    {{ testimonialsData.description }}
                </p>
            </div>
            <Swiper
                :modules="[Autoplay]"
                :slides-per-view="1"
                :space-between="16"
                :speed="1000"
                :loop="true"
                :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false,
                }"
                :breakpoints="{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 16,
                    },
                }"
                class="mySwiper"
            >
                <SwiperSlide
                    v-for="(testimonial, index) in testimonials"
                    :key="index"
                >
                    <div class="testimonial-card">
                        <div class="testimonial-author">
                            <NuxtImg
                                :src="testimonial.image || '/img/default.webp'"
                                :alt="testimonial.name"
                                class="author-image"
                                width="80"
                                height="80"
                                sizes="80px"
                                loading="lazy"
                                decoding="async"
                            />
                            <img src="/img/ribbon.svg" alt="" class="ribbon" />
                            <div class="author-info">
                                <p class="author-name">
                                    {{ testimonial.name }}
                                </p>
                                <p
                                    v-if="testimonial.university"
                                    class="author-title"
                                >
                                    {{ testimonial.university }}
                                </p>
                            </div>
                        </div>
                        <div class="testimonial-text">
                            <p
                                :ref="(el) => setTextRef(el, index)"
                                class="testimonial-text-p"
                                :class="{ expanded: expandedItems[index] }"
                            >
                                {{ testimonial.text }}
                            </p>

                            <button
                                v-if="showExpandButton[index]"
                                type="button"
                                class="read-more-btn"
                                @click="toggleExpanded(index)"
                            >
                                {{
                                    expandedItems[index]
                                        ? testimonialsData.hide
                                        : testimonialsData.seeAll
                                }}
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>

<script setup>
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import en from "@/locales/en.json";
const { currentLocaleData } = useLocaleData();

const rootEl = ref(null);
let observer;
let ctx;

const testimonialAssets = [
    {
        rating: 5,
        image: "/img/woman-2.avif",
        link: "https://www.linkedin.com/in/johndoe",
    },
    {
        rating: 4,
        image: "/img/man-1.avif",
        link: "https://www.linkedin.com/in/janesmith",
    },
    {
        rating: 5,
        image: "/img/man-2.avif",
        link: "https://www.linkedin.com/in/emilyjohnson",
    },
    {
        rating: 4,
        image: "/img/man-3.avif",
        link: "https://www.linkedin.com/in/michaelbrown",
    },
    {
        rating: 5,
        image: "/img/man-4.avif",
        link: "https://www.linkedin.com/",
    },
    {
        rating: 5,
        image: "/img/woman-1.avif",
        link: "https://www.linkedin.com/",
    },
];

const testimonialsData = computed(() => {
    const fallback = en.testimonials ?? {
        title: "Testimonials from our graduates",
        description: "",
        seeAll: "See all",
        hide: "Hide",
        reviews: [],
    };

    const localized = currentLocaleData.value.testimonials ?? {};

    const localizedReviews = Array.isArray(localized.reviews)
        ? localized.reviews
        : [];

    const fallbackReviews = Array.isArray(fallback.reviews)
        ? fallback.reviews
        : [];

    return {
        title: localized.title || fallback.title,
        description: localized.description || fallback.description,
        seeAll: localized.seeAll || fallback.seeAll || "See all",
        hide: localized.hide || fallback.hide || "Hide",
        reviews: localizedReviews.length ? localizedReviews : fallbackReviews,
    };
});

const testimonials = computed(() => {
    const reviews = testimonialsData.value.reviews.slice(
        0,
        testimonialAssets.length,
    );

    return reviews.map((review, index) => {
        const assets = testimonialAssets[index] ?? testimonialAssets[0];

        return {
            name: review?.name ?? "",
            university: review?.university ?? "",
            text: review?.feedback ?? "",
            image: assets.image,
        };
    });
});

const expandedItems = ref({});
const showExpandButton = ref({});
const textRefs = ref({});

const setTextRef = (el, index) => {
    if (el) {
        textRefs.value[index] = el;
    } else {
        delete textRefs.value[index];
    }
};

const exceedsEightLines = (el) => {
    if (!el || typeof window === "undefined") {
        return false;
    }

    const computedStyle = window.getComputedStyle(el);
    const lineHeight = Number.parseFloat(computedStyle.lineHeight);

    if (!lineHeight || Number.isNaN(lineHeight)) {
        return false;
    }

    const clone = el.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.visibility = "hidden";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = "-1";
    clone.style.height = "auto";
    clone.style.maxHeight = "none";
    clone.style.overflow = "visible";
    clone.style.display = "block";
    clone.style.webkitLineClamp = "unset";
    clone.style.lineClamp = "unset";
    clone.style.width = `${el.clientWidth}px`;

    document.body.appendChild(clone);

    const fullHeight = clone.getBoundingClientRect().height;
    const lines = Math.round(fullHeight / lineHeight);

    document.body.removeChild(clone);

    return lines > 8;
};

const updateExpandButtons = async () => {
    await nextTick();

    const nextState = {};

    testimonials.value.forEach((_, index) => {
        const el = textRefs.value[index];
        nextState[index] = exceedsEightLines(el);

        if (!nextState[index] && expandedItems.value[index]) {
            expandedItems.value[index] = false;
        }
    });

    showExpandButton.value = nextState;
};

const toggleExpanded = (index) => {
    expandedItems.value[index] = !expandedItems.value[index];
};

watch(testimonials, () => {
    expandedItems.value = {};
    updateExpandButtons();
});

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

                tl.from(".top .title, .top .description", {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                }).from(
                    ".testimonial-card",
                    {
                        y: 24,
                        opacity: 0,
                        scale: 1,
                        duration: 0.45,
                        stagger: 0.08,
                    },
                    "-=0.2",
                );
            }, rootEl.value);

            observer?.disconnect();
        },
        { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(rootEl.value);

    updateExpandButtons();
    window.addEventListener("resize", updateExpandButtons);
});

onBeforeUnmount(() => {
    observer?.disconnect();
    ctx?.revert();
    window.removeEventListener("resize", updateExpandButtons);
});
</script>

<style scoped>
.home-testimonials {
    overflow: hidden;
}
.container {
    border-inline: 1px solid var(--border-color);
    padding: 120px 48px 60px 48px;
}
.top {
    margin-bottom: 40px;
}
.swiper {
    overflow: visible;
}
.testimonial-card {
    background: var(--light-bg);
    padding: 24px;
    border-radius: 16px;
    will-change: transform, opacity;
}
.testimonial-author {
    background: white;
    padding: 16px;
    border-radius: 12px;
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
}
.ribbon {
    position: absolute;
    top: -36px;
    right: -16px;
    transform: rotate(10deg);
    width: 400px;
    z-index: 1;
}
.author-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
    position: relative;
    z-index: 2;
}
.author-name {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -4%;
    color: var(--dark-blue);
    margin-bottom: 4px;
    position: relative;
    z-index: 2;
}
.author-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
    color: var(--text-grey);
    position: relative;
    z-index: 2;
}
.testimonial-text-p {
    font-weight: 400;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0%;
    color: var(--text-grey);
    margin-bottom: 12px;
    display: -webkit-box;
    line-clamp: 8;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.testimonial-text-p.expanded {
    display: block;
    line-clamp: unset;
    -webkit-line-clamp: unset;
    overflow: visible;
}
.read-more-btn {
    border: none;
    background: transparent;
    color: var(--blue);
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    padding: 0;
    margin-bottom: 16px;
    cursor: pointer;
}
.testimonial-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.testimonial-rating {
    display: flex;
    align-items: center;
    gap: 8px;
}
.rating-number {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0%;
    color: var(--text-grey);
}
.star {
    font-size: 20px;
    color: #f2994a;
}
.testimonial-link {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0%;
    color: var(--blue);
    text-decoration: none;
}
.linkedin-icon {
    font-size: 20px;
}

@media (max-width: 1200px) {
    .container {
        padding: 96px 32px 56px 32px;
    }

    .top {
        margin-bottom: 32px;
    }
}

@media (max-width: 992px) {
    .container {
        padding: 80px 24px 52px 24px;
    }

    .testimonial-card {
        padding: 20px;
    }

    .testimonial-author {
        grid-template-columns: 72px 1fr;
    }

    .author-image {
        width: 72px;
        height: 72px;
    }

    .testimonial-text-p {
        font-size: 17px;
    }
}

@media (max-width: 576px) {
    .container {
        padding: 64px 16px 48px 16px;
    }

    .top {
        margin-bottom: 24px;
    }

    .testimonial-card {
        padding: 18px;
    }

    .testimonial-author {
        grid-template-columns: 60px 1fr;
        padding: 12px;
        gap: 12px;
    }

    .author-image {
        width: 60px;
        height: 60px;
    }

    .author-name {
        font-size: 18px;
        line-height: 1.3;
    }

    .author-title {
        font-size: 14px;
        line-height: 1.4;
    }

    .testimonial-text-p {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 14px;
    }

    .read-more-btn {
        margin-bottom: 14px;
    }

    .testimonial-bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .rating-number {
        font-size: 14px;
    }

    .star {
        font-size: 18px;
    }

    .testimonial-link {
        font-size: 16px;
    }
}
</style>
