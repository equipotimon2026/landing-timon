import Script from 'next/script'

/**
 * Pixel de Meta (código base: `init` + `PageView`).
 *
 * Va solo en las sublandings de pauta (`src/app/[variante]/page.tsx`: /video1,
 * /video2...), nunca en la home ni en el layout. Facundo dirige toda la
 * publicidad a esas rutas justamente para distinguir el tráfico pagado del que
 * entra por Google o directo (acuerdo con Nico, 20/11/2026).
 *
 * El ID sale de `NEXT_PUBLIC_META_PIXEL_ID` (ver .env.example). Si la variable
 * no está, no se carga nada de Meta y la página sigue andando igual: así los
 * previews y el desarrollo local no ensucian las métricas.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function MetaPixel() {
  if (!PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
