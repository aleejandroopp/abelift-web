ABELIFT — WEB Y CONFIGURADOR 3D
Revisión visual y multilingüe, 5 de noviembre de 2026.

CÓMO ABRIR
1. Descomprime el ZIP completo en una carpeta nueva. Conserva una copia de tu versión anterior y de tus fotografías.
2. Abre ABELIFT-WEB en VS Code.
3. Abre index.html con Live Server. El configurador usa módulos JavaScript: no lo abras con doble clic mediante file://.
4. Desde la portada, pulsa «Diseñar mi ascensor».

CAMBIOS INCLUIDOS
- Hero con ocho cualidades que se escriben y borran en bucle.
- Ascensor de cristal animado con el logo y fondo de Barcelona visible.
- Tipografía uniforme, textos más legibles y títulos directos.
- Secciones numeradas sin saltos y separación entre restauración y configurador.
- Configurador destacado y acceso en el menú principal.
- Seis tarjetas con fotografía completa y texto de alto contraste.
- Animación de cualidades junto a las reseñas y estrellas amarillas luminosas.
- Logo PNG en cabeceras, hero, pies y configurador.
- Interfaz azul del configurador y cuatro idiomas compartidos.
- Preferencia de movimiento reducido respetada y control para pausar animaciones.

FOTOGRAFÍAS
Consulta GUIA-FOTOS.txt. Todos los espacios principales y las seis especialidades tienen rutas definidas para sustituir las imágenes. Las seis fotos de especialidades son ejemplos provisionales de catálogo, no trabajos ejecutados.

FORMULARIOS
Esta versión descarga archivos de consulta/configuración. No envía correos ni guarda los datos en un servidor. El correo confirmado es info@abelift.cat; conectar la recepción requiere configurar el servicio de formularios del alojamiento elegido.

COMPATIBILIDAD 3D
La vista 3D y su animación necesitan WebGL y aceleración gráfica. Si el navegador no puede iniciar WebGL, aparece un aviso y se desactiva la simulación; aún se pueden elegir acabados y descargar el resumen. El aviso no aparece en un navegador que sí pueda crear el contexto WebGL.

VALIDACIÓN
Revisados en navegador: portada, acceso móvil a 390 px, navegación, reseñas y diálogo, cambio de idioma entre páginas, controles de modelo/puerta/uso y resumen del configurador. Las referencias a archivos locales y la sintaxis JavaScript se han comprobado.
El navegador de pruebas tenía WebGL desactivado: no se ha podido verificar visualmente el renderizado y el recorrido 3D de esta revisión. La geometría y la clonación de acabados de la simulación se mantienen de la versión anterior; se han cambiado los textos y la presentación.

PENDIENTE DE PUBLICACIÓN
Ver ANTES-DE-PUBLICAR.txt. No se ha publicado ni contratado ningún dominio.

HERO ASCENSOR REALISTA (7 nov 2026)
- Portada: index.html (sección .lx), hero.css y hero.js. Imágenes en assets/hero/ (interior, puerta, marco, fondo).
- Secuencia: ascensor con puertas cerradas -> se enciende el indicador y pasa un reflejo -> se abren las puertas y se ilumina la cabina -> entran titular, subtítulo y botones.
- Pulsar el botón de llamada del ascensor (jamba derecha) cierra y reabre las puertas.
- Botón de llamar (936 80 48 01) en la cabecera y botón flotante en móvil.
- Textos nuevos traducidos en idiomas.js y translations.json (ES/CA/EN/PT).
- Respeta prefers-reduced-motion y el botón "Pausar animaciones" (muestran el estado final sin animar).

SECCIONES REDISEÑADAS (7 nov 2026)
- Presentación bajo el hero ("Ascensores en Barcelona") y "Restauración de ascensores": index.html, secciones.css y secciones.js.
- Restauración: cabina clásica ilustrada (assets/hero/clasico.webp) con puntos interactivos. Sustituir por una foto real de vuestras restauraciones cuando la tengáis.
- Ascensor del hero con botonera: subir 1->2->3->4; en la planta 4 se activa bajar y vuelve al 1.

SERVICIOS Y VESTIBULOS (7 nov 2026)
- "Nuestros servicios": tarjetas compactas con icono (secciones.css, clases .sv-*). Ya no dependen de fotos de catalogo.
- Nuevo bloque "Reparamos y modernizamos vestibulos" bajo las tarjetas (imagen assets/hero/vestibulo.webp, ilustrativa) y opcion "Vestibulos" en el formulario de contacto.
- Los textos de los 4 servicios nuevos (revestimientos, suelos, iluminacion, acabados) son orientativos: ajustalos a lo que realmente hacéis.

AJUSTES FINALES (7 nov 2026)
- El hero se prepara en el <head> (clase lx-prep) para que al recargar NO se vea el contenido antes de empezar la animación.
- Tarjetas de servicios con fondo de imagen oscurecida: pon tus fotos en assets/servicios/ (ver LEEME.txt dentro).
- Teléfono flotante con pulso en móvil y tablet (<= 900 px).

IMAGENES CAMBIABLES (7 nov 2026)
- assets/imagenes/: presentacion.jpg (apartado 01), restauracion.jpg y vestibulo.jpg. Ver assets/imagenes/LEEME.txt.
- Si falta una foto, se usa la imagen de ejemplo y aparece la nota "ilustración orientativa"; con tu foto la nota desaparece.
- Puntos interactivos de restauración: editar PUNTOS en la primera línea de secciones.js (modo ayuda: abrir la web con #ajustar-puntos).
