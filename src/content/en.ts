import type { Dictionary } from "./types";
import { siteConfig } from "@/lib/site-config";

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
  },

  home: {
    heroEyebrow: "News · Production · Social responsibility",
    heroTitle: "Your close companion at every step",
    heroLead:
      "From honest, fact-based news to high-quality documentary, biography, advertising, and media training — all under one roof.",
    heroPrimaryCta: {
      label: "Read Right Sanchar",
      href: siteConfig.rightSanchar.url,
      external: true,
    },
    heroSecondaryCta: { label: "What we do", href: "production" },
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
        slug: "advertising",
        title: "Advertising",
        text: "Creative campaigns that turn a brand message into something worth remembering.",
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
      inPrimaryNav: true,
      group: "services",
      body: {
        status: "translated",
        paragraphs: [
          "We turn ideas, stories, and messages into living images. Using high-end technology and a creative team, Najikako Sathi Media produces effective documentaries, inspiring biographies, striking advertisements, and a range of social and commercial videos.",
          "Our focus stays on deep study of the subject, excellent storytelling, and quality picture and sound editing. From biographies that surface the story behind a person or an institution to commercial advertising that builds a brand and public-awareness videos, we are committed to visual work that moves the viewer and leaves a lasting mark.",
        ],
      },
      subsections: [
        {
          id: "biography",
          title: "Biography",
          lead: "Cinematic biography films that bring a life to the screen.",
          body: {
            status: "doc",
            paragraphs: [
              "We bring lives to the screen by crafting compelling, cinematic biography videos that turn personal stories, family legacies, corporate histories, and historical journeys into unforgettable visual experiences.",
            ],
          },
        },
        {
          id: "documentary",
          title: "Documentary",
          lead: "Real life and truth, brought to the screen.",
          body: {
            status: "doc",
            paragraphs: [
              "We bring real life and truth to the screen. We craft compelling, impactful documentaries that cover everything from personal journeys and social issues to corporate histories and historical events.",
              "Whether you want to shed light on an important social topic, document the growth of your organization or community, or share an inspiring true story with the world, we handle every stage of the process with complete professionalism. From thorough research and scriptwriting to cinematography and cinematic editing, we ensure every documentary is engaging, authentic, and deeply moving.",
            ],
          },
        },
      ],
      cta: { label: "Discuss a project", href: "contact" },
    },

    {
      slug: "advertising",
      navLabel: "Advertising",
      eyebrow: "Service",
      title: "Advertising",
      lead: "Creative campaigns that turn a brand message into something worth remembering.",
      inPrimaryNav: true,
      group: "services",
      body: {
        status: "draft",
        paragraphs: [
          "Najikako Sathi Media builds advertising for television, digital, and social platforms. Concept, script, shoot, edit, and delivery are handled in one place, by one team.",
          "Every campaign starts with the market. Who the audience is, what the message has to say, and how the brand should sound — get those three right and short-form work leaves a long impression.",
        ],
      },
      bullets: [
        { title: "TV commercials", text: "Broadcast-grade TVCs, from concept to final master." },
        { title: "Digital campaigns", text: "Short, targeted cuts built for social feeds." },
        { title: "Corporate films", text: "Company profiles and product promotion videos." },
        { title: "Radio jingles", text: "Audio writing, recording, and mixing." },
      ],
      cta: { label: "Request a proposal", href: "contact" },
    },

    {
      slug: "training",
      navLabel: "Training",
      eyebrow: "Service",
      title: "Media & skill development training",
      lead: "Hands-on programs in journalism, video production, and digital content.",
      inPrimaryNav: true,
      group: "services",
      body: {
        status: "draft",
        paragraphs: [
          "Running training programs in media and skill development is part of our regular work. Sessions are not lectures — participants build their own material as they learn.",
          "Separate tracks run for students, early-career journalists, in-house communication teams, and entrepreneurs. On request, training can be delivered at your own office.",
        ],
      },
      bullets: [
        { title: "Journalism basics", text: "News writing, source verification, and media ethics." },
        { title: "Mobile journalism", text: "Reporting, shooting, and editing from a phone." },
        { title: "Video production", text: "Camera, lighting, sound, and editing in practice." },
        { title: "Digital content", text: "Storytelling and distribution strategy for social platforms." },
      ],
      cta: { label: "Ask about training", href: "contact" },
    },

    {
      slug: "social-impact",
      navLabel: "Social initiatives",
      eyebrow: "Social responsibility",
      title: "Work aimed at transforming communities",
      lead: "Alongside commercial media services, we stay actively engaged in social initiatives.",
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
