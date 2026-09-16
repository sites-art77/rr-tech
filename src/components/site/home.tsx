"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Logo } from "@/components/rr/logo";
import { Reveal } from "@/components/rr/reveal";
import { ScrollRig, getLenis } from "@/components/rr/scroll-rig";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#capacidade", label: "A empresa" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Como trabalhamos" },
  { href: "#projetos", label: "Clientes" },
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
  { n: "01", title: "Briefing", text: "Conversa para entender o negócio, o prazo e o que o site ou o sistema precisa resolver." },
  { n: "02", title: "Proposta", text: "Escopo, prazo e investimento — por escrito, antes de começar." },
  { n: "03", title: "Design", text: "Estrutura e visual alinhados à sua marca. Você revisa antes da construção." },
  { n: "04", title: "Desenvolvimento", text: "Implementação do site ou do sistema, testada em desktop e celular." },
  { n: "05", title: "Entrega", text: "Publicação e o necessário para você operar o projeto no dia a dia." },
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
              Solicitar proposta
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
                Solicitar proposta
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="conteudo">
        <Hero live={introDone} play={play} />
        <Capabilities />
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
            Empresa de criação de sites profissionais e sistemas web sob medida. Dois clientes em andamento.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-3">
            <a href="#contato" className="btn-diag btn-diag-solid btn-cut">
              Solicitar proposta
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a href="#servicos" className="btn-diag btn-diag-ghost">
              Ver serviços
            </a>
          </div>
        </div>
      </div>
      <div className="hero-cut" aria-hidden />
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capacidade" className="bg-paper text-ink">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">01 — A empresa</p>
          <h2 className="display mt-4 max-w-[18ch] text-[clamp(2.1rem,5vw,4.2rem)]">
            Sites e sistemas para o seu negócio.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-ink/70">
            A RR Tech é uma empresa de criação de sites profissionais e sistemas web sob medida. Cada projeto é
            desenhado para o cliente — não a partir de um modelo pronto.
          </p>
        </Reveal>
      </div>
      <div className="craft-split">
        <Reveal className="craft-panel">
          <span className="craft-bg" aria-hidden>
            SITES
          </span>
          <p className="font-display text-sm font-bold tracking-[0.2em] uppercase text-accent">01 — Sites</p>
          <h3 className="display mt-4 text-3xl md:text-5xl">Sites que representam a empresa</h3>
          <p className="mt-5 max-w-md text-lg text-ink/75">
            Site institucional, landing page ou redesign: presença digital clara, alinhada à sua marca, pronta para
            celular e desktop.
          </p>
        </Reveal>
        <Reveal delay={90} className="craft-panel craft-panel-blue">
          <span className="craft-bg" aria-hidden>
            SISTEMAS
          </span>
          <p className="font-display text-sm font-bold tracking-[0.2em] uppercase">02 — Sistemas</p>
          <h3 className="display mt-4 text-3xl md:text-5xl">Sistemas para o dia a dia</h3>
          <p className="mt-5 max-w-md text-lg text-paper/82">
            Sistemas web sob medida: telas, regras e fluxos do seu processo. A operação fica no ar, com interface
            simples de usar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="bg-ink text-paper">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">02 — Serviços</p>
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
  return (
    <section id="processo" className="bg-paper text-ink">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">03 — Como trabalhamos</p>
          <h2 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,5vw,4rem)]">Do briefing à entrega</h2>
          <p className="mt-5 max-w-xl text-lg text-ink/70">
            Um caminho direto, com proposta antes de começar e revisão em cada etapa.
          </p>
        </Reveal>
        <ol className="mt-14 grid gap-px bg-ink/10 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 50}>
              <li className="bg-paper p-6 md:p-7 md:min-h-[16rem]">
                <p className="font-display text-xs font-bold tracking-[0.2em] text-accent">{s.n}</p>
                <h3 className="display mt-4 text-xl md:text-2xl">{s.title}</h3>
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
          <p className="kicker text-accent">04 — Clientes</p>
          <h2 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,5vw,4rem)]">
            Dois clientes em andamento.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/70">
            Os nomes entram no site quando o cliente autorizar a publicação. Enquanto isso, a RR Tech está em
            operação — sem depoimento inventado.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 80}>
              <a href="#contato" className="group block border border-paper/12 bg-ink-2 p-6 md:p-8">
                <p className="font-display text-xs font-bold tracking-[0.2em] uppercase text-accent">{item.status}</p>
                <p className="display mt-8 text-2xl">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{item.note}</p>
                <p className="mt-8 inline-flex items-center gap-2 font-display text-xs font-bold tracking-[0.16em] uppercase text-paper/50 group-hover:text-accent">
                  Falar sobre um projeto
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </p>
              </a>
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
          <p className="kicker text-accent">05 — Contato</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4.4rem)]">Solicite uma proposta.</h2>
          <p className="mt-6 text-lg text-paper/72">
            Conte o que você precisa. E-mail e WhatsApp oficiais ainda não estão publicados nesta página — o
            formulário gera um briefing para copiar e enviar pelo canal que vocês já usam.
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
              <select id={`${id}-tipo`} name="tipo" className="field">
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
            <button type="submit" className="btn-diag btn-diag-ink btn-cut justify-self-start">
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
      <div className="site-wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div>
          <Logo variant="lockup-dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">
            RR Tech — empresa de sites profissionais e sistemas web sob medida.
          </p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Rodapé">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-paper/60 hover:text-paper">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-xs tracking-[0.16em] uppercase text-paper/40">© {new Date().getFullYear()} RR Tech</p>
      </div>
    </footer>
  );
}
