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

export default function SiteFooter() {
  const shellStyle = { paddingInline: TOKENS.spacing.shellX };
  const headingStyle = { color: TOKENS.colors.textPrimary };
  const linkStyle = { color: TOKENS.colors.textMuted40 };

  return (
    <footer
      className="mt-48 border-t"
      style={{ borderColor: TOKENS.colors.textMuted6, paddingBottom: "24px" }}
    >
      <div className="mx-auto max-w-7xl" style={shellStyle}>
        <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold" style={headingStyle}>Strive Studios</h3>
            <p className="max-w-md text-base leading-relaxed" style={{ color: TOKENS.colors.textMuted40 }}>
              We craft bold, purposeful digital experiences that help brands stand out and connect with the right audience.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-medium" style={headingStyle}>Navigation</h4>
            <div className="flex flex-col gap-3">
              {footerNavigationLinks.map((item) => (
                <a key={item.label} href={item.href} className="text-sm transition-colors hover:text-white" style={linkStyle}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-medium" style={headingStyle}>Connect</h4>
            <div className="flex flex-col gap-3">
              {footerSocialLinks.map((item) => (
                <a key={item.label} href={item.href} className="text-sm transition-colors hover:text-white" style={linkStyle}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 md:flex-row" style={{ borderColor: TOKENS.colors.textMuted6 }}>
          <span className="text-xs" style={{ color: TOKENS.colors.textMuted30 }}>© 2025 Strive Studios. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-colors hover:text-white/60" style={{ color: TOKENS.colors.textMuted30 }}>
              Privacy Policy
            </a>
            <a href="#" className="text-xs transition-colors hover:text-white/60" style={{ color: TOKENS.colors.textMuted30 }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
