import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  Smartphone,
  ShoppingBag,
  Network,
  Workflow,
  LayoutGrid,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

export type PlaceholderVariant =
  | 'dashboard'
  | 'mobile'
  | 'ecommerce'
  | 'ecosystem'
  | 'pipeline'
  | 'board'
  | 'contact';

type ImagePlaceholderProps = {
  variant: PlaceholderVariant;
  tone?: 'dark' | 'light';
  alt?: string;
  caption?: ReactNode;
  className?: string;
};

const variantConfig: Record<PlaceholderVariant, { ratio: string; Icon: LucideIcon }> = {
  dashboard: { ratio: 'aspect-[16/9]', Icon: LayoutDashboard },
  mobile: { ratio: 'aspect-[9/16]', Icon: Smartphone },
  ecommerce: { ratio: 'aspect-[4/3]', Icon: ShoppingBag },
  ecosystem: { ratio: 'aspect-[16/9]', Icon: Network },
  pipeline: { ratio: 'aspect-[3/1]', Icon: Workflow },
  board: { ratio: 'aspect-[16/9]', Icon: LayoutGrid },
  contact: { ratio: 'aspect-[5/2]', Icon: UserRound },
};

export function ImagePlaceholder({ variant, tone = 'dark', alt, caption, className = '' }: ImagePlaceholderProps) {
  const { ratio, Icon } = variantConfig[variant];
  const dark = tone === 'dark';

  const frame = dark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-slate-100';
  const iconColor = dark ? 'text-white/20' : 'text-slate-400';
  const captionBorder = dark ? 'border-white/10' : 'border-slate-200';
  const captionColor = dark ? 'text-slate-400' : 'text-slate-500';

  return (
    <figure className={`overflow-hidden rounded-3xl border ${frame} ${className}`}>
      <div
        className={`relative grid w-full place-items-center ${ratio}`}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        {dark && (
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]"
          />
        )}
        <Icon aria-hidden strokeWidth={1.5} className={`relative h-8 w-8 md:h-10 md:w-10 ${iconColor}`} />
      </div>
      {caption ? (
        <figcaption className={`border-t px-5 py-3 type-caption ${captionBorder} ${captionColor}`}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
