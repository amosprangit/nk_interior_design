// Sample portfolio. Replace images/videos with your own project media (Cloudinary, S3, /uploads, etc.)
const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const img = (id, caption = '') => ({ type: 'image', url: u(id), caption });
const vid = (url, poster, caption = '') => ({ type: 'video', url, poster: u(poster, 1200), caption });

const VIDEO_A = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const VIDEO_B = 'https://www.w3schools.com/html/mov_bbb.mp4';

module.exports = [
  {
    title: 'The Aravali Residence', slug: 'aravali-residence', category: 'residential', region: 'india',
    location: 'Jaipur, India', year: 2025, area: '4,800 sq ft', featured: true,
    description: 'A warm, light-filled family home built around a double-height living room and a palette of stone, oak and linen.',
    cover: u('photo-1618221195710-dd6b41faaea6'),
    media: [
      img('photo-1618221195710-dd6b41faaea6', 'Living room'),
      img('photo-1600210492486-724fe5c67fb0', 'Façade'),
      vid(VIDEO_A, 'photo-1616486338812-3dadae4b4ace', 'Walkthrough'),
      img('photo-1616486338812-3dadae4b4ace', 'Lounge')
    ]
  },
  {
    title: 'Courtyard Villa', slug: 'courtyard-villa', category: 'residential', region: 'india',
    location: 'Udaipur, India', year: 2024, area: '6,200 sq ft',
    description: 'A modern villa that opens onto a central courtyard, blending local craft with a quiet contemporary layout.',
    cover: u('photo-1600607687939-ce8a6c25118c'),
    media: [
      img('photo-1600607687939-ce8a6c25118c', 'Dining'),
      img('photo-1600585154340-be6161a56a0c', 'Exterior'),
      img('photo-1586023492125-27b2c045efd7', 'Living area')
    ]
  },
  {
    title: 'Harbour Loft', slug: 'harbour-loft', category: 'residential', region: 'global',
    location: 'Singapore', year: 2025, area: '2,100 sq ft',
    description: 'A compact waterfront loft where built-in joinery and a restrained palette make the space feel larger.',
    cover: u('photo-1556228453-efd6c1ff04f6'),
    media: [
      img('photo-1556228453-efd6c1ff04f6', 'Kitchen'),
      img('photo-1505693416388-ac5ce068fe85', 'Bedroom'),
      vid(VIDEO_B, 'photo-1560448204-e02f11c3d0e2', 'Project film'),
      img('photo-1560448204-e02f11c3d0e2', 'Lounge')
    ]
  },
  {
    title: 'Linear Workspace', slug: 'linear-workspace', category: 'commercial', region: 'india',
    location: 'Gurugram, India', year: 2025, area: '18,000 sq ft', featured: true,
    description: 'An open-plan headquarters with acoustic zoning, daylight-first planning and a calm material palette.',
    cover: u('photo-1497366216548-37526070297c'),
    media: [
      img('photo-1497366216548-37526070297c', 'Open workspace'),
      img('photo-1497366811353-6870744d04b2', 'Meeting zone'),
      vid(VIDEO_A, 'photo-1524758631624-e2822e304c36', 'Office tour'),
      img('photo-1524758631624-e2822e304c36', 'Reception')
    ]
  },
  {
    title: 'Studio Cafe', slug: 'studio-cafe', category: 'commercial', region: 'india',
    location: 'Mumbai, India', year: 2024, area: '1,400 sq ft',
    description: 'A neighbourhood cafe with a long oak counter, soft lighting and a layout that lets the space breathe.',
    cover: u('photo-1497215728101-856f4ea42174'),
    media: [
      img('photo-1497215728101-856f4ea42174', 'Interior'),
      img('photo-1604328698692-f76ea9498e76', 'Seating')
    ]
  },
  {
    title: 'Meridian Offices', slug: 'meridian-offices', category: 'commercial', region: 'global',
    location: 'Dubai, UAE', year: 2023, area: '22,000 sq ft',
    description: 'A regional office combining hospitality-level finishes with flexible, collaborative work areas.',
    cover: u('photo-1497366811353-6870744d04b2'),
    media: [
      img('photo-1497366811353-6870744d04b2', 'Lobby'),
      img('photo-1497366216548-37526070297c', 'Workspace'),
      vid(VIDEO_B, 'photo-1497215728101-856f4ea42174', 'Project film')
    ]
  }
];
