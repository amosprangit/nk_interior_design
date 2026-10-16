import BackgroundScreen from '../components/BackgroundScreen.jsx';
import { BACKGROUNDS, BRAND, MAIN_TABS } from '../config.js';

export default function Landing() {
  return (
    <BackgroundScreen
      image={BACKGROUNDS.home}
      title={BRAND.name}
      subtitle={BRAND.tagline}
      tabs={MAIN_TABS.map((t) => ({ ...t, to: `/${t.slug}` }))}
    />
  );
}
