const progressBar = document.querySelector("#scroll-progress-bar");
const revealTargets = document.querySelectorAll(
  ".story, .principles, .experience-card, .skill-grid article, .portfolio-card, .education-list article, .credentials-grid article, .contact"
);

const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
  progressBar?.style.setProperty("transform", `scaleX(${progress})`);
};

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reveal-ready");
  revealTargets.forEach((target) => target.setAttribute("data-reveal", ""));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
