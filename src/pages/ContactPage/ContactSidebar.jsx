import CTAButton from "../../components/CTAButton";
import {
  contactDetails,
  contactDirectChannels,
  contactFormOptions,
} from "../../constants";
import { getSafeExternalLinkAttributes } from "../../lib/safeExternalLink";

function ContactSidebar() {
  const directEmailLink = getSafeExternalLinkAttributes(
    contactDetails.directEmailMailto,
  );

  return (
    <aside className="space-y-5">
      <article className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121214]/60 p-6 backdrop-blur-xl shadow-[0_24px_56px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
        <h2 className="text-xl font-semibold">Quick actions</h2>
        <p className="mt-3 text-sm text-white-50">
          Choose the fastest path if you want to reach out directly while the
          request is in motion.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          {directEmailLink ? (
            <CTAButton href={directEmailLink.href}>Email Directly</CTAButton>
          ) : null}
          {contactDirectChannels.map((channel) => (
            <CTAButton
              key={channel.label}
              href={channel.href}
              variant="secondary"
            >
              {channel.label}
            </CTAButton>
          ))}
        </div>
      </article>

      <article className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121214]/60 p-6 backdrop-blur-xl shadow-[0_24px_56px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
        <h2 className="text-xl font-semibold">Project scope types</h2>
        <ul className="mt-4 space-y-2 text-sm text-white-50">
          {contactFormOptions.map((option) => (
            <li key={option.value}>- {option.label}</li>
          ))}
        </ul>
      </article>

      <article className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121214]/60 p-6 backdrop-blur-xl shadow-[0_24px_56px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
        <h2 className="text-xl font-semibold">Direct channels</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {contactDirectChannels.map((item) => {
            const safeLink = getSafeExternalLinkAttributes(item.href);

            if (!safeLink) {
              return (
                <span
                  key={item.label}
                  className="rounded-md border border-black-50 bg-black-100 px-3 py-2 text-sm text-white-50 opacity-60"
                  aria-disabled="true"
                >
                  {item.label}
                </span>
              );
            }

            return (
              <a
                key={item.label}
                href={safeLink.href}
                target={safeLink.target}
                rel={safeLink.rel}
                className="rounded-md border border-black-50 bg-black-100 px-3 py-2 text-sm text-white-50 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </article>
    </aside>
  );
}

export default ContactSidebar;
