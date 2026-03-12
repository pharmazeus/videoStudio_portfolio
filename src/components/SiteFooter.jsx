import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

function SiteFooter() {
  return (
    <footer className="border-t border-black-50 py-10">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-5 text-sm text-white-50 md:flex-row md:items-center md:justify-between md:px-10 xl:px-20">
        <p>Digital Systems Creator for modern brands.</p>

        <div className="flex flex-wrap items-center gap-4">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <Link to="/contact" className="transition-colors hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
