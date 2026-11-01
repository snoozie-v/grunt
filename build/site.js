// Single source of truth for business facts and page content.
// Edit here, then run `npm run build` to regenerate everything in /public.
//
// Paragraph strings are plain text. Use [link text](/path) for internal links.

const business = {
  name: 'J & R Grunt Werks LLC',
  shortName: 'J & R Grunt Werks',
  owners: ['John Kimble', 'Ryan Dickelman'],
  phone: '320-815-0900',
  tel: '+13208150900',
  email: 'jrgruntwerks@gmail.com',
  city: 'Carlos',
  state: 'MN',
  zip: '56319',
  geo: { lat: 45.9733, lng: -95.2914 },
  // Canonical domain. jrgruntworks.com is the registered domain today; if you
  // move to jrgruntwerks.com, change it here and rebuild.
  siteUrl: 'https://www.jrgruntworks.com',
  // MN DLI plumbing license / bond numbers. Shown in the footer + schema when set.
  licenseNumber: '',
  serviceArea: ['Carlos', 'Alexandria', 'Miltona', 'Garfield', 'Osakis', 'Parkers Prairie', 'Nelson', 'Forada', 'Brandon'],
};

const published = '2026-10-31';
const modified = '2026-10-31';
const updatedLabel = 'October 2026';

// ---------------------------------------------------------------- services

