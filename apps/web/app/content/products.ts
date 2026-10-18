/*
 * Copy for the three product pages (/voice, /agents, /brain). The showcase
 * card on each page reuses the homepage pillar copy (landing/content.ts);
 * everything below it lives here. No em dashes in user-facing strings.
 *
 * Stories: 'case-study' is a real client result (only the two confirmed
 * ones). 'example' is a typical build at a representative company: it must
 * never carry stats, and the section note on the page says so. Cards carry
 * no label; headcounts for the real clients are confirmed by Jeff. The
 * insurance agency figures (10k+ calls a month, 3 departments in 2
 * months) are confirmed by Jeff.
 */

export type ProductId = 'voice' | 'agents' | 'brain';

export type ProductStory = {
  kind: 'case-study' | 'example';
  industry: string;
  title: string;
  body: string;
  results?: string[];
};

export type ProductLogo = { slug: string; name: string; wordmark?: boolean };

export type Product = {
  id: ProductId;
  name: string;
  kicker: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  /** Rendered two-tone: [ink, green]. */
  headline: [string, string];
  lede: string;
  /** Optional "platform + built for you" section under the showcase card. */
  approach?: {
    title: string;
    body: string;
    platform: { label: string; points: string[] };
    bespoke: { label: string; points: string[] };
  };
  features: Array<{ title: string; body: string }>;
  stepsTitle?: string;
  steps: Array<{ title: string; body: string }>;
  stories: ProductStory[];
  integrations: ProductLogo[];
  faqs: Array<{ q: string; a: string }>;
};

const DATA_OWNERSHIP =
  'You do. You own your configuration, knowledge, and data, you can export or delete it at any time, and it is never used to train models.';

