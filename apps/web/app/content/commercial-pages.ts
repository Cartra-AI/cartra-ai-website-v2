import type { FAQItem } from './faqs';

export type CommercialPage = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  highlights: Array<{
    label: string;
    body: string;
  }>;
  fit: string[];
  workflows: string[];
  proof: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  integrations: string[];
  faqs: FAQItem[];
};

export const COMMERCIAL_PAGES: CommercialPage[] = [
  {
    slug: 'ai-agent-development-company',
    seoTitle: 'AI Agent Development Company for Operations | Cartra',
    seoDescription:
      'Cartra is an AI agent development company building custom voice agents, AI teammates, and company knowledge bases around how your business actually works.',
    eyebrow: 'AI Agent Development Company',
    h1: 'Custom AI agent development, built around your business.',
    intro:
      'Cartra designs, builds, and runs custom AI agents for established businesses: voice agents that answer your phones, AI teammates that take on operational work, and a company brain that keeps both grounded in what you know.',
    highlights: [
      {
        label: 'Built for',
        body: 'Work with real volume and clear rules: calls, documents, approvals, and the systems in between.',
      },
      {
        label: 'Deploys into',
        body: 'Phone lines, inboxes, ERPs, CRMs, spreadsheets, portals, and internal tools.',
      },
      {
        label: 'After launch',
        body: 'Agents that learn from every correction and keep getting better on live work.',
      },
    ],
    fit: [
      'You have repetitive work with clear volume, on the phone or behind it.',
      'Your team lives across ERPs, CRMs, inboxes, spreadsheets, and portals.',
      'You want a production system built for you, not another off-the-shelf AI tool.',
    ],
    workflows: [
      'Inbound and outbound calls for service, scheduling, and sales',
      'Document intake, extraction, classification, and ERP posting',
      'Accounts payable and accounts receivable reconciliation',
      'Procurement, vendor operations, and approval routing',
      'Company knowledge bases and customer-service answer automation',
      'CRM hygiene, pipeline quality checks, and sales ops maintenance',
    ],
    proof:
      'Recent deployments include a quoting agent that helped a freight forwarder win 30% more quotes, a voice agent handling 10,000+ calls a month for an insurance agency, and multi-day procurement coordination collapsed into a single agent-driven workflow.',
    sections: [
      {
        title: 'Built around your operating model',
        body:
          'We map the workflow, identify the decision logic, connect to your systems, and build the agent around the constraints your team actually works inside.',
      },
      {
        title: 'Production deployment, not prototype handoff',
        body:
          'Every engagement runs through launch and beyond, with exception queues and KPI visibility. Agents learn from the corrections your team makes and turn what works into new skills, so the system keeps improving on live work.',
      },
      {
        title: 'Works inside the stack you already run',
        body:
          'Agents work inside your phone system, Salesforce, NetSuite, SAP, HubSpot, QuickBooks, Microsoft 365, Google Workspace, Slack, Zendesk, and custom internal tools.',
      },
    ],
    integrations: ['Salesforce', 'NetSuite', 'SAP', 'HubSpot', 'QuickBooks', 'Slack', 'Zendesk', 'Microsoft 365'],
    faqs: [
      {
        question: 'What does an AI agent development company actually build?',
        answer:
          'For Cartra, it means production AI built for one company: voice agents that handle calls, AI teammates that read inputs, apply your business logic, take action in your systems, and route exceptions to people, and a company knowledge base that grounds them both.',
      },
      {
        question: 'How long does a typical AI agent deployment take?',
        answer:
          'It depends on the workflow and the systems involved. We scope a timeline on the first call and design every engagement to put something real into production quickly, then expand from there.',
      },
      {
        question: 'Do we need our own AI team?',
        answer:
          'No. Cartra handles design, development, integrations, deployment, and everything after launch.',
      },
    ],
  },
  {
    slug: 'ai-automation-agency',
    seoTitle: 'AI Automation Agency for Mid-Market Operations | Cartra',
    seoDescription:
      'Cartra is an AI automation agency that builds custom AI for the calls, documents, approvals, and updates that slow your team down.',
    eyebrow: 'AI Automation Agency',
    h1: 'An AI automation agency for the work slowing down your team.',
    intro:
      'Cartra hands your team\'s repetitive work to custom AI: the phone calls, documents, approvals, and system updates that eat the day, automated inside the tools you already run.',
    highlights: [
      {
        label: 'Best first workflows',
        body: 'Phone answering, document processing, approvals, reconciliation, and CRM updates.',
      },
      {
        label: 'Delivery model',
        body: 'Strategy, implementation, integrations, exception handling, and KPI visibility.',
      },
      {
        label: 'Operating goal',
        body: 'Fewer manual touches, faster throughput, and clearer ownership.',
      },
    ],
    fit: [
      'Your backlog comes from manual handoffs, not strategy gaps.',
      'You need automation across multiple tools, teams, and approval paths.',
      'You want an implementation partner that owns delivery and optimization.',
    ],
    workflows: [
      'Phone answering, scheduling, and follow-up calls',
      'Shared inbox triage and routing',
      'Invoice and customs document processing',
      'ERP, CRM, and help-desk updates',
      'Finance reconciliation and exception handling',
      'Approval workflows and policy enforcement',
    ],
    proof:
      'Cartra engagements focus on measurable operating leverage: lower error rates, faster processing, fewer manual touches, and dashboards that show time and cost recovered.',
    sections: [
      {
        title: 'Automation strategy tied to ROI',
        body:
          'We start by mapping your highest-cost workflows and estimating the operational return before building. The first deployment should have a clear business case.',
      },
      {
        title: 'Custom AI for messy business systems',
        body:
          'The most valuable work spans phone calls, inboxes, PDFs, ERPs, CRMs, spreadsheets, portals, and approvals. Off-the-shelf tools stall there. Custom AI is built for it.',
      },
      {
        title: 'Launch with humans in the loop',
        body:
          'Agents automate confident work and route exceptions to reviewers, so your team gets leverage without losing control over edge cases.',
      },
    ],
    integrations: ['Outlook', 'Gmail', 'NetSuite', 'Salesforce', 'HubSpot', 'QuickBooks', 'Zendesk', 'Slack'],
    faqs: [
      {
        question: 'How is Cartra different from a generic AI automation agency?',
        answer:
          'Most agencies stitch together off-the-shelf tools. Cartra builds AI around how your business actually works, across phone calls, operational work, and company knowledge, deploys it into your stack, and keeps improving it in production.',
      },
      {
        question: 'What should we automate first?',
        answer:
          'Start with high-volume, rule-heavy work that already has clear inputs and outputs: routine calls, document processing, reconciliation, approvals, triage, or CRM hygiene.',
      },
      {
        question: 'Can you work with our existing tools?',
        answer:
          'Yes. The default approach is to deploy into your current stack rather than replacing it.',
      },
    ],
  },
  {
    slug: 'ai-workflow-automation',
    seoTitle: 'AI Workflow Automation for Operations Teams | Cartra',
    seoDescription:
      'Custom AI workflow automation for calls, documents, finance ops, procurement, customer support, and CRM work, built into the stack you already run.',
    eyebrow: 'AI Workflow Automation',
    h1: 'AI workflow automation built into the systems you already run.',
    intro:
      'Cartra builds custom AI that takes repetitive work from the first call or document to the final system update, with people involved only where judgment is actually needed.',
    highlights: [
      {
        label: 'Workflow shape',
        body: 'Repeated inputs, defined decision rules, and measurable outputs.',
      },
      {
        label: 'Agent role',
        body: 'Classify, check context, take action, and route exceptions.',
      },
      {
        label: 'Leadership view',
        body: 'Throughput, accuracy, exceptions, and time recovered.',
      },
    ],
    fit: [
      'Your workflow has repeated inputs, clear decision rules, and measurable outputs.',
      'The process touches several tools and creates manual re-entry.',
      'Leaders need visibility into throughput, exceptions, and cost recovered.',
    ],
    workflows: [
      'Classify and extract data from documents',
      'Check policy, PO, payment, or customer records',
      'Post approved updates into ERPs, CRMs, and ticketing systems',
      'Route exceptions to the right owner',
      'Produce dashboards, audit logs, and weekly operating reports',
    ],
    proof:
      'In production, a freight forwarder’s quoting workflow now answers customer quote requests automatically by email, and faster responses helped it win 30% more quotes.',
    sections: [
      {
        title: 'From intake to action',
        body:
          'The agent does not stop at extraction. It classifies the input, checks context, applies your rules, updates systems, and routes exceptions.',
      },
      {
        title: 'Works across operational departments',
        body:
          'The same pattern applies across customer calls, logistics, finance, procurement, customer support, revenue operations, and company knowledge.',
      },
      {
        title: 'Measured from day one',
        body:
          'Every deployment includes performance monitoring so you can see cost savings, time recovered, accuracy, and exception trends live.',
      },
    ],
    integrations: ['SAP', 'NetSuite', 'Salesforce', 'HubSpot', 'Zendesk', 'Microsoft Teams', 'Slack', 'Google Workspace'],
    faqs: [
      {
        question: 'What is AI workflow automation?',
        answer:
          'AI workflow automation uses AI agents to take in work, from calls and emails to documents, apply your decision logic, take action in your business systems, and escalate exceptions to people.',
      },
      {
        question: 'Which workflows are best for AI automation?',
        answer:
          'The best first candidates have repeated volume, clear rules, expensive manual handling, and measurable outcomes such as time saved or errors reduced.',
      },
      {
        question: 'Can AI workflow automation stay within our approvals?',
        answer:
          'Yes. Cartra designs agents around your permissions, approval paths, exception queues, and audit requirements.',
      },
    ],
  },
];

export function getCommercialPage(slug: string) {
  return COMMERCIAL_PAGES.find((page) => page.slug === slug);
}
