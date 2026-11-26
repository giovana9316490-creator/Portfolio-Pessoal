document.addEventListener("DOMContentLoaded", function() {

    // MENU MOBILE

    const menuButton = document.querySelector(".menu-toggle");

    const navigation = document.querySelector(".nav");


    if (menuButton && navigation) {

        menuButton.addEventListener("click", function() {

            const aberto = navigation.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(aberto)
            );

            menuButton.textContent = aberto ? "✕" : "☰";

        });

    }


    // MARCAR PÁGINA ATUAL

    const paginaAtual = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav a").forEach(function(link) {

        if (link.getAttribute("href") === paginaAtual) {

            link.classList.add("active");

        }

    });


    // ANIMAÇÕES DE ENTRADA

    const observador = new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observador.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


    document.querySelectorAll(".reveal").forEach(function(elemento) {

        observador.observe(elemento);

    });


    // EFEITO DO MOUSE

    const hero = document.querySelector(".home-hero");

    if (hero && window.matchMedia("(pointer: fine)").matches) {

        const luz = document.createElement("div");

        luz.className = "mouse-glow";

        hero.appendChild(luz);


        hero.addEventListener("mousemove", function(event) {

            const rect = hero.getBoundingClientRect();

            luz.style.left = (event.clientX - rect.left) + "px";

            luz.style.top = (event.clientY - rect.top) + "px";

        });

    }

});


// PROJETOS DE DEMONSTRAÇÃO

const projetosPadrao = [

    {
        nome: "Carlos Chagas — Nossa Terra",

        descricao: "Portal informativo sobre a história, cultura, economia, pecuária e tradições de Carlos Chagas.",

        link: "https://carloschagas.vercel.app/",

        foto: null

    },

    {
        nome: "Sakura House",

        descricao: "Projeto de restaurante japonês com identidade visual temática e apresentação digital.",

        link: "https://sakurahouse-silk.vercel.app/",

        foto: null

    },

    {
        nome: "ZYNK PC Technology",

        descricao: "Projeto de apresentação de uma empresa de tecnologia e assistência técnica.",

        link: "https://zynk-roan.vercel.app/",

        foto: null

    }

];


// CARREGAR PROJETOS

async function carregarProjetos() {

    const area = document.querySelector("[data-project-list]");

    if (!area) return;


    let projetos = projetosPadrao;


    if (window.supabaseReady && window.supabaseClient) {

        const { data, error } = await window.supabaseClient

            .from("projetos")

            .select("id,nome,descrição,link,foto")

            .order("id", { ascending: true });


        if (!error && data && data.length > 0) {

            projetos = data;

        }

    }


    area.innerHTML = "";


    projetos.forEach(function(projeto, index) {

        const card = document.createElement("article");

        card.className = "project-card";


        const arte = document.createElement("div");

        arte.className = "project-art";


        const tituloArte = document.createElement("strong");

        tituloArte.textContent = projeto.nome;

        arte.appendChild(tituloArte);


        if (projeto.foto) {

            arte.style.backgroundImage =
                `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5)),url("${projeto.foto}")`;

            arte.style.backgroundSize = "cover";

            arte.style.backgroundPosition = "center";

        }


        const info = document.createElement("div");

        info.className = "project-info";


        const tipo = document.createElement("div");

        tipo.className = "project-type";

        tipo.textContent = `PROJETO / 0${index + 1}`;


        const titulo = document.createElement("h3");

        titulo.textContent = projeto.nome;


        const descricao = document.createElement("p");

        descricao.textContent = projeto.descricao || projeto["descrição"] || "";


        const link = document.createElement("a");

        link.className = "text-link";

        link.href = projeto.link || "#";

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.textContent = "VISITAR PROJETO ↗";


        info.append(tipo, titulo, descricao, link);

        card.append(arte, info);

        area.appendChild(card);

    });

}


document.addEventListener("DOMContentLoaded", carregarProjetos);


// FORMULÁRIO DE CONTATO

document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.getElementById("contact-form");

    if (!formulario) return;


    formulario.addEventListener("submit", async function(event) {

        event.preventDefault();


        const status = document.getElementById("form-status");


        if (!window.supabaseReady || !window.supabaseClient) {

            status.textContent = "A conexão com o Supabase ainda não está configurada.";

            status.className = "notice error";

            return;

        }


        const dados = new FormData(formulario);


        const nome = dados.get("nome");

        const email = dados.get("email");

        const telefone = dados.get("telefone");

        const assunto = dados.get("assunto");

        const mensagem = dados.get("mensagem");


        status.textContent = "Enviando mensagem...";


        // A mensagem fica junto ao assunto porque
        // a estrutura informada da tabela leads
        // não possui uma coluna mensagem separada.

        const lead = {

            nome: nome,

            email: email,

            telefone: telefone,

            assunto: `${assunto} — ${mensagem}`

        };


        const { error } = await window.supabaseClient

            .from("leads")

            .insert([lead]);


        if (error) {

            status.textContent = "Não foi possível enviar: " + error.message;

            status.className = "notice error";

            return;

        }


        formulario.reset();

        status.textContent = "Mensagem enviada com sucesso!";

        status.className = "notice success";

    });

});
