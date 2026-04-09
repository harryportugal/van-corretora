import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Quote, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;

const testimonials = [
  {
    id: 1,
    quote: 'A Érica foi incrível! Encontrou o apartamento perfeito para nossa família em tempo recorde. Profissionalismo e dedicação do início ao fim.',
    name: 'Fernanda',
    role: 'Compradora',
    imageSrc: 'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    quote: 'Impressionada com a atenção aos detalhes e o conhecimento de mercado. Vendemos nosso imóvel pelo melhor valor possível!',
    name: 'Martha',
    role: 'Vendedora',
    imageSrc: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    quote: 'Uma experiência impecável do começo ao fim. A Érica tornou a compra do nosso primeiro imóvel algo especial e sem estresse.',
    name: 'Victor',
    role: 'Comprador',
    imageSrc: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80',
  },
];

const frameUrls: string[] = [];
for (let i = 1; i <= FRAME_COUNT; i++) {
  frameUrls.push(`/f_${String(i).padStart(3, '0')}.jpg`);
}

// Extra zoom to crop out the bottom-right watermark
const CROP_SCALE = 1.08;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const scale = Math.max(cw / iw, ch / ih) * CROP_SCALE;
  const sw = cw / scale;
  const sh = ch / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

export default function CinematicScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactTextRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  // Preload all frames — load first frame eagerly so the page isn't blocked
  useEffect(() => {
    let cancelled = false;

    // Load first frame immediately so something shows right away
    const firstImg = new Image();
    firstImg.src = frameUrls[0];
    firstImg.onload = () => {
      if (cancelled) return;
      imagesRef.current[0] = firstImg;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          drawCover(ctx, firstImg, canvas);
        }
      }
    };

    // Load the rest in parallel — gracefully handle missing frames
    const promises = frameUrls.map((url, i) => {
      if (i === 0) return Promise.resolve(firstImg);
      return new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null); // skip missing frames
      });
    });

    Promise.all(promises).then((imgs) => {
      if (cancelled) return;
      // Fill gaps: if a frame failed to load, use the nearest previous frame
      const filled: HTMLImageElement[] = [];
      let lastGood: HTMLImageElement | null = null;
      for (const img of imgs) {
        if (img) lastGood = img;
        filled.push(lastGood!);
      }
      imagesRef.current = filled;
      setLoaded(true);
    });

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext('2d');
      const img = imagesRef.current[currentFrameRef.current];
      if (ctx && img) {
        drawCover(ctx, img, canvas);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger animation
  useGSAP(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const testimonialsEl = testimonialsRef.current;
    const contactTextEl = contactTextRef.current;
    if (!canvas || !section || !testimonialsEl || !contactTextEl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Immediate initial draw: paint frame 0 BEFORE ScrollTrigger activates ──
    currentFrameRef.current = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const firstFrame = imagesRef.current[0];
    if (firstFrame) {
      drawCover(ctx, firstFrame, canvas);
    }

    const stBase = {
      trigger: section,
      start: 'top top',
      end: '+=400vh',
      scrub: 1.5,
    };

    // 1. Pinning Trigger: We unpin at exactly the moment the video hits frame 210 (which is 87.8% of the 400vh scrub -> 351vh)
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=351vh',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1
    });

    // 2. Frame sequencing scrub Trigger
    const obj = { frame: 0 };
    const HOLD_FRAMES = 0; // Trava do último frame removida a pedido do usuário

    gsap.to(obj, {
      frame: FRAME_COUNT - 1 + HOLD_FRAMES,
      ease: 'none',
      immediateRender: true,
      scrollTrigger: {
        ...stBase,
        onUpdate: () => {
          const idx = Math.min(Math.round(obj.frame), FRAME_COUNT - 1);
          if (idx !== currentFrameRef.current) {
            currentFrameRef.current = idx;
            const img = imagesRef.current[idx];
            if (img) {
              drawCover(ctx, img, canvas);
            }
          }
        },
      },
    });

    // ── Testimonials overlay: refined stagger entrance ──
    const cards = gsap.utils.toArray('.testimonial-card', testimonialsEl);
    const headers = gsap.utils.toArray('.testimonial-header', testimonialsEl);
    const darkScrim = testimonialsEl?.querySelector('.dark-scrim');

    // Keep the wrapper visible
    gsap.set(testimonialsEl, { opacity: 1 });
    // Hide inside elements initially with a slight downward translation and scale down for pop-up effect
    gsap.set([...headers, ...cards], { opacity: 0, y: 30, scale: 0.95 });
    if (darkScrim) gsap.set(darkScrim, { opacity: 0 });

    const tTl = gsap.timeline({
      scrollTrigger: { ...stBase, scrub: 2 }, // Faster scrub for snappier card stagger
    });

    // Entrance
    if (darkScrim) {
      tTl.to(darkScrim, { opacity: 1, duration: 20, ease: 'power2.out' }, 35);
    }
    tTl.to(headers, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 15, ease: 'power2.out' }, 35)
       .to(cards, { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 20, ease: 'power2.out' }, 40);

    // Exit
    tTl.to(cards, { opacity: 0, y: -30, scale: 0.95, stagger: -0.1, duration: 15, ease: 'power2.in' }, 80)
       .to(headers, { opacity: 0, y: -30, scale: 0.95, duration: 10, ease: 'power2.in' }, 85);
    
    if (darkScrim) {
      tTl.to(darkScrim, { opacity: 0, duration: 15, ease: 'power2.in' }, 80);
    }

    // ── Call To Action overlay: fades in after testimonials ──
    gsap.set(contactTextEl, { opacity: 0 });

    tTl.to(contactTextEl,
      { opacity: 1, ease: 'power1.out', duration: 15 },
      100
    );

  }, { dependencies: [loaded] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white p-4 sm:p-6 md:p-8 lg:p-10"
      style={{ marginTop: '-4rem', zIndex: 20 }}
    >
      <div 
        className="relative w-full h-full overflow-hidden shadow-2xl"
        style={{ borderRadius: '2.5rem', background: '#000' }}
      >
        {/* Loading indicator */}
        {!loaded && (
          <div className="cinematic-loader">
            <div className="cinematic-loader-spinner" />
          </div>
        )}

        {/* Canvas fills the pinned viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />

        {/* Testimonials overlay */}
        <div
          ref={testimonialsRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Subtle dark scrim */}
          <div className="dark-scrim absolute inset-0 bg-black/30" />

          <div className="relative z-10 w-full max-w-6xl px-6 text-center">
            <h2 className="testimonial-header text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Veja o que dizem nossos clientes
            </h2>
            <p className="testimonial-header text-white/60 text-lg mb-10">
              Experiências reais de quem confiou em nós
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="testimonial-card relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <img
                    src={t.imageSrc}
                    alt={t.name}
                    className="h-[420px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                    <Quote className="mb-3 h-7 w-7 text-white/30" />
                    <blockquote className="text-sm font-medium leading-relaxed">
                      {t.quote}
                    </blockquote>
                    <p className="mt-3 text-sm font-semibold">
                      &mdash; {t.name},
                      <span className="ml-1 text-white/50">{t.role}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action overlay (appears at the end) */}
        <div
          ref={contactTextRef}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center gap-6 mt-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
              Entre em Contato
            </h1>
            <ChevronDown className="w-12 h-12 text-white/70 animate-bounce -mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
