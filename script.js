/* ================================================
   KAMISUKE CARD GAMES — Script
   ================================================ */

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

function heroSlide(dir) { goHeroSlide(heroIndex + dir); }

function resetHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => goHeroSlide(heroIndex + 1), 5000);
}

buildHeroDots();
resetHeroTimer();

/* ---- Category Filter (accordion) ---- */
const catTabs = document.querySelectorAll('.cat-tab');
const cardItems = document.querySelectorAll('.card-item');
const cardsGrid = document.getElementById('cardsGrid');
const catalogPlaceholder = document.getElementById('catalogPlaceholder');
let activeCategory = null;

catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const cat = tab.dataset.category;

        if (activeCategory === cat) {
            tab.classList.remove('active');
            activeCategory = null;
            cardsGrid.classList.remove('visible');
            catalogPlaceholder.classList.remove('hidden');
            return;
        }

        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = cat;

        cardItems.forEach(card => {
            card.classList.toggle('hidden', card.dataset.category !== cat);
        });

        cardsGrid.classList.add('visible');
        catalogPlaceholder.classList.add('hidden');

        setTimeout(() => {
            cardsGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 80);
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

feedbackPerView = calcFeedbackPerView();
buildFeedbackDots();
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

hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
function closeMobileNav() { mobileNav.classList.remove('open'); }

/* ---- Header scroll effect ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ================================================
   CART SYSTEM
   ================================================ */
let cart = [];

const CARD_PRICE = 19.99;

function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function comprar(cardName) {
    addToCart(cardName);
}

function addToCart(cardName) {
    const existing = cart.find(i => i.name === cardName);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: cardName, price: CARD_PRICE, qty: 1 });
    }
    renderCart();
    updateCartBadge();
    showToast(`"${cardName}" adicionado ao carrinho`);
}

function removeFromCart(cardName) {
    cart = cart.filter(i => i.name !== cardName);
    renderCart();
    updateCartBadge();
}

function updateQty(cardName, delta) {
    const item = cart.find(i => i.name === cardName);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(cardName);
        return;
    }
    renderCart();
    updateCartBadge();
}

function clearCart() {
    cart = [];
    renderCart();
    updateCartBadge();
}

function renderCart() {
    const list = document.getElementById('cartList');
    const empty = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');

    list.innerHTML = '';

    if (cart.length === 0) {
        empty.classList.remove('hidden');
        footer.style.display = 'none';
        return;
    }

    empty.classList.add('hidden');
    footer.style.display = 'flex';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.className = 'cart-list-item';
        li.innerHTML = `
            <div>
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">R$${(item.price * item.qty).toFixed(2).replace('.', ',')}</p>
            </div>
            <div class="cart-item-controls">
                <button class="cart-qty-btn" onclick="updateQty('${item.name}', -1)">−</button>
                <span class="cart-qty-num">${item.qty}</span>
                <button class="cart-qty-btn" onclick="updateQty('${item.name}', 1)">+</button>
                <button class="cart-remove-btn" onclick="removeFromCart('${item.name}')" title="Remover">&#10005;</button>
            </div>
        `;
        list.appendChild(li);
    });

    totalEl.textContent = `R$${total.toFixed(2).replace('.', ',')}`;
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const total = cart.reduce((sum, i) => sum + i.qty, 0);
    badge.textContent = total;
    badge.classList.add('pop');
    setTimeout(() => badge.classList.remove('pop'), 200);
}

function cartCheckout() {
    if (cart.length === 0) return;
    const lines = cart.map(i => `• ${i.name} x${i.qty} — R$${(i.price * i.qty).toFixed(2).replace('.', ',')}`).join('\n');
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const msg = `Olá! Gostaria de fazer um pedido:\n\n${lines}\n\nTotal: R$${total.toFixed(2).replace('.', ',')}\n\nPoderia confirmar disponibilidade e forma de pagamento?`;
    window.open(`https://wa.me/5534998829396?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ---- Toast notification ---- */
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ---- Custom card order with validation ---- */
function enviarPedido() {
    const nome = document.getElementById('cust-nome').value.trim();
    const estilo = document.getElementById('cust-estilo').value;
    const personagem = document.getElementById('cust-personagem').value.trim();
    const atributos = document.getElementById('cust-atributos').value.trim();
    const ref = document.getElementById('cust-ref').value.trim();
    const chkConteudo = document.getElementById('chk-conteudo').checked;
    const chkComplexidade = document.getElementById('chk-complexidade').checked;
    const chkAjuste = document.getElementById('chk-ajuste').checked;

    if (!nome) { showFormError('Preencha o nome da carta.'); return; }
    if (!estilo) { showFormError('Selecione o estilo visual.'); return; }
    if (!personagem) { showFormError('Descreva o personagem para podermos criar a arte.'); return; }
    if (!chkConteudo) { showFormError('Confirme que o pedido não contém conteúdo ofensivo.'); return; }
    if (!chkComplexidade) { showFormError('Confirme que está ciente sobre cobranças extras em pedidos complexos.'); return; }
    if (!chkAjuste) { showFormError('Confirme que está ciente sobre o limite de 1 ajuste.'); return; }

    const num = '5534998829396';
    const msg = [
        '🃏 *Pedido de Carta Personalizada — Kamisuke*',
        '',
        `*Nome na carta:* ${nome}`,
        `*Estilo visual:* ${estilo}`,
        `*Descrição do personagem:* ${personagem}`,
        atributos ? `*Atributos/detalhes:* ${atributos}` : '',
        ref ? `*Referências:* ${ref}` : '',
        '',
        '✅ Confirmo que o pedido não contém conteúdo ofensivo.',
        '✅ Estou ciente sobre possível cobrança extra em pedidos complexos.',
        '✅ Entendo que tenho direito a apenas 1 ajuste após a arte finalizada.',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank');
}

function showFormError(msg) {
    showToast('⚠ ' + msg);
    const toast = document.getElementById('toast');
    toast.style.borderLeftColor = '#f59e0b';
    setTimeout(() => { toast.style.borderLeftColor = ''; }, 3000);
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
