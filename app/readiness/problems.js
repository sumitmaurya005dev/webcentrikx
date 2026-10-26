export const problemGroups = [
  {
    title: "Website problems",
    items: [
      ["unclear-offer", "Visitors do not quickly understand what we offer."],
      ["slow", "Our website loads slowly, especially on mobile."],
      ["mobile", "Pages or forms are difficult to use on a phone."],
      ["outdated", "The design no longer reflects the quality of our business."],
      ["conversion", "Visitors browse but rarely enquire or buy."],
      ["no-website", "We need a website or online store from scratch."],
    ],
  },
  {
    title: "Enquiries and sales",
    items: [
      ["missed", "Messages arrive after hours and get missed."],
      ["slow-replies", "Our team takes too long to respond to new leads."],
      ["unqualified", "We spend time on enquiries that are not a good fit."],
      ["scattered", "Leads are scattered across WhatsApp, email, and DMs."],
      ["follow-up", "We forget or delay follow-ups and lose opportunities."],
      ["booking", "Customers cannot easily book a call or appointment."],
    ],
  },
  {
    title: "Manual work and automation",
    items: [
      ["data-entry", "We copy the same information between different tools."],
      ["crm", "Our CRM or lead sheet is not updated consistently."],
      ["orders", "Orders, requests, or bookings need too much manual handling."],
      ["updates", "Customers do not get timely status updates."],
      ["content", "Creating and publishing routine content takes too much time."],
      ["handoff", "We need AI assistance with a clear human handoff."],
    ],
  },
];

export const problems = problemGroups.flatMap(group => group.items);
