import { TOKENS } from "../../styles/tokens";

const footerNavigationLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About us", href: "#about-us" },
];

const footerSocialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Mail", href: "mailto:hello@strivestudios.co" },
];

const footerLegalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function SiteFooter() {
  const shellStyle = { paddingInline: TOKENS.spacing.shellX, width: "100%" };
  const headingStyle = { color: TOKENS.colors.textPrimary };
  const linkStyle = { color: TOKENS.colors.textMuted40 };
  const legalLinkStyle = { color: TOKENS.colors.textMuted30 };

  return (
    <footer className="mt-40" style={{ paddingBottom: "40px" }}>
      <div className="w-full" style={shellStyle}>
        <div className="grid grid-cols-1 gap-12 pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
          <div className="space-y-5 lg:max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: TOKENS.colors.textMuted30 }}>
              Strive Studios
            </p>
            <p className="text-base leading-relaxed" style={{ color: TOKENS.colors.textMuted40 }}>
              Strategy, design, and development for brands that want a cleaner digital presence.
            </p>
            <a
              href="mailto:hello@strivestudios.co"
              className="inline-flex text-sm transition-colors hover:text-white"
              style={linkStyle}
            >
              hello@strivestudios.co
            </a>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:justify-self-end lg:gap-16 lg:text-right">
            <div className="space-y-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: TOKENS.colors.textMuted30 }}>
                Navigation
              </p>
              <div className="flex flex-col gap-3">
                {footerNavigationLinks.map((item) => (
                  <a key={item.label} href={item.href} className="text-sm transition-colors hover:text-white/90" style={linkStyle}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: TOKENS.colors.textMuted30 }}>
                Connect
              </p>
              <div className="flex flex-col gap-3">
                {footerSocialLinks.map((item) => (
                  <a key={item.label} href={item.href} className="text-sm transition-colors hover:text-white/90" style={linkStyle}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-12 lg:h-16" />

        <div className="flex flex-col items-start justify-between gap-4 pt-4 text-left sm:flex-row sm:items-center sm:gap-6">
          <span className="text-xs" style={{ color: TOKENS.colors.textMuted30 }}>
            © 2025 Strive Studios. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-4 sm:justify-end">
            {footerLegalLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-xs transition-colors hover:text-white/80" style={legalLinkStyle}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}