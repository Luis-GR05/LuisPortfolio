# Portfolio de Luis Gordillo

Portfolio personal de una sola página, con scroll, en HTML, CSS y JavaScript sin framework.

**Web:** https://luis-portfolio-pi.vercel.app/

## Estructura

```text
index.html            Página y metadatos (SEO, Open Graph, datos estructurados)
css/site.css          Estilos: temas por proyecto, maquetación y animaciones
js/config.js          Datos: proyectos y habilidades (editar solo aquí)
js/site.js            Lógica: render, temas al hacer scroll, animaciones, formulario
js/vendor/            Lenis (scroll suave)
api/send-email.js     Función de Vercel que envía el formulario con Resend
assets/               Imágenes, logos, iconos de tecnologías, favicon y CV
robots.txt, sitemap.xml, vercel.json
```

## Añadir un proyecto

1. Añade una entrada en `projects` dentro de `js/config.js`.
2. En `js/site.js`, añade su subtítulo en `KIND` y, si tiene logo, su entrada en `LOGO`.
3. En `css/site.css`, define sus colores en `body[data-theme="<id>"]`.

## Desarrollo

Sirve la carpeta con cualquier servidor estático (por ejemplo, Live Server).
El formulario necesita la variable de entorno `RESEND_API_KEY` en Vercel; si falla, usa Formspree.

## Contacto

- LinkedIn: https://www.linkedin.com/in/luisgordilloo/
- Email: luisgordillor01@gmail.com
