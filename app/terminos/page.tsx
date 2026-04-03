import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { TermsOfServiceContent } from "@/components/legal/terms-of-service-content";

export const metadata: Metadata = {
  title: "Términos y condiciones · SpeedyFactosys",
  description: "Condiciones de uso de SpeedyFactosys. Factosys Peru SAC.",
};

export default function TerminosPage() {
  return (
    <LegalPageShell title="Términos y condiciones">
      <TermsOfServiceContent />
    </LegalPageShell>
  );
}
