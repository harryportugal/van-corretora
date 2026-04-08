import { motion } from "motion/react";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

interface TestimonialSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
}: TestimonialSectionProps) => {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500">
          {subtitle}
        </p>

        {/* Testimonials Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="relative overflow-hidden rounded-2xl shadow-lg"
              variants={itemVariants}
            >
              <div className="relative">
                <img
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  className="h-[480px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <Quote
                  className="mb-4 h-8 w-8 text-white/40"
                  aria-hidden="true"
                />
                <blockquote className="text-base font-medium leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-4">
                  <p className="font-semibold">
                    &mdash; {testimonial.name},
                    <span className="ml-1 text-white/60">
                      {testimonial.role}
                    </span>
                  </p>
                </figcaption>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Data & default export
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote:
      "A Vanuza foi incrível! Encontrou o apartamento perfeito para nossa família em tempo recorde. Profissionalismo e dedicação do início ao fim.",
    name: "Fernanda",
    role: "Compradora",
    imageSrc:
      "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    quote:
      "Impressionada com a atenção aos detalhes e o conhecimento de mercado. Vendemos nosso imóvel pelo melhor valor possível!",
    name: "Martha",
    role: "Vendedora",
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    quote:
      "Uma experiência impecável do começo ao fim. A Vanuza tornou a compra do nosso primeiro imóvel algo especial e sem estresse.",
    name: "Victor",
    role: "Comprador",
    imageSrc:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80",
  },
];

export default function Testimonials() {
  return (
    <TestimonialSection
      title="Veja o que dizem nossos clientes"
      subtitle="Experiências reais de quem confiou em nós para encontrar o imóvel dos sonhos"
      testimonials={testimonialsData}
    />
  );
}
