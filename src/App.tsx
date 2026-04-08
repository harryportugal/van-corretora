/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Bed, Bath, Square, Ruler, MessageCircle } from 'lucide-react';
import CinematicScroll from './CinematicScroll';
import { Toaster } from 'sonner';

const properties = [
  {
    id: 1,
    title: 'Casa Beira-Mar',
    price: 'R$ 1.200.000',
    address: '254 Avenida das Araucárias, Campos...',
    beds: 2,
    baths: 1,
    area: '110m²',
    agent: 'Carlos Silva',
    time: 'há 2 dias',
    badge: 'Novo no mercado',
    badgeType: 'dark',
    image: 'https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/Casa_moderna_beira_202604062342.jpeg',
  },
  {
    id: 2,
    title: 'Apartamento Aconchego',
    price: 'R$ 2.450.000',
    address: '1065 Estrada do Sol, Vale Verde',
    beds: 4,
    baths: 3,
    area: '290m²',
    agent: 'Marina Costa',
    time: 'há 5 dias',
    badge: 'Destaque',
    badgeType: 'light',
    image: 'https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/Apartamento_clean_202604062341.jpeg',
  },
  {
    id: 3,
    title: 'Refúgio nas Montanhas',
    price: 'R$ 850.000',
    address: '58 Caminho das Pedras, Serra',
    beds: 2,
    baths: 1,
    area: '95m²',
    agent: 'Roberto Alves',
    time: 'há 1 semana',
    badge: 'Oportunidade',
    badgeType: 'dark',
    image: 'https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/casa.jpeg',
  }
];

