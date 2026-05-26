import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getSafeExternalLinkAttributes } from "../lib/safeExternalLink";

const variantClasses = {
  primary:
    "border border-[#f3c7aa]/70 bg-[linear-gradient(135deg,#f8efe8_0%,#d4865d_100%)] text-black shadow-[0_18px_42px_rgba(212,134,93,0.22),0_12px_32px_rgba(0,0,0,0.32)] hover:border-[#ffd9c2] hover:shadow-[0_22px_54px_rgba(212,134,93,0.32),0_14px_34px_rgba(0,0,0,0.34)]",
  secondary:
    "border border-[#d4865d]/38 bg-[linear-gradient(135deg,rgba(212,134,93,0.13),rgba(255,255,255,0.045))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#d4865d]/70 hover:bg-[#d4865d]/16 hover:text-white hover:shadow-[0_16px_36px_rgba(212,134,93,0.16),inset_0_1px_0_rgba(255,255,255,0.1)]",
  ghost:
    "border border-white/14 bg-black-100/92 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#d4865d]/50 hover:bg-[#d4865d]/10 hover:text-white",
};

const sizeClasses = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-sm md:text-base",
  lg: "min-h-[3.25rem] px-6 py-3.5 text-base",
};

const CTAButton = forwardRef(function CTAButton(
  {
    to,
    href,
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...rest
  },
  ref,
) {
  const content = (
    <>
      <span className="relative z-10 min-w-0 text-center leading-tight">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="relative z-10 size-4 flex-none transition-transform duration-300 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </>
  );
  const classNames = `group inline-flex max-w-full items-center justify-center gap-2 rounded-lg font-semibold transition-[transform,border-color,background-color,box-shadow,color] duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4865d]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    const safeLink = getSafeExternalLinkAttributes(href);

    if (!safeLink) {
      return (
        <span
          ref={ref}
          className={`${classNames} cursor-not-allowed opacity-60`}
          aria-disabled="true"
          {...rest}
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={safeLink.href}
        className={classNames}
        target={safeLink.target}
        rel={safeLink.rel}
        {...rest}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link ref={ref} to={to} className={classNames} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} type="button" className={classNames} {...rest}>
      {content}
    </button>
  );
});

export default CTAButton;