const services = [
  {
    slug: 'water-heater-repair',
    name: 'Water Heater Repair & Replacement',
    cardName: 'Water Heaters',
    cardText: 'Repair or replace electric tank water heaters. Most swaps are done in one visit.',
    title: 'Water Heater Repair & Replacement in Carlos & Alexandria, MN | J & R Grunt Werks',
    description: 'Licensed plumber for water heater repair and replacement in Carlos, Alexandria, and Douglas County, MN. Electric tank heaters, most done in one visit.',
    h1: 'Water Heater Repair & Replacement in Douglas County, MN',
    quick: {
      text: 'J & R Grunt Werks is a licensed, bonded, and insured plumber in Carlos, MN that repairs and replaces electric tank water heaters across Carlos, Alexandria, Miltona, and the surrounding lakes area. Most like-for-like replacements are finished in a single visit.',
      bullets: [
        ['Type', 'Electric tank water heaters'],
        ['Typical job', 'Repair or full replacement, usually one visit'],
        ['Service area', 'Carlos, Alexandria, Miltona, Garfield, Osakis, and nearby'],
        ['Pricing', 'Free estimate, price confirmed before work starts'],
      ],
    },
    who: {
      q: 'Who replaces water heaters in Carlos and Alexandria, MN?',
      a: 'J & R Grunt Werks, a licensed, bonded, and insured plumbing company based in Carlos, MN, replaces and repairs water heaters throughout Douglas County. Owners John Kimble and Ryan Dickelman handle electric tank water heaters for homes, farms, and lake cabins in Carlos, Alexandria, Miltona, Garfield, and Osakis.',
    },
    sections: [
      {
        h2: 'Signs your water heater needs attention',
        list: [
          'Rusty or discolored hot water',
          'Rumbling or popping from the tank (sediment buildup)',
          'Water pooling around the base of the tank',
          'Running out of hot water faster than you used to',
          'A tank that is 10 or more years old',
          'No hot water at all, or a breaker that keeps tripping',
        ],
      },
      {
        h2: 'Repair or replace?',
        p: [
          'A lot of water heater problems are a single part: a burned-out heating element, a bad thermostat, or a leaking relief valve or drain valve. Those are usually quick repairs.',
          'If the tank itself is leaking, it is time to replace. Hard water is common in central Minnesota, and the sediment it leaves behind shortens tank life. Most tank water heaters last somewhere around 8 to 12 years. We will tell you straight whether a repair is worth it.',
        ],
      },
      {
        h2: 'Well-water homes',
        p: [
          'Outside city limits, a lot of homes around Carlos and Miltona are on private wells, and hard well water is tough on electric elements and tanks. We work on these setups every week and can tell you what will hold up best.',
        ],
      },
    ],
    faqs: [
      { q: 'How long does a water heater replacement take?', a: 'Most like-for-like tank water heater replacements by J & R Grunt Werks are finished in a single visit. Jobs that move the heater or change its size can take longer, and we will tell you that up front.' },
      { q: 'How much does water heater replacement cost in Douglas County, MN?', a: 'Cost depends on tank size, the model you choose, and how the existing heater is installed. J & R Grunt Werks gives free estimates and confirms the price before any work starts. Call or text 320-815-0900.' },
      { q: 'Do you work on gas or propane water heaters?', a: 'No. J & R Grunt Werks works on electric tank water heaters only.' },
      { q: 'Why is my water heater making a popping noise?', a: 'Popping or rumbling usually means sediment has built up in the bottom of the tank, which is common with hard water in central Minnesota. Flushing the tank can help if the heater is younger. On an older tank it is often a sign replacement is coming.' },
    ],
  },
  {
    slug: 'leak-repair',
    name: 'Leak Repair',
    cardName: 'Leaks',
    cardText: 'Under-sink leaks, running toilets, dripping shutoffs, pinhole copper leaks, frozen and burst pipes, and split hose bibs.',
    title: 'Plumbing Leak Repair in Carlos & Alexandria, MN | J & R Grunt Werks',
    description: 'Leak repair from a licensed plumber in Carlos, MN. Under-sink leaks, toilets, shutoff valves, pinhole leaks, and frozen pipes across Douglas County.',
    h1: 'Plumbing Leak Repair in Carlos, Alexandria & Douglas County, MN',
    quick: {
      text: 'J & R Grunt Werks fixes plumbing leaks in Carlos, Alexandria, Miltona, and the surrounding area: under-sink supply lines and drains, toilets, shutoff valves, pinhole leaks in copper, PEX fittings, and pipes damaged by freezing. Most leak repairs are done in one visit.',
      bullets: [
        ['Common fixes', 'Sinks, toilets, valves, copper and PEX lines, hose bibs'],
        ['Frozen pipes', 'Thawed, repaired, and protected from the next cold snap'],
        ['Service area', 'Carlos, Alexandria, Miltona, Garfield, Osakis, and nearby'],
        ['Fastest way to reach us', 'Call or text 320-815-0900'],
      ],
    },
    who: {
      q: 'Who fixes plumbing leaks in Carlos, MN?',
      a: 'J & R Grunt Werks, a licensed, bonded, and insured plumbing company based in Carlos, MN, repairs leaks in homes, farms, and lake cabins across Douglas County, including Alexandria, Miltona, Garfield, and Osakis. Call or text 320-815-0900 to describe the leak and get on the schedule.',
    },
    sections: [
      {
        h2: 'Leaking right now? Do this first',
        list: [
          'Shut off the water. In town, the main shutoff is usually where the water line comes into the basement near the meter. On a private well, look for the valve near the pressure tank.',
          'If the leak is on the hot side, turn off power or gas to the water heater.',
          'Move anything valuable away from the water and take a photo of the leak.',
          'Call or text us at 320-815-0900. A photo helps us bring the right parts.',
        ],
      },
      {
        h2: 'Leaks we fix every week',
        list: [
          'Kitchen and bathroom sink drains and supply lines',
          'Running or leaking toilets (flappers, fill valves, wax rings, supply lines)',
          'Stuck or dripping shutoff valves',
          'Pinhole leaks in older copper lines',
          'Leaking PEX fittings and connections',
          'Frozen or burst pipes after a cold snap',
          'Split outdoor hose bibs, replaced with frost-free sillcocks',
        ],
      },
      {
        h2: 'Minnesota winters and frozen pipes',
        p: [
          'Pipes in exterior walls, crawlspaces, and unheated cabins are the first to freeze when temperatures drop. When a frozen line splits, it often does not leak until it thaws. If you have had a pipe freeze, keep an eye on it. We can repair the damaged section and talk through insulation, heat tape, or rerouting so it does not happen again.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I shut off the water to my house?', a: 'In most Douglas County homes on city water, the main shutoff is in the basement where the water line enters, near the meter. On a private well, the shutoff is usually next to the pressure tank. If you cannot find it or it will not turn, call J & R Grunt Werks at 320-815-0900.' },
      { q: 'How much does leak repair cost?', a: 'It depends on where the leak is and what has to be opened up to reach it. Many leak repairs are a single visit with standard parts. J & R Grunt Werks gives free estimates and confirms the price before work starts.' },
      { q: 'Can you fix a frozen or burst pipe?', a: 'Yes. J & R Grunt Werks repairs frozen and burst pipes in homes and cabins around Carlos, Alexandria, and Miltona, and can recommend ways to keep the same line from freezing again.' },
      { q: 'Is a running toilet worth fixing?', a: 'Yes. A running toilet can waste a lot of water, which matters on city water bills and on private wells and septic systems. It is usually a quick fix like a flapper or fill valve.' },
    ],
  },
  {
    slug: 'fixture-installation',
    name: 'Faucet, Toilet & Fixture Installation',
    cardName: 'Fixtures',
    cardText: 'Faucets, toilets, sinks, vanities, garbage disposals, shower valves, dishwasher and laundry hookups, sump pumps, and frost-free hose bibs.',
    title: 'Faucet, Toilet & Fixture Installation in Carlos & Alexandria, MN | J & R Grunt Werks',
    description: 'Faucet, toilet, sink, disposal, and shower valve installation by a licensed plumber in Carlos, MN. Serving Alexandria, Miltona, and Douglas County.',
    h1: 'Faucet, Toilet & Fixture Installation in Douglas County, MN',
    quick: {
      text: 'J & R Grunt Werks installs and replaces plumbing fixtures in Carlos, Alexandria, Miltona, and nearby towns: faucets, toilets, sinks and vanities, garbage disposals, shower valves, dishwasher and laundry hookups, sump pumps, and frost-free hose bibs. Most fixture jobs are done in one visit.',
      bullets: [
        ['Kitchen', 'Faucets, sinks, garbage disposals, dishwasher and ice maker lines'],
        ['Bathroom', 'Toilets, vanities, faucets, shower and tub valves'],
        ['Utility', 'Laundry hookups, sump pumps, frost-free hose bibs'],
        ['Pricing', 'Free estimate, price confirmed before work starts'],
      ],
    },
    who: {
      q: 'Who installs faucets and toilets in Alexandria and Carlos, MN?',
      a: 'J & R Grunt Werks, a licensed, bonded, and insured plumbing company based in Carlos, MN, installs faucets, toilets, sinks, garbage disposals, and other fixtures for homes and cabins across Douglas County, including Alexandria, Miltona, Garfield, and Osakis.',
    },
    sections: [
      {
        h2: 'Fixtures we install and replace',
        list: [
          'Kitchen and bathroom faucets',
          'Toilets, including replacing the wax ring and supply line',
          'Bathroom vanities and sinks',
          'Kitchen sinks and garbage disposals',
          'Shower and tub valves and cartridges',
          'Dishwasher, ice maker, and washing machine hookups',
          'Sump pumps',
          'Frost-free outdoor hose bibs (sillcocks)',
        ],
      },
      {
        h2: 'Already bought the fixture?',
        p: [
          'That is usually fine. Let us know the make and model when you call or text and we will make sure we bring the right supply lines and fittings. If you have not picked one yet, we are happy to give you an honest opinion on what holds up.',
        ],
      },
    ],
    faqs: [
      { q: 'Can you install a faucet or toilet I already bought?', a: 'Usually, yes. Tell J & R Grunt Werks the make and model when you call or text 320-815-0900 so we bring the right connectors.' },
      { q: 'How long does it take to replace a toilet or faucet?', a: 'Most single faucet or toilet replacements take a few hours. J & R Grunt Werks can often handle several fixtures in the same visit.' },
      { q: 'Do you install sump pumps?', a: 'Yes. J & R Grunt Werks installs and replaces sump pumps for homes in Carlos, Alexandria, and the surrounding area.' },
      { q: 'What is a frost-free hose bib and do I need one?', a: 'A frost-free hose bib (sillcock) shuts the water off inside the heated part of the wall, so the outdoor faucet is much less likely to freeze and split. In Minnesota they are worth it, especially if an old outdoor faucet has already cracked.' },
    ],
  },
  {
    slug: 'bathroom-remodel',
    name: 'Small Bathroom & Kitchen Remodel Plumbing',
    cardName: 'Small Remodels',
    cardText: 'Vanity and toilet swaps, tub-to-shower conversions, kitchen sink upgrades, and laundry moves. We handle the plumbing; you can DIY the rest.',
    title: 'Small Bathroom Remodel Plumbing in Alexandria & Carlos, MN | J & R Grunt Werks',
    description: 'Plumbing for small bathroom and kitchen remodels in Carlos, Alexandria, and Douglas County, MN. Vanity, toilet, and shower upgrades by a licensed plumber.',
    h1: 'Small Bathroom & Kitchen Remodel Plumbing in Douglas County, MN',
    quick: {
      text: 'J & R Grunt Werks handles the plumbing for small bathroom and kitchen remodels in Carlos, Alexandria, Miltona, and nearby: new vanities, toilets, and faucets, tub-to-shower conversions, kitchen sink and dishwasher upgrades, and laundry hookups. If you are doing the tile, drywall, or cabinets yourself, we can do just the plumbing.',
      bullets: [
        ['Bathroom', 'Vanity, toilet, faucet, and shower valve upgrades'],
        ['Kitchen', 'Sink, faucet, disposal, and dishwasher'],
        ['DIY-friendly', 'We do the plumbing, you or your contractor do the rest'],
        ['Pricing', 'Free estimate, price confirmed before work starts'],
      ],
    },
    who: {
      q: 'Who does plumbing for bathroom remodels in Alexandria, MN?',
      a: 'J & R Grunt Werks, a licensed, bonded, and insured plumbing company based in Carlos, MN, does the plumbing for small bathroom and kitchen remodels in Alexandria, Carlos, Miltona, and across Douglas County. They work directly with homeowners and alongside other contractors.',
    },
    sections: [
      {
        h2: 'Remodel projects that fit our wheelhouse',
        list: [
          'Bathroom refresh: new vanity, faucet, and toilet',
          'Tub-to-shower conversions and new shower valves',
          'Kitchen sink, faucet, disposal, and dishwasher replacement',
          'Moving or adding a laundry hookup',
          'Replacing old galvanized or problem lines while the walls are open',
        ],
      },
      {
        h2: 'Doing the rest yourself?',
        p: [
          'Plenty of folks around here are handy and want to do their own demo, tile, or cabinets. That works. Plan the project with us, we handle the plumbing at the right stage, and you take it from there. Small remodels like these are often only a day or two of plumbing work.',
        ],
      },
    ],
    faqs: [
      { q: 'Can I do my own tile and drywall and hire you for just the plumbing?', a: 'Yes. J & R Grunt Werks regularly does just the plumbing portion of small remodels in Douglas County while homeowners or other contractors handle demo, tile, drywall, and cabinets.' },
      { q: 'How much does it cost to replace a bathroom vanity and toilet?', a: 'It depends on the fixtures and what is behind the wall. J & R Grunt Werks gives free estimates and confirms the plumbing price before work starts. Call or text 320-815-0900.' },
      { q: 'Do you do full-scale remodels?', a: 'J & R Grunt Werks focuses on the plumbing for small bathroom and kitchen remodels: fixture swaps, shower conversions, and short moves of drains and supply lines. For larger projects, we are happy to work alongside your general contractor.' },
    ],
  },
];

// ---------------------------------------------------------------- cities

const cities = [
  {
    slug: 'alexandria',
    name: 'Alexandria',
    geo: { lat: 45.8852, lng: -95.3775 },
    description: 'Licensed plumber serving Alexandria, MN. Water heaters, leak repair, fixtures, and small remodels. Based just up the road in Carlos. Free estimates.',
    quickExtra: 'Based just north in Carlos, we cover Alexandria in town and out on the lakes.',
    areaNote: 'Alexandria in town, plus Lake Le Homme Dieu, Lake Geneva, Lake Victoria, Lake Darling, and Lake Carlos',
    local: {
      h2: 'Plumbing for Alexandria homes and lake places',
      p: [
        'Alexandria has a little of everything: older homes near downtown, newer neighborhoods on the edges of town, and lake homes and cabins along the chain of lakes. In town you are mostly on city water; a few miles out, private wells are common. We work on all of it.',
        'We are based in Carlos, just north of Alexandria, so getting to you is easy.',
      ],
    },
    extraFaqs: [
      { q: 'Do you serve lake homes on the Alexandria chain of lakes?', a: 'Yes. J & R Grunt Werks serves year-round homes and seasonal cabins on Lake Le Homme Dieu, Lake Geneva, Lake Victoria, Lake Darling, Lake Carlos, and the rest of the Alexandria area.' },
    ],
    nearby: ['miltona', 'garfield', 'osakis'],
  },
  {
    slug: 'miltona',
    name: 'Miltona',
    geo: { lat: 46.0444, lng: -95.2931 },
    description: 'Licensed plumber serving Miltona, MN and Lake Miltona. Water heaters, leak repair, fixtures, and small remodels. Based next door in Carlos.',
    quickExtra: 'We are based next door in Carlos, so Miltona and Lake Miltona are close to home.',
    areaNote: 'Miltona, Lake Miltona, and the surrounding farms and townships',
    local: {
      h2: 'Plumbing around Miltona and Lake Miltona',
      p: [
        'Between Lake Miltona cabins, year-round lake homes, and the farms around town, a lot of Miltona plumbing runs on private wells and septic. Those setups have their own quirks, and we work on them all the time.',
      ],
    },
    extraFaqs: [
      { q: 'Do you work on cabins on Lake Miltona?', a: 'Yes. J & R Grunt Werks repairs plumbing and fixes leaks, water heaters, and fixtures for cabins and lake homes on Lake Miltona.' },
    ],
    nearby: ['alexandria', 'parkers-prairie', 'garfield'],
  },
  {
    slug: 'osakis',
    name: 'Osakis',
    geo: { lat: 45.8669, lng: -95.1520 },
    description: 'Licensed plumber serving Osakis, MN and Lake Osakis. Water heater replacement, leak repair, fixtures, and small remodels. Free estimates.',
    quickExtra: 'We cover Osakis in town and around Lake Osakis.',
    areaNote: 'Osakis and the homes and cabins around Lake Osakis',
    local: {
      h2: 'Plumbing for Osakis and Lake Osakis',
      p: [
        'Lake Osakis sits on the Douglas and Todd county line, and the area around it is a mix of year-round homes, seasonal cabins, and farms. Hard well water and lines that need to make it through the winter are everyday work for us.',
      ],
    },
    extraFaqs: [
      { q: 'Do you serve homes around Lake Osakis?', a: 'Yes. J & R Grunt Werks serves homes and cabins in Osakis and around Lake Osakis for water heaters, leaks, fixtures, and small remodels.' },
    ],
    nearby: ['alexandria', 'miltona', 'garfield'],
  },
  {
    slug: 'garfield',
    name: 'Garfield',
    geo: { lat: 45.9405, lng: -95.4914 },
    description: 'Licensed plumber serving Garfield, MN and rural western Douglas County. Water heaters, leak repair, fixtures, and small remodels. Free estimates.',
    quickExtra: 'We cover Garfield and the farms and rural homes west of Alexandria.',
    areaNote: 'Garfield and rural western Douglas County',
    local: {
      h2: 'Plumbing for Garfield homes and farms',
      p: [
        'Around Garfield, most homes are on private wells, and plenty of farmhouses still have a mix of original and patched-together plumbing. We fix what is there, replace what is worn out, and leave you with something that will last.',
      ],
    },
    extraFaqs: [
      { q: 'Do you work on older farmhouse plumbing?', a: 'Yes. J & R Grunt Werks repairs and updates plumbing in older farmhouses around Garfield and western Douglas County, including replacing worn-out lines and fixtures.' },
    ],
    nearby: ['alexandria', 'miltona', 'osakis'],
  },
  {
    slug: 'parkers-prairie',
    name: 'Parkers Prairie',
    geo: { lat: 46.1530, lng: -95.3289 },
    description: 'Licensed plumber serving Parkers Prairie, MN. Water heaters, leak repair, fixtures, and small remodels from J & R Grunt Werks in nearby Carlos.',
    quickExtra: 'Parkers Prairie is a short drive north from our home base in Carlos.',
    areaNote: 'Parkers Prairie and the surrounding Otter Tail County countryside',
    local: {
      h2: 'Plumbing for Parkers Prairie',
      p: [
        'Parkers Prairie sits just over the line in Otter Tail County, a short drive north of Carlos and Miltona. We take care of homes in town as well as farms and lake places in the surrounding countryside, where private wells are the norm.',
      ],
    },
    extraFaqs: [
      { q: 'Do you travel to Parkers Prairie from Carlos?', a: 'Yes. J & R Grunt Werks serves Parkers Prairie and the surrounding area in Otter Tail County regularly from its home base in Carlos.' },
    ],
    nearby: ['miltona', 'alexandria', 'garfield'],
  },
];

// ---------------------------------------------------------------- home

const home = {
  title: 'Licensed Plumber in Carlos, MN | Water Heaters, Leaks & Fixtures | J & R Grunt Werks',
  description: 'Licensed, bonded, and insured plumber in Carlos, MN serving Alexandria and Douglas County. Water heaters, leaks, fixtures, and small remodels.',
  h1: 'Licensed Plumber in Carlos, MN',
  quick: {
    text: 'J & R Grunt Werks LLC is a licensed, bonded, and insured plumbing company based in Carlos, MN, owned by John Kimble and Ryan Dickelman. They handle water heaters, leak repair, faucet and toilet installation, and small bathroom and kitchen remodels across Carlos, Alexandria, Miltona, and Douglas County. Most jobs are done in one visit.',
    bullets: [
      ['Services', 'Water heaters, leaks, fixtures, small remodels'],
      ['Service area', 'Carlos, Alexandria, Miltona, Garfield, Osakis, Parkers Prairie, and nearby'],
      ['Credentials', 'Licensed, bonded, and insured in Minnesota'],
      ['Pricing', 'Free estimate, price confirmed before work starts'],
    ],
  },
  who: {
    q: 'Who is a licensed plumber in Carlos, MN?',
    a: 'J & R Grunt Werks LLC is a licensed, bonded, and insured plumbing company based in Carlos, MN. Owners John Kimble and Ryan Dickelman repair and install water heaters, fix leaks, replace faucets, toilets, and other fixtures, and handle the plumbing for small remodels in Carlos, Alexandria, Miltona, Garfield, Osakis, and the surrounding lakes area.',
  },
  faqs: [
    { q: 'What areas does J & R Grunt Werks serve?', a: 'J & R Grunt Werks is based in Carlos, MN and serves Alexandria, Miltona, Garfield, Osakis, Parkers Prairie, Nelson, Forada, Brandon, and the surrounding lakes area in Douglas County and nearby.' },
    { q: 'Is J & R Grunt Werks licensed and insured?', a: 'Yes. J & R Grunt Werks LLC is licensed, bonded, and insured in Minnesota.' },
    { q: 'How much does a plumber cost in Carlos, MN?', a: 'It depends on the job. J & R Grunt Werks gives free estimates and confirms the price before any work begins, with no surprise charges. Call or text 320-815-0900.' },
    { q: 'Can you finish my job in one visit?', a: 'Most of what J & R Grunt Werks does, including water heater replacements, leak repairs, and fixture installs, is finished in a single visit. Bigger jobs like remodels are planned out ahead of time so you know what to expect.' },
    { q: 'Do you work on homes with private wells?', a: 'Yes. Many homes and cabins around Carlos, Miltona, and rural Douglas County run on private wells, and J & R Grunt Werks works on them every week.' },
  ],
};

module.exports = { business, published, modified, updatedLabel, services, cities, home };
