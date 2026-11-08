# Revisión del documento de 85 páginas

Numeración: páginas del PDF combinado, no la impresa.

| Páginas | Contenido | Uso |
|---|---|---|
| 1 | Plano escaneado de una instalación | Referencia particular; no fija dimensiones universales |
| 2–28 | TRESA: productos y cabinas | Texto extraído y referencias de acabados; familias separadas de A01–A05 |
| 29–31 | Oferta de suministro particular | No se convierte en catálogo general ni en tarifas del editor |
| 32–39 | Contrato de mantenimiento | No define opciones estéticas |
| 40–53 | Ofertas de modernización particulares | Identifican elementos técnicos; importes y datos particulares fuera del editor |
| 54–77 | Catálogo de acabados ABELIFT | Base principal del editor A01–A05 |
| 78–85 | Estructuras SUMASA | Acabados y colores exteriores; límites técnicos de esa estructura |

## Opciones y representación

| Elemento | Fuente | Tratamiento |
|---|---|---|
| A01 | 57 | Blanco 9016 y goma gris cemento; corregida precarga anterior |
| A02 | 58 | Inox y goma negra |
| A03 | 59 | White Ash / Burnt Strand, Gris Expo como suelo; verificar alternativas con la fotografía |
| A04 | 60 | Gris Popular / Elemental Concrete y Negro Tebas; la base no reproduce paneles combinados |
| A05 | 61 | Gris metal 9006 / Negro Tebas |
| Paredes | 62–64 | Chapa, skinplate, inox, vidrio y laminados; colores orientativos. Vidrios bajo pedido identificados |
| Suelo | 65–66 | Goma, piedra artificial, metal y granito; Guyana y Warwick Rubi separados |
| Techo | 67 | Seis diseños y tres colores; curvas y luminarias aproximadas |
| Espejo / pasamanos / LED | 68 | Formatos y seis pasamanos. Espejo simulado, sin reflexión óptica real |
| Puertas | 69–71 | Automáticas y semiautomáticas, acabados separados. Movimiento y mecanismo no simulados |
| Botonera cabina | 72 | Superficie 920×220 mm, columna estándar 1960 mm y columna iluminada; dimensiones son referencia de catálogo, escena sin escala constructiva |
| Uso unifamiliar | 72 | Columna estándar sin display; restricción aplicada |
| Rellano | 73 | Placa y familia de pulsador independientes. Geometrías esquemáticas; no son réplicas CAD de RT42, US90, BAS120, US91 o US95 |
| Displays | 74 | Sin display y 2,8 / 5,6 / 7 / 10 pulgadas. Tamaño visual relativo, contenido de pantalla ilustrativo |
| Estructura | 75 / 83 | Paletas de ambos documentos; chapa ciega/perforada, vidrio/mate. Cerramientos laterales para no tapar la entrada |

Los acabados F6307 y F8830 estaban mal clasificados como suelo en el prototipo: el catálogo los sitúa en laminados de paños. Los pesos de suelos del catálogo (goma 4,5; piedra 49; granito 56 kg/m², y metales 6/12/36) son datos técnicos, no un cálculo de carga útil.

## TRESA: mantener catálogo independiente

Elegance: melamina. Elite: melamina con entrecalles horizontales o verticales.
Excellence: melaminas combinables. Crystal: vidrio de color. Stainless: inox satinado.
Millennium: inox y espejo. Alhambra: inox oro arabesco, perfiles, botonera y pasamanos en oro.
Panorámico: paredes panorámicas y posible puerta panorámica.

Página 19 contiene paneles M/C/I, suelos S, botoneras B5–B12, espejos E1/E2, techos T y pasamanos P1/P3.
Las referencias horizontales B8/B12 y techos señalados con asterisco tienen restricciones indicadas en el catálogo para EN 81.20–EN 81.50. Se conservan como referencia, no se habilitan como combinaciones del editor A01–A05. El texto extraído permite consultar todos los códigos, pero la lectura de tablas debe contrastarse con la imagen.

## Fuera de edición estética

No se ofrecen como selectores libres: carga, velocidad, número de paradas, foso, huida, embarques, motor, frenos, limitador, cables, cuadro ni sistemas de seguridad. Necesitan estudio técnico. Los 30 m y 1000 kg de SUMASA (79) corresponden a ese producto; no son límites generales de ABELIFT.
No se deduce precio ni disponibilidad de los tipos de tarifa 2/3/4. La libertad visual de combinar acabados no acredita compatibilidad de fabricación.

