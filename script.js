function comprar(card) {
    let numero = "5534998829396";
    let mensagem = `Olá! Quero comprar o ${card} por R$9,99`;
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

function pedidoPersonalizado() {
    let descricao = document.getElementById("descricao").value;
    let numero = "5534998829396";

    let mensagem = `Olá! Quero uma carta personalizada (R$19,99).\nDetalhes: ${descricao}`;

    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

/* TROCA DE MIDIA */
function trocarMidia(botao, index) {
    let card = botao.closest(".card");
    let midias = card.querySelectorAll(".media img, .media video");

    midias.forEach(m => m.classList.remove("active"));
    midias[index].classList.add("active");
}
/* EFEITO 3D DINÂMICO COM MOUSE */
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        let rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        let centerX = rect.width / 2;
        let centerY = rect.height / 2;

        let rotateX = -(y - centerY) / 10;
        let rotateY = (x - centerX) / 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
});