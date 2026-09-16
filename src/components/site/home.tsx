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
    title: "Site institucional",
    text: "O site da empresa: quem vocês são, o que fazem e como entrar em contato — claro no celular e no computador.",
  },
  {
    n: "02",
    title: "Landing page",
    text: "Página de campanha com uma oferta e um pedido. Feita para converter, não para contar a história toda.",
  },
  {
    n: "03",
    title: "Interface digital",
    text: "Telas de produto ou operação: formulários, estados, navegação e consistência em todo o fluxo.",
  },
  {
    n: "04",
    title: "Sistema web sob medida",
    text: "Sistema no processo da empresa: cadastros, regras, painel e o dia a dia no ar — sem ferramenta genérica.",
  },
  {
    n: "05",
    title: "Redesign",
    text: "O site ou o sistema que vocês já têm, reorganizado: o que funciona fica; o que atrapalha é redesenhado.",
  },
];

const STEPS = [
  { n: "01", title: "Briefing", text: "Reunião para entender o negócio, o prazo e o que precisa existir no ar." },
  { n: "02", title: "Proposta", text: "Escopo, prazo e investimento por escrito — antes de qualquer desenvolvimento." },
  { n: "03", title: "Design", text: "Estrutura e visual da sua marca. Você aprova antes da construção." },
  { n: "04", title: "Desenvolvimento", text: "Site ou sistema implementado e testado em desktop e celular." },
  { n: "05", title: "Entrega", text: "Publicação, acessos e o necessário para vocês operarem o projeto." },
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
    const t = window.setTimeout(() => setIntroDone(true), 1600);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

      <div className="hero-copy-track site-wrap relative z-10 grid min-h-[calc(100svh-6rem)] items-center pb-20 md:grid-cols-12 md:pb-24">
        <div className="hero-copy md:col-span-8">
          <p className="hero-kicker kicker">
            <span className="text-accent">RR Tech</span>
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
          <p className="hero-lede mt-7 max-w-[34rem] text-[1.125rem] leading-relaxed text-paper/88 md:text-xl">
            Criamos o site da sua empresa e o sistema que ela usa no dia a dia — sob medida, com proposta antes de
            começar.
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
        <dl className="hero-facts mt-14 grid gap-6 md:col-span-4 md:mt-24 md:justify-self-end">
          <div>
            <dt className="kicker text-accent">Clientes</dt>
            <dd className="display mt-2 text-3xl">2 em curso</dd>
          </div>
          <div>
            <dt className="kicker text-paper/45">Trabalho</dt>
            <dd className="mt-2 text-paper/80">Sites e sistemas web sob medida</dd>
          </div>
          <div>
            <dt className="kicker text-paper/45">Início</dt>
            <dd className="mt-2 text-paper/80">Proposta por escrito, antes do desenvolvimento</dd>
          </div>
        </dl>
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
            Uma empresa de sites e sistemas.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-ink/70">
            A RR Tech constrói presença digital e ferramentas de operação. Cada projeto é do cliente — não um
            modelo pronto com o logo trocado.
          </p>
        </Reveal>
      </div>
      <div className="craft-split">
        <Reveal className="craft-panel">
          <span className="craft-bg" aria-hidden>
            SITES
          </span>
          <p className="font-display text-sm font-bold tracking-[0.2em] uppercase text-accent">01 — Sites</p>
          <h3 className="display mt-4 text-3xl md:text-5xl">A cara da empresa na internet</h3>
          <p className="mt-5 max-w-md text-lg text-ink/75">
            Institucional, landing ou redesign. A marca aplicada de verdade, leitura fácil, pronto para celular.
          </p>
          <ul className="craft-list">
            <li>Quem vocês são e o que fazem, sem texto genérico</li>
            <li>Uma ação clara: contato, proposta ou venda</li>
            <li>Publicação e o site no ar</li>
          </ul>
        </Reveal>
        <Reveal delay={90} className="craft-panel craft-panel-blue">
          <span className="craft-bg" aria-hidden>
            SISTEMAS
          </span>
          <p className="font-display text-sm font-bold tracking-[0.2em] uppercase">02 — Sistemas</p>
          <h3 className="display mt-4 text-3xl md:text-5xl">A operação no computador</h3>
          <p className="mt-5 max-w-md text-lg text-paper/82">
            Sistema web no processo de vocês: cadastros, regras, painel e o que a equipe usa todo dia.
          </p>
          <ul className="craft-list craft-list-light">
            <li>Fluxo desenhado com quem vai usar</li>
            <li>Telas simples, regras da empresa</li>
            <li>Acesso controlado e entrega estável</li>
          </ul>
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
          <h2 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,5vw,4rem)]">O que a RR Tech entrega</h2>
          <p className="mt-5 max-w-xl text-lg text-paper/70">Cinco tipos de trabalho. Um pedido, uma proposta.</p>
        </Reveal>
        <ul className="mt-12 border-y border-paper/12">
          {SERVICES.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 40}>
                <a
                  href="#contato"
                  className="svc-row group grid gap-3 py-8 md:grid-cols-[4.5rem_minmax(0,18rem)_1fr_auto] md:items-center md:gap-8 md:py-9"
                >
                  <span className="svc-n display">{s.n}</span>
                  <h3 className="display text-[1.45rem] md:text-[1.7rem]">{s.title}</h3>
                  <p className="text-[0.98rem] leading-relaxed text-paper/72">{s.text}</p>
                  <ArrowUpRight className="svc-arrow hidden size-5 text-accent md:block" aria-hidden />
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
            Vocês sabem o preço e o prazo antes de começar. Cada etapa tem revisão.
          </p>
        </Reveal>
        <ol className="step-grid mt-14">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 50}>
              <li className="step-card">
                <p className="step-index display">{s.n}</p>
                <h3 className="display mt-5 text-xl md:text-2xl">{s.title}</h3>
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
    { n: "01", title: "Cliente 01", note: "Projeto em andamento.", status: "Em curso" },
    { n: "02", title: "Cliente 02", note: "Projeto em andamento.", status: "Em curso" },
    { n: "03", title: "Próximo projeto", note: "Aberto para site ou sistema.", status: "Disponível" },
  ];

  return (
    <section id="projetos" className="bg-ink text-paper">
      <div className="site-wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-accent">04 — Clientes</p>
          <h2 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,5vw,4rem)]">Dois clientes em curso.</h2>
          <p className="mt-6 max-w-xl text-lg text-paper/70">
            Nomes e cases entram no ar com autorização. A empresa já está operando — sem depoimento inventado.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px bg-paper/12 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 70}>
              <a href="#contato" className="client-card group">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-accent">
                    {item.status}
                  </span>
                  <span className="text-paper/35">{item.n}</span>
                </div>
                <p className="display mt-10 text-2xl md:text-3xl">{item.title}</p>
                <p className="mt-3 text-sm text-paper/55">{item.note}</p>
                <p className="mt-10 inline-flex items-center gap-2 font-display text-xs font-bold tracking-[0.16em] uppercase text-paper/45 group-hover:text-accent">
                  Solicitar proposta
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
    const empresa = String(data.get("empresa") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const tipo = String(data.get("tipo") ?? "").trim();
    const mensagem = String(data.get("mensagem") ?? "").trim();
    if (!nome || !mensagem) {
      setError("Preencha nome e uma breve descrição do projeto.");
      return;
    }
    setError("");
    const brief = [
      "Proposta — RR Tech",
      `Nome: ${nome}`,
      empresa ? `Empresa: ${empresa}` : "",
      email ? `E-mail: ${email}` : "",
      tipo ? `Tipo: ${tipo}` : "",
      "",
      mensagem,
    ]
      .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
      .join("\n");
    void navigator.clipboard.writeText(brief).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    });
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="contact-plane pointer-events-none absolute bottom-0 left-0 h-full w-[38%] bg-accent" />
      <div className="site-wrap relative grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <p className="kicker text-accent">05 — Contato</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4.2rem)]">Peça uma proposta.</h2>
          <p className="mt-6 text-lg text-paper/75">
            Descreva o site ou o sistema. O formulário monta um briefing para você copiar e enviar — e-mail e
            WhatsApp oficiais ainda não estão nesta página.
          </p>
          <p className="mt-6 text-sm text-paper/50">Resposta comercial a partir do briefing. Sem compromisso automático.</p>
        </Reveal>
        <Reveal delay={80} className="md:col-span-6 md:col-start-7">
          <form onSubmit={onSubmit} className="cut-frame form-panel form-paper grid gap-4 p-6 md:p-8" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm" htmlFor={`${id}-nome`}>
                Nome
                <input id={`${id}-nome`} name="nome" className="field" autoComplete="name" required />
              </label>
              <label className="grid gap-2 text-sm" htmlFor={`${id}-empresa`}>
                Empresa
                <input id={`${id}-empresa`} name="empresa" className="field" autoComplete="organization" />
              </label>
            </div>
            <label className="grid gap-2 text-sm" htmlFor={`${id}-email`}>
              E-mail
              <input id={`${id}-email`} name="email" type="email" className="field" autoComplete="email" />
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
              O que vocês precisam
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
      <div className="site-wrap grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo variant="lockup-dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">
            RR Tech — empresa de sites profissionais e sistemas web sob medida.
          </p>
        </div>
        <div>
          <p className="kicker text-paper/40">Serviços</p>
          <ul className="mt-4 grid gap-2 text-sm text-paper/65">
            <li>Site institucional</li>
            <li>Landing page</li>
            <li>Sistema web sob medida</li>
            <li>Redesign</li>
          </ul>
        </div>
        <div className="md:text-right">
          <p className="kicker text-paper/40">Navegação</p>
          <nav className="mt-4 flex flex-col gap-2 md:items-end" aria-label="Rodapé">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-paper/65 hover:text-paper">
                {item.label}
              </a>
            ))}
          </nav>
          <p className="mt-8 text-xs tracking-[0.16em] uppercase text-paper/35">© {new Date().getFullYear()} RR Tech</p>
        </div>
      </div>
    </footer>
  );
}