const AnimatedText = ({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) => {
  const lines = text.split('\n');
  let charIndex = 0;

  return (
    <div className="flex flex-col">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex flex-wrap overflow-hidden">
          {line.split(' ').map((word, wordIndex, wordArray) => {
            const hasSpace = wordIndex !== wordArray.length - 1;
            return (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split('').map((char, i) => {
                  const currentDelay = delayOffset + charIndex * 0.03;
                  charIndex++;
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: currentDelay, ease: 'easeOut' }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {hasSpace && (() => {
                  const currentDelay = delayOffset + charIndex * 0.03;
                  charIndex++;
                  return (
                    <motion.span
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: currentDelay, ease: 'easeOut' }}
                      className="inline-block"
                      style={{ whiteSpace: 'pre' }}
                    >
                      {" "}
                    </motion.span>
                  );
                })()}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-white text-zinc-950 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black text-white">
        {/* Image Background */}
        <img
          src="https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/bebe.png"
          alt="Hero Background"
          className="absolute left-0 top-0 h-[calc(100%+6rem)] w-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Overlay to ensure text readability if needed */}
        <div className="absolute left-0 top-0 h-[calc(100%+6rem)] w-full bg-black/20" />

        {/* Main Content Container */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Navbar */}
          <div className="p-4 sm:p-6 lg:p-8">
            <nav className="liquid-glass mx-auto flex w-fit items-center gap-8 rounded-full px-6 py-2">
              {/* Logo */}
              <div className="text-xl font-semibold tracking-tight">Vanuza</div>

              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                <motion.a href="#" whileHover={{ scale: 1.02, color: "#ffffff" }} whileTap={{ scale: 0.98 }} className="text-sm text-gray-200">Comprar</motion.a>
                <motion.a href="#" whileHover={{ scale: 1.02, color: "#ffffff" }} whileTap={{ scale: 0.98 }} className="text-sm text-gray-200">Alugar</motion.a>
                <motion.a href="#" whileHover={{ scale: 1.02, color: "#ffffff" }} whileTap={{ scale: 0.98 }} className="text-sm text-gray-200">Lançamentos</motion.a>
              </div>

              {/* CTA Button */}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-full bg-white px-5 py-2 text-xs font-medium text-black">
                Contato
              </motion.button>
            </nav>
          </div>

          {/* Hero Content */}
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8 mt-0 lg:mt-0">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
              {/* Left Column */}
              <div className="flex flex-col justify-center">
                <h1 className="mb-10 text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl xl:text-7xl">
                  <AnimatedText text="Encontre o imóvel&#10;ideal para o seu&#10;novo capítulo." delayOffset={0.2} />
                </h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-lg bg-white px-6 py-3 font-medium text-black">
                    Ver Imóveis
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }} whileTap={{ scale: 0.98 }} className="liquid-glass rounded-lg px-6 py-3 font-medium text-white">
                    Falar com Corretor
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="flex items-end justify-start lg:justify-end">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.4 }}
                  className="liquid-glass rounded-xl px-6 py-4"
                >
                  <p className="text-lg font-light sm:text-xl md:text-2xl">
                    Venda. Locação. Alto Padrão.
                  </p>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* Featured Property Section */}
      <section className="relative z-10 min-h-screen w-full overflow-hidden rounded-t-3xl sm:rounded-t-[3rem] rounded-b-[64px] flex flex-col justify-center bg-black text-white">
        <img
          src="https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/deixe_um_pouco_202604062247.png"
          alt="Mansão em Destaque"
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Carousel Container */}
        <div className="relative z-10 w-full overflow-x-auto pb-24 pt-8 hide-scrollbar snap-x snap-mandatory -mt-64">
          <div className="flex gap-5 px-4 sm:px-8 md:px-12 lg:px-24 w-[1130px] h-[422px] mx-auto">
            {properties.map((prop, index) => (
              <motion.div 
                key={prop.id} 
                initial={{ opacity: 0, y: 40, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                whileHover={{ y: -15, scale: 1.03 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-[300px] sm:w-[320px] h-full flex-shrink-0 snap-center"
              >
                <div className="relative w-full h-full rounded-[32px] shadow-2xl [clip-path:inset(0_round_32px)] group cursor-pointer transform-gpu">
                  {/* Full Background Image */}
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 z-0" 
                  />
                  
                  {/* Dark Frosted Glass Bottom Panel */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] rounded-b-[32px] bg-gradient-to-t from-black/30 via-black/5 to-transparent backdrop-blur-[4px] [mask-image:linear-gradient(to_top,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_60%,transparent_100%)] z-10 pointer-events-none transform-gpu translate-z-0 will-change-transform" />

                  {/* Content Container */}
                  <div className="relative z-20 flex flex-col justify-end h-full p-6 pb-7">
                  {/* Pagination Dots */}
                  <div className="flex justify-center gap-1.5 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-sm"></div>
                  </div>

                  {/* Title & Price */}
                  <div className="flex justify-between items-end mb-1">
                    <h3 className="text-[22px] font-semibold text-white tracking-tight leading-tight">{prop.title}</h3>
                    <span className="text-[18px] font-semibold text-white whitespace-nowrap ml-4">{prop.price}</span>
                  </div>
                  
                  {/* Address */}
                  <p className="text-white/70 text-[13px] font-normal mb-5">{prop.address}</p>
                  
                  {/* Divider */}
                  <div className="h-px w-full bg-white/20 mb-5"></div>
                  
                  {/* Specs */}
                  <div className="flex justify-between items-center text-white/90 text-[13px] font-normal">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 opacity-80" strokeWidth={1.5} />
                      <span>Quartos: {prop.beds}</span>
                    </div>
                    <div className="w-px h-3 bg-white/20"></div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 opacity-80" strokeWidth={1.5} />
                      <span>Banhos: {prop.baths}</span>
                    </div>
                    <div className="w-px h-3 bg-white/20"></div>
                    <div className="flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 opacity-80" strokeWidth={1.5} />
                      <span>Área: {prop.area}</span>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Giant Background Text */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none z-0">
          <h2 className="text-[24vw] font-medium text-white tracking-[-0.04em] leading-none whitespace-nowrap translate-y-[40%]">
            IMOVEIS
          </h2>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-8 lg:px-24 bg-white">
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-medium text-[#2D2623] mb-16 tracking-tight">
            Por que nos <span className="text-[#e2dac7]">escolher</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 (Top Left) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2rem] min-h-[300px]"
            >
              <img 
                src="https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/Remova_texto_e_202604070144.jpeg"
                alt="Soluções Completas"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="relative p-12 h-full flex flex-col justify-start">
                <h3 className="text-2xl font-semibold text-[#635241] mb-3">Soluções Completas</h3>
                <p className="text-[#635241] text-base">Gerenciamos cada aspecto do seu projeto imobiliário, economizando seu tempo e recursos.</p>
              </div>
            </motion.div>

            {/* Card 2 (Top Middle) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-[2rem] min-h-[300px]"
            >
              <img 
                src="https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/text7.jpeg"
                alt="Suporte Pós-Venda"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="relative p-12 h-full flex flex-col justify-end">
                <h3 className="text-2xl font-semibold text-[#635241] mb-3">Suporte Pós-Venda</h3>
                <p className="text-[#635241] text-base">Estamos comprometidos em fornecer suporte contínuo para atender a quaisquer necessidades futuras.</p>
              </div>
            </motion.div>

            {/* Card 3 (Tall Right) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-[2rem] md:row-span-2 flex flex-col justify-start"
            >
              <img 
                src="https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/Remova_texto_upscale_202604070146.jpeg"
                alt="Sem Restrições de Variedade"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="relative p-12 h-full flex flex-col justify-start">
                <div>
                  <h3 className="text-3xl font-semibold text-[#F9F7F3] mb-6">Sem Restrições de Variedade</h3>
                  <p className="text-[#F9F7F3] text-base">Parceiros com qualquer fornecedor que atenda aos nossos padrões de qualidade, oferecendo a mais ampla seleção de soluções de mobiliário para atender às suas necessidades e preferências.</p>
                </div>
                <div className="mt-12">
                  <h4 className="text-xl font-semibold text-[#F9F7F3] mb-3">Mobiliário Sob Medida</h4>
                  <p className="text-[#F9F7F3] text-base">Especialistas em buscar peças de mobiliário personalizadas que correspondem perfeitamente à sua visão e requisitos únicos.</p>
                </div>
              </div>
            </motion.div>

            {/* Card 4 (Wide Bottom Left) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-[2rem] md:col-span-2 min-h-[300px]"
            >
              <img 
                src="https://fncdavohyqdkgudjdyes.supabase.co/storage/v1/object/public/Video%20Lupa%20Hero/cadeiras.jpeg"
                alt="Qualidade Superior"
                className="absolute inset-0 w-full h-full object-cover object-bottom"
                referrerPolicy="no-referrer"
              />
              <div className="relative p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-3xl font-semibold text-white mb-3 text-center">Qualidade Superior</h3>
                <p className="text-white text-base text-center">Parcerias com os melhores construtores garantem acesso aos melhores materiais, artesanato e processos de controle de qualidade.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cinematic Frame Scroll Section */}
      <CinematicScroll />
      
      {/* Final Premium CTA Section */}
      <section 
        className="min-h-[40vh] py-32 relative z-20 font-sans flex flex-col items-center justify-center bg-white rounded-t-[3.5rem] -mt-10 overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-6"
          >
            Pronto para o<br />próximo nível?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-lg sm:text-xl text-zinc-500 mb-12 max-w-lg mx-auto font-light leading-relaxed"
          >
            Vivencie um atendimento exclusivo e personalizado para encontrar o imóvel dos seus sonhos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-zinc-900 text-white px-10 py-5 rounded-full text-lg font-medium shadow-xl hover:bg-zinc-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
            >
              Falar agora no WhatsApp
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sonner Toaster for Notifications */}
      <Toaster />
    </div>
  );
}