export const PRODUCTS: Record<ProductId, Product> = {
  voice: {
    id: 'voice',
    name: 'Cartra Voice',
    kicker: 'AI voice agents',
    path: '/voice',
    seoTitle: 'Cartra Voice: Custom AI Voice Agents for Customer Service and Sales | Cartra',
    seoDescription:
      'AI voice agents built around your business. Cartra Voice answers inbound calls, makes outbound follow-ups, books appointments, and hands off to your team with full context.',
    headline: ['AI voice agents that', 'sound like your business.'],
    lede:
      'Our team builds your AI voice agent for you, on the Cartra platform, around your calls, your systems, and your rules. It answers day and night, gets things done in your systems, and hands off to your team when a person should step in. Supported in 90+ languages.',
    approach: {
      title: 'Not off the shelf. Not built from scratch.',
      body: 'Off-the-shelf voice tools hand you a generic agent and a setup screen. Building from scratch takes months. Cartra Voice is both halves done right: a proven platform underneath, and an agent our team builds around how your business actually takes calls.',
      platform: {
        label: 'The Cartra platform',
        points: [
          'Natural phone conversations in 90+ languages',
          'Connections to your phone system, calendar, and CRM',
          'Every call logged, with a summary for your team',
          'Learns from every conversation',
        ],
      },
      bespoke: {
        label: 'Built for you by our team',
        points: [
          'Call flows designed around your real calls',
          'Your greeting, terminology, and policies',
          'Wired into your systems so it can get things done',
          'Tested on your edge cases, then tuned after launch',
        ],
      },
    },
    features: [
      {
        title: 'Answers every call',
        body: 'Day, night, weekends, and overflow. No hold queue, no voicemail, no missed customers.',
      },
      {
        title: 'Sounds like your business',
        body: 'We build it on how your best people handle calls: your greeting, your terminology, your policies.',
      },
      {
        title: 'Gets the job done',
        body: 'We connect it to your systems, so it can look things up and take action: bookings, order status, account changes, and more.',
      },
      {
        title: 'Calls out, too',
        body: 'Callbacks, reminders, confirmations, and follow-ups, made on time and on your rules.',
      },
      {
        title: 'Knows when to hand off',
        body: 'We set the rules for what it handles and what goes to a person, and it transfers with a summary so callers never repeat themselves.',
      },
      {
        title: 'Speaks their language',
        body: 'Supported in 90+ languages, so every caller is served in the language they are most comfortable with.',
      },
    ],
    stepsTitle: 'We build it with you.',
    steps: [
      {
        title: 'We map your calls',
        body: 'We listen to real calls with your team, learn how you handle them, and pick the call types worth handing to AI first.',
      },
      {
        title: 'We build it on Cartra',
        body: 'We design the call flows, connect your phone system and software, and test against your real scenarios before a single customer hears it.',
      },
      {
        title: 'We launch and keep tuning',
        body: 'It goes live on the calls you choose. We stay on it after launch, expanding what it handles as it proves itself.',
      },
    ],
    stories: [
      {
        kind: 'case-study',
        industry: 'Insurance agency, 250 people',
        title: 'From 1 department to the whole agency',
        body: 'We started with a single department, building Cartra Voice around how that team already handled its calls. Once it proved itself, the agency rolled it out department by department. Today it updates vehicles and drivers on existing policies and quotes new customers for health insurance, right on the call. Licensed CSRs stay in the loop: anything that needs one is handed off with a summary, so nobody starts from scratch.',
        results: [
          '10,000+ calls handled every month',
          'Live in 3 departments within 2 months',
        ],
      },
      {
        kind: 'case-study',
        industry: 'Wellness facility, 50 people',
        title: 'Appointments booked and questions answered around the clock',
        body: 'Clients call to book appointments and ask the same handful of questions, often while the front desk is busy with the people in front of them. We built Cartra Voice around the facility’s schedule and the answers its staff give every day. Now it books appointments over the phone and answers recurring questions 24/7, and the front desk can focus on the clients in the room.',
        results: ['50+ appointments booked every day', 'Live in under 2 weeks'],
      },
    ],
    integrations: [
      { slug: 'ringcentral', name: 'RingCentral' },
      { slug: 'dialpad', name: 'Dialpad', wordmark: true },
      { slug: 'twilio', name: 'Twilio' },
      { slug: 'zoom', name: 'Zoom' },
      { slug: 'googlecalendar', name: 'Google Calendar' },
      { slug: 'microsoftoutlook', name: 'Microsoft Outlook' },
      { slug: 'salesforce', name: 'Salesforce', wordmark: true },
      { slug: 'hubspot', name: 'HubSpot' },
      { slug: 'hawksoft', name: 'HawkSoft' },
      { slug: 'zendesk', name: 'Zendesk' },
    ],
    faqs: [
      {
        q: 'Do we set it up ourselves?',
        a: 'No. Cartra Voice is not a do-it-yourself tool. Our team designs, builds, and launches your voice agent on the Cartra platform, then keeps improving it with you. You bring what you know about your business, and we handle the rest.',
      },
      {
        q: 'Why not use an off-the-shelf voice AI tool?',
        a: 'Off-the-shelf tools give you a generic agent and leave the setup, integrations, and edge cases to you. Cartra Voice is built around your calls, connected to your systems, and tested on your real scenarios, on a platform we run and maintain.',
      },
      {
        q: 'Does it work with our phone system?',
        a: 'Yes. Cartra Voice works with the phone system you already use, such as RingCentral, Dialpad, Twilio, or Zoom, and we set up the call routing with your team.',
      },
      {
        q: 'What happens when a call needs a person?',
        a: 'It hands off to the right person on your team, live or as a booked callback, with a summary of the call so nobody starts from scratch.',
      },
      {
        q: 'Can it make outbound calls?',
        a: 'Yes. Callbacks, reminders, confirmations, and follow-ups, on the schedule and rules you set.',
      },
      {
        q: 'Will callers know they are talking to AI?',
        a: 'You decide how the agent introduces itself, within the disclosure rules that apply to your business and region. We help you set that up.',
      },
      {
        q: 'Who owns the call recordings and data?',
        a: DATA_OWNERSHIP,
      },
    ],
  },

  agents: {
    id: 'agents',
    name: 'Cartra Agents',
    kicker: 'AI agent teammates',
    path: '/agents',
    seoTitle: 'Cartra Agents: Self-Improving AI Teammates for Operations | Cartra',
    seoDescription:
      'AI teammates built around how your company operates. Cartra Agents work in your chat, inboxes, and software, remember every customer and correction, and learn new skills on their own.',
    headline: ['Hire AI teammates', 'built for your company.'],
    lede:
      'Our team builds your AI teammates for you, on the Cartra platform, around how your company operates. Message them like a coworker or let them work on their own. They use your software the way a person would, remember every customer and correction, and turn what works into new skills.',
    approach: {
      title: 'Not a generic assistant. Not a project from scratch.',
      body: 'Generic AI assistants know nothing about your business and leave the real work to you. Building your own from scratch takes months and often stalls. Cartra Agents run on a platform made for AI teammates, and our team builds each one around your workflows, your systems, and your rules.',
      platform: {
        label: 'The Cartra platform',
        points: [
          'Always-on teammates in Slack, Teams, email, and text',
          'Persistent memory and skills that improve on their own',
          'Uses software like a person, with or without an integration',
          'Every action logged, within the access you grant',
        ],
      },
      bespoke: {
        label: 'Built for you by our team',
        points: [
          'Workflows mapped with the people who do the work today',
          'Connected to your systems, data, and permissions',
          'Your rules for what it handles and what goes to a person',
          'Tested on real examples, then expanded after launch',
        ],
      },
    },
    features: [
      {
        title: 'Message them like a coworker',
        body: 'Hand off work in Slack, Teams, email, or text. They ask when something is unclear and report back when it is done.',
      },
      {
        title: 'Remember everything',
        body: 'Persistent memory of your customers, people, preferences, and every correction your team makes.',
      },
      {
        title: 'Use your software like a person',
        body: 'Portals, forms, files, and apps, including the older systems that have no integration.',
      },
      {
        title: 'Work without being asked',
        body: 'They run on schedules, watch for triggers, and follow up on their own.',
      },
      {
        title: 'Learn new skills',
        body: 'They reflect on what worked and turn it into reusable skills, so the same mistake does not happen twice.',
      },
      {
        title: 'Stay within your controls',
        body: 'They work only with the access you grant, every action is logged, and anything unusual goes to the right person.',
      },
    ],
    stepsTitle: 'We build it with you.',
    steps: [
      {
        title: 'We shadow the work',
        body: 'We walk through the workflow with the people who do it today: the systems, the rules, and the edge cases.',
      },
      {
        title: 'We build your teammate',
        body: 'We set up its tools, access, and knowledge on the Cartra platform, and test it on real examples from your business.',
      },
      {
        title: 'We launch and expand',
        body: 'It starts on live work alongside your team. We stay on it after launch and hand it more as it proves itself.',
      },
    ],
    stories: [
      {
        kind: 'case-study',
        industry: 'U.S. freight forwarder, 40 people',
        title: 'Faster quotes, and 30% more of them won',
        body: 'Customers email in quote requests for ocean shipments and drayage, and in freight the fastest quote often wins the job. We built a quoting teammate that reads each request, prices it on the forwarder’s own rates and rules, and replies to the customer by email, automatically. Faster responses meant the team won 30% more of the quotes it sent.',
        results: ['30% more quotes won', 'Quote requests answered automatically by email'],
      },
      {
        kind: 'case-study',
        industry: 'U.S. freight forwarder, 35 people',
        title: 'Every inbox triaged, every shipment kept current',
        body: 'We built two AI teammates around how this forwarder runs. The first triages and prioritizes every employee’s email according to the company’s own SOPs, so the messages that matter reach the right person first. The second manages shipments, creating and updating them in the TMS automatically from inputs and events across email, shipping, and tracking data.',
        results: ['Every employee inbox triaged against company SOPs', 'Shipments created and updated in the TMS automatically'],
      },
    ],
    integrations: [
      { slug: 'slack', name: 'Slack' },
      { slug: 'microsoftteams', name: 'Microsoft Teams' },
      { slug: 'gmail', name: 'Gmail' },
      { slug: 'microsoftoutlook', name: 'Microsoft Outlook' },
      { slug: 'netsuite', name: 'Oracle NetSuite', wordmark: true },
      { slug: 'quickbooks', name: 'QuickBooks' },
      { slug: 'salesforce', name: 'Salesforce', wordmark: true },
      { slug: 'hubspot', name: 'HubSpot' },
      { slug: 'zendesk', name: 'Zendesk' },
      { slug: 'googledrive', name: 'Google Drive' },
    ],
    faqs: [
      {
        q: 'Do we set it up ourselves?',
        a: 'No. Cartra Agents are not a do-it-yourself tool. Our team designs and builds each teammate on the Cartra platform, connects it to your systems, and stays with you after launch. You bring what you know about the work, and we handle the rest.',
      },
      {
        q: 'How is this different from a chatbot?',
        a: 'A chatbot answers questions. Cartra Agents do the work: they take action in your systems, remember context over weeks and months, follow up on their own, and get better over time.',
      },
      {
        q: 'How do they learn?',
        a: 'They start from your procedures, documents, systems, and examples. From there, they keep a memory of every interaction, remember corrections, and turn what worked into reusable skills on their own.',
      },
      {
        q: 'What if our software has no integration?',
        a: 'Agents can use software the way a person would: signing in to portals, filling in forms, and moving files between systems.',
      },
      {
        q: 'How do we stay in control?',
        a: 'Agents work only with the access you grant, and every action is logged. You decide what they handle on their own and what comes to a person first.',
      },
      {
        q: 'Who owns the data?',
        a: DATA_OWNERSHIP,
      },
    ],
  },

  brain: {
    id: 'brain',
    name: 'Cartra Brain',
    kicker: 'Company knowledge base',
    path: '/brain',
    seoTitle: 'Cartra Brain: A Company Knowledge Base Built for AI | Cartra',
    seoDescription:
      'Turn your documents, systems, and know-how into one living knowledge base. Cartra Brain gives every team and every AI agent answers grounded in what your company knows.',
    headline: ['The foundation for your', 'AI-native company.'],
    lede:
      'Our team builds your company knowledge base for you, on the Cartra platform. We bring together your documents, systems, conversations, and the know-how in your best people’s heads, keep it current, and make it the foundation for Voice, Agents, and every AI use case you build next.',
    approach: {
      title: 'Not another wiki. Not a data project.',
      body: 'Wikis and search tools only find what someone already wrote down, and they go stale. Building your own AI knowledge stack is a months-long data project. Cartra Brain runs on our platform, and our team builds it around what your company actually knows, including what was never written down.',
      platform: {
        label: 'The Cartra platform',
        points: [
          'Connects your drives, wikis, tickets, and systems',
          'Answers that link back to their sources',
          'Access that follows your permissions',
          'Stale and conflicting content flagged for owners',
        ],
      },
      bespoke: {
        label: 'Built for you by our team',
        points: [
          'Organized around your teams and how they work',
          'Know-how captured from your experts in conversation',
          'Gaps found and filled before launch',
          'Kept current with you after launch',
        ],
      },
    },
    features: [
      {
        title: 'One source of truth',
        body: 'Docs, drives, wikis, tickets, and systems, organized into one place every team can ask.',
      },
      {
        title: 'Answers you can check',
        body: 'Every answer links back to its sources, so people can trust it and verify it.',
      },
      {
        title: 'Follows your permissions',
        body: 'People and agents only see what they are allowed to see.',
      },
      {
        title: 'Stays current',
        body: 'Stale and conflicting content is flagged for its owner before it spreads.',
      },
      {
        title: 'Captures what is in people’s heads',
        body: 'Your experts’ know-how and procedures, turned into knowledge the whole company can use.',
      },
      {
        title: 'Powers everything you build',
        body: 'Grounds your voice agents and AI teammates, and feeds marketing, onboarding, training, and customer service.',
      },
    ],
    stepsTitle: 'We build it with you.',
    steps: [
      {
        title: 'We connect your sources',
        body: 'We connect your drives, wikis, tickets, and systems, keeping the permissions you already have.',
      },
      {
        title: 'We fill the gaps',
        body: 'We organize what is there and sit down with your experts to capture the know-how that was never written down.',
      },
      {
        title: 'We put it to work',
        body: 'Teams ask it directly, Voice and Agents draw on it in every call and task, and we keep it current with you.',
      },
    ],
    stories: [
      {
        kind: 'case-study',
        industry: 'Industrial manufacturer, 60 people',
        title: 'One source of truth for service, operations, and marketing',
        body: 'Customer service, operations, and marketing now work from the same knowledge base, turning weeks of searching for answers into consistent, instant ones.',
        results: ['Company knowledge unified into one source of truth', 'Faster, more consistent answers for service and operations'],
      },
      {
        kind: 'example',
        industry: 'Property management company, 40 people',
        title: 'New hires ramp on real procedures',
        body: 'Leasing, maintenance, and tenant procedures live in Cartra Brain. New hires learn from it, staff and agents answer from it, and the office manager stopped fielding the same questions all day.',
      },
      {
        kind: 'example',
        industry: 'Specialty chemicals manufacturer, 90 people',
        title: 'Marketing grounded in engineering know-how',
        body: 'A 2-person marketing team drafts product pages, sales sheets, and campaigns from Cartra Brain, built on what the company’s application engineers actually know.',
      },
    ],
    integrations: [
      { slug: 'googledrive', name: 'Google Drive' },
      { slug: 'microsoftsharepoint', name: 'Microsoft SharePoint' },
      { slug: 'box', name: 'Box', wordmark: true },
      { slug: 'notion', name: 'Notion' },
      { slug: 'confluence', name: 'Confluence' },
      { slug: 'zendesk', name: 'Zendesk' },
      { slug: 'slack', name: 'Slack' },
      { slug: 'microsoftteams', name: 'Microsoft Teams' },
      { slug: 'salesforce', name: 'Salesforce', wordmark: true },
      { slug: 'hubspot', name: 'HubSpot' },
    ],
    faqs: [
      {
        q: 'Do we set it up ourselves?',
        a: 'No. Our team builds Cartra Brain for you on the Cartra platform. We connect your sources, talk with the people who hold the know-how, organize it, and keep it current with you after launch.',
      },
      {
        q: 'Do we need Cartra Brain to use Voice or Agents?',
        a: 'No. Voice and Agents come with the knowledge their job needs. Cartra Brain is the company-wide version: one knowledge base every team and every AI system can share.',
      },
      {
        q: 'Where does the knowledge come from?',
        a: 'Your documents, drives, wikis, tickets, and systems, plus conversations with the people who hold the know-how that was never written down.',
      },
      {
        q: 'Who can see what?',
        a: 'Access follows your existing permissions, for people and for AI agents alike.',
      },
      {
        q: 'How does it stay up to date?',
        a: 'It stays connected to your sources and flags stale or conflicting content for its owner, so answers do not drift.',
      },
      {
        q: 'Who owns the knowledge?',
        a: DATA_OWNERSHIP,
      },
    ],
  },
};

export const PRODUCT_ORDER: ProductId[] = ['voice', 'agents', 'brain'];
