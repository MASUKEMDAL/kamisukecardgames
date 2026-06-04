/* ---- Hero Carousel ---- */
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDotsCont = document.getElementById('heroDots');
let heroIndex = 0;
let heroTimer;

function buildHeroDots() {
    heroSlides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'hero-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Slide ${i + 1}`);
        d.onclick = () => goHeroSlide(i);
        heroDotsCont.appendChild(d);
    });
}

function goHeroSlide(n) {
    heroSlides[heroIndex].classList.remove('active');
    heroDotsCont.querySelectorAll('.hero-dot')[heroIndex].classList.remove('active');
    heroIndex = (n + heroSlides.length) % heroSlides.length;
    heroSlides[heroIndex].classList.add('active');
    heroDotsCont.querySelectorAll('.hero-dot')[heroIndex].classList.add('active');
    resetHeroTimer();
}

function heroSlide(dir) {
    goHeroSlide(heroIndex + dir);
}

function resetHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => goHeroSlide(heroIndex + 1), 5000);
}

buildHeroDots();
resetHeroTimer();

/* ---- Category Filter ---- */
const catTabs = document.querySelectorAll('.cat-tab');
const cardItems = document.querySelectorAll('.card-item');

catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.category;
        cardItems.forEach(card => {
            if (cat === 'todos' || card.dataset.category === cat) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ---- Custom Showcase Carousel ---- */
const showcaseImgs = document.querySelectorAll('#showcaseTrack img');
let showcaseIndex = 0;
let showcaseTimer;

function goShowcase(n) {
    showcaseImgs[showcaseIndex].classList.remove('active');
    showcaseIndex = (n + showcaseImgs.length) % showcaseImgs.length;
    showcaseImgs[showcaseIndex].classList.add('active');
}

function showcaseSlide(dir) {
    goShowcase(showcaseIndex + dir);
    clearInterval(showcaseTimer);
    showcaseTimer = setInterval(() => goShowcase(showcaseIndex + 1), 3500);
}

if (showcaseImgs.length > 0) {
    showcaseImgs[0].classList.add('active');
    showcaseTimer = setInterval(() => goShowcase(showcaseIndex + 1), 3500);
}

/* ---- Feedbacks Carousel ---- */
const feedbacksTrack = document.getElementById('feedbacksTrack');
const feedbackCards = feedbacksTrack ? feedbacksTrack.querySelectorAll('.feedback-card') : [];
const feedbackDotsCont = document.getElementById('feedbackDots');
let feedbackIndex = 0;
let feedbackPerView = 3;
let feedbackTimer;

function calcFeedbackPerView() {
    const w = window.innerWidth;
    if (w < 600) return 1;
    if (w < 900) return 2;
    return 3;
}

function buildFeedbackDots() {
    if (!feedbackDotsCont) return;
    feedbackDotsCont.innerHTML = '';
    const total = Math.ceil(feedbackCards.length / feedbackPerView);
    for (let i = 0; i < total; i++) {
        const d = document.createElement('button');
        d.className = 'feedback-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Grupo ${i + 1}`);
        d.onclick = () => goFeedback(i);
        feedbackDotsCont.appendChild(d);
    }
}

function goFeedback(n) {
    const total = Math.ceil(feedbackCards.length / feedbackPerView);
    feedbackIndex = (n + total) % total;
    const cardWidth = feedbackCards[0] ? feedbackCards[0].offsetWidth + 24 : 364;
    feedbacksTrack.style.transform = `translateX(-${feedbackIndex * feedbackPerView * cardWidth}px)`;
    feedbackDotsCont.querySelectorAll('.feedback-dot').forEach((d, i) => {
        d.classList.toggle('active', i === feedbackIndex);
    });
}

function feedbackSlide(dir) {
    const total = Math.ceil(feedbackCards.length / feedbackPerView);
    goFeedback((feedbackIndex + dir + total) % total);
    clearInterval(feedbackTimer);
    feedbackTimer = setInterval(() => {
        const t = Math.ceil(feedbackCards.length / feedbackPerView);
        goFeedback((feedbackIndex + 1) % t);
    }, 4500);
}

function initFeedbacks() {
    feedbackPerView = calcFeedbackPerView();
    feedbackIndex = 0;
    if (feedbacksTrack) feedbacksTrack.style.transform = 'translateX(0)';
    buildFeedbackDots();
}

initFeedbacks();
feedbackTimer = setInterval(() => {
    const t = Math.ceil(feedbackCards.length / feedbackPerView);
    goFeedback((feedbackIndex + 1) % t);
}, 4500);

window.addEventListener('resize', () => {
    feedbackPerView = calcFeedbackPerView();
    feedbackIndex = 0;
    if (feedbacksTrack) feedbacksTrack.style.transform = 'translateX(0)';
    buildFeedbackDots();
});

/* ---- Mobile Nav ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

function closeMobileNav() {
    mobileNav.classList.remove('open');
}

/* ---- Header scroll effect ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- Buy via WhatsApp ---- */
function comprar(card) {
    const num = '5534998829396';
    const msg = `Olá! Tenho interesse em comprar a carta: ${card}. Poderia me passar mais informações?`;
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ---- Custom card order ---- */
function enviarPedido() {
    const nome = document.getElementById('cust-nome').value.trim();
    const estilo = document.getElementById('cust-estilo').value;
    const info = document.getElementById('cust-info').value.trim();
    const num = '5534998829396';
    const msg = `Olá! Quero uma carta personalizada.\n\nNome na carta: ${nome || 'A definir'}\nEstilo: ${estilo}\nDetalhes: ${info || 'Sem detalhes adicionais'}`;
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('.card-item, .feedback-card, .hall-card, .highlight-item, .sobre-img-card, .stat-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = e.target.style.transform.replace('translateY(30px)', 'translateY(0)');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transition = `opacity 0.5s ease ${(i % 8) * 0.05}s, transform 0.5s ease ${(i % 8) * 0.05}s`;
    const t = el.style.transform;
    el.style.transform = (t ? t + ' ' : '') + 'translateY(30px)';
    observer.observe(el);
});
