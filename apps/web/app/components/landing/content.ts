/*
 * Copy for the landing page direction. Kept in one place so wording can be
 * iterated without touching layout. No em dashes in user-facing strings.
 */

export const HERO = {
  // Rendered two-tone: [ink, orange]
  headline: ['Transform your business', 'with custom AI.'],
  lede:
    'Cartra is an applied AI company. We design, build, and run AI that’s customized and optimized to your business to make sure you stay ahead of your competition in the AI-era.',
};

export type Pillar = {
  id: 'voice' | 'agents' | 'brain';
  name: string;
  kicker: string;
  title: string;
  body: string;
  capabilities: string[];
  tone: 'light' | 'ink' | 'signal';
};

export const PILLARS: Pillar[] = [
  {
    id: 'voice',
    name: 'Cartra Voice',
    kicker: 'AI voice agents',
    title: 'Every call answered. Every follow-up made.',
    body:
      'Voice agents for inbound and outbound customer service. They answer your lines day and night, understand what callers need, look things up in your systems, and get it done. When a person should step in, they hand off with the full context.',
    capabilities: [
      'Inbound customer service and support lines',
      'After-hours and overflow coverage',
      'Outbound callbacks, reminders, and follow-ups',
      'Scheduling, bookings, and order updates',
      'Warm handoffs with a summary of every call',
    ],
    tone: 'light',
  },
  {
    id: 'agents',
    name: 'Cartra Agents',
    kicker: 'AI agent teammates',
    title: 'Teammates that remember, take action, and keep getting better.',
    body:
      'Always-on AI teammates that live in your team chat and inboxes. Message them like a coworker, or let them work on their own. They use your software the way a person would, remember every customer and correction, follow up without being asked, and turn what works into new skills.',
    capabilities: [
      'Message them in Slack, Teams, email, or text',
      'Persistent memory of your customers, people, and preferences',
      'Uses your software like a person: portals, forms, files, and apps',
      'Proactive: works on schedules, watches for triggers, follows up',
      'Learns new skills from experience',
    ],
    tone: 'ink',
  },
  {
    id: 'brain',
    name: 'Cartra Brain',
    kicker: 'Company knowledge base',
    title: 'Everything your company knows, put to work.',
    body:
      'A living knowledge base built from your documents, systems, conversations, and the know-how in your best people’s heads. Cartra Brain organizes it, keeps it current, and makes it answerable. It is the backbone of Voice and Agents, and the foundation for every AI use case you build next.',
    capabilities: [
      'One source of truth across docs, drives, tickets, and systems',
      'Answers that link back to their sources',
      'Access that follows your permissions',
      'Stale and conflicting content flagged for owners',
      'Powers Voice, Agents, marketing, training, and more',
    ],
    tone: 'signal',
  },
];

export const STEPS = [
  {
    tag: '01 / Find',
    title: 'Find the first win',
    body:
      'We sit with your team, listen to real calls, read real inboxes, and walk through your systems. Then we pick the one workflow where AI pays off fastest, and agree on what success looks like before we build anything.',
  },
  {
    tag: '02 / Build',
    title: 'Build it around how you work',
    body:
      'Your procedures, your systems, your edge cases. We build and test against real examples from your business, and you see it working before a single customer does.',
  },
  {
    tag: '03 / Launch',
    title: 'Go live alongside your team',
    body:
      'It starts on real work inside the tools you already use: your phone lines, your inboxes, your software. Your team stays in control, and anything unusual goes to the right person.',
  },
  {
    tag: 'Ongoing',
    title: 'Let it compound',
    body:
      'Every call, correction, and resolved case teaches it something. It turns what works into new skills, and each new workflow you add builds on everything it already knows.',
  },
];

// Growth first: what AI lets a company do more of; efficiency framed as growth.
export const OUTCOMES = [
  {
    title: 'Capture revenue you’re missing today',
    body: 'Every call answered, every new lead called back in minutes, every quote followed up. Fewer customers slip through the cracks.',
  },
  {
    title: 'Serve more customers, better',
    body: 'Give every customer a fast, personal experience, whether they’re your tenth or your millionth, without stretching your team thin.',
  },
  {
    title: 'Launch what wasn’t possible before',
    body: 'New services, new markets, and new offerings that used to need a whole new team, built on everything your company already knows.',
  },
  {
    title: 'Scale without the headcount',
    body: 'Take on more volume without growing the org chart at the same rate, and free your people to focus on customers and growth.',
  },
];

export const DEPARTMENTS = [
  {
    name: 'Customer service',
    pillars: ['Voice', 'Agents', 'Brain'],
    mark: ['c', 's', 'o'],
    body: 'Answer every call, resolve routine requests end to end, and give every rep the right answer in seconds.',
  },
  {
    name: 'Sales and revenue',
    pillars: ['Voice', 'Agents'],
    mark: ['c', 'c', 's'],
    body: 'Call new leads back in minutes, qualify them on your criteria, and keep the CRM clean without chasing reps.',
  },
  {
    name: 'Operations',
    pillars: ['Agents', 'Brain'],
    mark: ['s', 's', 'c'],
    body: 'Orders, scheduling, documents, and status updates handled across your systems, with exceptions surfaced early.',
  },
  {
    name: 'Finance',
    pillars: ['Agents'],
    mark: ['s', 'o', 's'],
    body: 'Invoice intake, matching, reconciliation, and collections follow-up, all inside your existing controls.',
  },
  {
    name: 'Marketing',
    pillars: ['Brain', 'Agents'],
    mark: ['o', 'c', 'c'],
    body: 'Content, product answers, and campaign research grounded in what your company actually knows.',
  },
  {
    name: 'People and training',
    pillars: ['Brain'],
    mark: ['c', 'o', 's'],
    body: 'New hires ramp on your real procedures, and senior people stop answering the same questions.',
  },
];

export const FAQS = [
  {
    q: 'What does Cartra actually do?',
    a: 'Cartra is an applied AI company. We design, build, deploy, and run custom AI systems inside your business. Most engagements center on Cartra Voice for phone calls, Cartra Agents for workflows and operations, Cartra Brain for company knowledge, or a combination of the three.',
  },
  {
    q: 'Do we need all three?',
    a: 'No. Each one stands on its own, and every Voice or Agents deployment includes the knowledge its job needs. Companies add Cartra Brain when they want one organized source of truth that every team and every AI system can draw from.',
  },
  {
    q: 'What happens on the first call?',
    a: 'It is a working session. We learn how your operations run, where time and money leak, and which systems are involved. You leave with a clear view of where AI could make the biggest difference first, whether or not you work with us.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'It depends on the workflow and the systems involved. We scope a timeline on the first call, and we design every engagement to put something real into production quickly, then expand from there.',
  },
  {
    q: 'Will it work with our existing software?',
    a: 'Yes. We build on top of what you already run, including your phone system, inboxes, CRM, ERP, and internal tools. There is no migration and no new platform for your team to learn.',
  },
  {
    q: 'How much of our team’s time does it take?',
    a: 'Your team shares context on how the work gets done and reviews the system before launch. We handle the design, build, deployment, and ongoing improvement.',
  },
  {
    q: 'How do you handle security and our data?',
    a: 'Agents work only within the access you grant, and every action is logged. You own your configuration, knowledge, and data, you can export or delete it at any time, and it is never used to train models.',
  },
  {
    q: 'How does pricing work?',
    a: 'Pricing depends on scope: the workflows, systems, and volume involved. We share a proposal after the discovery call, once we understand what you need.',
  },
];
