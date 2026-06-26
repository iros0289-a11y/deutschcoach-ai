import { PlaceholderScreen } from "../src/features/placeholder/PlaceholderScreen";

export default function NotFoundScreen() {
  return (
    <PlaceholderScreen
      eyebrow="DeutschCoach AI"
      title="Seite nicht gefunden"
      description="Dieser Bereich ist noch nicht verfügbar."
      actionLabel="Zur Startseite"
      actionHref="/"
    />
  );
}

