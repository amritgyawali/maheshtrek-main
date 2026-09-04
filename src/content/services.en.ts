import type { ServicePage, ServicesHub } from "./types";
import { siteConfig } from "@/lib/site-config";

/**
 * English leaf-service pages.
 *
 * `status: "portfolio"` marks body copy taken from
 * `Service_Portfolio_Overview.pdf` — the client's scope-of-work document —
 * reproduced with only the joins between its sentences written by us. The
 * deliverables, the process stages, and the FAQ answers are ours (`draft`) and
 * carry `supportStatus` so a reviewer can switch the badges on and see exactly
 * which surfaces still need sign-off.
 *
 * Slugs are locale-independent: `/ne/production/biography` and
 * `/en/production/biography` are the same page in two languages.
 */

/** Every leaf image is the same shape, so the grids never reflow. */
const ART = (slug: string, alt: string) => ({
  src: `/media/services/${slug}.svg`,
  alt,
  width: 1200,
  height: 675,
});

export const servicesEn: ServicePage[] = [
  // ---------------------------------------------------------------- production
  {
    slug: "biography",
    category: "production",
    navLabel: "Biography",
    eyebrow: "Production",
    title: "Biography films",
    lead: "In-depth video and photo biography for leaders, families, and institutions.",
    metaTitle: "Biography Video Production in Nepal — Life Stories on Film",
    metaDescription:
      "Cinematic biography films and photo archives for leaders, dynamic personalities, and family legacies. Research, scripting, interviews, shooting, and edit by Najikako Sathi Media, Kathmandu.",
    keywords: [
      "biography video production Nepal",
      "biography film Kathmandu",
      "life story documentary",
      "personal archive video",
      "jiwani video",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "In-depth video and photo biographical storytelling for key figures, leaders, dynamic personalities, and historical personal archives. We capture lifetime achievements, personal narratives, and legacy.",
        "We bring lives to the screen by crafting compelling, cinematic biography videos that turn personal stories, family legacies, corporate histories, and historical journeys into unforgettable visual experiences.",
      ],
    },
    deliverables: [
      { title: "Feature biography film", text: "A long-form cut built around the interview spine, colour graded and mixed." },
      { title: "Short cuts for social", text: "Vertical and square edits pulled from the same footage for digital feeds." },
      { title: "Photo archive", text: "Portrait session plus restored and catalogued archival stills." },
      { title: "Raw material handover", text: "Interview masters and transcripts, delivered on a drive the family keeps." },
    ],
    process: [
      { title: "Research", text: "Reading, family interviews, and archive hunting before a camera is switched on." },
      { title: "Interview", text: "Multi-camera sit-downs, recorded in long form so nothing has to be re-staged." },
      { title: "Verification", text: "Dates, places, and claims checked against documents and second sources." },
      { title: "Edit and delivery", text: "Assembly, grade, sound mix, and a review round before the final master." },
    ],
    faqs: [
      {
        question: "How long does a biography film take?",
        answer:
          "Most projects run six to twelve weeks: research and interviews take the first half, editing and review the second. A single-interview short can be delivered faster; a multi-decade archive project takes longer.",
      },
      {
        question: "What if the family only has old photographs and no footage?",
        answer:
          "Photographs are enough. We scan and restore stills, film the objects and places that carry the story, and record the voices of the people who remember it, then build the film from that material.",
      },
      {
        question: "Who owns the footage?",
        answer:
          "You do. Interview masters, scans, and transcripts are handed over with the finished film so the family or institution keeps a usable archive, not only an export.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("biography", "Biography film production — Najikako Sathi Media") },
    cta: { label: "Discuss a biography", href: "contact" },
  },

  {
    slug: "documentary",
    category: "production",
    navLabel: "Documentary",
    eyebrow: "Production",
    title: "Documentary film production",
    lead: "End-to-end thematic storytelling on social issues, heritage, and development.",
    metaTitle: "Documentary Film Production in Nepal — Research to Final Cut",
    metaDescription:
      "End-to-end documentary production covering social issues, cultural heritage, institutional milestones, and development projects. Research, scripting, cinematography, and cinematic editing in Kathmandu.",
    keywords: [
      "documentary production Nepal",
      "documentary film Kathmandu",
      "vrittachitra",
      "development documentary",
      "NGO video production Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "End-to-end thematic storytelling and documentary film creation covering social issues, cultural heritage, institutional milestones, and development projects.",
        "Whether you want to shed light on an important social topic, document the growth of your organization or community, or share an inspiring true story with the world, we handle every stage with complete professionalism. From thorough research and scriptwriting to cinematography and cinematic editing, we make sure every documentary is engaging, authentic, and deeply moving.",
      ],
    },
    deliverables: [
      { title: "Full documentary", text: "Broadcast- and festival-ready master with subtitles in Nepali and English." },
      { title: "Field footage library", text: "Logged and labelled rushes, handed over with the final cut." },
      { title: "Trailer and teasers", text: "A trailer plus short cuts sized for social distribution." },
      { title: "Stills package", text: "Production photography usable in reports and press releases." },
    ],
    process: [
      { title: "Scoping", text: "Subject, audience, and the claim the film has to be able to defend." },
      { title: "Field research", text: "Location recce, source mapping, and consent before the shoot." },
      { title: "Shoot", text: "Interviews, observational footage, and the b-roll the edit will need." },
      { title: "Post", text: "Assembly, fact pass, grade, mix, subtitles, and delivery." },
    ],
    faqs: [
      {
        question: "Do you work with NGOs and government projects?",
        answer:
          "Yes. Baseline films, impact documentaries, and milestone records for federal and local bodies, NGOs, and INGOs are a regular part of the work, and are usually paired with the research services on the research and development pages.",
      },
      {
        question: "Can the film be delivered in both Nepali and English?",
        answer:
          "Yes. Subtitles in both languages are part of the standard delivery, and a separate English or Nepali voice-over can be recorded on request.",
      },
      {
        question: "Who writes the script?",
        answer:
          "We do, from the research, and you approve it before the shoot. Where an organisation has its own writer, our team works to their draft instead.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("documentary", "Documentary film production — Najikako Sathi Media") },
    cta: { label: "Discuss a documentary", href: "contact" },
  },

  {
    slug: "advertising",
    category: "production",
    navLabel: "Advertisements",
    eyebrow: "Production",
    title: "Advertisements & commercials",
    lead: "TV commercials, digital campaigns, and commercial photography that hold attention.",
    metaTitle: "TV Commercial & Ad Film Production in Kathmandu, Nepal",
    metaDescription:
      "High-impact promotional videos, TV commercials, digital ad campaigns, and commercial photo shoots built for brand awareness and market reach. Concept to final master under one roof.",
    keywords: [
      "TVC production Nepal",
      "advertising agency Kathmandu",
      "ad film production Nepal",
      "commercial photography Kathmandu",
      "bigyapan",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "High-impact promotional videos, TV commercials (TVCs), digital ad campaigns, and commercial photo shoots tailored for brand awareness and market reach.",
        "Every campaign starts with the market. Who the audience is, what the message has to say, and how the brand should sound — get those three right and short-form work leaves a long impression. Concept, script, shoot, edit, and delivery are handled in one place, by one team.",
      ],
    },
    deliverables: [
      { title: "Broadcast master", text: "A TVC cut to channel specification, with the durations the buy needs." },
      { title: "Digital cuts", text: "Feed-native versions in 16:9, 1:1, and 9:16 with burned-in subtitles." },
      { title: "Commercial stills", text: "Product and lifestyle photography shot alongside the film." },
      { title: "Radio and audio", text: "Jingle writing, voice recording, and mix for radio and streaming spots." },
    ],
    process: [
      { title: "Brief", text: "Audience, message, budget, and the one thing the ad has to make people do." },
      { title: "Concept", text: "Two or three routes, storyboarded, before anything is committed." },
      { title: "Production", text: "Casting, location, shoot, and direction against the approved board." },
      { title: "Delivery", text: "Edit, grade, mix, and versioning for every channel in the plan." },
    ],
    faqs: [
      {
        question: "Do you also place the ads?",
        answer:
          "We build the material and can run the paid distribution on digital platforms through the Facebook boosting and digital campaigns service. Television airtime is booked with the channel.",
      },
      {
        question: "How many versions come with a commercial?",
        answer:
          "The standard package covers the broadcast duration plus feed-native cuts in landscape, square, and vertical. Extra durations and language versions are quoted per project.",
      },
      {
        question: "Can you work to an existing brand guideline?",
        answer:
          "Yes. Where a brand book, type, or palette exists, the production works inside it; where it does not, the profile making service can build one first.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("advertising", "Advertising and commercial production — Najikako Sathi Media") },
    cta: { label: "Request a proposal", href: "contact" },
  },

  {
    slug: "profile-making",
    category: "production",
    navLabel: "Profile making",
    eyebrow: "Production",
    title: "Profile making",
    lead: "Corporate and organisational profiles as video, photography, and presentation.",
    metaTitle: "Corporate Profile Video & Company Profile Making in Nepal",
    metaDescription:
      "Professional corporate and organizational profile creation using structured video summaries, photographic showcases, and audio-visual presentations that show company identity and capacity.",
    keywords: [
      "corporate profile video Nepal",
      "company profile making Kathmandu",
      "organisational profile video",
      "audio visual presentation Nepal",
      "profile making",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Professional corporate and organizational profile creation using structured video summaries, photographic showcases, and audio-visual presentations to showcase company identity and capacity.",
        "A profile has one job: to answer, in a few minutes, what an organisation does, who it does it for, and why it can be trusted with the next contract. We build it from the same footage in three forms — a film to open a meeting with, a photo set for the report, and a deck for the pitch.",
      ],
    },
    deliverables: [
      { title: "Profile film", text: "A two- to four-minute summary of what the organisation does and for whom." },
      { title: "Facility photography", text: "Workplace, team, and product stills usable in print and online." },
      { title: "Presentation deck", text: "An audio-visual version for meetings, tenders, and investor rooms." },
      { title: "Bilingual versions", text: "Nepali and English cuts, so one shoot serves both audiences." },
    ],
    process: [
      { title: "Discovery", text: "Interviews with leadership on capacity, history, and the audience for the profile." },
      { title: "Structure", text: "The running order the film and the deck will share, approved before the shoot." },
      { title: "Capture", text: "One shoot covering video, stills, and the room tone the edit will need." },
      { title: "Assembly", text: "Film, photo set, and deck delivered together in both languages." },
    ],
    faqs: [
      {
        question: "How long should a company profile film be?",
        answer:
          "Two to four minutes for general use, with a sixty-second cut for social and a thirty-second opener for events. Longer versions are made when a tender specifies a capacity statement.",
      },
      {
        question: "Do you shoot at our offices or in a studio?",
        answer:
          "On site, in most cases. A profile is more convincing when the workplace, the equipment, and the staff are the ones the client will actually meet.",
      },
      {
        question: "Can the profile be updated later?",
        answer:
          "Yes. Project files are retained, so a new milestone or a change of leadership can be cut in without reshooting the whole film.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("profile-making", "Corporate profile production — Najikako Sathi Media") },
    cta: { label: "Build our profile", href: "contact" },
  },

  // ------------------------------------------------------------- social media
  {
    slug: "digital-profile",
    category: "social-media",
    navLabel: "Profile creation",
    eyebrow: "Social media",
    title: "Biography & profile creation",
    lead: "Personal and organisational profiles built and optimised across every channel.",
    metaTitle: "Social Media Profile Creation & Optimisation in Nepal",
    metaDescription:
      "Crafting and optimizing personal and organizational digital profiles across Facebook, YouTube, Instagram, and LinkedIn — establishing brand identity and authority from the first post.",
    keywords: [
      "social media profile creation Nepal",
      "Facebook page setup Kathmandu",
      "LinkedIn profile optimisation Nepal",
      "YouTube channel setup Nepal",
      "digital branding Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Crafting and optimizing personal and organizational digital profiles across channels — Facebook, YouTube, Instagram, and LinkedIn — establishing brand identity and authority.",
        "The work is unglamorous and it decides everything downstream: one name spelled the same way everywhere, one description that says what you actually do, verified contact details, and cover art cut to each platform's real dimensions rather than resized from one file.",
      ],
    },
    deliverables: [
      { title: "Channel setup", text: "Accounts created, claimed, or recovered across the platforms that matter." },
      { title: "Profile art", text: "Avatar, cover, and banner cut to each platform's current specification." },
      { title: "Bio and about copy", text: "Nepali and English descriptions written for search as well as for readers." },
      { title: "Verification and links", text: "Contact details, website, and cross-links checked and consistent." },
    ],
    process: [
      { title: "Audit", text: "What exists, what is abandoned, and what is impersonating you." },
      { title: "Naming", text: "One handle and one display name agreed across every channel." },
      { title: "Build", text: "Profiles created or cleaned, art applied, copy published." },
      { title: "Handover", text: "Access, recovery details, and a short written standard for future posts." },
    ],
    faqs: [
      {
        question: "We already have pages. Is this still useful?",
        answer:
          "Usually more so. Most established accounts carry old names, dead links, and three different descriptions. The audit finds them and the cleanup takes a day or two rather than a rebuild.",
      },
      {
        question: "Do you keep our passwords?",
        answer:
          "No. Access is taken through each platform's own delegated roles, and it is handed back or revoked when the engagement ends.",
      },
      {
        question: "Which platforms do you recommend?",
        answer:
          "It depends on the audience. Most Nepali organisations need Facebook and YouTube first; LinkedIn matters for B2B and institutional work, Instagram and TikTok for consumer brands.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("digital-profile", "Digital profile creation — Najikako Sathi Media") },
    cta: { label: "Set up our channels", href: "contact" },
  },

  {
    slug: "media-consulting",
    category: "social-media",
    navLabel: "Media consulting",
    eyebrow: "Social media",
    title: "Media consulting",
    lead: "Communication strategy, public relations, and crisis handling.",
    metaTitle: "Media Consulting & PR Strategy in Kathmandu, Nepal",
    metaDescription:
      "Strategic advice on communication channels, public relations, crisis management, digital positioning, and targeted public outreach — from a newsroom that knows how the story will be reported.",
    keywords: [
      "media consulting Nepal",
      "PR agency Kathmandu",
      "crisis communication Nepal",
      "digital positioning strategy",
      "public relations Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Strategic advice on communication channels, public relations, crisis management, digital positioning, and targeted public outreach strategies.",
        "Advice from a working newsroom is different from advice from an agency: we can say how a statement will be read by a reporter, which channel a story will break on, and what a correction costs once it has already run.",
      ],
    },
    deliverables: [
      { title: "Communication plan", text: "Audiences, channels, message, and cadence, written down in one document." },
      { title: "Media briefing", text: "Spokesperson preparation and a question bank before an interview." },
      { title: "Crisis protocol", text: "Who speaks, who approves, and how fast — agreed before it is needed." },
      { title: "Monthly review", text: "Coverage and sentiment read against the plan, with what to change." },
    ],
    process: [
      { title: "Listening", text: "What is being said about you now, and where it is being said." },
      { title: "Positioning", text: "The claim you can defend, and the three lines that carry it." },
      { title: "Plan", text: "Channel-by-channel plan with owners and dates." },
      { title: "Standing support", text: "On-call advice as stories break, on a retainer or by the engagement." },
    ],
    faqs: [
      {
        question: "Does consulting mean guaranteed coverage?",
        answer:
          "No, and any agency promising it is selling something else. We prepare the material, the spokesperson, and the timing; editorial decisions stay with the newsroom that receives them.",
      },
      {
        question: "Can you help during an ongoing crisis?",
        answer:
          "Yes. Short emergency engagements are available, though the protocol work is far cheaper before the incident than during it.",
      },
      {
        question: "Is this separate from Right Sanchar?",
        answer:
          "Entirely. Consulting clients receive no editorial treatment on the news portal, and that separation is the reason the advice is worth anything.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("media-consulting", "Media consulting — Najikako Sathi Media") },
    cta: { label: "Book a consultation", href: "contact" },
  },

  {
    slug: "facebook-boosting",
    category: "social-media",
    navLabel: "Boosting & campaigns",
    eyebrow: "Social media",
    title: "Facebook boosting & digital campaigns",
    lead: "Targeted ad placement, audience segmentation, and measured return.",
    metaTitle: "Facebook Ads & Digital Campaign Management in Nepal",
    metaDescription:
      "Targeted ad placement, audience demographic segmentation, post boosting, ROI analysis, and paid performance marketing to maximise reach and conversion across Nepali digital platforms.",
    keywords: [
      "Facebook boosting Nepal",
      "Facebook ads Kathmandu",
      "digital campaign management Nepal",
      "performance marketing Nepal",
      "social media advertising ROI",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Targeted ad placement, audience demographic segmentation, post boosting, ROI analysis, and paid performance marketing to maximize reach and conversion.",
        "Boosting a post is easy; knowing which post to boost, to whom, and when to stop is the job. Every campaign is set up with a measurable objective, a defined audience, and a report that shows what the spend returned rather than how many people saw it.",
      ],
    },
    deliverables: [
      { title: "Campaign build", text: "Objective, audiences, placements, and creative loaded and launched." },
      { title: "Audience segments", text: "Saved demographic, interest, and lookalike audiences you keep." },
      { title: "Creative variants", text: "Several cuts and copy lines tested against each other, not guessed at." },
      { title: "ROI report", text: "Spend, reach, cost per result, and what to do differently next month." },
    ],
    process: [
      { title: "Objective", text: "One measurable outcome — messages, sales, sign-ups, or footfall." },
      { title: "Setup", text: "Pixel or conversion tracking checked before a rupee is spent." },
      { title: "Test", text: "A short learning phase across audiences and creatives." },
      { title: "Scale and report", text: "Budget moved to what works, with a monthly written read-out." },
    ],
    faqs: [
      {
        question: "What is the minimum budget worth spending?",
        answer:
          "Below roughly NPR 15,000 a month the platform cannot learn quickly enough to beat organic posting, so we would rather put that budget into content than into a campaign that never leaves the testing phase.",
      },
      {
        question: "Who pays the platform?",
        answer:
          "You do, directly, from your own ad account. We manage the account rather than resell the spend, so the numbers in the report are the numbers Meta charged.",
      },
      {
        question: "Do you handle TikTok and YouTube ads too?",
        answer:
          "Yes. The same setup, testing, and reporting applies; the platform mix is chosen from where the audience actually is.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("facebook-boosting", "Digital campaign management — Najikako Sathi Media") },
    cta: { label: "Plan a campaign", href: "contact" },
  },

  {
    slug: "social-media-ads",
    category: "social-media",
    navLabel: "Social media ads",
    eyebrow: "Social media",
    title: "Social media advertisements",
    lead: "Visual ads, banners, reels, and copy made for the feed, not resized into it.",
    metaTitle: "Social Media Ad Design & Reel Production in Nepal",
    metaDescription:
      "Designing and publishing bespoke visual ads, banner graphics, short promotional reels, and engaging copywriting tailored specifically for digital feeds in Nepali and English.",
    keywords: [
      "social media ad design Nepal",
      "reels production Kathmandu",
      "banner design Nepal",
      "ad copywriting Nepali",
      "digital creative agency Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Designing and publishing bespoke visual ads, banner graphics, short promotional reels, and engaging copywriting tailored specifically for digital feeds.",
        "A feed is a hostile place for a resized print advert. Work is built at the aspect ratio it will be seen in, legible without sound, and written so the first line survives the two words of preview a phone gives it.",
      ],
    },
    deliverables: [
      { title: "Static ad sets", text: "Feed, story, and banner sizes exported from one designed source." },
      { title: "Short reels", text: "Fifteen- to thirty-second vertical cuts, captioned and sound-optional." },
      { title: "Ad copy", text: "Nepali and English headline and body variants written for testing." },
      { title: "Monthly content pack", text: "A scheduled set of posts, delivered ahead of the month it runs in." },
    ],
    process: [
      { title: "Direction", text: "Type, colour, and tone agreed once so the month's output stays consistent." },
      { title: "Production", text: "Design and edit against the plan, in every ratio the campaign needs." },
      { title: "Review", text: "One consolidated round of changes, not a running comment thread." },
      { title: "Publish", text: "Scheduled to the calendar, or handed over as files if you post in-house." },
    ],
    faqs: [
      {
        question: "Do you write in Nepali as well as English?",
        answer:
          "Yes, and Nepali copy is written rather than translated — a headline translated word for word from English almost never survives the jump.",
      },
      {
        question: "Can you work from our existing photos?",
        answer:
          "Yes, where they are usable at feed resolution. Where they are not, the production team can shoot a small set alongside the design work.",
      },
      {
        question: "How many posts come in a monthly pack?",
        answer:
          "It is set per client. Twelve to sixteen pieces a month suits most pages: enough to hold a rhythm without exhausting the audience.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("social-media-ads", "Social media advertisement design — Najikako Sathi Media") },
    cta: { label: "See a sample plan", href: "contact" },
  },

  {
    slug: "event-coverage",
    category: "social-media",
    navLabel: "Event coverage",
    eyebrow: "Social media",
    title: "Event coverage & management",
    lead: "Live streaming, real-time updates, and full media coordination on the day.",
    metaTitle: "Event Live Streaming & Media Coverage in Kathmandu, Nepal",
    metaDescription:
      "Live digital streaming, real-time social media updates, multimedia publishing, and complete media coordination during public events, conferences, and celebrations across Nepal.",
    keywords: [
      "event live streaming Nepal",
      "conference coverage Kathmandu",
      "event photography videography Nepal",
      "live social media coverage",
      "event media management Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Live digital streaming, real-time social media updates, multimedia publishing, and complete media coordination during public events, conferences, and celebrations.",
        "One team covers the room: cameras on the stage, a stream going out, stills moving to the desk, and posts published while the session is still running. Press coordination and the after-film come from the same coverage, so nothing has to be restaged once the hall is empty.",
      ],
    },
    deliverables: [
      { title: "Live stream", text: "Multi-camera stream to Facebook, YouTube, or a private link." },
      { title: "Same-day posts", text: "Photos and clips published while the event is still happening." },
      { title: "Event film", text: "A highlights cut delivered after the event, plus speaker sessions in full." },
      { title: "Press coordination", text: "Media invitations, on-site handling, and a release pack for reporters." },
    ],
    process: [
      { title: "Recce", text: "Venue, power, internet, and sightlines checked before the day." },
      { title: "Rig", text: "Cameras, audio feed from the desk, and stream tested well ahead of doors." },
      { title: "Live", text: "Stream, stills, and posting run in parallel by one coordinated crew." },
      { title: "After", text: "Highlights film, full sessions, and the photo set delivered within days." },
    ],
    faqs: [
      {
        question: "What happens if the venue internet fails?",
        answer:
          "Streams are run on bonded mobile connections with the venue line as backup, and the event is always recorded locally so a dropped stream never costs you the footage.",
      },
      {
        question: "Can you cover events outside Kathmandu?",
        answer:
          "Yes. Travel and per-diem are quoted separately, and equipment is planned around what the location can actually power.",
      },
      {
        question: "How soon do we get the material?",
        answer:
          "Selected photos and clips go out the same day. The highlights film and full session recordings follow within about a week, depending on the number of sessions.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("event-coverage", "Event coverage and live streaming — Najikako Sathi Media") },
    cta: { label: "Cover our event", href: "contact" },
  },

  // ----------------------------------------------------------------- training
  {
    slug: "social-media-training",
    category: "training",
    navLabel: "Social media strategy",
    eyebrow: "Training",
    title: "Social media handling & strategy",
    lead: "Page administration, analytics, scheduling, and community management, in practice.",
    metaTitle: "Social Media Management Training in Kathmandu, Nepal",
    metaDescription:
      "Practical training in page administration, algorithmic optimisation, analytics interpretation, content scheduling, and community engagement tactics for teams and individuals in Nepal.",
    keywords: [
      "social media training Nepal",
      "social media management course Kathmandu",
      "digital marketing training Nepal",
      "analytics training",
      "content scheduling course",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Practical guidance on page administration, algorithmic optimization, analytics interpretation, content scheduling, and community engagement tactics.",
        "Participants work on their own page throughout. By the last session the page has a posting calendar, a set of saved audiences, and somebody in the room who can read the analytics tab without guessing.",
      ],
    },
    deliverables: [
      { title: "Page admin practice", text: "Roles, permissions, recovery, and the settings that cause most losses." },
      { title: "Analytics reading", text: "Which numbers mean something, and which are there to flatter you." },
      { title: "Content calendar", text: "A month planned and scheduled before the course ends." },
      { title: "Engagement playbook", text: "Comment, message, and escalation handling written down for the team." },
    ],
    faqs: [
      {
        question: "Who is this course for?",
        answer:
          "Communication staff, small business owners, and anyone who has inherited an organisation's page without a handover. No marketing background is assumed.",
      },
      {
        question: "Do participants need their own page?",
        answer:
          "It helps, because the exercises run on it. Participants without one create a page in the first session and build it through the course.",
      },
      {
        question: "Can the training be delivered at our office?",
        answer:
          "Yes. In-house cohorts are the most common format, and the content is adjusted to the sector the team works in.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("social-media-training", "Social media strategy training — Najikako Sathi Media") },
    cta: { label: "Ask about the course", href: "contact" },
  },

  {
    slug: "content-creation",
    category: "training",
    navLabel: "Content creation",
    eyebrow: "Training",
    title: "Content creation",
    lead: "Building visual, written, and video content for a modern digital audience.",
    metaTitle: "Content Creation Training in Nepal — Video, Writing, Visuals",
    metaDescription:
      "Hands-on training in developing compelling visual, written, and video content tailored to modern digital audiences, taught on the participants' own equipment.",
    keywords: [
      "content creation training Nepal",
      "content writing course Kathmandu",
      "video content course Nepal",
      "digital content training",
      "creator course Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Hands-on training in developing compelling visual, written, and video content tailored to modern digital audiences.",
        "The course is built around output: every session ends with something published. Participants leave with a body of work and a repeatable way of producing the next piece, rather than a folder of slides.",
      ],
    },
    deliverables: [
      { title: "Idea to script", text: "Turning a rough idea into a structure that holds attention." },
      { title: "Shooting on a phone", text: "Framing, light, and sound with the equipment participants own." },
      { title: "Writing for the feed", text: "Headlines, captions, and hooks in Nepali and English." },
      { title: "Published portfolio", text: "Real pieces published during the course, not exercises in a drive." },
    ],
    faqs: [
      {
        question: "Do I need a camera?",
        answer:
          "No. The course is designed around a phone, because that is what participants will keep using afterwards. Camera modules are available for teams that own equipment.",
      },
      {
        question: "Is the training in Nepali or English?",
        answer:
          "Sessions run in Nepali by default, with the technical vocabulary given in both languages. Full English delivery is available for institutional cohorts.",
      },
      {
        question: "How long is the course?",
        answer:
          "The standard format runs across several sessions over two to three weeks so participants can publish between classes. Intensive formats are arranged for in-house teams.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("content-creation", "Content creation training — Najikako Sathi Media") },
    cta: { label: "Join the next cohort", href: "contact" },
  },

  {
    slug: "journalism-basics",
    category: "training",
    navLabel: "Journalism basics",
    eyebrow: "Training",
    title: "Journalism basics",
    lead: "News gathering, interviewing, ethics, press releases, and investigative work.",
    metaTitle: "Journalism Training in Nepal — Reporting, Ethics, Interviews",
    metaDescription:
      "Core fundamentals of news gathering, interviewing techniques, ethical reporting, press release writing, and investigative storytelling, taught by a working Kathmandu newsroom.",
    keywords: [
      "journalism training Nepal",
      "reporting course Kathmandu",
      "media ethics training",
      "interview technique course",
      "investigative journalism Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Core fundamentals of news gathering, interviewing techniques, ethical reporting, press release writing, and investigative storytelling.",
        "The course is taught out of a working newsroom, so the examples are stories that ran, including the ones that were held back and why. Participants file real copy and have it edited the way a desk would edit it.",
      ],
    },
    deliverables: [
      { title: "News gathering", text: "Finding, approaching, and protecting a source." },
      { title: "Interviewing", text: "Preparation, question order, and what to do when an answer evades." },
      { title: "Ethics and law", text: "Attribution, right of reply, and where a correction is owed." },
      { title: "Filed and edited copy", text: "Participants' own stories, taken through a real edit." },
    ],
    faqs: [
      {
        question: "Is this for working journalists or beginners?",
        answer:
          "Both, in separate cohorts. The beginner track starts from what a news story is; the newsroom track is aimed at reporters who already file and want the verification and interviewing modules.",
      },
      {
        question: "Is there a certificate?",
        answer:
          "Participants who complete the assignments receive a certificate of completion from Najikako Sathi Media. It records attendance and filed work, not an accreditation.",
      },
      {
        question: "Can our organisation send its communication team?",
        answer:
          "Yes, and it is common. Understanding how a desk reads a press release is the fastest way to make a communication team better at writing one.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("journalism-basics", "Journalism training — Najikako Sathi Media") },
    cta: { label: "Ask about journalism training", href: "contact" },
  },

  {
    slug: "creative-technical",
    category: "training",
    navLabel: "Creativity & technical",
    eyebrow: "Training",
    title: "Creativity & technical production",
    lead: "Videography, photography, editing, graphic design, and motion graphics.",
    metaTitle: "Videography, Photography & Video Editing Training in Nepal",
    metaDescription:
      "Advanced practical modules in visual arts and production technology: videography, photography, video editing, graphic design, and motion graphics, taught on production equipment.",
    keywords: [
      "videography training Nepal",
      "photography course Kathmandu",
      "video editing course Nepal",
      "graphic design training Nepal",
      "motion graphics course Kathmandu",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Advanced practical skill modules in visual arts and production technology, covering videography, photography, video editing, graphic design, and motion graphics.",
        "Modules can be taken singly or as a full track. Teaching happens on the same equipment the production team uses on client work, so the transition from classroom to a paid shoot is short.",
      ],
    },
    deliverables: [
      { title: "Videography", text: "Camera, lens, exposure, movement, and sound on location." },
      { title: "Photography", text: "Light, composition, and a workable RAW workflow." },
      { title: "Video editing", text: "Assembly, pacing, colour, and export settings that survive the platform." },
      { title: "Design and motion", text: "Layout and type fundamentals, then titles and motion graphics." },
    ],
    faqs: [
      {
        question: "Can I take only one module?",
        answer:
          "Yes. Each of the five modules stands alone, and the full track is simply all of them in sequence at a lower combined fee.",
      },
      {
        question: "Is equipment provided?",
        answer:
          "Production equipment is available during the sessions. Participants are encouraged to work on their own gear where they have it, since that is what they will use afterwards.",
      },
      {
        question: "Which software is taught?",
        answer:
          "Industry-standard editing, design, and motion tools, with the concepts taught in a way that transfers between packages rather than to one vendor's menus.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("creative-technical", "Creative and technical production training — Najikako Sathi Media") },
    cta: { label: "Pick a module", href: "contact" },
  },

  {
    slug: "idea-monetization",
    category: "training",
    navLabel: "Idea monetisation",
    eyebrow: "Training",
    title: "Idea monetisation",
    lead: "Turning creative projects, channels, and media skills into revenue.",
    metaTitle: "YouTube & Content Monetisation Training in Nepal",
    metaDescription:
      "Strategies to turn creative projects, YouTube channels, digital content, and media skills into sustainable revenue through ad revenue, sponsorships, and affiliate channels.",
    keywords: [
      "YouTube monetisation Nepal",
      "content monetisation training",
      "creator income Nepal",
      "sponsorship training Nepal",
      "affiliate marketing course Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Strategies to transform creative projects, YouTube channels, digital content, and media skills into sustainable revenue streams through ad revenue, sponsorships, and affiliate channels.",
        "The module is blunt about the arithmetic. Ad revenue at Nepali view rates rarely pays for a production on its own, so the course spends most of its time on the mix — sponsorship, service work, and affiliate income — that actually sustains a channel here.",
      ],
    },
    deliverables: [
      { title: "Platform requirements", text: "What each platform demands before a channel can earn at all." },
      { title: "Sponsorship pitching", text: "Rate cards, media kits, and how to approach a brand." },
      { title: "Revenue mix", text: "Building income from several sources rather than one algorithm." },
      { title: "Compliance", text: "Disclosure, tax, and payment routes that work from Nepal." },
    ],
    faqs: [
      {
        question: "How many subscribers do I need?",
        answer:
          "For platform ad revenue, the thresholds are set by the platform and change; for sponsorship, a small engaged audience in a defined niche is often worth more than a large passive one.",
      },
      {
        question: "Do you guarantee income?",
        answer:
          "No. The course teaches the routes, the arithmetic, and the pitch. Anyone promising a guaranteed figure is selling a course, not a business.",
      },
      {
        question: "Does this cover getting paid from Nepal?",
        answer:
          "Yes. Payment routes, documentation, and the practical obstacles Nepali creators hit with international platforms are part of the module.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("idea-monetization", "Idea monetisation training — Najikako Sathi Media") },
    cta: { label: "Ask about monetisation", href: "contact" },
  },

  // ------------------------------------------------------ research & development
  {
    slug: "source-research",
    category: "research-development",
    navLabel: "Source research",
    eyebrow: "Research & development",
    title: "Source research",
    lead: "Background investigation, field study, stakeholder mapping, and policy review.",
    metaTitle: "Media & Development Research Services in Nepal",
    metaDescription:
      "In-depth background investigation, primary and secondary data gathering, field study, stakeholder mapping, and policy review for media and development projects across Nepal.",
    keywords: [
      "research services Nepal",
      "field study Nepal",
      "stakeholder mapping",
      "policy review Nepal",
      "media research Kathmandu",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "In-depth background investigation, primary and secondary data gathering, field study, stakeholder mapping, and policy review for media and development projects.",
        "Research here is done to be published. Sources are recorded so a claim can be traced back to them months later, and the output is written to survive a reader who disagrees with the conclusion.",
      ],
    },
    deliverables: [
      { title: "Desk review", text: "Existing literature, policy, and data, summarised with citations." },
      { title: "Field data", text: "Interviews, surveys, and observation collected against a written protocol." },
      { title: "Stakeholder map", text: "Who holds influence, who is affected, and who has to be consulted." },
      { title: "Research report", text: "Findings, method, and limitations, in Nepali and English." },
    ],
    process: [
      { title: "Question", text: "The single question the study has to answer, agreed in writing." },
      { title: "Method", text: "Sampling, instruments, and consent, fixed before fieldwork begins." },
      { title: "Fieldwork", text: "Collection with supervision and same-day quality checks." },
      { title: "Analysis and report", text: "Findings written with the method and its limits stated plainly." },
    ],
    faqs: [
      {
        question: "Do you do quantitative surveys as well as interviews?",
        answer:
          "Yes. Sample design, enumerator training, and data cleaning are part of the service; the method is chosen from the question rather than from habit.",
      },
      {
        question: "Can the research feed a documentary?",
        answer:
          "That is the usual pairing. The same fieldwork supports a written report and the film, which is far cheaper than commissioning them separately.",
      },
      {
        question: "Who owns the data?",
        answer:
          "The commissioning organisation, subject to the consent given by respondents. Anonymisation requirements are agreed before collection starts.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("source-research", "Source research — Najikako Sathi Media") },
    cta: { label: "Commission research", href: "contact" },
  },

  {
    slug: "government-collaboration",
    category: "research-development",
    navLabel: "Institutional collaboration",
    eyebrow: "Research & development",
    title: "Government & non-government collaboration",
    lead: "Baseline studies, impact reports, awareness campaigns, and community work.",
    metaTitle: "Government & NGO Media Collaboration in Nepal",
    metaDescription:
      "Partnering with federal and local government bodies, NGOs, INGOs, and civil society for baseline studies, impact assessment reports, awareness campaigns, and community development initiatives.",
    keywords: [
      "NGO media partner Nepal",
      "government communication Nepal",
      "baseline study Nepal",
      "impact assessment report",
      "awareness campaign Nepal",
    ],
    body: {
      status: "portfolio",
      paragraphs: [
        "Partnering with federal and local government bodies, NGOs, INGOs, and civil society organizations for baseline studies, impact assessment reports, awareness campaigns, and community development initiatives.",
        "Institutional work carries obligations a commercial shoot does not: procurement rules, reporting formats, consent for filming in communities, and deadlines set by a funding cycle. We work inside them rather than around them.",
      ],
    },
    deliverables: [
      { title: "Baseline and endline", text: "Study design, collection, and the report the funder expects." },
      { title: "Impact reporting", text: "Written and filmed evidence of what a programme changed." },
      { title: "Awareness campaigns", text: "Message design, production, and distribution in the target districts." },
      { title: "Community engagement", text: "Local consultation and consent before anything is recorded." },
    ],
    process: [
      { title: "Inception", text: "Scope, indicators, and reporting format agreed with the programme team." },
      { title: "Consultation", text: "Local government and community consent before fieldwork or filming." },
      { title: "Delivery", text: "Study, campaign, or film produced against the agreed indicators." },
      { title: "Reporting", text: "Documentation in the funder's format, with the raw evidence attached." },
    ],
    faqs: [
      {
        question: "Can you respond to a formal RFP or tender?",
        answer:
          "Yes. Company registration, VAT number, and past-work documentation are supplied with the proposal; the VAT number is published in the footer of every page on this site.",
      },
      {
        question: "Do you work outside the Kathmandu valley?",
        answer:
          "Yes. District-level fieldwork is a normal part of baseline and awareness work, and local enumerators and fixers are engaged where language or access requires it.",
      },
      {
        question: "How is community consent handled?",
        answer:
          "In writing, before recording, in the language of the participants, with a clear statement of where the material will be published and for how long.",
      },
    ],
    supportStatus: "draft",
    media: { image: ART("government-collaboration", "Institutional collaboration — Najikako Sathi Media") },
    cta: { label: "Start a partnership", href: "contact" },
  },
];

export const servicesHubEn: ServicesHub = {
  eyebrow: "Scope of work",
  title: "Services",
  lead:
    "Production, social media handling, training, and research — four departments, sixteen services, one media house in Anamnagar.",
  metaTitle: "Services — Production, Social Media, Training & Research",
  metaDescription:
    "The full scope of work at Najikako Sathi Media Pvt. Ltd., Kathmandu: biography and documentary production, advertisements, profile making, social media handling, media consulting, campaigns, event coverage, media training, and research and development.",
  keywords: [
    "media services Nepal",
    "production house Kathmandu",
    "social media agency Nepal",
    "media training Nepal",
    "research and development Nepal",
    "Najikako Sathi Media services",
  ],
  body: {
    status: "portfolio",
    paragraphs: [
      "Four departments cover the work: full-service media production focused on visual storytelling and public messaging; strategic digital presence management, branding, and performance marketing; capacity building and practical technical training; and in-depth field research, media monitoring, and multi-sectoral development initiatives.",
      "Each service below has a page of its own with what it delivers, how the work runs, and the questions clients ask before commissioning it. Everything is available separately or as a combined engagement.",
    ],
  },
  allServicesHeading: "Every service, one list",
  allServicesLead: "Sixteen services across four departments. Each links to its own page.",
  faqs: [
    {
      question: "Can services be combined into one engagement?",
      answer:
        "Yes, and it is usually cheaper. A single field trip can produce a documentary, a research report, and a month of social content; commissioning them separately pays for the same travel three times.",
    },
    {
      question: "Do you work with organisations outside Kathmandu?",
      answer:
        "Yes. Production and field research run across Nepal, with travel quoted per project. Consulting and social media handling are delivered remotely where that suits the client.",
    },
    {
      question: "How do we get a quotation?",
      answer:
        `Write to ${siteConfig.email} or call the numbers in the footer with the scope, the timeline, and the budget range. A written proposal follows, with the deliverables listed line by line.`,
    },
    {
      question: "Are prices published?",
      answer:
        "No, because a documentary and a one-day event stream share nothing but a camera. Every quotation is built from the scope, the crew, the travel, and the delivery formats you actually need.",
    },
  ],
  media: {
    image: {
      src: "/media/services/services.svg",
      alt: "Scope of work at Najikako Sathi Media — production, social media, training, research",
      width: 1200,
      height: 675,
    },
  },
  cta: { label: "Request a proposal", href: "contact" },
};
