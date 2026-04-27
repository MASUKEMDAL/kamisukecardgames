function nextSlide(btn) {
    const media = btn.closest('.carousel').querySelector('.media');
    const imgs = media.querySelectorAll('img');
    let activeIndex = Array.from(imgs).findIndex(img => img.classList.contains('active'));
    
    imgs[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % imgs.length;
    imgs[activeIndex].classList.add('active');
}

function prevSlide(btn) {
    const media = btn.closest('.carousel').querySelector('.media');
    const imgs = media.querySelectorAll('img');
    let activeIndex = Array.from(imgs).findIndex(img => img.classList.contains('active'));
    
    imgs[activeIndex].classList.remove('active');
    activeIndex = (activeIndex - 1 + imgs.length) % imgs.length;
    imgs[activeIndex].classList.add('active');
}

function comprar(card) {
    let numero = "5534998829396";
    let mensagem = `Olá! Quero comprar o card: ${card}`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank");
}

function pedidoPersonalizado() {
    let desc = document.getElementById("descricao").value;
    let numero = "5534998829396";
    let mensagem = `Olá! Quero uma carta personalizada.\nDetalhes: ${desc}`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank");
}function nextSlide(btn) { // Função para avançar, recebe o botão clicado como referência
    const media = btn.closest('.carousel').querySelector('.media'); // Busca a div que contém as imagens deste carrossel
    const imgs = media.querySelectorAll('img'); // Cria uma lista com todas as imagens encontradas
    let activeIndex = Array.from(imgs).findIndex(img => img.classList.contains('active')); // Descobre qual é o índice da imagem ativa atual
    
    imgs[activeIndex].classList.remove('active'); // Remove a classe active da imagem atual, escondendo-a
    activeIndex = (activeIndex + 1) % imgs.length; // Calcula o próximo índice (se chegar no final, volta para o 0)
    imgs[activeIndex].classList.add('active'); // Aplica a classe active na nova imagem, exibindo-a
}

function prevSlide(btn) { // Função para retroceder, segue a mesma lógica do avanço
    const media = btn.closest('.carousel').querySelector('.media'); // Localiza o container de imagens
    const imgs = media.querySelectorAll('img'); // Lista todas as imagens
    let activeIndex = Array.from(imgs).findIndex(img => img.classList.contains('active')); // Identifica o índice atual
    
    imgs[activeIndex].classList.remove('active'); // Esconde a imagem atual
    activeIndex = (activeIndex - 1 + imgs.length) % imgs.length; // Calcula o índice anterior (se for 0, volta para a última)
    imgs[activeIndex].classList.add('active'); // Exibe a imagem anterior
}