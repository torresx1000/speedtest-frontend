/** Texto alineado con docs/terminos-y-condiciones.md (documentación del repositorio). */

import Link from "next/link";

export function TermsOfServiceContent() {
  return (
    <article className="space-y-6 text-sm leading-relaxed">
      <p className="text-xs text-slate-500">
        <strong className="text-slate-400">Servicio:</strong> SpeedyFactosys (prueba de velocidad de Internet) ·{" "}
        <strong className="text-slate-400">Titular:</strong> Factosys Peru SAC · Última actualización: 3 de abril de 2026
      </p>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">1. Objeto y aceptación</h2>
        <p>
          Los presentes Términos y Condiciones («Términos») regulan el acceso y uso de{" "}
          <strong className="text-slate-200">SpeedyFactosys</strong>, la herramienta en línea de medición de velocidad de
          Internet puesta a disposición por Factosys Peru SAC («Factosys», «nosotros») («el Servicio»).
        </p>
        <p>
          <strong className="text-slate-200">Al acceder o utilizar el Servicio, usted declara haber leído y aceptado</strong>{" "}
          estos Términos y la{" "}
          <Link href="/privacidad" className="text-teal-400 hover:underline">
            Política de Privacidad
          </Link>
          . Si no está de acuerdo, debe abstenerse de usar el Servicio.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">2. Descripción del Servicio</h2>
        <p>
          El Servicio permite realizar pruebas orientativas de latencia, descarga y carga respecto de los servidores o
          puntos de medición configurados. Los resultados se muestran en pantalla y pueden almacenarse temporalmente en
          su dispositivo según la funcionalidad descrita en la aplicación.
        </p>
        <p>
          <strong className="text-slate-200">Red utilizada:</strong> el servidor{" "}
          <strong className="text-slate-200">no selecciona</strong> si la prueba va por datos móviles, Wi‑Fi u otro medio.
          Las peticiones las inicia <strong className="text-slate-200">su dispositivo o navegador</strong> con la conexión
          activa del sistema; el backend solo responde. El resultado refleja el camino entre su equipo y el servidor según
          esa ruta. En la app, la pestaña <strong className="text-slate-200">Términos y descripción de uso</strong> incluye
          una explicación breve bajo «Cómo se realiza la medición».
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">3. Naturaleza informativa y limitación de responsabilidad</h2>
        <p>
          Los resultados del Servicio tienen <strong className="text-slate-200">carácter meramente informativo y orientativo</strong>.
          La velocidad medida puede <strong className="text-slate-200">variar notablemente</strong> según factores como: tipo
          y calidad de la conexión (Wi-Fi, cable, datos móviles), hardware, software y navegador, tráfico de red, firewall,
          VPN, distancia al servidor de prueba y carga del Servicio.
        </p>
        <p>
          <strong className="text-slate-200">Factosys no garantiza</strong> que los resultados reflejen la velocidad
          contratada con su proveedor de Internet ni que sean exactos, completos o permanentes.{" "}
          <strong className="text-slate-200">En la máxima medida permitida por la ley aplicable</strong>, Factosys{" "}
          <strong className="text-slate-200">no será responsable</strong> de daños directos o indirectos, lucro cesante,
          pérdida de datos o perjuicios derivados del uso o la imposibilidad de uso del Servicio o de la confianza en los
          resultados.
        </p>
        <p>El usuario utiliza el Servicio bajo su propia responsabilidad.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">4. Propiedad intelectual e industrial</h2>
        <p>
          El Servicio —incluyendo código, diseño, marcas, logotipos, textos, gráficos, flujos de medición y documentación
          asociada— es propiedad de <strong className="text-slate-200">Factosys Peru SAC</strong> o de sus licenciantes, y
          está protegido por las leyes de propiedad intelectual e industrial aplicables.
        </p>
        <p>
          Queda <strong className="text-slate-200">prohibida</strong> la reproducción, distribución, comunicación pública,
          transformación o explotación no autorizada del Servicio o de sus elementos, salvo lo permitido expresamente por
          ley o con consentimiento previo por escrito de Factosys.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">5. Uso permitido y conductas prohibidas</h2>
        <p>El usuario se compromete a utilizar el Servicio de buena fe y de conformidad con la ley. Queda expresamente prohibido:</p>
        <ul className="list-inside list-disc space-y-2 text-slate-400">
          <li>
            Realizar o facilitar <strong className="text-slate-300">ataques de denegación de servicio (DoS/DDoS)</strong> o
            actividades que comprometan la disponibilidad, integridad o seguridad del Servicio o de terceros.
          </li>
          <li>
            Emplear <strong className="text-slate-300">scripts, bots o automatización</strong> con fines maliciosos, abusivos
            o que generen carga desproporcionada no razonable sobre la infraestructura.
          </li>
          <li>
            Intentar <strong className="text-slate-300">acceder sin autorización</strong> a sistemas, datos o áreas restringidas.
          </li>
          <li>
            <strong className="text-slate-300">Ingerir datos falsos</strong>, manipular mediciones de forma fraudulenta o
            interferir en el funcionamiento del Servicio.
          </li>
          <li>Utilizar el Servicio para vulnerar derechos de terceros o la normativa vigente.</li>
        </ul>
        <p>
          Factosys podrá adoptar medidas técnicas y legales —incluida la suspensión del acceso— frente a usos contrarios a
          estos Términos.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">6. Modificaciones del Servicio y de los Términos</h2>
        <p>
          Factosys podrá <strong className="text-slate-200">modificar, suspender o interrumpir</strong> el Servicio, total o
          parcialmente, así como <strong className="text-slate-200">actualizar estos Términos</strong> en cualquier momento.
          Los cambios sustanciales podrán comunicarse mediante aviso en el sitio. El uso continuado tras la publicación puede
          constituir aceptación de los nuevos Términos, salvo disposición legal en contrario.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">7. Enlaces a terceros</h2>
        <p>
          El Servicio puede incluir enlaces a sitios de terceros. Factosys no controla ni responde por el contenido o las
          prácticas de privacidad de dichos sitios.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">8. Ley aplicable y jurisdicción</h2>
        <p>
          Salvo norma imperativa en contrario, estos Términos se regirán por las <strong className="text-slate-200">leyes de la República del Perú</strong>.
          Las partes se someten a los <strong className="text-slate-200">tribunales competentes de Lima, Perú</strong>,
          renunciando a cualquier otro fuero que pudiera corresponder.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">9. Contacto</h2>
        <p className="text-slate-400">
          <strong className="text-slate-200">Factosys Peru SAC</strong>
          <br />
          Web:{" "}
          <a href="https://www.factosysperu.com" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">
            www.factosysperu.com
          </a>
          <br />
          Correo: sistemas@factosysperu.com · info@factosysperu.com
        </p>
      </section>

      <p className="border-t border-white/10 pt-6 text-xs italic text-slate-500">
        El presente documento tiene carácter informativo. Para asesoramiento jurídico específico, consulte a un profesional
        cualificado.
      </p>
    </article>
  );
}
