export const STATUS_MAP = {
  validation_error: {
    message: "Fix the highlighted fields, then send again.",
    tone: "border-white/12 bg-white/[0.04] text-white-50",
  },
  rate_limited: {
    message:
      "Too many submissions in a short time. Please wait a minute and try again, or reach out by direct email, Telegram, or Instagram.",
    tone: "border-white/12 bg-white/[0.04] text-white-50",
  },
  send_failed: {
    message:
      "The form could not send right now. Your details are still here; try direct email, Telegram, or Instagram.",
    tone: "border-white/12 bg-white/[0.04] text-white-50",
  },
};
