// ---- Edit this file to rebrand the site ----
export const BRAND = {
  name: 'Nikhil Agarwal Interior Design',
  tagline: 'Interior design and architecture based in India',
};
export const LOGO = '/logo.png';

const u = (id, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

// Full-screen background for each page. Swap with your own high-resolution photos
// (put files in client/public/images and use '/images/your-file.jpg').
export const BACKGROUNDS = {
  home: u('photo-1618221195710-dd6b41faaea6'),
  about: u('photo-1600607687939-ce8a6c25118c'),
  india: u('photo-1600585154340-be6161a56a0c'),
  global: u('photo-1497366216548-37526070297c'),
  residential: u('photo-1616486338812-3dadae4b4ace'),
  commercial: u('photo-1497366811353-6870744d04b2')
};

export const MAIN_TABS = [
  { slug: 'home', label: 'Home' },
  { slug: 'about', label: 'About' },
  { slug: 'india', label: 'India' },
  { slug: 'global', label: 'Global' }
];

export const SUB_TABS = [
  { slug: 'residential', label: 'Residential' },
  { slug: 'commercial', label: 'Commercial' }
];

export const API_URL = import.meta.env.VITE_API_URL || '';
