"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Logo } from "@/components/rr/logo";
import { Reveal } from "@/components/rr/reveal";
import { ScrollRig, getLenis } from "@/components/rr/scroll-rig";
import { Cursor } from "@/components/rr/cursor";
import { Magnetic } from "@/components/rr/magnetic";
import { cn } from "@/lib/utils";

const NAV = [
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
  const [introDone, setIntroDone] = useState(false);
  const [active, setActive] = useState("#topo");
  const [play, setPlay] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motion = "on";
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPlay(true));
    });
    const t = window.setTimeout(() => setIntroDone(true), 1700);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["topo", "capacidade", "servicos", "processo", "projetos", "contato"];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(`#${vis.target.id}`);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const lenis = getLenis();
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <ScrollRig />
      <Cursor />
      <div className="film-grain" aria-hidden />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-90 focus:bg-accent focus:px-3 focus:py-2 focus:text-paper"
      >
        Ir para o conteúdo
      </a>

      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-40",
          scrolled || menuOpen ? "is-solid" : "",
          introDone ? "is-ready" : "",
        )}
      >
        <div className="site-wrap flex h-[4.75rem] items-center justify-between gap-8 md:h-20">
          <a href="#topo" className="shrink-0" aria-label="RR Tech, início">
            <Logo variant="lockup-dark" />
          </a>
          <nav className="hidden items-center gap-8 xl:gap-11 lg:flex" aria-label="Seções">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-paper/75 hover:text-paper"
                aria-current={active === item.href ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#contato" className="btn-diag btn-diag-solid btn-cut hidden lg:inline-flex">
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
            <nav className="site-wrap flex flex-col gap-1 py-5" aria-label="Menu móvel">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-3 font-display text-sm font-bold tracking-[0.18em] uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#contato" className="btn-diag btn-diag-solid btn-cut mt-3" onClick={() => setMenuOpen(false)}>
                Começar um projeto
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="conteudo">
        <Hero live={introDone} play={play} />
        <Capabilities />
        <Approach />
        <Ticker />
        <Services />
        <Process />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero({ live, play }: { live: boolean; play: boolean }) {
  return (
    <section
      id="topo"
      className={cn(
        "hero relative min-h-[100svh] overflow-hidden bg-ink pt-24 text-paper md:pt-28",
        live && "is-live",
        play && "hero-play",
      )}
    >
      <div className="hero-grid" aria-hidden />
      <div className="hero-field-track" aria-hidden>
        <span className="hero-bar hero-bar-1" />
        <span className="hero-bar hero-bar-2" />
        <span className="hero-bar hero-bar-3" />
      </div>

      <div className="hero-copy-track site-wrap relative z-10 grid min-h-[calc(100svh-6rem)] items-center pb-16 md:pb-24">
        <div className="hero-copy">
          <p className="hero-kicker kicker">
            <span className="text-accent">01</span>
            <span className="mx-3 inline-block h-px w-8 bg-accent align-middle" />
            Sites & sistemas
          </p>
          <h1 className="hero-title display mt-6">
            <span className="hero-line">
              <span>Sites que marcam.</span>
            </span>
            <span className="hero-line">
              <span>Sistemas que resolvem.</span>
            </span>
          </h1>
          <p className="hero-lede mt-7 max-w-[36rem] text-[1.125rem] leading-relaxed text-paper/88 md:text-xl">
            A RR Tech cria sites profissionais e sistemas web sob medida — estratégia, design e tecnologia no mesmo
            projeto.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#contato" className="btn-diag btn-diag-solid btn-cut">
                Começar um projeto
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a href="#capacidade" className="btn-diag btn-diag-ghost">
                O que fazemos
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
      <a href="#capacidade" className="scroll-cue">
        <span>Rolar</span>
        <span className="scroll-cue-line" aria-hidden />
      </a>
      <div className="hero-cut" aria-hidden />
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
      </div>
      <div className="craft-split">
        <Reveal className="craft-panel">
          <span className="craft-bg" aria-hidden>
            SITES
          </span>
          <p className="font-display text-sm font-bold tracking-[0.2em] uppercase text-accent">01 — Sites</p>
          <h3 className="display mt-4 text-3xl md:text-5xl">A face do negócio</h3>
          <p className="mt-5 max-w-md text-lg text-ink/75">
            Páginas com voz própria: composição, tipografia e movimento a serviço da leitura. Um site da RR Tech
            deve parecer desta empresa — não de qualquer agência.
          </p>
        </Reveal>
        <Reveal delay={90} className="craft-panel craft-panel-blue">
          <span className="craft-bg" aria-hidden>
            SISTEMAS
          </span>
          <p className="font-display text-sm font-bold tracking-[0.2em] uppercase">02 — Sistemas</p>
          <h3 className="display mt-4 text-3xl md:text-5xl">A operação no ar</h3>
          <p className="mt-5 max-w-md text-lg text-paper/82">
            Interfaces e fluxos para o dia a dia: clareza, estados honestos e engenharia que aguenta uso real. O
            sistema resolve; a interface não atrapalha.
          </p>
        </Reveal>
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
            Uma empresa de sites e sistemas, com corte próprio.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink/75">
            A RR Tech está sendo construída para isso: presença digital clara e sistemas que aguentam o dia a dia.
            Não separamos “bonito” de “funciona”. Cada decisão tem um motivo.
          </p>
        </Reveal>
        <ol className="mt-16">
          {[
            {
              n: "01",
              t: "Direção",
              d: "Antes da tela, o problema. Público, oferta e o que precisa acontecer quando a pessoa chega.",
            },
            {
              t: "Forma",
              n: "02",
              d: "Identidade aplicada de verdade: geometria, tipo, ritmo e estados. Sem estética genérica de tecnologia.",
            },
            {
              n: "03",
              t: "Construção",
              d: "Front-end cuidadoso: responsivo, teclado, performance e movimento que pertence ao projeto.",
            },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 70}>
              <li className="manifest-row">
                <span className="manifest-n display">{item.n}</span>
                <h3 className="display text-[clamp(1.8rem,3vw,2.6rem)]">{item.t}</h3>
                <p className="max-w-md text-ink/70">{item.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Ticker() {
  const items = ["Sites institucionais", "Landing pages", "Interfaces digitais", "Sistemas web", "Redesign"];
  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="ticker-item">
            {item}
            <span className="ticker-slash" />
          </span>
        ))}
      </div>
    </div>
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
        <ul className="mt-12 border-y border-paper/12">
          {SERVICES.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 40}>
                <a href="#contato" className="svc-row group grid gap-3 py-10 md:grid-cols-[6.5rem_1fr_auto_1.15fr] md:items-center md:gap-8">
                  <span className="svc-n display">{s.n}</span>
                  <h3 className="display text-[1.7rem] md:text-[2.15rem]">{s.title}</h3>
                  <ArrowUpRight className="svc-arrow hidden size-5 text-accent md:block" aria-hidden />
                  <p className="text-paper/80 md:text-right">{s.text}</p>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  const pin = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pin.current;
    const tr = track.current;
    if (!el || !tr) return;

    const update = () => {
      if (window.innerWidth < 1024) {
        tr.style.transform = "none";
        return;
      }
      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      const max = Math.max(tr.scrollWidth - window.innerWidth, 0);
      tr.style.transform = `translate3d(${-p * max}px, 0, 0)`;
    };

    const lenis = getLenis();
    lenis?.on("scroll", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      lenis?.off("scroll", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="processo" ref={pin} className="process-pin bg-paper text-ink">
      <div className="process-sticky">
        <div ref={track} className="process-track">
          <div className="process-panel process-intro">
            <p className="kicker">04 — Processo</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.5rem)]">Do briefing ao ar</h2>
            <p className="mt-6 max-w-sm text-lg text-paper/80">
              Um percurso curto e controlado — cada etapa com função, sem teatro de metodologia.
            </p>
          </div>
          {STEPS.map((s) => (
            <div key={s.n} className="process-panel">
              <span className="process-num display" aria-hidden>
                {s.n}
              </span>
              <p className="font-display text-xs font-bold tracking-[0.22em] text-accent">{s.n}</p>
              <h3 className="display mt-4 text-[clamp(2.2rem,4vw,4rem)]">{s.title}</h3>
              <p className="mt-5 max-w-sm text-lg text-ink/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const items = [
    {
      n: "01",
      title: "Cliente 01",
      note: "Projeto em andamento. O case completo entra quando puder ser publicado.",
      status: "Em andamento",
    },
    {
      n: "02",
      title: "Cliente 02",
      note: "Projeto em andamento. O case completo entra quando puder ser publicado.",
      status: "Em andamento",
    },
    {
      n: "03",
      title: "Próximo projeto",
      note: "Aberto para o próximo site ou sistema da RR Tech.",
      status: "Disponível",
    },
  ];

  return (
    <section id="projetos" className="bg-ink text-paper">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">05 — Projetos</p>
          <h2 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,5vw,4rem)]">
            Dois clientes já estão com a RR Tech.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/70">
            Os nomes e os cases entram aqui quando puderem ser publicados. Até lá, o que vale é o trabalho em
            curso — sem depoimento inventado.
          </p>
        </Reveal>
        <div className="tilt-grid mt-12 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 80}>
              <TiltCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  item,
}: {
  item: { n: string; title: string; note: string; status: string };
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: ReactPointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateZ(0)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0) rotateY(0)";
  }

  return (
    <a
      ref={ref}
      href="#contato"
      className="cut-frame film-card group relative block min-h-[320px] overflow-hidden border border-paper/12 bg-ink-2 p-6 md:min-h-[380px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="film-card-inner relative z-[1] flex h-full min-h-[280px] flex-col md:min-h-[340px]">
        <p className="font-display text-xs font-bold tracking-[0.2em] uppercase text-accent">{item.status}</p>
        <span className="work-n display" aria-hidden>
          {item.n}
        </span>
        <p className="display mt-16 text-2xl md:mt-24 md:text-3xl">{item.title}</p>
        <p className="mt-2 max-w-[24ch] text-sm text-paper/60">{item.note}</p>
        <p className="mt-auto inline-flex items-center gap-2 pt-8 font-display text-xs font-bold tracking-[0.18em] uppercase text-paper/55">
          Falar do projeto
          <ArrowUpRight className="size-3.5 text-accent" aria-hidden />
        </p>
      </div>
    </a>
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
    const brief = ["Briefing RR Tech", `Nome: ${nome}`, tipo ? `Tipo: ${tipo}` : "", "", mensagem]
      .filter(Boolean)
      .join("\n");
    void navigator.clipboard.writeText(brief).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    });
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="contact-plane pointer-events-none absolute bottom-0 left-0 h-full w-[42%] bg-accent" />
      <div className="site-wrap relative grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <p className="kicker text-accent">06 — Contato</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4.4rem)]">Vamos falar do seu projeto.</h2>
          <p className="mt-6 text-lg text-paper/72">
            Se você precisa de um site ou de um sistema, este é o começo. Canal oficial de e-mail ou WhatsApp ainda
            não foi publicado aqui — descreva o que precisa e geramos um briefing para copiar e enviar.
          </p>
        </Reveal>
        <Reveal delay={80} className="md:col-span-6 md:col-start-7">
          <form onSubmit={onSubmit} className="cut-frame form-panel form-paper grid gap-4 p-6 md:p-8" noValidate>
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
            <button type="submit" className="btn-diag btn-diag-solid btn-cut justify-self-start">
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
    <footer className="relative overflow-hidden bg-ink text-paper">
      <span className="footer-bar" aria-hidden />
      <div className="site-wrap flex flex-col gap-12 py-16 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo variant="lockup-dark" />
          <p className="display mt-8 max-w-[12ch] text-3xl text-paper/90 md:text-4xl">Sites & sistemas.</p>
          <p className="mt-4 max-w-sm text-sm text-paper/55">
            RR Tech — empresa de sites profissionais e sistemas web sob medida.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Rodapé">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-paper/55 hover:text-paper">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-xs tracking-[0.18em] uppercase text-paper/40">© {new Date().getFullYear()} RR Tech</p>
      </div>
    </footer>
  );
}
