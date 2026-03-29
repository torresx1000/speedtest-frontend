import { SpeedTestApp } from "@/components/speedtest/speed-test-app";
import { TestResultsProvider } from "@/context/test-results-context";

export default function Home() {
  return (
    <TestResultsProvider>
      <SpeedTestApp />
    </TestResultsProvider>
  );
}
