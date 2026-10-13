const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

lucide.createIcons();

// Theme
const savedTheme = localStorage.getItem("luana-theme");
if (savedTheme === "light") document.body.classList.add("light");

$("#themeSwitch").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("luana-theme", document.body.classList.contains("light") ? "light" : "dark");
});

// Mobile menu
$("#mobileMenu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$$(".nav-link").forEach(link => link.addEventListener("click", () => $("#sidebar").classList.remove("open")));

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .12 });
$$(".reveal").forEach(el => observer.observe(el));

// Active nav
const sections = $$("section[id]");
const navLinks = $$(".nav-link");
window.addEventListener("scroll", () => {
  const y = window.scrollY + 180;
  let current = "home";
  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
}, {passive:true});

// Cursor glow
const glow = $(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, {passive:true});

// Floating particles
const particleBox = $("#particles");
for (let i = 0; i < 48; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = `${Math.random()*100}%`;
  p.style.top = `${Math.random()*100}%`;
  p.style.animationDelay = `${Math.random()*3}s`;
  p.style.animationDuration = `${2 + Math.random()*4}s`;
  particleBox.appendChild(p);
}

// 3D tilt cards
$$(".tilt").forEach(card => {
  card.addEventListener("pointermove", e => {
    if (window.innerWidth < 800) return;
    const r = card.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-.5)*10;
    const y = ((e.clientY-r.top)/r.height-.5)*-10;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});

// Magnetic buttons
$$(".magnetic").forEach(btn => {
  btn.addEventListener("pointermove", e => {
    if (window.innerWidth < 800) return;
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.12}px, ${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  btn.addEventListener("pointerleave", () => btn.style.transform = "");
});

const downloadCv = $("#downloadCv");

if (downloadCv) {
  downloadCv.addEventListener("click", e => {
    e.preventDefault();

    const cv = `LUANA PARREIRA
Técnico em Informática

Estudante de tecnologia, desenvolvimento web e criação de soluções.`;

    const blob = new Blob([cv], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "Luana-Parreira-CV.txt";
    a.click();

    URL.revokeObjectURL(url);
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector("#contactModal");
    const botao = document.querySelector(".contact-cta");
    const fechar = document.querySelector("#closeContact");
    const overlay = document.querySelector("#contactOverlay");
    const form = document.querySelector("#contactForm");

    // Confere se os elementos existem
    if (!modal || !botao || !fechar || !overlay || !form) {
        console.error("Contato: confira os IDs e classes do HTML.");
        return;
    }

    // Abre a janela
    function abrirModal() {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        fechar.focus();
    }

    // Fecha a janela
    function fecharModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    botao.addEventListener("click", abrirModal);
    fechar.addEventListener("click", fecharModal);
    overlay.addEventListener("click", fecharModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharModal();
        }
    });

    // Prepara uma mensagem para o aplicativo de e-mail
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.querySelector("#contactName").value.trim();
        const email = document.querySelector("#contactEmail").value.trim();
        const mensagem = document.querySelector("#contactMessage").value.trim();

        const destinatario = "SEUEMAIL@gmail.com";

        if (!nome || !email || !mensagem) {
            alert("Preencha todos os campos antes de enviar.");
            return;
        }

        const assunto = encodeURIComponent(
            "Contato pelo portfólio - " + nome
        );

        const corpo = encodeURIComponent(
            `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`
        );

        window.location.href =
            `mailto:${destinatario}?subject=${assunto}&body=${corpo}`;
    });
});
