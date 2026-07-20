# Pedro Loschi — Portfolio

Portfólio pessoal de **Pedro Loschi Giovannini** — desenvolvedor de software e estudante de
Ciência da Computação na PUC-Rio (bolsista integral da Fundação Behring).

**Personal portfolio** of Pedro Loschi Giovannini — software developer and Computer Science
student at PUC-Rio, building software end to end: from personal projects to AI products
delivered to a real client.

🔗 **Live:** https://loschiii.github.io/portifolio/

## ✨ Destaques / Highlights

- 🖱️ **Intro animada** — um cursor "clica" no botão da logo e revela o site (pulável a
  qualquer momento com clique, tecla ou toque)
- 🎨 **Hero interativo** — grade de pontos com física de mola que reage ao mouse e ao toque
- 🌐 **Bilíngue** — inglês (padrão) e português, com troca instantânea e preferência salva;
  o currículo em PDF acompanha o idioma escolhido
- 🌗 **Tema claro/escuro** — com o canvas do hero adaptando as cores em tempo real e
  contraste WCAG AA verificado nos dois temas
- 🚀 **Projetos** — Oráculo, Prisma e Bee (Petrobras · Instituto ECOA PUC-Rio) e o próprio
  site, com galeria de fotos, tilt 3D e ícones oficiais das tecnologias
- 🔮 **Esfera 3D de tecnologias** — as skills orbitam uma esfera projetada em perspectiva,
  que gira sozinha e responde ao arraste (canvas 2D puro, sem WebGL)
- 📍 **Timeline animada** — trajetória que se desenha conforme o scroll
- 🖥️ **Terminal escondido** — tecla `` ` `` abre um shell fake com comandos (`help`, `ls`,
  `cd`, `whoami`, `theme`, `lang`…) e há um konami code à espreita
- ♿ **Acessível** — navegação por teclado, `aria-labels` bilíngues, contraste AA e respeito
  a `prefers-reduced-motion`
- ⚡ **Zero dependências** — HTML, CSS e JavaScript puros; sem frameworks, sem CDN

## 🛠️ Stack

HTML5 · CSS3 (custom properties, grid, animações) · JavaScript vanilla (Canvas 2D,
IntersectionObserver, localStorage)

## ▶️ Rodando localmente / Running locally

```bash
git clone https://github.com/loschiii/portifolio.git
cd portifolio
# basta abrir o index.html no navegador / just open index.html in your browser
```

## 📁 Estrutura / Structure

```
├── index.html              # página única com todos os blocos
├── css/
│   ├── style.css           # estilos, temas e animações
│   ├── enhancements.css    # logo, cursor custom, terminal e esfera de skills
│   └── intro.css           # animação de abertura
├── js/
│   ├── hero.js             # canvas interativo do hero
│   ├── nav.js              # navbar, menu mobile e seção ativa
│   ├── i18n.js             # dicionário EN/PT, troca de idioma e do currículo
│   ├── theme.js            # tema claro/escuro
│   ├── reveal.js           # entrada dos elementos ao rolar
│   ├── icons.js            # SVGs oficiais embutidos (gerado)
│   ├── projects.js         # cards 3D e modal de galeria
│   ├── timeline.js         # linha de progresso da trajetória
│   ├── skills.js           # injeção de ícones por data-icon
│   ├── skills-sphere.js    # esfera 3D de tecnologias
│   ├── intro.js            # clique simulado de abertura
│   └── enhancements.js     # scramble, cursor, terminal e konami
├── img/                    # fotos, logos e ícones
├── assets/                 # currículos em PDF (PT e EN)
├── robots.txt              # indexação
└── sitemap.xml             # mapa do site
```

---

📫 **Contato / Contact:** [pedroloschigiov@gmail.com](mailto:pedroloschigiov@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/pedroloschigiov) · [GitHub](https://github.com/loschiii)
