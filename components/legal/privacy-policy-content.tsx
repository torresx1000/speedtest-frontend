/** Texto alineado con docs/politica-de-privacidad.md (documentación del repositorio). */

export function PrivacyPolicyContent() {
  return (
    <article className="space-y-6 text-sm leading-relaxed">
      <p className="text-xs text-slate-500">
        <strong className="text-slate-400">Sitio:</strong> SpeedyFactosys (prueba de velocidad de Internet) ·{" "}
        <strong className="text-slate-400">Responsable:</strong> Factosys Peru SAC · Última actualización: 3 de abril de
        2026
      </p>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">1. Introducción</h2>
        <p>
          La presente Política de Privacidad describe cómo Factosys Peru SAC («nosotros», «el responsable») trata los
          datos personales cuando usted utiliza <strong className="text-slate-200">SpeedyFactosys</strong>, nuestra
          herramienta en línea de prueba de velocidad de Internet («el Servicio»).
        </p>
        <p>
          Nos comprometemos a tratar sus datos de conformidad con el Reglamento (UE) 2016/679 («RGPD») cuando resulte
          aplicable, así como con la normativa peruana de protección de datos personales (Ley N.º 29733 y su reglamento) y
          principios generales de transparencia, limitación de la finalidad y minimización de datos.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">2. Datos personales que recogemos</h2>
        <p>En el marco del Servicio podemos tratar, entre otros, los siguientes datos:</p>
        <ul className="list-inside list-disc space-y-2 text-slate-400">
          <li>
            <strong className="text-slate-300">Dirección IP:</strong> del dispositivo o red desde la que se realiza la
            prueba.
          </li>
          <li>
            <strong className="text-slate-300">Proveedor de acceso (ISP):</strong> identificación del proveedor asociado a
            la conexión, cuando sea técnicamente inferible o proporcionada en el flujo de la medición.
          </li>
          <li>
            <strong className="text-slate-300">Ubicación aproximada:</strong> derivada de la dirección IP (por ejemplo,
            región o ciudad), no geolocalización precisa tipo GPS.
          </li>
          <li>
            <strong className="text-slate-300">Resultados técnicos de la prueba:</strong> latencia (ping), jitter cuando
            se mida, velocidad de descarga y de carga.
          </li>
        </ul>
        <p>
          No solicitamos, como regla general, nombre, documento de identidad ni otros datos identificativos directos para
          ejecutar la prueba básica. Cualquier dato adicional que se solicite en el futuro será descrito en una versión
          actualizada de esta política.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">3. Finalidad del tratamiento</h2>
        <ol className="list-inside list-decimal space-y-2 text-slate-400">
          <li>
            <strong className="text-slate-300">Prestación del Servicio:</strong> ejecutar la medición, mostrar los
            resultados al usuario y permitir el funcionamiento técnico de la aplicación (incluida la comunicación con los
            servidores de medición).
          </li>
          <li>
            <strong className="text-slate-300">Análisis estadístico:</strong> elaborar estadísticas y métricas agregadas
            y, en la medida de lo posible, anonimizadas o pseudonimizadas sobre la calidad y el rendimiento de las redes,
            para mejorar el Servicio y comprender tendencias generales de conectividad.
          </li>
        </ol>
        <p>
          No utilizamos los datos con fines de elaboración de perfiles comerciales invasivos ni para tomar decisiones
          automatizadas que produzcan efectos jurídicos o le afecten significativamente de modo similar, salvo que en el
          futuro se informe expresamente y exista base jurídica adecuada.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">4. Base jurídica (RGPD y referencia general)</h2>
        <p>Cuando el RGPD sea aplicable, nos basamos, según el caso, en:</p>
        <ul className="list-inside list-disc space-y-2 text-slate-400">
          <li>
            <strong className="text-slate-300">Ejecución de medidas precontractuales o del contrato</strong> (art. 6.1.b
            RGPD): cuando el tratamiento sea necesario para realizar la prueba que usted solicita.
          </li>
          <li>
            <strong className="text-slate-300">Interés legítimo</strong> (art. 6.1.f RGPD): para análisis estadísticos
            agregados, seguridad de la infraestructura y mejora del Servicio, respetando sus derechos y libertades.
          </li>
        </ul>
        <p>
          En otros territorios, el tratamiento se fundamentará en bases equivalentes previstas en la ley local
          (consentimiento, ejecución de un acuerdo, interés legítimo u otras habilitaciones legales).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">5. Conservación de los datos</h2>
        <p>
          Conservamos los datos solo el tiempo necesario para las finalidades indicadas, salvo obligación legal de
          conservación mayor. Los plazos concretos pueden variar según la configuración técnica del Servicio. En la
          aplicación puede indicarse información adicional sobre almacenamiento local en su dispositivo (por ejemplo,
          historial en el navegador).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">6. Cookies y tecnologías similares</h2>
        <p>
          Utilizamos <strong className="text-slate-200">cookies y almacenamiento local estrictamente necesarios</strong>{" "}
          para el funcionamiento técnico del test y de la interfaz (por ejemplo, preferencias de sesión o datos de
          medición en el propio dispositivo), en la medida en que resulte imprescindible.
        </p>
        <p>
          Se consideran cookies <strong className="text-slate-200">técnicas</strong> aquellas sin las cuales el Servicio
          no puede operar correctamente. Para cualquier cookie no esencial o analítica adicional que se incorporara en el
          futuro, se solicitará, en su caso, su consentimiento conforme a la normativa aplicable y se actualizará esta
          política.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">7. Destinatarios y encargados del tratamiento</h2>
        <p>Los datos pueden ser tratados por Factosys Peru SAC y su personal autorizado, y por proveedores de infraestructura (alojamiento, CDN, nube) que actúen como encargados del tratamiento, con las garantías contractuales adecuadas.</p>
        <p>No vendemos sus datos personales a terceros.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">8. Transferencias internacionales</h2>
        <p>
          Si algún proveedor técnico ubica datos fuera del Espacio Económico Europeo o de su país de residencia,
          adoptaremos las garantías previstas en el RGPD (cláusulas contractuales tipo, decisiones de adecuación, etc.)
          o las exigidas por la normativa aplicable en cada caso.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">9. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas apropiadas para proteger los datos contra acceso no autorizado,
          pérdida o alteración, en la medida de lo razonable según el estado de la técnica y la naturaleza del tratamiento.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">10. Derechos del usuario</h2>
        <p>Usted puede ejercer, según corresponda y la ley aplicable:</p>
        <ul className="list-inside list-disc space-y-1 text-slate-400">
          <li>
            <strong className="text-slate-300">Acceso</strong> · <strong className="text-slate-300">Rectificación</strong>{" "}
            · <strong className="text-slate-300">Supresión</strong> («derecho al olvido») ·{" "}
            <strong className="text-slate-300">Limitación</strong> · <strong className="text-slate-300">Oposición</strong> ·{" "}
            <strong className="text-slate-300">Portabilidad</strong>
          </li>
        </ul>
        <p>
          Para ejercerlos, escriba a <a href="mailto:sistemas@factosysperu.com" className="text-teal-400 hover:underline">sistemas@factosysperu.com</a> o{" "}
          <a href="mailto:info@factosysperu.com" className="text-teal-400 hover:underline">info@factosysperu.com</a>, indicando su solicitud. Podremos solicitar información razonable para verificar su identidad.
        </p>
        <p>
          Si reside en la UE u otros territorios con autoridad supervisora, tiene derecho a presentar una{" "}
          <strong className="text-slate-300">reclamación</strong> ante la autoridad de protección de datos competente.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">11. Menores de edad</h2>
        <p>
          El Servicio no está dirigido a menores de 16 años (o la edad mínima que establezca la ley local). Si tiene
          conocimiento de que hemos recopilado datos de un menor sin el consentimiento parental exigible, contáctenos
          para proceder a su eliminación cuando proceda.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">12. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta Política de Privacidad para reflejar cambios legales o en el Servicio. La fecha de
          «Última actualización» se revisará al inicio del documento. En cambios sustanciales, podremos informar mediante
          aviso en el sitio u otros medios razonables.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white">13. Contacto</h2>
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
