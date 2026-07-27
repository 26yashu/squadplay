import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { Header } from '../components/layout/Header';

export function PlaceholderPage({ title }) {
  return (
    <ScreenWrapper>
      <Header showBack title={title} />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-400">Coming Soon</p>
      </div>
    </ScreenWrapper>
  );
}