## Limitaciones pendientes

Texturas procedurales y tonos aproximados; no mapas PBR medidos. Paños aún comparten acabado y no se reproduce toda combinación de paneles A03/A04. Botoneras y pulsadores esquemáticos con la referencia fotográfica disponible al lado. Grados AISI similares visualmente. No hay reflejo real de espejo, mecanismo de puertas, cálculo técnico ni envío de solicitudes. Validar el prototipo con ABELIFT antes de usarlo como oferta comercial.

## Verificación realizada

Inicialización y 170 selecciones comprobadas con Three.js real y renderizador/DOM simulados; siete vistas y restricción unifamiliar verificadas. Sintaxis de JavaScript válida. No se ha podido verificar la imagen WebGL en navegador porque la descarga del navegador de pruebas falló. La revisión visual final queda pendiente al abrir con Live Server.

## Corrección de pared y techo

Las tres paredes y el techo permanecen visibles al inspeccionar la cabina. La cámara principal mira desde la entrada; la cámara de botonera está dentro de la cabina. Se sustituye el semicilindro vertical por un panel curvo poco profundo contenido en la envolvente del techo. El marco macizo se sustituye por cuatro perfiles; luces orientadas hacia abajo. Se retiran los enlaces y la sección de catálogo de la interfaz. Las referencias permanecen en los archivos.

## Marco discreto y acabado seleccionable

Jambas y dintel reducidos de 0,12 a 0,045 unidades de escena, y profundidad de 0,16 a 0,07. Perfiles de techo afinados. Marco y perfiles en inoxidable por defecto, dorado seleccionable independientemente de las paredes. El acabado se conserva al cambiar modelo y se incluye en el resumen; Restablecer recupera inoxidable. En las vistas interiores el conjunto frontal de puertas permanece oculto. La opción dorada es una preferencia visual pendiente de confirmación comercial, no una compatibilidad acreditada del catálogo A01–A05.

## Modo Ver en acción y uso unifamiliar

La nueva demostración conserva el diseño en una copia de escena, lo sitúa en un hueco de tres plantas e incluye una persona estilizada con movimiento de brazos y piernas. Secuencia: acercarse, abrir, entrar, cerrar, subir, abrir, salir, cerrar y volver a planta baja. Puertas automáticas correderas y semiautomáticas con giro de hoja; apertura manual representada de forma ilustrativa, sin contacto físico exacto mano/tirador. Pausa, reinicio, vista del edificio y seguimiento de cabina. Volver al diseño libera los recursos de la escena auxiliar y conserva las selecciones. Las dimensiones, las velocidades y la maquinaria son esquemáticas.

El uso unifamiliar con columna estándar retira el display, desactiva su selector y muestra una explicación visible. Al regresar al uso ascensor o cambiar a otra botonera se recupera la pantalla anterior.

Verificación actualizada: inicialización y 172 selecciones, siete vistas, ambos tipos de puerta, tiempos de llegada y regreso, pausa, posición de la persona, limpieza de escena y conservación del diseño comprobados por código. Carga real WebGL y revisión visual de la simulación en Chromium, incluidos plano general y seguimiento de la puerta semiautomática. Prueba en viewport móvil 390×844: visor de 360 px, página de 390 px sin desbordamiento horizontal; inicio/salida de simulación y retirada/restauración del display comprobados. Se corrige la regla de columnas que dejaba sin ancho el visor en móvil.

Estas comprobaciones sustituyen la limitación anterior de no haber podido abrir un navegador. El rendimiento en dispositivos físicos depende de su GPU y no se ha medido en ellos.

## Conservación visual de acabados en la animación

Se elimina la transparencia artificial de paredes y techo. Los materiales de la cabina se clonan con sus colores, texturas, opacidad y propiedades originales. Las puertas de rellano de la escena ilustrativa reutilizan el aspecto de las puertas elegidas, en lugar de hojas grises genéricas. La cámara de seguimiento mira por la entrada. Cuando las puertas están cerradas, el interior queda oculto como corresponde al acabado escogido. Esta corrección sustituye la descripción anterior de paredes transparentes.

Comprobación: igualdad de color, textura, transparencia, opacidad y rugosidad entre editor y simulación. Prueba visual en Chromium con paredes violeta pastel y techo negro; colores y acabado conservados durante la entrada.
