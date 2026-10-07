'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type ClassName = string | ((state: { isActive: boolean }) => string);

type NavLinkProps = {
  href: string;
  className?: ClassName;
  children: ReactNode;
  onClick?: () => void;
};

const NavLink = ({ href, className, children, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const resolved =
    typeof className === 'function' ? className({ isActive }) : className;

  return (
    <NextLink href={href} className={resolved} onClick={onClick}>
      {children}
    </NextLink>
  );
};

export default NavLink;
