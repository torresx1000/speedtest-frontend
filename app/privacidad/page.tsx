import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { PrivacyPolicyContent } from "@/components/legal/privacy-policy-content";

export const metadata: Metadata = {
  title: "Política de privacidad · SpeedyFactosys",
  description: "Tratamiento de datos personales en SpeedyFactosys. Factosys Peru SAC.",
};

export default function PrivacidadPage() {
  return (
    <LegalPageShell title="Política de privacidad">
      <PrivacyPolicyContent />
    </LegalPageShell>
  );
}
