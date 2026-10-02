export const projects = [
  { id: 'courtyard-house', serial: 1, title: 'Courtyard House', type: 'Architecture', year: '2025', location: 'Dhaka', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=88', images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90'], summary: 'A climate-aware family home organised around a shaded garden, bringing daylight, breeze and everyday rituals into the centre of the plan.' },
  { title: 'Brick & Breeze', type: 'Hospitality', year: '2025', location: 'Chattogram', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=88', summary: 'Tactile brickwork, deep openings and layered planting create a quiet retreat where building and landscape meet.' },
  { title: 'Folded Light', type: 'Cultural', year: '2024', location: 'Sylhet', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=88', summary: 'A public pavilion composed as a sequence of folded planes, animated throughout the day by movement and changing sunlight.' },
  { title: 'House No. 08', type: 'Residential', year: '2024', location: 'Gazipur', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=88', summary: 'A low, horizontal residence framing long garden views and generous shared rooms for a multi-generational family.' },
  { title: 'Common Ground', type: 'Workplace', year: '2023', location: 'Dhaka', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=88', summary: 'A flexible studio shaped by warm timber, honest structure and shared tables for focus, exchange and creative work.' },
  { title: 'Riverstone Retreat', type: 'Hospitality', year: '2023', location: 'Bandarban', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=88', summary: 'A hillside retreat that follows the natural contours, pairing local stone and timber with framed views across the valley.' },
  { title: 'The Green Spine', type: 'Residential', year: '2022', location: 'Dhaka', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=88', summary: 'A compact urban home organised around a planted circulation spine that carries light and air through every level.' },
  { title: 'Arc Gallery', type: 'Cultural', year: '2022', location: 'Rajshahi', image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=88', summary: 'A calm sequence of vaulted rooms creates an adaptable setting for exhibitions, workshops and public gatherings.' },
  { title: 'Terracotta Court', type: 'Mixed Use', year: '2021', location: 'Khulna', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=88', summary: 'A shaded courtyard and perforated terracotta screens temper the tropical climate while giving the building a distinct civic identity.' },
  { title: 'Lightwell Studio', type: 'Workplace', year: '2021', location: 'Dhaka', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88', summary: 'An adaptive workspace centred on a generous lightwell, with flexible rooms designed for collaboration and focused making.' },
];

// Normalise legacy samples while the database-backed dashboard is phased in.
projects.forEach((project, index) => {
  project.id ||= project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  project.serial ||= index + 1;
  project.images ||= [project.image];
  const categories = ['Architecture', 'Interior Design', 'Space Planning', '3D Visualization', 'Concept Design', 'Site Consultancy'];
  if (!categories.includes(project.type)) project.type = categories[index % categories.length];
});

export const services = [
  'Architecture',
  'Interior Design',
  'Space Planning',
  '3D Visualization',
  'Concept Design',
  'Site Consultancy',
];

export const tools = ['AutoCAD', 'Revit', 'SketchUp', 'Rhino', 'Enscape'];

export const portfolioData = {
  profile: {
    name: 'Sherhan Hossain',
    role: 'Architect & Designer',
    email: 'hello@sherhanhossain.com',
  },
  projects,
  services,
  tools,
};
