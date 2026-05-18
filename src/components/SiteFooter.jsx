import { Link } from "react-router-dom";

import { socialLinks } from "../constants";
import { getSafeExternalLinkAttributes } from "../lib/safeExternalLink";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="4.25"
        y="4.25"
        width="15.5"
        height="15.5"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.8" cy="7.25" r="1.05" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.8 10v8M6.8 7.2v.1M10.8 18v-8M10.8 13.8c0-2.2 1.25-3.95 3.45-3.95 2.05 0 3.15 1.35 3.15 3.65V18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <rect
        x="3.75"
        y="3.75"
        width="16.5"
        height="16.5"
        rx="3.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const socialIconMap = {
  insta: InstagramIcon,
  linkedin: LinkedinIcon,
};

const socialLinkClass =
  "border-white/10 bg-white/[0.03] text-white-50 hover:border-copper-50/50 hover:bg-copper-50/10 hover:text-white";

function SiteFooter() {
  return (
    <footer className="border-t border-black-50 py-10">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-5 text-sm text-white-50 md:flex-row md:items-center md:justify-between md:px-10 xl:px-20">
        <Link
          to="/"
          className="group flex w-fit flex-col leading-tight transition-colors hover:text-white"
          aria-label="Digital Systems Creator homepage"
        >
          <span className="font-medium text-white">
            Digital Systems Creator
          </span>
          <span>for modern brands.</span>
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          {socialLinks.map((item) => {
            const safeLink = getSafeExternalLinkAttributes(item.href);
            const SocialIcon = socialIconMap[item.icon];

            if (!safeLink) {
              return (
                <span
                  key={item.label}
                  className={`flex size-10 cursor-not-allowed items-center justify-center rounded-full border opacity-60 ${socialLinkClass}`}
                  aria-disabled="true"
                  aria-label={item.label}
                >
                  {SocialIcon ? (
                    <SocialIcon aria-hidden="true" className="size-[18px]" />
                  ) : (
                    item.label
                  )}
                </span>
              );
            }

            return (
              <a
                key={item.label}
                href={safeLink.href}
                target={safeLink.target}
                rel={safeLink.rel}
                className={`flex size-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-50 ${socialLinkClass}`}
                aria-label={item.label}
              >
                {SocialIcon ? (
                  <SocialIcon aria-hidden="true" className="size-[18px]" />
                ) : (
                  item.label
                )}
              </a>
            );
          })}
          <Link to="/contact" className="transition-colors hover:text-white">
            Contact
          </Link>
          <Link to="/recruiters" className="transition-colors hover:text-white">
            Recruiter Portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
