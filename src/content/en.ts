import type { Dictionary } from "./types";
import { siteConfig } from "@/lib/site-config";
import { servicesEn, servicesHubEn } from "./services.en";

/**
 * English content.
 *
 * Paragraphs marked `status: "doc"` are the English text of Najik.docx as the
 * client wrote it (sentence breaks are theirs; only paragraph grouping is
 * ours). `translated` marks a faithful rendering of a paragraph the document
 * supplies in Nepali only. `draft` marks copy written for a service the
 * document names but does not describe. See docs/source-of-truth.md.
 */
export const en: Dictionary = {
  locale: "en",
  siteName: siteConfig.shortName,
  metaTitle: "Najikako Sathi Media Pvt. Ltd. — News, Production & Training",
  metaDescription:
    "Najikako Sathi Media Pvt. Ltd. is a dynamic, multi-dimensional media house in Kathmandu — Right Sanchar news portal, documentary and biography production, advertising, and media training.",
  keywords: [
    "Najikako Sathi Media",
    "Right Sanchar",
    "documentary production Nepal",
    "biography video",
    "advertising agency Kathmandu",
    "media training Nepal",
  ],

  ui: {
    skipToContent: "Skip to main content",
    menu: "Menu",
    close: "Close",
    languageSwitcherLabel: "Language",
    readMore: "Read more",
    visitPortal: "Visit Right Sanchar",
    callUs: "Call us",
    emailUs: "Email us",
    backToTop: "Back to top",
    footerRights: "All rights reserved.",
    footerVat: "VAT",
    footerTagline: "Your trusted, close companion at every step.",
    draftBadge: "Draft — pending approval",
    navHeading: "Pages",
    contactHeading: "Contact",
    companyHeading: "Company",
    servicesHeading: "Services",
    portalTagline: "Our digital news portal",
    breadcrumbLabel: "Breadcrumb",
    deliverablesHeading: "What you get",
    processHeading: "How the work runs",
    faqHeading: "Frequently asked questions",
    relatedHeading: "More from this department",
    relatedLead: "Same team, adjacent work.",
    allServicesLabel: "All services",
    watchLabel: "Watch the film",
    exploreLabel: "Open the page",
  },

  home: {
    heroEyebrow: "News, Production, Social responsibility",
    heroTitle: "Your close companion at every step",
    heroLead:
      "From honest, fact-based news to high-quality documentary, biography, advertising, and media training — all under one roof.",
    heroPrimaryCta: {
      label: "Read Right Sanchar",
      href: siteConfig.rightSanchar.url,
      external: true,
    },
    heroSecondaryCta: { label: "What we do", href: "services" },
    tickerItems: [
      "Right Sanchar",
      "Documentary",
      "Biography",
      "Advertising",
      "Media training",
      "Social initiatives",
    ],

    introHeading: "Who we are",
    intro: {
      status: "doc",
      paragraphs: [
        "Najikako Sathi Media Pvt. Ltd. is a dynamic, multi-dimensional media house committed to advancing information, entertainment, and social responsibility together. Through Right Sanchar, we bring you honest, fact based, and unbiased news, alongside high quality documentary and video production, impactful advertising campaigns, and a range of training programs focused on media and skill development.",
        "Beyond our core media services, we remain actively engaged in social initiatives aimed at transforming communities. True to our name, our goal is to walk alongside you at every step as your trusted, close companion while adding new dimensions to the world of communication.",
      ],
    },

    whatWeDoHeading: "What we do",
    whatWeDoLead:
      "News, visual production, advertising, and training — four pillars, one media house.",
    cards: [
      {
        slug: "right-sanchar",
        title: "Media: Right Sanchar",
        text: "A digital news portal delivering accurate, truthful, and unbiased information to the public.",
      },
      {
        slug: "production",
        title: "Production",
        text: "Documentary, biography, and corporate video — from research to final edit.",
      },
      {
        slug: "social-media",
        title: "Social media handling",
        text: "Profile creation, consulting, boosting, ad design, and event coverage.",
      },
      {
        slug: "training",
        title: "Media & skill training",
        text: "Hands-on programs in journalism, video production, and digital content.",
      },
    ],

    sancharHeading: "Right Sanchar — the right information, at the right time",
    sancharLead:
      "Amid a flood of misleading and sponsored news: fact-based reporting, commentary, and investigative work.",
    sancharCta: {
      label: siteConfig.rightSanchar.display,
      href: siteConfig.rightSanchar.url,
      external: true,
    },

    contactHeading: "Let's talk",
    contactLead:
      "Planning a documentary, biography, campaign, or training program? Reach our Anamnagar office.",
  },

  sections: [
    {
      slug: "about",
      navLabel: "About",
      eyebrow: "Introduction",
      title: "Najikako Sathi Media Pvt. Ltd.",
      lead: "A multi-dimensional media house advancing information, entertainment, and social responsibility together.",
      metaTitle: "About — Najikako Sathi Media Pvt. Ltd., Kathmandu",
      metaDescription:
        "Najikako Sathi Media Pvt. Ltd. is a multi-dimensional media house in Anamnagar, Kathmandu: the Right Sanchar news portal, documentary and biography production, advertising, social media handling, and media training.",
      keywords: [
        "Najikako Sathi Media",
        "media company Kathmandu",
        "media house Nepal",
        "Anamnagar media",
      ],
      media: {
        image: {
          src: "/media/sections/about.svg",
          alt: "Najikako Sathi Media Pvt. Ltd. — company introduction",
          width: 1200,
          height: 675,
        },
      },
      inPrimaryNav: true,
      group: "company",
      body: {
        status: "doc",
        paragraphs: [
          "Najikako Sathi Media Pvt. Ltd. is a dynamic, multi-dimensional media house committed to advancing information, entertainment, and social responsibility together. Through Right Sanchar, we bring you honest, fact based, and unbiased news, alongside high quality documentary and video production, impactful advertising campaigns, and a range of training programs focused on media and skill development.",
          "Beyond our core media services, we remain actively engaged in social initiatives aimed at transforming communities. True to our name, our goal is to walk alongside you at every step as your trusted, close companion while adding new dimensions to the world of communication.",
        ],
      },
      bullets: [
        { title: "Truth and impartiality", text: "Only fact-based material goes out under our name." },
        { title: "Craft", text: "High-end equipment and a creative team behind every frame." },
        { title: "Social responsibility", text: "Continuous involvement in community-transforming work." },
      ],
      cta: { label: "Contact us", href: "contact" },
    },

    {
      slug: "right-sanchar",
      navLabel: "Right Sanchar",
      eyebrow: "Media",
      title: "Right Sanchar",
      lead: "The digital news portal operated by Najikako Sathi Media Pvt. Ltd.",
      metaTitle: "Right Sanchar — Digital News Portal by Najikako Sathi",
      metaDescription:
        "Right Sanchar publishes fact-based news, commentary, and investigative work on politics, society, economy, culture, and public interest issues. Operated by Najikako Sathi Media Pvt. Ltd., Kathmandu.",
      keywords: [
        "Right Sanchar",
        "Nepali news portal",
        "investigative journalism Nepal",
        "rightsanchar",
      ],
      media: {
        image: {
          src: "/media/sections/right-sanchar.svg",
          alt: "Right Sanchar — digital news portal",
          width: 1200,
          height: 675,
        },
      },
      inPrimaryNav: true,
      group: "company",
      body: {
        status: "doc",
        paragraphs: [
          "Right Sanchar is a digital media portal operated by Najikako Sathi Media Pvt. Ltd. dedicated to delivering accurate, truthful, and unbiased information to the public. We are committed on sharing fact based news, insightful commentary, and investigative content on contemporary politics, society, economy, culture, and issues that matter to the public.",
          "Amid a flood of misleading and sponsored news, our core mission is simple: the right information, at the right time, with the right perspective. Prioritizing the voice of the people, Right Sanchar remains continuously active in driving positive change and raising awareness across society.",
        ],
      },
      bullets: [
        { title: "Politics and society", text: "Fact-based analysis of contemporary events." },
        { title: "Economy", text: "Markets, policy, and the issues that reach household budgets." },
        { title: "Investigative work", text: "Evidence-led reporting, not recycled press releases." },
      ],
      cta: {
        label: siteConfig.rightSanchar.display,
        href: siteConfig.rightSanchar.url,
        external: true,
      },
    },

    {
      slug: "production",
      navLabel: "Production",
      eyebrow: "Production",
      title: "From idea to screen",
      lead: "The unit that turns ideas, stories, and messages into living images.",
      metaTitle: "Production — Biography, Documentary, Advertising & Profiles",
      metaDescription:
        "Full-service media production focused on high-quality visual storytelling, corporate branding, and public messaging: biography films, documentaries, advertisements and commercials, and corporate profile making.",
      keywords: [
        "production house Kathmandu",
        "video production Nepal",
        "documentary production",
        "biography video Nepal",
        "TVC production",
      ],
      media: {
        image: {
          src: "/media/sections/production.svg",
          alt: "Production department — Najikako Sathi Media",
          width: 1200,
          height: 675,
        },
      },
      inPrimaryNav: true,
      group: "services",
      isServiceCategory: true,
      body: {
        status: "translated",
        paragraphs: [
          "We turn ideas, stories, and messages into living images. Using high-end technology and a creative team, Najikako Sathi Media produces effective documentaries, inspiring biographies, striking advertisements, and a range of social and commercial videos.",
          "Our focus stays on deep study of the subject, excellent storytelling, and quality picture and sound editing. From biographies that surface the story behind a person or an institution to commercial advertising that builds a brand and public-awareness videos, we are committed to visual work that moves the viewer and leaves a lasting mark.",
        ],
      },
      cta: { label: "Discuss a project", href: "contact" },
    },

    {
      slug: "training",
      navLabel: "Training",
      eyebrow: "Service",
      title: "Media & skill development training",
      lead: "Hands-on programs in journalism, video production, and digital content.",
      metaTitle: "Media & Skill Development Training in Kathmandu, Nepal",
      metaDescription:
        "Capacity building and practical technical training for individuals, corporate teams, journalists, and creative professionals: social media strategy, content creation, journalism basics, technical production, and monetisation.",
      keywords: [
        "media training Nepal",
        "journalism training Kathmandu",
        "videography course Nepal",
        "social media training",
        "skill development Kathmandu",
      ],
      media: {
        image: {
          src: "/media/sections/training.svg",
          alt: "Media and skill development training — Najikako Sathi Media",
          width: 1200,
          height: 675,
        },
      },
      inPrimaryNav: true,
      group: "services",
      isServiceCategory: true,
      body: {
        status: "draft",
        paragraphs: [
          "Running training programs in media and skill development is part of our regular work. Sessions are not lectures — participants build their own material as they learn.",
          "Separate tracks run for students, early-career journalists, in-house communication teams, and entrepreneurs. On request, training can be delivered at your own office.",
        ],
      },
      cta: { label: "Ask about training", href: "contact" },
    },

    {
      slug: "social-media",
      navLabel: "Social media",
      eyebrow: "Social media",
      title: "Social media handling",
      lead:
        "Strategic digital presence, branding, audience engagement, and performance marketing.",
      metaTitle: "Social Media Handling & Management in Kathmandu, Nepal",
      metaDescription:
        "Strategic digital presence management, branding, audience engagement, and performance marketing across major platforms: profile creation, media consulting, boosting and campaigns, ad design, and event coverage.",
      keywords: [
        "social media management Nepal",
        "digital marketing Kathmandu",
        "Facebook boosting Nepal",
        "media consulting",
        "event coverage Nepal",
      ],
      media: {
        image: {
          src: "/media/sections/social-media.svg",
          alt: "Social media handling — Najikako Sathi Media",
          width: 1200,
          height: 675,
        },
      },
      inPrimaryNav: false,
      group: "services",
      isServiceCategory: true,
      body: {
        status: "portfolio",
        paragraphs: [
          "Strategic digital presence management, branding, audience engagement, and performance marketing across major digital media platforms.",
          "Opening a page is easy; keeping it credible is not. From the groundwork of a profile through the month's content, the paid campaigns, and live coverage of an event, all five services are run by one team — which is why the voice stays the same across them.",
        ],
      },
      cta: { label: "Discuss our digital presence", href: "contact" },
    },

    {
      slug: "research-development",
      navLabel: "Research & development",
      eyebrow: "Research & development",
      title: "Research & development",
      lead:
        "Field research, media monitoring, data collection, and multi-sectoral development work.",
      metaTitle: "Research & Development — Field Studies and Collaboration",
      metaDescription:
        "In-depth field research, media monitoring, data collection, and multi-sectoral development initiatives in collaboration with key stakeholders: source research and government and non-government collaboration.",
      keywords: [
        "research services Nepal",
        "baseline study Nepal",
        "impact assessment",
        "media monitoring Nepal",
        "development collaboration",
      ],
      media: {
        image: {
          src: "/media/sections/research-development.svg",
          alt: "Research and development — Najikako Sathi Media",
          width: 1200,
          height: 675,
        },
      },
      inPrimaryNav: false,
      group: "services",
      isServiceCategory: true,
      body: {
        status: "portfolio",
        paragraphs: [
          "In-depth field research, media monitoring, data collection, and multi-sectoral development initiatives in collaboration with key stakeholders.",
          "Research is not a separate department here so much as the floor everything else stands on. The same fieldwork supports a funder's report and a documentary, which is why a study and a film are usually commissioned together.",
        ],
      },
      cta: { label: "Discuss a study", href: "contact" },
    },

    {
      slug: "social-impact",
      navLabel: "Social initiatives",
      eyebrow: "Social responsibility",
      title: "Work aimed at transforming communities",
      lead: "Alongside commercial media services, we stay actively engaged in social initiatives.",
      metaTitle: "Social Initiatives — Work Aimed at Transforming Communities",
      metaDescription:
        "Awareness content, community partnerships, and communication support on issues of public concern — the social responsibility side of Najikako Sathi Media Pvt. Ltd.",
      keywords: ["social initiatives Nepal", "awareness campaign", "community media"],
      inPrimaryNav: false,
      group: "company",
      body: {
        status: "draft",
        paragraphs: [
          "Staying actively engaged in social initiatives alongside commercial media services is a value the company was founded on, not an add-on.",
          "Awareness content, community partnerships, and communication support on issues of public concern — this is where we work together with institutions and communities.",
        ],
      },
      cta: { label: "Partner with us", href: "contact" },
    },

    {
      slug: "team",
      navLabel: "Team",
      eyebrow: "Team",
      title: "Our team",
      lead: "Every piece of work comes out of one creative team and its equipment.",
      metaTitle: "Our Team — Editorial, Camera, Edit, and Production",
      metaDescription:
        "Editorial, camera, edit, and production management — the four desks behind every project at Najikako Sathi Media Pvt. Ltd., Kathmandu.",
      keywords: ["Najikako Sathi Media team", "media team Kathmandu"],
      inPrimaryNav: false,
      group: "company",
      body: {
        status: "draft",
        paragraphs: [
          "Editorial, camera, edit, and production management — four desks working the same project.",
          "Names, roles, and photographs are still to be added. This page will be updated once the final details arrive.",
        ],
      },
      cta: { label: "Contact us", href: "contact" },
    },

    {
      slug: "careers",
      navLabel: "Careers",
      eyebrow: "Careers",
      title: "Work with us",
      lead: "Open door for people serious about journalism and visual production.",
      metaTitle: "Careers — Work With Najikako Sathi Media",
      metaDescription:
        "Openings and open applications for reporters, camera operators, video editors, and content writers at Najikako Sathi Media Pvt. Ltd., Anamnagar, Kathmandu.",
      keywords: ["media jobs Nepal", "journalist vacancy Kathmandu", "video editor job Nepal"],
      inPrimaryNav: false,
      group: "company",
      body: {
        status: "draft",
        paragraphs: [
          "Even with no position formally open, we welcome applications from reporters, camera operators, video editors, and content writers.",
          `Send a CV and samples of your work to ${siteConfig.email}.`,
        ],
      },
      cta: { label: "Send an application", href: "contact" },
    },
  ],

  services: servicesEn,
  servicesHub: servicesHubEn,

  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    lead: "Documentary, biography, advertising, or training — ask about any of it.",
    labels: {
      address: "Address",
      email: "Email",
      phone: "Phone",
      vat: "VAT number",
      hours: "Office hours",
      portal: "News portal",
      follow: "Follow us",
    },
    form: {
      heading: "Send a message",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      submit: "Compose email",
      hint: "This form opens the message in your own email app, so you can check it before sending.",
    },
    note: "Mentioning the type of project, the timeline you have in mind, and a budget range gets you a faster answer.",
  },
};
