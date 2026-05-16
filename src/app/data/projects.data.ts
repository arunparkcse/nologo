export interface Project {
  slug: string;
  type: 'films' | 'photography' | 'creative' | 'csr';
  title: string;
  category: string;
  client: string;
  year: string;
  thumb: string;
  images: string[];
  description: string;
  tags: string[];
  videoId?: string;
  videoType?: 'youtube' | 'vimeo';
}

const NL = 'https://www.nologo.in';
const YT_THUMB = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const MX = 'https://template.dsngrid.com/mexdot/light/assets/img';

export const PROJECTS: Project[] = [

  // ── FILMS ──────────────────────────────────────────────────────────
  {
    slug: 'hgs-csr-film',
    type: 'csr',
    title: 'HGS CSR Film',
    category: 'Corporate Film',
    client: 'Hinduja Global Solutions',
    year: '2019',
    thumb: YT_THUMB('d4B_wxVSgdg'),
    images: [YT_THUMB('d4B_wxVSgdg')],
    videoId: 'd4B_wxVSgdg',
    videoType: 'youtube',
    description: 'The brand film for HGS talks about the significance of "giving" and demonstrates how the concept of giving is an integral part of the work culture of the organisation. The film flows like an emotional journey through the lives of the beneficiaries of the CSR programme of HGS and narrates how the holistic nature of the program makes a difference in their lives.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'hgs-volunteering-film',
    type: 'csr',
    title: 'HGS Volunteer film',
    category: 'Corporate Film',
    client: 'Hinduja Global Solutions',
    year: '2016',
    thumb: YT_THUMB('qMka15H_ExI'),
    images: [YT_THUMB('qMka15H_ExI')],
    videoId: 'qMka15H_ExI',
    videoType: 'youtube',
    description: 'The HGS Volunteer film is about the various volunteering activities undertaken by the employees of HGS for the CSR program of the company. The film showcases the various volunteering activities undertaken by the employees of HGS for the CSR program of the company.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'volunteer',
    type: 'csr',
    title: 'Volunteer',
    category: 'Corporate Film',
    client: 'Hinduja Global Solutions',
    year: '2016',
    thumb: YT_THUMB('q24ZBzBR6Ug'),
    images: [YT_THUMB('q24ZBzBR6Ug')],
    videoId: 'q24ZBzBR6Ug',
    videoType: 'youtube',
    description: 'The video talks about the Employee Volunteering Program of HGS by reinforcing the name concept â€˜Work to Giveâ€™. The video depicts the various volunteering initiatives undertaken by HGS employees, how they have made an impact in the lives of beneficiaries as well as those of the employees.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'hgs-differently-abled',
    type: 'csr',
    title: 'HGS Differently Abled',
    category: 'CSR',
    client: 'Hinduja Global Solutions',
    year: '2016',
    thumb: YT_THUMB('7C-7l7aIgoM'),
    images: [YT_THUMB('7C-7l7aIgoM')],
    videoId: '7C-7l7aIgoM',
    videoType: 'youtube',
    description: 'This film is an ode to the differently-abled - celebrating their never-say-die spirit. It showcases the journey of a few individuals who, despite their physical challenges, have carved a niche for themselves in the corporate world, proving that determination and grit can overcome any obstacle.',
    tags: ['CSR']
  },
  {
    slug: 'road-safety',
    type: 'csr',
    title: 'Road Safety',
    category: 'CSR',
    client: 'Cheyyar SEZ Developers',
    year: '2015',
    thumb: `${NL}/assets/images/csr/road_safety/road_safety1.jpg`,
    images: [
      `${NL}/assets/images/csr/road_safety/road_safety2.jpg`,
      `${NL}/assets/images/csr/road_safety/road_safety3.jpg`,
      `${NL}/assets/images/csr/road_safety/road_safety4.jpg`,
      `${NL}/assets/images/csr/road_safety/road_safety5.jpg`,
      `${NL}/assets/images/csr/road_safety/road_safety6.jpg`
    ],
    description: 'We designed a series of CSR Campaign materials for Road Safety based on the concept â€œOur Children are Watching Usâ€. The concept talked about how children watch and imitate the elders in their family. But it is of great concern if a dangerous behaviour or indifference or negligence on road is imitated by the children. So the messaging was focused towards all the people who are influencers to the upcoming generation.',
    tags: ['CSR']
  },
  {
    slug: 'sakhi',
    type: 'csr',
    title: 'Sakhi',
    category: 'CSR',
    client: 'Sakhi',
    year: '2021',
    thumb: `${NL}/assets/images/csr/sakhi/sakhi_01.jpg`,
    images: [`${NL}/assets/images/csr/sakhi/sakhi_01.jpg`,
    `${NL}/assets/images/csr/sakhi/sakhi_02.jpg`,
    `${NL}/assets/images/csr/sakhi/sakhi_03.jpg`
    ],
    description: '',
    tags: ['CSR']
  },
  {
    slug: 'csr-brochure',
    type: 'csr',
    title: 'CSR Brochure',
    category: 'Brochure',
    client: 'Cheyyar SEZ Developers',
    year: '2024',
    thumb: `${NL}/assets/images/csr/beyond/beyond1.jpg`,
    images: [`${NL}/assets/images/csr/beyond/beyond2.jpg`,
    `${NL}/assets/images/csr/beyond/beyond3.jpg`,
    `${NL}/assets/images/csr/beyond/beyond4.jpg`
    ],
    description: 'The brochure developed for the CSR program Beyond of Cheyyar SEZ Developers talks about the various social outreach activities undertaken by the company in the areas of Education, Health and Sanitation, Sports and Infrastructure to support the communities surrounding it. The deliberate usage of minimalistic design and poignant photographs add to its simplicity and appeal.',
    tags: ['CSR', 'Brochure']
  },
  {
    slug: 'joy-of-being',
    type: 'csr',
    title: 'Joy of Being',
    category: 'CSR',
    client: 'EKAM Foundation',
    year: '2024',
    thumb: `${NL}/assets/images/csr/joy/joy1.jpg`,
    images: [`${NL}/assets/images/csr/joy/joy2.jpg`,
    `${NL}/assets/images/csr/joy/joy3.jpg`,
    `${NL}/assets/images/csr/joy/joy4.jpg`,
    `${NL}/assets/images/csr/joy/joy5.jpg`,
    `${NL}/assets/images/csr/joy/joy6.jpg`,
    `${NL}/assets/images/csr/joy/joy7.jpg`,
    `${NL}/assets/images/csr/joy/joy8.jpg`
    ],
    description: 'The brochure developed for the CSR program Joy of Being of EKAM Foundation talks about the various social outreach activities undertaken by the foundation in the areas of Education, Health and Sanitation, Sports and Infrastructure to support the communities surrounding it. The deliberate usage of minimalistic design and poignant photographs add to its simplicity and appeal.',
    tags: ['CSR', 'Brochure']
  },
  {
    slug: 'nonprofit-advocacy-brochure',
    type: 'csr',
    title: 'Nonprofit Advocacy Brochure',
    category: 'Brochure',
    client: 'EKAM Foundation',
    year: '2024',
    thumb: `${NL}/assets/images/csr/ekam/ekam1.jpg`,
    images: [`${NL}/assets/images/csr/ekam/ekam2.jpg`,
    `${NL}/assets/images/csr/ekam/ekam3.jpg`
    ],
    description: 'Ekam is an organisation that has been working to improve the healthcare of underprivileged children and mothers. We designed a brochure on the concept of infant mortality for Ekam keeping in mind the gravity of the issue and the need for immediate action. The design concept suggests that EKAM is a combatant trying to bring about great positive changes, not only strategizing inside four walls but also at the frontline - where the struggle is more than real.',
    tags: ['CSR', 'Brochure']
  },
  {
    slug: 'samajshala',
    type: 'csr',
    title: 'Samajshala',
    category: 'CSR',
    client: 'Samajshala',
    year: '2019',
    thumb: `${NL}/assets/images/csr/samajshala/samajshala_01.jpg`,
    images: [`${NL}/assets/images/csr/samajshala/samajshala_02.jpg`,
    `${NL}/assets/images/csr/samajshala/samajshala_03.jpg`,
    `${NL}/assets/images/csr/samajshala/samajshala_04.jpg`,
    `${NL}/assets/images/csr/samajshala/samajshala_05.jpg`
    ],
    description: 'The brochure developed for the CSR program Samjashala of EKAM Foundation talks about the various social outreach activities undertaken by the foundation in the areas of Education, Health and Sanitation, Sports and Infrastructure to support the communities surrounding it. The deliberate usage of minimalistic design and poignant photographs add to its simplicity and appeal.',
    tags: ['CSR', 'Brochure']
  },
  {
    slug: "hgs-values",
    type: "films",
    title: "HGS Values",
    category: "Corporate Film",
    client: "Hinduja Global Solutions",
    year: "2016",
    thumb: YT_THUMB('X-Vk_g_OBxM'),
    images: [YT_THUMB('X-Vk_g_OBxM')],
    videoId: 'X-Vk_g_OBxM',
    videoType: 'youtube',
    description: "At No Logo, we don’t believe in boxed thinking. We believe in impact. This film celebrates the bold, brave, and boundary-pushing values that define the HGS culture.",
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: "cbm-let-not-cbm-be-a-barrier-to-vision-impairment",
    type: "films",
    title: "Let not CBM be a barrier to vision impairment",
    category: "Corporate Film",
    client: "CBM",
    year: "2017",
    thumb: YT_THUMB('7yrGZsQVQ-U'),
    images: [YT_THUMB('7yrGZsQVQ-U')],
    videoId: '7yrGZsQVQ-U',
    videoType: 'youtube',
    description: 'This film depicts the dreams and vibrant spirit of differently-abled persons across myriad regions of India and highlights the work that CBM has been doing to promote their rights by championing the cause of building an inclusive society.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: "hgs-automated-enterprise",
    type: "films",
    title: "Automated Enterprise",
    category: "Corporate Film",
    client: "Hinduja Global Solutions",
    year: "2017",
    thumb: YT_THUMB('VaMJiy66jfI'),
    images: [YT_THUMB('VaMJiy66jfI')],
    videoId: 'VaMJiy66jfI',
    videoType: 'youtube',
    description: 'The films speak about the technological solutions delivered by Hinduja Global Solutions (HGS) through voice contact service centres, management of healthcare industry’s front office and back office, and deploying robotic process automation to deliver optimized outcomes to its clients.', tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: "hgs-health-center-of-excellence-in-india",
    type: "films",
    title: "Health Center of Excellence in India",
    category: "Corporate Film",
    client: "Hinduja Global Solutions",
    year: "2017",
    thumb: YT_THUMB('Tw30ht9nTr4'),
    images: [YT_THUMB('Tw30ht9nTr4')],
    videoId: 'Tw30ht9nTr4',
    videoType: 'youtube',
    description: 'The films speak about the technological solutions delivered by Hinduja Global Solutions (HGS) through voice contact service centres, management of healthcare industry’s front office and back office, and deploying robotic process automation to deliver optimized outcomes to its clients.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'One',
    type: 'films',
    title: 'One',
    category: 'Film',
    client: 'Nologo',
    year: '2018',
    thumb: YT_THUMB('Vl75EjRTpSw'),
    images: [YT_THUMB('Vl75EjRTpSw')],
    videoId: 'Vl75EjRTpSw',
    videoType: 'youtube',
    description: 'A poetic and visually evocative narrative that explores the concept of renewal, evolution, and the enduring human spirit. Blending introspection with universal themes of hope and transformation.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'the-rebirth',
    type: 'films',
    title: 'The Rebirth',
    category: 'Film',
    client: 'Nologo',
    year: '2018',
    thumb: YT_THUMB('pF9TGJSoHh8'),
    images: [YT_THUMB('pF9TGJSoHh8')],
    videoId: 'pF9TGJSoHh8',
    videoType: 'youtube',
    description: 'A profound meditation on existence, loss, and the persistent whisper of hope. The film traces a contemplative journey through memory, resilience, and the quiet strength that emerges from within.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'towards-safe-motherhood',
    type: 'films',
    title: 'Towards Safe Motherhood',
    category: 'Corporate Film',
    client: 'Nologo',
    year: '2018',
    thumb: YT_THUMB('EU174p5lKaQ'),
    images: [YT_THUMB('EU174p5lKaQ')],
    videoId: 'EU174p5lKaQ',
    videoType: 'youtube',
    description: 'Safe motherhood is every woman’s right. Through this campaign, we highlight the stories of mothers and children, emphasizing the critical need for safe delivery and care. It’s a celebration of life, motherhood, and the journey towards a healthier future.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'skills-development-program',
    type: 'films',
    title: 'Skills Development Program',
    category: 'Corporate Film',
    client: 'Nologo',
    year: '2019',
    thumb: YT_THUMB('5XchAU2pj34'),
    images: [YT_THUMB('5XchAU2pj34')],
    videoId: '5XchAU2pj34',
    videoType: 'youtube',
    description: 'A Skill Development Program is the backbone of any progressing society. This film is a tribute to the power of skill and the transformation it brings to lives.',
    tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'hgs-voice-center-of-excellence',
    type: 'films',
    title: 'Voice Center of Excellence',
    category: 'Corporate Film',
    client: 'Hinduja Global Solutions',
    year: '2017',
    thumb: YT_THUMB('SPsVqDoAQwg'),
    images: [YT_THUMB('SPsVqDoAQwg')],
    videoId: 'SPsVqDoAQwg',
    videoType: 'youtube',
    description: 'The films speak about the technological solutions delivered by Hinduja Global Solutions (HGS) through voice contact service centres, management of healthcare industry’s front office and back office, and deploying robotic process automation to deliver optimized outcomes to its clients.', tags: ['Corporate Film', 'CSR', 'Brand Film']
  },
  {
    slug: 'nologo-showreel',
    type: 'films',
    title: 'Nologo Show Reel',
    category: 'Agency Reel',
    client: 'No Logo',
    year: '2021',
    thumb: YT_THUMB('-gLPnCgn3lk'),
    images: [YT_THUMB('-gLPnCgn3lk')],
    videoId: '-gLPnCgn3lk',
    videoType: 'youtube',
    description: 'Our agency showreel — a curated collection of the best moments from our film, photography and creative work across the years. A celebration of stories that moved audiences and made a difference.',
    tags: ['Showreel', 'Agency', 'Film']
  },
  {
    slug: 'quess-brand-film',
    type: 'films',
    title: 'Quess',
    category: 'Brand Film',
    client: 'Quess Corp',
    year: '2018',
    thumb: YT_THUMB('GVEIpfSrC2Y'),
    images: [YT_THUMB('GVEIpfSrC2Y')],
    videoId: 'GVEIpfSrC2Y',
    videoType: 'youtube',
    description: 'A compelling brand film for Quess Corp — one of India\'s largest business services providers — that captures the spirit of their workforce and the scale of their human-centred impact across multiple sectors.',
    tags: ['Brand Film', 'Corporate', 'HR']
  },
  {
    slug: 'chachi',
    type: 'films',
    title: 'Chachi',
    category: 'Social Film',
    client: 'Social Campaign',
    year: '2017',
    thumb: YT_THUMB('FpsbNfk1hM8'),
    images: [YT_THUMB('FpsbNfk1hM8')],
    videoId: 'FpsbNfk1hM8',
    videoType: 'youtube',
    description: 'A powerful social impact film that tells the story of resilience, community and the unsung heroes who hold families together. Shot with unflinching honesty, this film resonated deeply with audiences across the country.',
    tags: ['Social Film', 'Impact', 'Documentary']
  },
  {
    slug: 'igsss-life-freedom-dignity',
    type: 'csr',
    title: 'Life. Freedom. Dignity.',
    category: 'NGO Brand Film',
    client: 'Indo Global Social Service Society',
    year: '2018',
    thumb: YT_THUMB('2d9gRUu64M0'),
    images: [YT_THUMB('2d9gRUu64M0')],
    videoId: '2d9gRUu64M0',
    videoType: 'youtube',
    description: 'A brand film that highlights the humanitarian work of Indo Global Social Service Society across India through a poetic voiceover and stunning visuals depicting diverse people and geographies — celebrating decades of service.',
    tags: ['CSR', 'Documentary', 'Social Impact']
  },
  {
    slug: 'csr-calendar',
    type: 'csr',
    title: 'CSR Calendar',
    category: 'Calendar',
    client: 'Cheyyar SEZ Developers',
    year: '2017',
    thumb: `${NL}/assets/images/csr/calendar/calendar1.jpg`,
    images: [`${NL}/assets/images/csr/calendar/calendar2.jpg`,
    `${NL}/assets/images/csr/calendar/calendar3.jpg`,
    `${NL}/assets/images/csr/calendar/calendar4.jpg`
    ],
    description: 'The calendar designed for the CSR program â€˜Beyondâ€™ captures the joy and spirit of the students of â€˜Bon Secours School for Hearing and Speech Impairedâ€™ through a series of lively photographs and captions to go with them. â€˜Beyondâ€™ supports the school through provision of hearing aid and school stationeries for the children every year.',
    tags: ['CSR', 'Calendar']
  },
  {
    slug: 'ucam-brand-film',
    type: 'films',
    title: 'Ucam Brand Film',
    category: 'Brand Film',
    client: 'Ucam',
    year: '2021',
    thumb: YT_THUMB('hxTNpGwG56U'),
    images: [YT_THUMB('hxTNpGwG56U')],
    videoId: 'hxTNpGwG56U',
    videoType: 'youtube',
    description: 'A powerful brand film for Ucam that captures the spirit of their workforce and the scale of their human-centred impact across multiple sectors.',
    tags: ['Brand Film', 'Corporate', 'HR']
  },
  {
    slug: 'hues-of-life',
    type: 'films',
    title: 'Hues of Life',
    category: 'Documentary',
    client: 'No Logo',
    year: '2017',
    thumb: `${NL}/assets/images/work/film/thumb5.jpg`,
    images: [`${NL}/assets/images/work/film/thumb5.jpg`],
    videoId: '227863376',
    videoType: 'vimeo',
    description: 'This video edited with a collage of visuals shot by nologo, is our tribute to the people we have brought in front of our cameras, celebrating their actions and emotions',
    tags: ['Documentary', 'Art Film', 'People']
  },

  // ── PHOTOGRAPHY ────────────────────────────────────────────────────
  {
    slug: 'faces-can-talk',
    type: 'photography',
    title: 'Faces Can Talk',
    category: 'Portrait Photography',
    client: 'Editorial',
    year: '2019',
    thumb: `${NL}/assets/images/work/photography/1/image1.jpg`,
    images: [
      `${NL}/assets/images/work/photography/1/image1.jpg`,
      `${NL}/assets/images/work/photography/1/image2.jpg`,
      `${NL}/assets/images/work/photography/1/image3.jpg`,
      `${NL}/assets/images/work/photography/1/image4.jpg`,
      `${NL}/assets/images/work/photography/1/image5.jpg`,
      `${NL}/assets/images/work/photography/1/image6.jpg`,
      `${NL}/assets/images/work/photography/1/image7.jpg`,
      `${NL}/assets/images/work/photography/1/image8.jpg`,
      `${NL}/assets/images/work/photography/1/image9.jpg`,
      `${NL}/assets/images/work/photography/1/image10.jpg`
    ],
    description: 'A portrait series that explores the infinite stories written on human faces — joy, grief, resilience, wisdom. Every face a universe, every gaze a chapter waiting to be read. Shot across Tamil Nadu and Delhi.',
    tags: ['Portrait', 'Editorial', 'People']
  },
  {
    slug: 'products',
    type: 'photography',
    title: 'Products',
    category: 'Product Photography',
    client: 'Editorial',
    year: '2020',
    thumb: `${NL}/assets/images/work/photography/5/image1.jpg`,
    images: [
      `${NL}/assets/images/work/photography/5/image1.jpg`,
      `${NL}/assets/images/work/photography/5/image2.jpg`,
      `${NL}/assets/images/work/photography/5/image3.jpg`,
      `${NL}/assets/images/work/photography/5/image4.jpg`,
      `${NL}/assets/images/work/photography/5/image5.jpg`,
      `${NL}/assets/images/work/photography/5/image6.jpg`,
      `${NL}/assets/images/work/photography/5/image7.jpg`,
      `${NL}/assets/images/work/photography/5/image8.jpg`
    ],
    description: 'An intimate look at the wild — macro, landscape and creature photography from the forests and wetlands of South India. A reminder that the natural world is the greatest storyteller of all.',
    tags: ['Nature', 'Wildlife', 'Macro']
  },
  {
    slug: 'go-wild',
    type: 'photography',
    title: 'Go Wild',
    category: 'Nature Photography',
    client: 'Jungle Jewels',
    year: '2020',
    thumb: `${NL}/assets/images/work/design/5/image1.jpg`,
    images: [
      `${NL}/assets/images/work/design/5/image1.jpg`,
      `${NL}/assets/images/work/design/5/image2.jpg`,
      `${NL}/assets/images/work/design/5/image3.jpg`,
      `${NL}/assets/images/work/design/5/image4.jpg`
    ],
    description: 'Jungle Jewels is an eco-friendly accessory brand that uses natural products. we created a catalogue for this brand using aesthetic nature based photography of its products, simple graphic design and captivating content.',
    tags: ['Portrait', 'People', 'Style']
  },
  {
    slug: 'door',
    type: 'photography',
    title: 'Door',
    category: 'Fine Art Photography',
    client: 'Personal Project',
    year: '2018',
    thumb: `${NL}/assets/images/work/photography/4/image1.jpg`,
    images: [
      `${NL}/assets/images/work/photography/4/image1.jpg`,
      `${NL}/assets/images/work/photography/4/image2.jpg`,
      `${NL}/assets/images/work/photography/4/image3.jpg`,
      `${NL}/assets/images/work/photography/4/image4.jpg`,
      `${NL}/assets/images/work/photography/4/image5.jpg`,
      `${NL}/assets/images/work/photography/4/image6.jpg`,
      `${NL}/assets/images/work/photography/4/image7.jpg`,
      `${NL}/assets/images/work/photography/4/image8.jpg`,
      `${NL}/assets/images/work/photography/4/image9.jpg`,
      `${NL}/assets/images/work/photography/4/image10.jpg`
    ],
    description: 'Doors as metaphors — thresholds between worlds, between past and future, between the known and the unknown. A fine art series exploring architecture, light and the poetry of passage.',
    tags: ['Fine Art', 'Architecture', 'Abstract']
  },
  {
    slug: 'play-with-light',
    type: 'photography',
    title: 'Play with Light',
    category: 'Fine Art Photography',
    client: 'Personal Project',
    year: '2020',
    thumb: `${NL}/assets/images/work/photography/8/image1.jpg`,
    images: [
      `${NL}/assets/images/work/photography/8/image1.jpg`,
      `${NL}/assets/images/work/photography/8/image2.jpg`,
      `${NL}/assets/images/work/photography/8/image3.jpg`,
      `${NL}/assets/images/work/photography/8/image4.jpg`,
      `${NL}/assets/images/work/photography/8/image5.jpg`,
      `${NL}/assets/images/work/photography/8/image6.jpg`,
      `${NL}/assets/images/work/photography/8/image7.jpg`,
      `${NL}/assets/images/work/photography/8/image8.jpg`
    ],
    description: 'A lifestyle and fashion series celebrating mood, colour and character. Shot for brand campaigns, this series captures the vibrancy of everyday life elevated by thoughtful composition and lighting.',
    tags: ['Nature', 'Wildlife', 'Macro']
  },
  {
    slug: 'beyond',
    type: 'photography',
    title: 'Beyond',
    category: 'Fine Art Photography',
    client: 'Personal Project',
    year: '2020',
    thumb: `${NL}/assets/images/work/photography/9/image1.jpg`,
    images: [
      `${NL}/assets/images/work/photography/9/image1.jpg`
    ],
    description: 'A lifestyle and fashion series celebrating mood, colour and character. Shot for brand campaigns, this series captures the vibrancy of everyday life elevated by thoughtful composition and lighting.',
    tags: ['Nature', 'Wildlife', 'Macro']
  },
  {
    slug: 'moods',
    type: 'photography',
    title: 'Moods',
    category: 'Lifestyle Photography',
    client: 'Brand Project',
    year: '2020',
    thumb: `${NL}/assets/images/work/photography/6/image1.jpg`,
    images: [
      `${NL}/assets/images/work/photography/6/image1.jpg`,
      `${NL}/assets/images/work/photography/6/image3.jpg`,
      `${NL}/assets/images/work/photography/6/image4.jpg`,
      `${NL}/assets/images/work/photography/6/image5.jpg`,
      `${NL}/assets/images/work/photography/6/image6.jpg`,
      `${NL}/assets/images/work/photography/6/image7.jpg`,
      `${NL}/assets/images/work/photography/6/image8.jpg`,
      `${NL}/assets/images/work/photography/6/image9.jpg`,
      `${NL}/assets/images/work/photography/6/image10.jpg`,
      `${NL}/assets/images/work/photography/6/image11.jpg`,
      `${NL}/assets/images/work/photography/6/image12.jpg`
    ],
    description: 'A lifestyle and fashion series celebrating mood, colour and character. Shot for brand campaigns, this series captures the vibrancy of everyday life elevated by thoughtful composition and lighting.',
    tags: ['Lifestyle', 'Fashion', 'Brand']
  },
  {
    slug: 'black-and-white',
    type: 'photography',
    title: 'Black and White',
    category: 'Fine Art Photography',
    client: 'Personal Project',
    year: '2019',
    thumb: `${NL}/assets/images/work/photography/7/image1.jpg`,
    images: [
      `${NL}/assets/images/work/photography/7/image1.jpg`,
      `${NL}/assets/images/work/photography/7/image2.jpg`,
      `${NL}/assets/images/work/photography/7/image3.jpg`,
      `${NL}/assets/images/work/photography/7/image4.jpg`,
      `${NL}/assets/images/work/photography/7/image5.jpg`,
      `${NL}/assets/images/work/photography/7/image6.jpg`,
      `${NL}/assets/images/work/photography/7/image7.jpg`,
      `${NL}/assets/images/work/photography/7/image8.jpg`
    ],
    description: 'Stripping away colour to reveal form, texture and emotion in their purest state. A monochrome series that finds drama and beauty in the simplest subjects — shadows, lines, people and moments.',
    tags: ['Fine Art', 'Monochrome', 'Abstract']
  },
  {
    slug: 'way-of-life',
    type: 'photography',
    title: 'Way of Life',
    category: 'Documentary Photography',
    client: 'Editorial',
    year: '2021',
    thumb: `${NL}/assets/images/work/photography/11/image1.jpg`,
    images: [
      `${NL}/assets/images/work/photography/11/image1.jpg`,
      `${NL}/assets/images/work/photography/11/image2.jpg`,
      `${NL}/assets/images/work/photography/11/image3.jpg`,
      `${NL}/assets/images/work/photography/11/image4.jpg`,
      `${NL}/assets/images/work/photography/11/image5.jpg`,
      `${NL}/assets/images/work/photography/11/image6.jpg`,
      `${NL}/assets/images/work/photography/11/image7.jpg`,
      `${NL}/assets/images/work/photography/11/image8.jpg`
    ],
    description: 'A documentary photography series capturing the rhythms and rituals of daily life — from street vendors and craftspeople to festivals and quiet domestic moments. Real people, real stories, real India.',
    tags: ['Documentary', 'Street', 'People']
  },

  // ── CREATIVE ───────────────────────────────────────────────────────
  {
    slug: 'co-optex-bold',
    type: 'creative',
    title: 'Co-optex Bold Print Ads',
    category: 'Print Campaign',
    client: 'Co-optex',
    year: '2018',
    thumb: `${NL}/assets/images/work/design/12/1.jpg`,
    images: [
      `${NL}/assets/images/work/design/12/1.jpg`,
      `${NL}/assets/images/work/design/12/2.jpg`,
      `${NL}/assets/images/work/design/12/3.jpg`,
      `${NL}/assets/images/work/design/12/4.jpg`,
      `${NL}/assets/images/work/design/12/5.jpg`,
      `${NL}/assets/images/work/design/12/6.jpg`,

    ],
    description: 'With over eight decades of experience, Co-optex is the most trusted destination for handloom lovers. These print advertisements showcase its brand new avatar — targeting the young, urban woman who wishes to carry ethnic pride with intelligence and bold attitude. The concept fuses contemporary design with handloom heritage.',
    tags: ['Print', 'Brand Campaign', 'Retail']
  },
  {
    slug: 'karghaa-catalogue',
    type: 'creative',
    title: 'Karghaa Catalogue',
    category: 'Catalogue Design',
    client: 'Chenetha Colour Weaves',
    year: '2017',
    thumb: `${NL}/assets/images/work/design/6/image1.jpg`,
    images: [
      `${NL}/assets/images/work/design/6/image1.jpg`,
      `${NL}/assets/images/work/design/6/image2.jpg`,
      `${NL}/assets/images/work/design/6/image3.jpg`,
      `${NL}/assets/images/work/design/6/image4.jpg`,
      `${NL}/assets/images/work/design/6/image5.jpg`
    ],
    description: 'With impressive product photography, vibrant graphic design and descriptive text content, we brought alive the world of weavers in Nalgonda and their handloom brand Karghaa in its product catalogue. A celebration of craft, colour and community.',
    tags: ['Catalogue', 'Print', 'Textile']
  },
  {
    slug: 'co-optex-grace',
    type: 'creative',
    title: 'Co-optex Grace Print Ads',
    category: 'Print Campaign',
    client: 'Co-optex',
    year: '2019',
    thumb: `${NL}/assets/images/work/photography/12/thumb.jpg`,
    images: [
      `${NL}/assets/images/work/photography/13/1.jpg`,
      `${NL}/assets/images/work/photography/13/3.jpg`,
      `${NL}/assets/images/work/photography/13/4.jpg`,
      `${NL}/assets/images/work/photography/13/5.jpg`,
      `${NL}/assets/images/work/photography/13/6.jpg`,
      `${NL}/assets/images/work/photography/13/7.jpg`
    ],
    description: 'The Grace campaign for Co-optex celebrates the timeless elegance of handloom textiles — sophisticated, refined and enduring. Where Bold was urban energy, Grace is poetic femininity. A campaign built around the idea that true grace never goes out of style.',
    tags: ['Print', 'Brand Campaign', 'Fashion']
  },
  {
    slug: 'the-banyan-report',
    type: 'creative',
    title: 'The Banyan Annual Report',
    category: 'Annual Report Design',
    client: 'The Banyan',
    year: '2019',
    thumb: `${NL}/assets/images/work/design/banyan/The-Banyan_01.jpg`,
    images: [
      `${NL}/assets/images/work/design/banyan/The-Banyan_01.jpg`,
      `${NL}/assets/images/work/design/banyan/The-Banyan_02.jpg`,
      `${NL}/assets/images/work/design/banyan/The-Banyan_03.jpg`,
      `${NL}/assets/images/work/design/banyan/The-Banyan_04.jpg`,
      `${NL}/assets/images/work/design/banyan/The-Banyan_05.jpg`
    ],
    description: 'An annual report for The Banyan, dedicated to mental health and homelessness. A publication that brings data, stories and impact together in a human narrative.',
    tags: ['Annual Report', 'NGO', 'Publication']
  },
  {
    slug: 'hand-in-hand-report',
    type: 'creative',
    title: 'Hand in Hand Annual Report',
    category: 'Annual Report Design',
    client: 'Hand in Hand',
    year: '2020',
    thumb: `${NL}/assets/images/work/design/hand_in_hand/hand_1.jpg`,
    images: [
      `${NL}/assets/images/work/design/hand_in_hand/hand_1.jpg`,
      `${NL}/assets/images/work/design/hand_in_hand/hand_2.jpg`,
      `${NL}/assets/images/work/design/hand_in_hand/hand_3.jpg`,
      `${NL}/assets/images/work/design/hand_in_hand/hand_4.jpg`,
      `${NL}/assets/images/work/design/hand_in_hand/hand_5.jpg`,
      `${NL}/assets/images/work/design/hand_in_hand/hand_6.jpg`
    ],
    description: 'Annual report design for Hand in Hand, translating a year of impact, outreach and social programmes into a compelling visual document for stakeholders.',
    tags: ['Annual Report', 'NGO', 'Publication']
  },
  {
    slug: 'change-makers',
    type: 'creative',
    title: 'Change Makers',
    category: 'Publication Design',
    client: 'Social Enterprise',
    year: '2020',
    thumb: `${NL}/assets/images/work/design/7/image1.jpg`,
    images: [
      `${NL}/assets/images/work/design/7/image1.jpg`,
      `${NL}/assets/images/work/design/7/image2.jpg`,
      `${NL}/assets/images/work/design/7/image3.jpg`,
      `${NL}/assets/images/work/design/7/image4.jpg`,
      `${NL}/assets/images/work/design/7/image5.jpg`
    ],
    description: 'Change Makers is a publication that celebrates the individuals and organisations rewriting the rules of social enterprise in India. Bold design meets purposeful storytelling.',
    tags: ['Editorial', 'Publication', 'Social']
  },
  {
    slug: 'mafoi-annual-report',
    type: 'creative',
    title: 'Ma Foi Annual Report',
    category: 'Annual Report Design',
    client: 'Ma Foi Foundation',
    year: '2018',
    thumb: `${NL}/assets/images/work/design/The_Mofai_Annual_Report/The_Mofai_Annual_Report_01.jpg`,
    images: [
      `${NL}/assets/images/work/design/The_Mofai_Annual_Report/The_Mofai_Annual_Report_01.jpg`,
      `${NL}/assets/images/work/design/The_Mofai_Annual_Report/The_Mofai_Annual_Report_02.jpg`,
      `${NL}/assets/images/work/design/The_Mofai_Annual_Report/The_Mofai_Annual_Report_03.jpg`,
      `${NL}/assets/images/work/design/The_Mofai_Annual_Report/The_Mofai_Annual_Report_04.jpg`
    ],
    description: 'The Ma Foi Annual Report is a publication that celebrates the individuals and organisations rewriting the rules of social enterprise in India. Bold design meets purposeful storytelling.',
    tags: ['Annual Report', 'Foundation', 'Print Design']
  },
  {
    slug: 'metamorphosis',
    type: 'creative',
    title: 'Metamorphosis',
    category: 'Brochure Design',
    client: 'Social Enterprise',
    year: '2020',
    thumb: `${NL}/assets/images/work/design/2/image1.jpg`,
    images: [
      `${NL}/assets/images/work/design/2/image1.jpg`,
      `${NL}/assets/images/work/design/2/image2.jpg`,
      `${NL}/assets/images/work/design/2/image3.jpg`,
      `${NL}/assets/images/work/design/2/image4.jpg`,
      `${NL}/assets/images/work/design/2/image5.jpg`,
      `${NL}/assets/images/work/design/2/image6.jpg`,
      `${NL}/assets/images/work/design/2/image7.jpg`
    ],
    description: 'Metamorphosis is a publication that celebrates the individuals and organisations rewriting the rules of social enterprise in India. Bold design meets purposeful storytelling.',
    tags: ['Annual Report', 'Foundation', 'Print Design']
  },
  {
    slug: 'sharon-medical-trust',
    type: 'creative',
    title: 'Sharon Medical Trust',
    category: 'Website Design',
    client: 'Sharon Medical Trust',
    year: '2020',
    thumb: `${NL}/assets/images/work/design/10/image1.jpg`,
    images: [
      `${NL}/assets/images/work/design/10/image1.jpg`,
      `${NL}/assets/images/work/design/10/image2.jpg`,
      `${NL}/assets/images/work/design/10/image3.jpg`,
      `${NL}/assets/images/work/design/10/image4.jpg`,
      `${NL}/assets/images/work/design/10/image5.jpg`,
      `${NL}/assets/images/work/design/10/image6.jpg`
    ],
    description: 'sharon is a medical and charitable trust. we designed a logo for sharon using the image of a tri-colored butterfly to depict its three wings of activities and a cross to highlight its christian faith and developed all the stationeries to match the concept. we brought in the concept of care and support using creative photography and informative content to create brochure and posters for sharon palliative care.',
    tags: ['Annual Report', 'Foundation', 'Print Design']
  },
  {
    slug: 'valley-of-hope',
    type: 'creative',
    title: 'Valley of Hope',
    category: 'Brochure Design',
    client: 'Valley of Hope',
    year: '2021',
    thumb: `${NL}/assets/images/work/design/11/image1.jpg`,
    images: [
      `${NL}/assets/images/work/design/11/image1.jpg`,
      `${NL}/assets/images/work/design/11/image2.jpg`,
      `${NL}/assets/images/work/design/11/image3.jpg`,
      `${NL}/assets/images/work/design/11/image4.jpg`,
      `${NL}/assets/images/work/design/11/image5.jpg`,
      `${NL}/assets/images/work/design/11/image6.jpg`
    ],
    description: 'the booklet for igsss focuses on the stories of kashmir flood survivors and a rehabilitation programme that changed their lives. through a series of interesting illustrations, anecdotes, and photos, we designed it to create the desired impact.',
    tags: ['Annual Report', 'Foundation', 'Print Design']
  }
];

export function getProjectBySlug(type: string, slug: string): Project | undefined {
  return PROJECTS.find(p => p.type === type && p.slug === slug);
}

export function getProjectsByType(type: string): Project[] {
  return PROJECTS.filter(p => p.type === type);
}
