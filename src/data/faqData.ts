export interface DetailedFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
  popular?: boolean;
}

export const FAQ_CATEGORIES = [
  'All Questions',
  'General',
  'Services',
  'Pricing & Discounts',
  'Payments',
  'Delivery Time',
  'Revisions & Quality',
  'Assignments',
  'Presentations',
  'ATS Resumes & CVs',
  'Reports & Pitch Decks',
  'AI Assistant & Voice',
  'Orders & Dashboard',
  'Security & Refunds',
  'Pakistani Clients',
  'International Clients'
] as const;

export const COMPREHENSIVE_FAQS: DetailedFaq[] = [
  // General & Agency Overview
  {
    id: 'faq-gen-1',
    category: 'General',
    popular: true,
    question: 'What is MFS Growth Agency?',
    answer: 'MFS Growth Agency is a premium online digital services agency based in Pakistan operating 24/7 globally. We assist students and working professionals with executive presentation design, custom academic assignment writing, ATS resume engineering, and corporate report formatting.'
  },
  {
    id: 'faq-gen-founder',
    category: 'General',
    popular: true,
    question: 'Who founded MFS Growth Agency?',
    answer: 'MFS Growth Agency was founded by Muhammad Shehroz Sultan, who serves as Founder & Lead Director. The agency operates internationally providing specialized digital document engineering, presentation design, and academic research solutions.'
  },
  {
    id: 'faq-gen-location',
    category: 'General',
    popular: true,
    question: 'Where is MFS Growth Agency located and what regions are served?',
    answer: 'MFS Growth Agency is headquartered in Pakistan and operates 24/7 online worldwide. We serve clients across Pakistan, the United States, the United Kingdom, the United Arab Emirates, Saudi Arabia, Canada, Australia, Germany, and 15+ countries internationally.'
  },
  {
    id: 'faq-gen-2',
    category: 'General',
    popular: true,
    question: 'What are your support hours?',
    answer: 'We operate 24 hours a day, 7 days a week online to serve both local Pakistani clients and international clients across the Middle East, UK, USA, Europe, and Asia.'
  },
  {
    id: 'faq-gen-3',
    category: 'General',
    question: 'How can I contact MFS Growth Agency directly?',
    answer: 'You can contact MFS Growth Agency via WhatsApp or Phone at +92 301 5323689, email us at mfsmedia.agency@gmail.com, or chat with our 24/7 AI Assistant directly on the website.'
  },
  {
    id: 'faq-gen-4',
    category: 'General',
    question: 'Are sample project previews available on the website?',
    answer: 'Yes! You can view our verified sample projects under the "Our Work" section. To protect client confidentiality and work ownership, downloads are strictly disabled with protective preview security.'
  },

  // Services
  {
    id: 'faq-srv-1',
    category: 'Services',
    popular: true,
    question: 'What core services does MFS Growth Agency offer?',
    answer: 'We specialize in 4 core service pillars: 1) Presentation Design & Slide Decks, 2) Custom Academic Assignment Writing & Editing, 3) ATS Resume Engineering & CV Design, and 4) Corporate Report & Proposal Formatting.'
  },
  {
    id: 'faq-srv-2',
    category: 'Services',
    question: 'Do you create investor pitch decks and corporate proposals?',
    answer: 'Yes. We design high-stakes investor pitch decks, startup proposals, company profiles, and financial presentations complete with data graphics and modern typography.'
  },
  {
    id: 'faq-srv-3',
    category: 'Services',
    question: 'Can I order a custom package combining multiple services?',
    answer: 'Absolutely! Many clients bundle CV Design with Cover Letter engineering, or pair assignment writing with a matching presentation slide deck. Contact us or use our order wizard for custom bundles.'
  },

  // Pricing & Discounts
  {
    id: 'faq-prc-1',
    category: 'Pricing & Discounts',
    popular: true,
    question: 'What is the 50% Grand Launch Offer?',
    answer: 'To celebrate our agency expansion, all services are currently discounted by 50%! Presentation Design starts at PKR 1,250 ($7.50 USD) per 10 slides, and Assignment Writing starts at PKR 1,000 ($7.50 USD) per 1,000 words.'
  },
  {
    id: 'faq-prc-2',
    category: 'Pricing & Discounts',
    question: 'How does the Live Interactive Price Calculator work?',
    answer: 'Our live calculator lets you select your service type, type any custom slide count or word count (e.g. 100+ slides or 10,000+ words) or adjust sliders, pick your turnaround speed, and select your currency (PKR, USD, GBP, EUR, AED). The 50% discount is automatically applied in real time.'
  },
  {
    id: 'faq-prc-bulk',
    category: 'Pricing & Discounts',
    popular: true,
    question: 'Do you accept bulk orders or large word count projects?',
    answer: 'Yes! We have unlimited scope capabilities. Whether you need a 100+ slide executive pitch deck, a 10,000+ word academic assignment/dissertation, or multiple bulk documents, you can type your exact requirements into our order form or calculator. All bulk orders receive our full 50% Grand Launch discount.'
  },
  {
    id: 'faq-prc-3',
    category: 'Pricing & Discounts',
    question: 'Are there any hidden costs or surprise fees?',
    answer: 'None whatsoever. The price calculated on our checkout page is 100% final and inclusive of quality audits and formatting.'
  },

  // Payments
  {
    id: 'faq-pym-1',
    category: 'Payments',
    popular: true,
    question: 'What payment methods do you accept in Pakistan?',
    answer: 'In Pakistan, we accept manual payments through EasyPaisa, JazzCash, and Askari Bank Transfer. Official payment instructions and verified account details are shared securely during order checkout.'
  },
  {
    id: 'faq-pym-2',
    category: 'Payments',
    question: 'How do I submit proof of payment?',
    answer: 'During the checkout process, simply select your payment account, complete the transfer, and upload your payment transaction screenshot or receipt. Our team verifies submissions instantly.'
  },
  {
    id: 'faq-pym-3',
    category: 'Payments',
    question: 'How do international clients pay for services?',
    answer: 'International clients can pay via direct bank transfers, international wire, or contact us on WhatsApp (+92 301 5323689) for tailored international invoicing details.'
  },

  // Delivery Time & Turnaround
  {
    id: 'faq-del-1',
    category: 'Delivery Time',
    popular: true,
    question: 'How fast can you complete express orders?',
    answer: 'We offer flexible delivery tiers: Standard (3–5 days), Express (24–48 hours), Priority (12–24 hours), and Same-Day Delivery (6–12 hours) for urgent academic or corporate deadlines.'
  },
  {
    id: 'faq-del-2',
    category: 'Delivery Time',
    question: 'What happens if my project deadline is extremely tight?',
    answer: 'Select our Express (+30%), Priority (+50%), or Same-Day (+75%) speed multiplier in the price calculator or contact our 24/7 team on WhatsApp for emergency queue priority.'
  },

  // Revisions & Quality
  {
    id: 'faq-rev-1',
    category: 'Revisions & Quality',
    popular: true,
    question: 'What is your revision policy?',
    answer: 'We offer policy-backed revisions. If any delivered file does not strictly match your submitted guidelines or formatting instructions, our team will modify it promptly until you are satisfied.'
  },
  {
    id: 'faq-rev-2',
    category: 'Revisions & Quality',
    question: 'How do you guarantee quality standards?',
    answer: 'Every project goes through a 3-step quality assurance review checking formatting accuracy, visual hierarchy, grammar, and reference citations before final client delivery.'
  },

  // Assignments & Academic
  {
    id: 'faq-asg-1',
    category: 'Assignments',
    question: 'Do you ensure zero plagiarism in academic assignments?',
    answer: 'Yes. All custom academic assignments are engineered from scratch based on your specific rubric and guidelines with strictly verified reference citations.'
  },
  {
    id: 'faq-asg-2',
    category: 'Assignments',
    question: 'Which academic referencing styles do you support?',
    answer: 'We support all major academic citation styles including APA (6th & 7th Edition), Harvard, MLA, Chicago, IEEE, and Oxford referencing.'
  },
  {
    id: 'faq-asg-3',
    category: 'Assignments',
    question: 'Can I upload guidelines, rubrics, and research datasets?',
    answer: 'Yes! Our order upload form supports PDF, DOCX, PPTX, XLSX, images, and ZIP files up to 25MB so you can share all course briefs and materials.'
  },

  // Presentations
  {
    id: 'faq-prs-1',
    category: 'Presentations',
    question: 'What formats do you deliver presentation slides in?',
    answer: 'We deliver fully editable PowerPoint (.pptx) files, Google Slides links, or high-resolution PDF exports based on your preference.'
  },
  {
    id: 'faq-prs-2',
    category: 'Presentations',
    question: 'Do you include slide animations and custom visual graphics?',
    answer: 'Yes. Our slide decks feature high-contrast visual design, data charts, infographic diagrams, and subtle transitions tailored to your topic.'
  },

  // ATS Resumes & CVs
  {
    id: 'faq-ats-1',
    category: 'ATS Resumes & CVs',
    question: 'What is ATS Resume Engineering and why is it important?',
    answer: 'ATS (Applicant Tracking System) software filters resumes before human recruiters see them. Our ATS resumes are engineered with keyword optimization, clean single-column structure, and recruiter-approved formatting so you pass automated screens.'
  },
  {
    id: 'faq-ats-2',
    category: 'ATS Resumes & CVs',
    question: 'Do you also write custom cover letters?',
    answer: 'Yes! We craft tailored, job-specific cover letters that highlight your core accomplishments and align seamlessly with your ATS resume design.'
  },

  // Reports & Pitch Decks
  {
    id: 'faq-rpt-1',
    category: 'Reports & Pitch Decks',
    question: 'What types of reports do you format?',
    answer: 'We format business case studies, executive research reports, market research whitepapers, university dissertations, and corporate project proposals.'
  },

  // AI Assistant & Voice
  {
    id: 'faq-ai-1',
    category: 'AI Assistant & Voice',
    question: 'What is the MFS AI Assistant?',
    answer: 'The MFS AI Assistant is our dual-mode (Chat + Voice) floating widget active 24/7. It helps you calculate prices, choose services, upload orders, and get instant answers in English, Urdu, or Roman Urdu.'
  },
  {
    id: 'faq-ai-2',
    category: 'AI Assistant & Voice',
    question: 'Does the AI Voice Assistant speak automatically?',
    answer: 'No. The voice assistant remains silent until you explicitly initiate voice mode or click "Tap to Speak".'
  },

  // Orders & Dashboard
  {
    id: 'faq-ord-1',
    category: 'Orders & Dashboard',
    question: 'How do I track my order status?',
    answer: 'Upon placing an order, you receive a unique Order ID (e.g. #MFS-84920). You can monitor your project progress in real time via our Client Dashboard or inquire on WhatsApp.'
  },
  {
    id: 'faq-ord-2',
    category: 'Orders & Dashboard',
    question: 'Can I make changes to my project instructions after ordering?',
    answer: 'If our experts have not yet started working, minor adjustments can be added by messaging our WhatsApp support team with your Order ID.'
  },

  // Security & Refunds
  {
    id: 'faq-sec-1',
    category: 'Security & Refunds',
    question: 'Is my personal information and project data confidential?',
    answer: '100% confidential. We operate under strict data privacy protocols. Your personal contact details and uploaded documents are never shared or published.'
  },
  {
    id: 'faq-sec-2',
    category: 'Security & Refunds',
    question: 'What is your refund policy?',
    answer: 'If we fail to deliver your project or cannot meet agreed service commitments, our policy guarantees a complete review and appropriate refund resolution.'
  },

  // Pakistani Clients
  {
    id: 'faq-pk-1',
    category: 'Pakistani Clients',
    question: 'Can Pakistani students pay via EasyPaisa or JazzCash?',
    answer: 'Yes! EasyPaisa and JazzCash are accepted for orders in Pakistan. Official payment account credentials are generated and displayed during order checkout.'
  },
  {
    id: 'faq-pk-2',
    category: 'Pakistani Clients',
    question: 'Is support available in Urdu or Roman Urdu?',
    answer: 'Ji haan! Humari team aur MFS AI Assistant Urdu, Roman Urdu, aur English teeno zabanon mein 24 ghante madad ke liye mojood hain.'
  },

  // International Clients
  {
    id: 'faq-int-1',
    category: 'International Clients',
    question: 'Do you serve clients in the UK, USA, UAE, and Saudi Arabia?',
    answer: 'Yes. We have served clients across 15+ countries including the UK, USA, UAE, Saudi Arabia, Canada, Australia, and Germany.'
  },
  {
    id: 'faq-int-2',
    category: 'International Clients',
    question: 'Can I view prices in USD, GBP, EUR, or AED?',
    answer: 'Yes! Use our header currency toggle or price calculator currency selector to instantly switch rates between PKR, USD, GBP, EUR, and AED.'
  }
];
