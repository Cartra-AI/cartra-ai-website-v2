/*
 * Copy for /voice/spas, the Cartra Voice page for spa and wellness owners
 * (outbound email and calls point here). No em dashes in user-facing strings.
 *
 * The story is a real client, kept anonymous ("a large Korean spa in Orange
 * County") until it agrees to be named. Only figures Jeff has confirmed
 * appear: 50 people, 50+ appointments booked a day, live in under 2 weeks.
 * Don't add a monthly call count or the client's name without his OK.
 */

import type { VoiceScript } from '../components/landing/VoiceCall';
import { DATA_OWNERSHIP, type ProductStory } from './products';

export const SPAS = {
  path: '/voice/spas',
  seoTitle: 'AI Phone Answering and Booking for Spas | Cartra Voice',
  seoDescription:
    'Cartra Voice answers your spa’s phone during treatments and after hours, answers callers’ questions, and books appointments into Square Appointments, Mindbody, Booker, or Google Calendar, in 90+ languages.',

  /** Rendered two-tone: [ink, green]. */
  headline: ['Calls answered and booked', 'while you’re with clients.'] as [string, string],
  lede:
    'Cartra Voice picks up when your staff can’t: during treatments, after hours, and at the front-desk rush. It answers the questions callers ask every day and books the appointment into Square Appointments, Mindbody, Booker, or Google Calendar, in 90+ languages.',
  proof: 'Live at a large Korean spa in Orange County: 50+ appointments booked every day.',

  showcase: {
    title: 'Questions answered. Appointments booked.',
    capabilities: [
      'Calls during treatments, after hours, and at the front-desk rush',
      'Questions about hours, prices, services, and policies',
      'Appointments booked into the system you already use',
      '90+ languages, including Korean, Chinese, and Spanish',
      'Handoffs to your staff with a summary of the call',
    ],
  },

  problem: {
    title: ['With a client.', 'Phone ringing.'] as [string, string],
    body: 'Therapists can’t step out of a treatment, and the front desk is busy checking guests in. Callers ask the same questions all day, after hours the line goes to voicemail, and a missed call is often a booking that goes somewhere else.',
    /* Each row pairs a problem with what changes, so the columns read across. */
    rows: [
      {
        today: 'The phone rings during a treatment, and nobody can pick up',
        voice: 'It answers while your team stays with their clients',
      },
      {
        today: 'After hours, callers reach voicemail and try another spa',
        voice: 'After hours, it answers and books the next open time',
      },
      {
        today: 'The front desk answers the same questions all day',
        voice: 'It answers hours, prices, and policies the way your staff would',
      },
      {
        today: 'A missed call is a missed booking',
        voice: 'Callers book on the first call, in the system you already use',
      },
      {
        today: 'Callers who prefer Korean, Chinese, or Spanish wait for the one person who speaks it',
        voice: 'It speaks 90+ languages, so callers book in their own',
      },
    ],
  },

  storyTitle: 'Live today at a large Korean spa.',
  story: {
    kind: 'case-study',
    industry: 'Korean spa, Orange County, 50 people',
    title: 'Appointments booked and questions answered around the clock',
    body: 'Guests call to book treatments and ask the same questions about the spa, often while the front desk is busy with the people in the building. We built Cartra Voice around the spa’s schedule and the answers its staff give every day. Now it answers those questions around the clock and books appointments over the phone in several languages, so the front desk can focus on the guests in front of them.',
    results: ['50+ appointments booked every day', 'Live in under 2 weeks'],
  } satisfies ProductStory,

  booking: {
    title: 'Booked into the calendar you already use.',
    body: 'It checks open times and books the appointment while the caller is still on the line. Bookings land where your team already looks, with nothing new to learn.',
    /* `example` is a sample booking for the panel's card, not customer data. */
    systems: [
      {
        label: 'On Square',
        name: 'Square Appointments',
        body: 'Appointments go straight onto your Square calendar, next to the ones your front desk books.',
        example: { service: 'Body scrub, 60 min', when: 'Sat 2:00 PM' },
      },
      {
        label: 'On Mindbody or Booker',
        name: 'Mindbody and Booker',
        body: 'Appointments go straight into the schedule your front desk already works from.',
        example: { service: 'Facial, 60 min', when: 'Thu 6:30 PM' },
      },
      {
        label: 'Booking by phone today',
        name: 'Google Calendar',
        body: 'No booking software? It books into a shared Google Calendar, so your team sees the day’s appointments in one place.',
        example: { service: 'Couples massage, 90 min', when: 'Sun 11:00 AM' },
      },
    ],
  },

  languages: {
    title: 'Callers book in the language they’re most comfortable with.',
    body: 'Cartra Voice speaks 90+ languages, so a caller who prefers Korean, Chinese, or Spanish gets answered and booked in it.',
    greetings: [
      { text: '안녕하세요', lang: 'ko', name: 'Korean' },
      { text: '您好', lang: 'zh', name: 'Chinese' },
      { text: 'Hola', lang: 'es', name: 'Spanish' },
      { text: 'Xin chào', lang: 'vi', name: 'Vietnamese' },
      { text: 'Kumusta', lang: 'tl', name: 'Tagalog' },
      { text: 'Hello', lang: 'en', name: 'English' },
    ],
  },

  features: [
    {
      title: 'Answers your spa’s questions',
      body: 'Hours, prices, services, parking, gift cards, what to bring. It answers from what your staff tells callers today.',
    },
    {
      title: 'Picks up when you can’t',
      body: 'During treatments, after hours, on weekends, and when the front desk is already on another call.',
    },
    {
      title: 'Sounds like your spa',
      body: 'Your greeting, your service names, and your policies, built from how your best front-desk staff handle calls.',
    },
    {
      title: 'Hands off to your team',
      body: 'Anything it shouldn’t handle goes to your staff, live or as a callback, with a summary so guests never repeat themselves.',
    },
    {
      title: 'Leaves medical questions to you',
      body: 'You decide what it answers. At a med spa, questions about treatments, results, or medical history go to your staff.',
    },
    {
      title: 'A summary of every call',
      body: 'Every call is logged with a summary for your team, so you can see who called and what was booked.',
    },
  ],

  steps: [
    {
      title: 'We learn your calls',
      body: 'We go through the calls your front desk gets: your services, prices, and policies, and the questions callers ask most.',
    },
    {
      title: 'We connect your booking system',
      body: 'We connect Square Appointments, Mindbody, Booker, or Google Calendar, write your greeting, and test it on real scenarios before any caller hears it.',
    },
    {
      title: 'We launch and keep tuning',
      body: 'It goes live on the calls you choose, like after hours or during treatments, and we keep improving it after launch.',
    },
  ],

  faqs: [
    {
      q: 'Which booking systems does it work with?',
      a: 'Square Appointments, Mindbody, and Booker. If you take bookings by phone and don’t use booking software, it books into Google Calendar. On a different system? Tell us when you reach out.',
    },
    {
      q: 'What languages does it speak?',
      a: 'More than 90, including Korean, Chinese, and Spanish, so every caller is served in the language they are most comfortable with.',
    },
    {
      q: 'We’re a med spa. Will it give medical advice?',
      a: 'No. You decide what it handles. Questions about treatments, results, side effects, or medical history go to your staff, with a summary of the call.',
    },
    {
      q: 'What happens when a caller needs a person?',
      a: 'It hands off to the right person on your team, live or as a booked callback, with a summary of the call so nobody starts from scratch.',
    },
    {
      q: 'Does it work with our phone line?',
      a: 'Yes. Cartra Voice works with the phone system you already use, and we set up the call routing with your team, for example after hours or when the front desk is busy.',
    },
    {
      q: 'How long does it take to set up?',
      a: 'Our team does the setup, not yours. The Korean spa above was live in under 2 weeks. We’ll give you a timeline for your spa on the first call.',
    },
    {
      q: 'What does it cost?',
      a: 'Pricing depends on your call volume and the booking system it connects to. We share a clear price after a short call about your spa.',
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

  closing: {
    title: 'See what Cartra Voice could do for your spa.',
    body: 'A short call with our team about your phones, your booking system, and the questions callers ask most. We’ll tell you plainly whether it’s a fit.',
  },
};

/* Sample call for the showcase card: a day-spa booking. Not customer data. */
export const SPA_CALL: VoiceScript = {
  line: 'Inbound · Front desk',
  ariaLabel: 'Example: a Cartra Voice agent at a spa answers a question about the sauna and books a body scrub',
  turns: [
    { who: 'caller', start: 500, end: 3900, text: 'Hi, do you have anything Saturday afternoon for a body scrub? And can I use the sauna after?' },
    { who: 'agent', start: 4500, end: 9300, text: 'Yes, 2:00 or 3:30 on Saturday. A body scrub includes a day pass, so the saunas and pools are yours all day. Which time works?' },
    { who: 'caller', start: 9900, end: 11300, text: '2:00, please. It’s under Grace.' },
  ],
  actions: [
    { label: 'Checked Saturday openings in the calendar', start: 4700, done: 5600 },
    { label: 'Booked a body scrub, Sat 2:00 PM, for Grace', start: 11500, done: 12300 },
    { label: 'Logged the call with a summary for the front desk', start: 12400, done: 13200 },
  ],
  callEnd: 11500,
  loop: 16500,
  still: 14000,
  startSeconds: 41,
};
