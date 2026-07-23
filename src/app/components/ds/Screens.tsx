import { Section, Group } from "./Shared";
import { FinanceScreen } from "./screens/FinanceApp";
import { SoccerScreen } from "./screens/SoccerApp";

export function ScreensSection() {
  return (
    <Section id="screens" label="09 · App Screens" title="Screen Examples">
      <Group label="Finance App · Home · News · Markets · Account · Mobile">
        <div
          className="flex justify-center items-start py-10 rounded-xl"
          style={{ backgroundColor: "var(--t-bg-subtle)" }}
        >
          <FinanceScreen />
        </div>
      </Group>
      <Group label="Sports App · Matches · News · Leagues · Following · More · Mobile">
        <div
          className="flex justify-center items-start py-10 rounded-xl"
          style={{ backgroundColor: "var(--t-bg-subtle)" }}
        >
          <SoccerScreen />
        </div>
      </Group>
    </Section>
  );
}
