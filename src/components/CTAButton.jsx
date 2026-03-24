import { forwardRef } from "react";
import { Link } from "react-router-dom";

import { getSafeExternalLinkAttributes } from "../lib/safeExternalLink";

const variantClasses = {
  primary:
    "border border-white/70 bg-white text-black shadow-[0_18px_40px_rgba(0,0,0,0.28)] hover:border-[#d4865d]/60 hover:bg-[#d4865d] hover:text-black",
  secondary:
    "border border-white/30 bg-white/[0.03] text-white hover:border-[#d4865d]/55 hover:bg-[#d4865d]/12 hover:text-white",
  ghost:
    "border border-black-50 bg-black-100 text-white hover:border-[#d4865d]/45 hover:bg-[#d4865d]/10 hover:text-white",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm md:text-base",
  lg: "px-6 py-3.5 text-base",
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
  const classNames = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4865d]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

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
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link ref={ref} to={to} className={classNames} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} type="button" className={classNames} {...rest}>
      {children}
    </button>
  );
});

export default CTAButton;
