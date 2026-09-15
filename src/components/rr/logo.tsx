import { cn } from "@/lib/utils";

type Variant = "lockup-dark" | "lockup-light" | "mark-dark" | "mark-light";

const src: Record<Variant, string> = {
  "lockup-dark": "/brand/logo-lockup-dark.png",
  "lockup-light": "/brand/rr-mark-sm.png",
  "mark-dark": "/brand/rr-mark-on-dark-sm.png",
  "mark-light": "/brand/rr-mark-sm.png",
};

export function Logo({
  variant = "lockup-dark",
  className,
  wordmark = variant.startsWith("lockup"),
}: {
  variant?: Variant;
  className?: string;
  wordmark?: boolean;
}) {
  if (variant === "lockup-dark") {
    return (
      <img
        src={src[variant]}
        alt="RR Tech — Sites & Sistemas"
        className={cn("h-8 w-auto md:h-9", className)}
        width={220}
        height={48}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <img
        src={src[variant]}
        alt=""
        className="h-8 w-auto md:h-10"
        width={134}
        height={80}
      />
      {wordmark ? (
        <span className="leading-none">
          <span className="display block text-[1.05rem] tracking-tight md:text-[1.2rem]">
            RR TECH
          </span>
          <span className="mt-1 block text-[0.58rem] font-medium tracking-[0.28em] uppercase opacity-70">
            Sites & Sistemas
          </span>
        </span>
      ) : (
        <span className="sr-only">RR Tech</span>
      )}
    </span>
  );
}
