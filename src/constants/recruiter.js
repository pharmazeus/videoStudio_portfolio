export const recruiterPortfolio = {
  hero: {
    eyebrow: "Recruiter Portfolio",
    title: "Full-stack depth, kept separate from the client-facing pitch.",
    description:
      "This page is for recruiters and technical reviewers who want the broader engineering story behind the portfolio: product thinking, frontend execution, serverless routing, integrations, tests, and production hygiene.",
  },
  technicalHighlights: [
    {
      title: "Interactive frontend systems",
      description:
        "React and Vite interfaces with routed pages, reusable components, responsive layouts, and GSAP-driven interaction where motion helps the story.",
    },
    {
      title: "Production-minded app structure",
      description:
        "Data-driven content, case-study templates, media preview cards, pricing flows, contact routing, and deployment-specific rewrites are kept organized instead of hardcoded page by page.",
    },
    {
      title: "Serverless and integration work",
      description:
        "Contact submissions run through a Vercel serverless function with validation, normalized payloads, Resend REST email delivery, and local/testable helper modules.",
    },
    {
      title: "Quality and maintainability",
      description:
        "Tests cover contact-form behavior, safe external links, and contact payload handling. Lint/build checks stay part of the handoff process.",
    },
  ],
  capabilityGroups: [
    {
      title: "Frontend",
      items: [
        "React component architecture",
        "Responsive UI systems",
        "Tailwind CSS styling",
        "Motion with GSAP",
        "Accessible links, forms, and navigation",
      ],
    },
    {
      title: "Backend / integration",
      items: [
        "Vercel serverless routes",
        "Request validation",
        "Email delivery through Resend REST",
        "Environment-based configuration",
        "Local and deployed route parity",
      ],
    },
    {
      title: "Product execution",
      items: [
        "Offer and pricing structure",
        "Case-study content systems",
        "Video/media catalog workflows",
        "Conversion-focused contact paths",
        "Recruiter/client audience separation",
      ],
    },
  ],
  evidence: [
    "This site is both a client-facing business presence and a live product surface.",
    "The contact flow is implemented as a real API path, not a static mail link.",
    "The work catalog uses reusable data and card components for future expansion.",
    "Production routing is accounted for in Vercel so direct page URLs resolve correctly.",
  ],
};
