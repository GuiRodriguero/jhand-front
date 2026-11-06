import type { LucideIcon } from 'lucide-react';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface SidebarLinkProps extends Omit<NavLinkProps, 'className' | 'children'> {
  readonly icon: LucideIcon;
  readonly title: string;
}

export function SidebarLink({ icon: Icon, title, ...props }: SidebarLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-4 px-3 py-3 rounded-lg transition-colors duration-200',
          'hover:bg-surface/50 hover:text-foreground-strong',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring',
          isActive && 'bg-surface text-foreground-strong',
        )
      }
    >
      <Icon size={18} aria-hidden="true" />
      <span className="font-medium text-sm">{title}</span>
    </NavLink>
  );
}
