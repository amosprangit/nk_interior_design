import { Navigate, useParams } from 'react-router-dom';
import BackgroundScreen from '../components/BackgroundScreen.jsx';
import { BACKGROUNDS, MAIN_TABS, SUB_TABS } from '../config.js';

export default function SectionPage() {
  const { section } = useParams();
  const current = MAIN_TABS.find((t) => t.slug === section);
  if (!current) return <Navigate to="/" replace />;

  return (
    <BackgroundScreen
      image={BACKGROUNDS[section]}
      title={current.label}
      subtitle="Choose a type of space"
      tabs={SUB_TABS.map((t) => ({ ...t, to: `/${section}/${t.slug}` }))}
      back={{ to: '/', label: 'Back' }}
    />
  );
}
