type ToolLogoProps = {
  name: string;
  logoUrl?: string | null;
  icon?: string | null;
  categorySlug: string;
  large?: boolean;
};

export function ToolLogo({ name, logoUrl, icon, categorySlug, large }: ToolLogoProps) {
  const cls = `tool-logo ${categorySlug}${large ? " tool-logo-lg" : ""}${logoUrl ? " logo-real" : ""}`;
  const wh = large ? 62 : 48;
  return (
    <span className={cls} aria-hidden="true">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="tool-logo-img"
          src={logoUrl}
          alt={`${name} logo`}
          width={wh}
          height={wh}
          loading="lazy"
        />
      ) : (
        icon ?? "🔧"
      )}
    </span>
  );
}