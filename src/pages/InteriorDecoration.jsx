import React, { useState } from "react";
import {
  LuHouse as Home,
  LuBuilding2 as Building2,
  LuHammer as Hammer,
  LuPalette as Palette,
  LuUsers as Users,
  LuMail as Mail,
  LuSun as Sun,
  LuLayers as Layers,
  LuCheck as Check,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
  LuStar as Star,
} from "react-icons/lu";
import { exteriors, interiors, popular_interiors } from "../assets/interiors";
import { motion } from "framer-motion";

const services = [
  {
    title: "Residential Interiors",
    description:
      "Create warm, inviting living spaces that reflect your personal style and comfort.",
    image: popular_interiors.interior4,
  },
  {
    title: "Commercial & Office Spaces",
    description:
      "Design productive, professional environments that inspire creativity and collaboration.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Exterior Beautification",
    description:
      "Enhance curb appeal with stunning facades and landscape integration.",
    image: exteriors.exterior1,
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Transform existing spaces with creative solutions and modern upgrades.",
    image: popular_interiors.interior1,
  },
];

const portfolio = [
  {
    image: interiors.interior13,
    title: "Modern Display",
  },
  {
    image: interiors.interior12,
    title: "Luxury Apartment",
  },
  {
    image: exteriors.exterior6,
    title: "Hotel/Office",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=600&q=80",
    title: "Restaurant Design",
  },
  {
    image: interiors.interior6,
    title: "Penthouse Suite",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    text: "The team transformed our outdated living room into a modern masterpiece. Their attention to detail is remarkable!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    text: "Our office redesign boosted team morale and productivity. Professional service from start to finish.",
    rating: 5,
  },
  {
    name: "Aisha Mohammed",
    role: "Hotel Manager",
    text: "They created a stunning lobby that our guests absolutely love. Exceeded all our expectations!",
    rating: 5,
  },
];

const expertise = [
  {
    icon: <Sun className="w-6 h-6" />,
    title: "Creative Vision",
    desc: "Innovative designs that push boundaries",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Functionality",
    desc: "Spaces that work beautifully",
  },
  {
    icon: <Check className="w-6 h-6" />,
    title: "Quality Focus",
    desc: "Meticulous attention to every detail",
  },
];

const InteriorDesign = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e) => {
    if (!isDragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    const position = ((e.clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    const position =
      ((e.touches[0].clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Interior Design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 to-secondary/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white flex items-center justify-center flex-col text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transforming Spaces with
              <br />
              Elegance and Functionality
            </h1>
            <p className="text-lg mb-8 max-w-2xl text-gray-200">
              Creating beautiful, functional spaces that inspire and delight.
              From concept to completion.
            </p>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl">
              Request a Design Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Our Expertise Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Our Expertise</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We blend creativity with functionality to deliver exceptional
              interior and exterior design solutions. Every project is
              approached with meticulous attention to detail, ensuring spaces
              that are not only beautiful but also perfectly suited to your
              lifestyle or business needs.
            </p>
            <div className="space-y-4 pt-4">
              {expertise.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition">
              Explore Our Portfolio
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={popular_interiors.interior1}
              alt="Interior Design 1"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <img
              src={popular_interiors.interior2}
              className="w-full h-64 object-cover rounded-lg shadow-lg mt-8"
            />
            <img
              src={popular_interiors.interior11}
              alt="Interior Design 3"
              className="w-full h-64 object-cover rounded-lg shadow-lg -mt-8"
            />
            <img
              src={popular_interiors.interior4}
              alt="Interior Design 4"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive design solutions tailored to your unique vision and
            requirements
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  {/* Continuous pan and zoom effect */}
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: [1.05, 1.1, 1.05],
                      x: [0, 15, -10, 0],
                      y: [0, -10, 10, 0],
                    }}
                    transition={{
                      duration: 20, // full loop duration
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Before & After Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Before & After Transformation
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            See the dramatic difference our design expertise makes. Slide to
            compare the transformation.
          </p>

          <div className="max-w-4xl mx-auto">
            <div
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleSliderMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Background) */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                alt="After Interior Design"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1600&q=80"
                  alt="Before Interior Design"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-xl">
                  <div className="flex items-center gap-1">
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-lg font-semibold backdrop-blur-sm">
                BEFORE
              </div>
              <div className="absolute top-6 right-6 bg-yellow-600/90 text-white px-4 py-2 rounded-lg font-semibold backdrop-blur-sm">
                AFTER
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Before
                </h3>
                <p className="text-gray-600">
                  The original space lacked character and functionality, with
                  outdated fixtures and poor lighting that made the room feel
                  cramped and uninviting.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl shadow-md border-2 border-yellow-200">
                <h3 className="text-xl font-semibold mb-3 text-yellow-900">
                  After
                </h3>
                <p className="text-gray-700">
                  Transformed into a modern, spacious haven with optimal
                  lighting, contemporary furnishings, and a cohesive color
                  palette that creates warmth and sophistication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Gallery */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-gray-600 mb-12">
            A showcase of our recent work across residential and commercial
            spaces
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((project, idx) => (
              <div
                key={idx}
                className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Click to view project details
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gradient-to-br from-yellow-600 to-yellow-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            What Our Clients Say
          </h2>
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="flex gap-1">
                {Array.from({
                  length: testimonials[currentTestimonial].rating,
                }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <p className="text-xl text-gray-700 italic mb-8 text-center leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div className="text-center">
              <p className="font-semibold text-lg text-gray-900">
                {testimonials[currentTestimonial].name}
              </p>
              <p className="text-gray-600">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentTestimonial
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-900 text-white my-4">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Redefine Your Space?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's bring your vision to life. Schedule a consultation with our
            design experts today.
          </p>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl">
            Book a Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteriorDesign;
