/*
 * Case studies for the industry pages, in a fuller format than the product
 * page story cards: the challenge, what we built, how it works, and results.
 *
 * Every client here is real, and every figure is one Jeff confirmed (the
 * same figures as the story cards in products.ts). The extra sections only
 * restate how each build works; they add no new facts or numbers. Do not add
 * figures, timelines, quotes, or system names that are not confirmed.
 */

export type CaseStudyResult = {
  /** A confirmed figure, shown large. Omit for a qualitative result. */
  value?: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  /** Who the client is, as specific as confirmed (industry, place, size). */
  client: string;
  /** The Cartra product it runs on. */
  product: 'Cartra Voice' | 'Cartra Agents' | 'Cartra Brain';
  title: string;
  challenge: string;
  built: string;
  /** Named agents, shown as tags. */
  agents?: string[];
  /** How it works, step by step. */
  steps: string[];
  results: CaseStudyResult[];
  /** Photo in public/case-studies/, shown beside the story. Without one the
      slide shows a dark results panel instead. */
  photo?: string;
  /** CSS object-position for the photo crop. */
  photoFocus?: string;
};

export const FREIGHT_QUOTING: CaseStudy = {
  id: 'freight-quoting',
  client: 'U.S. freight forwarder, 40 people',
  product: 'Cartra Agents',
  title: 'Every quote answered first, and more freight won.',
  photo: 'freight-container-stacks.webp',
  // Tall photo: frame the sunlit container stacks, not the sky above.
  photoFocus: 'center 72%',
  challenge:
    'Customers email in quote requests for ocean shipments and drayage throughout the day. In freight, the fastest quote often wins the job, so every request that sat in an inbox waiting for someone to price it was business at risk.',
  built:
    'A Quoting Agent built around the forwarder’s own rates and pricing rules. It works from the same inbox the team uses and answers customers directly, so quotes go out while the customer is still shopping.',
  agents: ['Quoting Agent'],
  steps: [
    'Reads each quote request as it arrives by email',
    'Picks out what the price depends on',
    'Prices it on the forwarder’s own rates and rules',
    'Replies to the customer by email, automatically',
  ],
  results: [
    { value: '30%', label: 'more quotes won' },
    { label: 'Quote requests answered automatically by email' },
  ],
};

export const FREIGHT_TRIAGE: CaseStudy = {
  id: 'freight-triage',
  client: 'U.S. freight forwarder, 35 people',
  product: 'Cartra Agents',
  title: 'Every inbox triaged, every shipment kept current.',
  photo: 'freight-rail.webp',
  photoFocus: '72% center',
  challenge:
    'Every employee’s inbox mixed urgent customer issues with routine updates, and the messages that mattered were easy to miss. At the same time, shipment details arriving by email and through shipping and tracking data had to be kept current in the TMS.',
  built:
    'Two AI teammates built around how this forwarder runs. One works every inbox the way the company’s SOPs say it should be worked; the other keeps the TMS up to date on its own.',
  agents: ['Email Triage Agent', 'Shipment Manager Agent'],
  steps: [
    'The Email Triage Agent prioritizes every employee’s email by the company’s own SOPs',
    'The messages that matter reach the right person first',
    'The Shipment Manager Agent creates shipments in the TMS from incoming events',
    'It keeps them updated from email, shipping, and tracking data',
  ],
  results: [
    { label: 'Every employee inbox triaged against company SOPs' },
    { label: 'Shipments created and updated in the TMS automatically' },
  ],
};

export const INSURANCE_AGENCY: CaseStudy = {
  id: 'insurance-agency',
  client: 'Insurance agency, 250 people',
  product: 'Cartra Voice',
  photo: 'insurance-glass-towers.webp',
  // Tall photo: frame the reflected tower in the glass.
  photoFocus: 'center 45%',
  title: 'From one department to the whole agency.',
  challenge:
    'The agency’s phones carry a steady stream of policy changes and new-business inquiries, and every call that waits for a free CSR is a client kept on hold or a quote that goes elsewhere.',
  built:
    'Cartra Voice, built around how the first department already handled its calls. Once it proved itself there, the agency rolled it out department by department.',
  steps: [
    'Answers policy service and new-business calls',
    'Updates vehicles and drivers on existing policies, right on the call',
    'Quotes new customers for health insurance',
    'Hands anything that needs a licensed CSR over with a summary, so nobody starts from scratch',
  ],
  results: [
    { value: '10,000+', label: 'calls handled every month' },
    { value: '3', label: 'departments live within 2 months' },
  ],
};

export const KOREAN_SPA: CaseStudy = {
  id: 'korean-spa',
  client: 'Wellness facility, Irvine, CA, 50 people',
  product: 'Cartra Voice',
  photo: 'wellness-sauna.webp',
  // Tall photo: frame the lamp and benches.
  photoFocus: 'center 55%',
  title: 'Appointments booked and questions answered around the clock.',
  challenge:
    'Clients call to book and ask the same handful of questions, often while the front desk is busy with the people standing in front of them.',
  built:
    'Cartra Voice, built around the facility’s schedule and the answers its staff give every day, so the front desk can focus on the clients in the room.',
  steps: [
    'Answers every call, day or night',
    'Books appointments over the phone',
    'Answers recurring questions the way staff would',
    'Leaves the front desk free for the clients in the room',
  ],
  results: [
    { value: '5,000', label: 'calls handled every month' },
    { value: '~30', label: 'appointments booked every day' },
    { value: '<2 wks', label: 'from kickoff to live' },
  ],
};

export const MED_SPA: CaseStudy = {
  id: 'med-spa',
  client: 'Med spa, Flagstaff, AZ',
  product: 'Cartra Voice',
  photo: 'med-spa-treatment.webp',
  // Tall photo: frame the treatment jars on the wooden tray.
  photoFocus: 'center 35%',
  title: 'Phones answered while the team is with patients.',
  challenge:
    'When the team is with patients, the phone goes unanswered, and callers who reach voicemail often book somewhere else.',
  built: 'Cartra Voice answering the med spa’s phones, so every caller gets an answer even when the whole team is busy.',
  steps: [
    'Answers every call, including during treatments',
    'Handles new client inquiries',
    'Passes on anything that needs staff',
  ],
  results: [
    { value: '16%', label: 'revenue increase after go-live' },
    { value: '1,000', label: 'calls handled every month' },
  ],
};

export const SUPPLEMENT_MAKER: CaseStudy = {
  id: 'supplement-maker',
  client: 'Supplement manufacturer, 100 people, $50M revenue',
  product: 'Cartra Brain',
  photo: 'supplement-facility.webp',
  // Tall photo: frame the steel process piping.
  photoFocus: 'center 40%',
  title: 'One source of truth for service, operations, and marketing.',
  challenge:
    'Customer service, operations, and marketing each kept their own documents. Finding the right answer often meant digging through drives or asking whoever happened to know.',
  built:
    'Cartra Brain, built around how those three teams work: their documents and know-how brought into one knowledge base, with answers that link back to their sources.',
  steps: [
    'Brings each team’s documents and know-how into one knowledge base',
    'Answers questions with a link to the source',
    'Gives service, operations, and marketing the same answer',
  ],
  results: [
    { label: 'Company knowledge unified into one source of truth' },
    { label: 'Faster, more consistent answers for service and operations' },
    { label: 'Weeks of searching turned into instant answers' },
  ],
};
