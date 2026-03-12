import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-white text-black hover:bg-black-50 hover:text-white border border-white/70",
  secondary:
    "bg-transparent text-white hover:bg-white/10 border border-white/30",
  ghost:
    "bg-black-100 text-white hover:bg-black-50 border border-black-50",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm md:text-base",
  lg: "px-6 py-3.5 text-base",
};

function CTAButton({
  to,
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) {
  const classNames = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    const isExternal = /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        className={classNames}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classNames} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classNames} {...rest}>
      {children}
    </button>
  );
}

export default CTAButton;
