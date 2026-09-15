"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Logo } from "@/components/rr/logo";
import { Reveal } from "@/components/rr/reveal";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#estudio", label: "Estúdio" },
  { href: "#capacidade", label: "Sites & sistemas" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

const SERVICES = [
  {
    n: "01",
    title: "Sites institucionais",
    text: "Presença digital clara, com hierarquia, ritmo e conteúdo verdadeiro — feita para representar o negócio, não um template.",
  },
  {
    n: "02",
    title: "Landing pages",
    text: "Páginas de campanha com uma ação principal, leitura rápida e composição que conduz a decisão.",
  },
  {
    n: "03",
    title: "Interfaces digitais",
    text: "UI para produtos e fluxos reais: estados, formulários, navegação e consistência em desktop e mobile.",
  },
  {
    n: "04",
    title: "Sistemas web sob medida",
    text: "Aplicações construídas em torno do processo da empresa — telas, regras e operação no mesmo desenho.",
  },
  {
    n: "05",
    title: "Redesign de experiências",
    text: "Modernização de sites e interfaces existentes: o que funciona permanece; o que atrapalha é redesenhado.",
  },
];

const STEPS = [
  { n: "01", title: "Escutar", text: "Entender o negócio, o público e o que a página ou o sistema precisa resolver de verdade." },
  { n: "02", title: "Desenhar", text: "Estrutura, visual e interação no mesmo sistema — tipografia, ritmo e estados, não só um hero." },
  { n: "03", title: "Construir", text: "Implementação precisa: responsivo, acessível, rápido e alinhado à identidade." },
  { n: "04", title: "Ajustar", text: "Revisão no ar: leitura, toque, movimento e os pontos onde o uso trava." },
  { n: "05", title: "Lançar", text: "Entrega estável, pronta para crescer com conteúdo e projetos reais." },
];

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setIntro(false);
      return;
    }
    const t = window.setTimeout(() => setIntro(false), 1480);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {intro ? (
        <div id="intro-veil" className="is-playing" aria-hidden="true">
          <div className="bars">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </div>
          <img className="mark" src="/brand/rr-mark-on-dark-sm.png" alt="" width={220} height={131} />
        </div>
      ) : null}

      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-90 focus:bg-accent focus:px-3 focus:py-2 focus:text-paper"
      >
        Ir para o conteúdo
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled || menuOpen ? "bg-ink/92 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="site-wrap flex h-16 items-center justify-between md:h-[4.5rem]">
          <a href="#topo" className="shrink-0" aria-label="RR Tech, início">
            <Logo variant="lockup-dark" />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Seções">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="nav-link text-paper/80 hover:text-paper">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contato" className="btn-diag btn-diag-solid hidden sm:inline-flex">
              Começar um projeto
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-paper/20 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
              <span aria-hidden className="flex w-5 flex-col gap-1.5">
                <span className={cn("h-px bg-paper transition", menuOpen && "translate-y-[5px] rotate-45")} />
                <span className={cn("h-px bg-paper transition", menuOpen && "opacity-0")} />
                <span className={cn("h-px bg-paper transition", menuOpen && "-translate-y-[5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div id="mobile-nav" className="border-t border-paper/10 bg-ink lg:hidden">
            <nav className="site-wrap flex flex-col gap-1 py-4" aria-label="Menu móvel">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-3 font-display text-sm font-bold tracking-[0.16em] uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#contato" className="btn-diag btn-diag-solid mt-2" onClick={() => setMenuOpen(false)}>
                Começar um projeto
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="conteudo">
        <Hero />
        <Capabilities />
        <Approach />
        <Services />
        <Process />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section
      id="topo"
      className="tech-grid relative min-h-[100svh] overflow-hidden bg-ink pt-24 text-paper md:pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[18%] h-[70%] w-[48%] bg-accent/90"
        style={{ clipPath: "polygon(38% 0, 100% 0, 62% 100%, 0 100%)", opacity: 0.16 }}
      />
      <div className="site-wrap relative grid min-h-[calc(100svh-6rem)] items-end gap-12 pb-12 md:grid-cols-12 md:pb-16">
        <div className="md:col-span-7">
          <p className="kicker text-accent">Estúdio digital</p>
          <h1 className="display mt-6 max-w-[11ch] text-[clamp(3rem,9vw,7.2rem)]">
            Sites que marcam.
            <span className="mt-1 block">Sistemas que resolvem.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-paper/78">
            Experiências digitais construídas para transformar ideias em produtos rápidos, funcionais e
            memoráveis — com a identidade da RR Tech no desenho, não só no logo.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contato" className="btn-diag btn-diag-solid">
              Começar um projeto
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a href="#capacidade" className="btn-diag btn-diag-ghost">
              Conhecer o trabalho
            </a>
          </div>
        </div>
        <div className="relative md:col-span-5 md:self-center">
          <div className="cut-frame border border-paper/12 bg-ink-2/40 p-8 md:p-10">
            <img
              src="/brand/rr-mark-on-dark-sm.png"
              alt="Monograma RR"
              className="mx-auto w-full max-w-[320px]"
              width={420}
              height={250}
            />
            <p className="mt-8 border-t border-paper/12 pt-5 font-display text-xs font-bold tracking-[0.22em] uppercase text-paper/55">
              RR Tech · Sites & Sistemas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capacidade" className="bg-paper text-ink">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">01 — Capacidade</p>
          <h2 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,5vw,4.2rem)]">
            Dois ofícios, um estúdio.
          </h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2">
          <Reveal className="border-t border-ink/12 py-10 pr-0 md:border-r md:pr-12">
            <p className="font-display text-sm font-bold tracking-[0.2em] uppercase text-accent">Sites</p>
            <h3 className="display mt-3 text-3xl md:text-4xl">A face do negócio</h3>
            <p className="mt-5 max-w-md text-ink/75">
              Páginas com voz própria: composição, tipografia e movimento a serviço da leitura. Um site da RR
              Tech deve parecer desta empresa — não de qualquer agência.
            </p>
          </Reveal>
          <Reveal delay={90} className="border-t border-ink/12 py-10 md:pl-12">
            <p className="font-display text-sm font-bold tracking-[0.2em] uppercase text-accent">Sistemas</p>
            <h3 className="display mt-3 text-3xl md:text-4xl">A operação no ar</h3>
            <p className="mt-5 max-w-md text-ink/75">
              Interfaces e fluxos para o dia a dia: clareza, estados honestos e engenharia que aguenta uso real.
              O sistema resolve; a interface não atrapalha.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="estudio" className="bg-paper-2 text-ink">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">02 — Estúdio</p>
          <h2 className="display mt-4 max-w-[18ch] text-[clamp(2.1rem,5vw,4rem)]">
            Estratégia, desenho e engenharia no mesmo corte.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink/75">
            Não separamos “bonito” de “funciona”. O recorte azul da marca é o mesmo gesto do estúdio: direção,
            precisão e avanço — cada decisão com um motivo.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-px bg-ink/12 md:grid-cols-3">
          {[
            {
              t: "Direção",
              d: "Antes da tela, o problema. Público, oferta e o que precisa acontecer quando a pessoa chega.",
            },
            {
              t: "Forma",
              d: "Identidade aplicada de verdade: geometria, tipo, ritmo e estados. Sem estética genérica de tecnologia.",
            },
            {
              t: "Construção",
              d: "Front-end cuidadoso: responsivo, teclado, performance e movimento que pertence ao projeto.",
            },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 80} className="bg-paper-2 p-8 md:p-10">
              <span className="font-display text-xs font-bold tracking-[0.22em] text-accent">0{i + 1}</span>
              <h3 className="display mt-4 text-2xl">{item.t}</h3>
              <p className="mt-3 text-ink/70">{item.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="bg-ink text-paper">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">03 — Serviços</p>
          <h2 className="display mt-4 max-w-[14ch] text-[clamp(2.1rem,5vw,4rem)]">O que construímos</h2>
        </Reveal>
        <ul className="mt-12 divide-y divide-paper/12 border-y border-paper/12">
          {SERVICES.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 40}>
                <article className="group grid gap-3 py-8 md:grid-cols-[5rem_1fr_1.2fr] md:items-baseline md:gap-8">
                  <span className="font-display text-sm font-bold tracking-[0.18em] text-accent">{s.n}</span>
                  <h3 className="display text-2xl md:text-[1.7rem]">{s.title}</h3>
                  <p className="text-paper/70 md:text-right">{s.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="processo" className="bg-paper text-ink">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">04 — Processo</p>
          <h2 className="display mt-4 text-[clamp(2.1rem,5vw,4rem)]">Do briefing ao ar</h2>
        </Reveal>
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <li className="relative border-t-2 border-accent pt-5">
                <span className="font-display text-xs font-bold tracking-[0.2em] text-mist">{s.n}</span>
                <h3 className="display mt-2 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="projetos" className="bg-ink text-paper">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">05 — Projetos</p>
          <h2 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,5vw,4rem)]">
            O trabalho entra aqui. Sem cases inventados.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/70">
            Esta vitrine está pronta para projetos reais da RR Tech. Enquanto o portfólio não é publicado,
            não encenamos clientes, prêmios ou números.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {["Site institucional", "Produto web", "Redesign"].map((label, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="cut-frame relative min-h-[240px] overflow-hidden border border-paper/12 bg-ink-2 p-6">
                <div
                  aria-hidden
                  className="absolute inset-y-0 right-6 w-10 bg-accent/20"
                  style={{ transform: "skewX(-28deg)" }}
                />
                <p className="font-display text-xs font-bold tracking-[0.2em] uppercase text-paper/45">
                  Slot {String(i + 1).padStart(2, "0")}
                </p>
                <p className="display mt-16 text-2xl">{label}</p>
                <p className="mt-2 text-sm text-paper/50">Aguardando projeto real</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const id = useId();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "").trim();
    const tipo = String(data.get("tipo") ?? "").trim();
    const mensagem = String(data.get("mensagem") ?? "").trim();
    if (!nome || !mensagem) {
      setError("Preencha nome e uma breve descrição do projeto.");
      return;
    }
    setError("");
    const brief = [
      "Briefing RR Tech",
      `Nome: ${nome}`,
      tipo ? `Tipo: ${tipo}` : "",
      "",
      mensagem,
    ]
      .filter(Boolean)
      .join("\n");
    void navigator.clipboard.writeText(brief).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    });
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-full w-[42%] bg-accent"
        style={{ clipPath: "polygon(0 0, 42% 0, 18% 100%, 0 100%)", opacity: 0.18 }}
      />
      <div className="site-wrap relative grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <p className="kicker text-accent">06 — Contato</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4.4rem)]">Vamos falar do seu projeto.</h2>
          <p className="mt-6 text-lg text-paper/72">
            Canal oficial de e-mail ou WhatsApp ainda não foi publicado aqui. Descreva o que você precisa —
            geramos um briefing para copiar e enviar pelo meio que vocês já usam.
          </p>
        </Reveal>
        <Reveal delay={80} className="md:col-span-6 md:col-start-7">
          <form onSubmit={onSubmit} className="grid gap-4" noValidate>
            <label className="grid gap-2 text-sm" htmlFor={`${id}-nome`}>
              Nome
              <input id={`${id}-nome`} name="nome" className="field" autoComplete="name" required />
            </label>
            <label className="grid gap-2 text-sm" htmlFor={`${id}-tipo`}>
              Tipo de trabalho
              <select id={`${id}-tipo`} name="tipo" className="field bg-ink">
                <option value="Site institucional">Site institucional</option>
                <option value="Landing page">Landing page</option>
                <option value="Interface digital">Interface digital</option>
                <option value="Sistema web">Sistema web</option>
                <option value="Redesign">Redesign</option>
                <option value="Ainda não sei">Ainda não sei</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm" htmlFor={`${id}-msg`}>
              Sobre o projeto
              <textarea id={`${id}-msg`} name="mensagem" className="field min-h-32" required />
            </label>
            {error ? (
              <p className="text-sm text-accent" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" className="btn-diag btn-diag-solid justify-self-start">
              {copied ? (
                <>
                  Briefing copiado
                  <Check className="size-4" aria-hidden />
                </>
              ) : (
                <>
                  Copiar briefing
                  <Copy className="size-4" aria-hidden />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="site-wrap flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo variant="lockup-dark" />
          <p className="mt-4 max-w-sm text-sm text-paper/55">
            RR Tech — Sites & Sistemas. Identidade aplicada com precisão.
          </p>
        </div>
        <p className="text-xs tracking-[0.18em] uppercase text-paper/40">
          © {new Date().getFullYear()} RR Tech
        </p>
      </div>
    </footer>
  );
}
