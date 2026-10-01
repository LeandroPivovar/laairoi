(function () {
  var WHATSAPP = "5561981865397";

  // Nav background on scroll
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 20); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }
  });

  // Reveal on scroll
  var targets = document.querySelectorAll(".section__head, .svc, .lock-benefits li, .locks__media, .checklist, .reparos__copy, .seg, .pillar, .steps li, .form, .faq details, .cta__inner");
  targets.forEach(function (el) { el.classList.add("reveal"); });
  var meters = document.querySelectorAll(".svc__meter");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { io.observe(el); });
    meters.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-in"); });
    meters.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Quote form -> WhatsApp message
  var form = document.getElementById("quoteForm");
  var error = document.getElementById("formError");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var nome = (data.get("nome") || "").trim();
    var nomeInput = form.elements.nome;
    if (!nome) {
      nomeInput.classList.add("is-invalid");
      error.hidden = false;
      nomeInput.focus();
      return;
    }
    nomeInput.classList.remove("is-invalid");
    error.hidden = true;

    var lines = [
      "Olá Wellington! Vim pelo site e gostaria de um orçamento.",
      "",
      "*Nome:* " + nome,
      "*Imóvel:* " + data.get("imovel"),
      "*Serviço:* " + data.get("servico")
    ];
    var local = (data.get("local") || "").trim();
    var desc = (data.get("descricao") || "").trim();
    if (local) lines.push("*Local:* " + local);
    if (desc) lines.push("*Detalhes:* " + desc);
    if (data.get("urgente")) lines.push("", "⚠️ *É urgente*");

    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
