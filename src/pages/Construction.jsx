import React, { useState } from "react";
import {
  LuBuilding2 as Building2,
  LuHammer as Hammer,
  LuPalette as Palette,
  LuUsers as Users,
  LuMail as Mail,
  LuBuilding as Building,
  LuHouse as HomeIcon,
  LuWrench as Wrench,
  LuClipboardCheck as ClipboardCheck,
  LuFileText as FileText,
  LuHardHat as HardHat,
  LuAward as Award,
  LuClock as Clock,
  LuShield as Shield,
  LuCircleCheck as CheckCircle,
  LuPhone as Phone,
} from "react-icons/lu";

const services = [
  {
    icon: <HomeIcon className="w-12 h-12" />,
    title: "Residential Estates",
    description:
      "From single-family homes to large residential complexes, we build quality living spaces with precision and care.",
  },
  {
    icon: <Building className="w-12 h-12" />,
    title: "Commercial Structures",
    description:
      "Office buildings, retail spaces, and commercial complexes designed for functionality and modern business needs.",
  },
  {
    icon: <Wrench className="w-12 h-12" />,
    title: "Renovation & Infrastructure",
    description:
      "Complete renovation services and infrastructure development including roads, utilities, and site works.",
  },
];

const process = [
  {
    number: "01",
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Consultation & Planning",
    description:
      "We meet with you to understand your vision, assess site conditions, and develop a comprehensive project plan.",
  },
  {
    number: "02",
    icon: <FileText className="w-8 h-8" />,
    title: "Design & Permits",
    description:
      "Our team creates detailed architectural and structural designs, then handles all necessary permits and approvals.",
  },
  {
    number: "03",
    icon: <HardHat className="w-8 h-8" />,
    title: "Construction & Supervision",
    description:
      "Skilled craftsmen execute the build with continuous oversight from experienced project managers and engineers.",
  },
  {
    number: "04",
    icon: <Award className="w-8 h-8" />,
    title: "Quality Assurance & Delivery",
    description:
      "Rigorous inspections ensure every detail meets our standards before we hand over your completed project.",
  },
];

const portfolio = [
  {
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    title: "Luxury Estate Development",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    title: "Modern Office Complex",
  },
  {
    image:
      "https://images.unsplash.com/photo-1590496793907-4c5b08aa2f57?auto=format&fit=crop&w=800&q=80",
    title: "Infrastructure Project",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    title: "High-Rise Construction",
  },
  {
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    title: "Residential Community",
  },
  {
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    title: "Commercial Renovation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=800&q=80",
    title: "Steel Frame Structure",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=800&q=80",
    title: "Urban Development",
  },
  {
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
    title: "Sustainable Building",
  },
];

const strengths = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Timely Delivery",
    description:
      "We respect deadlines and deliver projects on schedule without compromising quality.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Quality Materials",
    description:
      "Only premium-grade materials from trusted suppliers are used in our constructions.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Experienced Engineers",
    description:
      "Our team consists of certified professionals with decades of combined expertise.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Safety Standards",
    description:
      "Strict adherence to international safety protocols ensures secure work environments.",
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Structural Integrity",
    description:
      "Every build is engineered to exceed industry standards for durability and stability.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Client-Focused",
    description:
      "Transparent communication and collaboration throughout every project phase.",
  },
];

const Construction = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
          alt="Construction Site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 text-white text-center">
            <div className="max-w-3xl flex items-center flex-col">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Building with Precision,
                <br />
                Innovation, and Integrity
              </h1>
              <p className="text-lg mb-8 text-gray-200 leading-relaxed">
                From foundation to finish, we deliver construction excellence
                that stands the test of time.
              </p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What We Build Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Build
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive construction services for residential, commercial,
              and infrastructure projects
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="bg-yellow-100 text-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A streamlined approach ensuring quality at every stage of your
              construction project
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transform -translate-y-1/2" />
            <div className="grid grid-cols-4 gap-4 relative">
              {process.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="bg-white border-4 border-yellow-500 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg z-10 group hover:scale-110 transition-transform">
                      <div className="text-yellow-600 group-hover:scale-110 transition-transform">
                        {step.icon}
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full">
                      <div className="text-4xl font-bold text-yellow-200 mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {process.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                  {idx < process.length - 1 && (
                    <div className="w-1 h-full bg-yellow-300 mt-4" />
                  )}
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-yellow-200 mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Portfolio Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Project Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our completed projects showcasing excellence in
              construction
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((project, idx) => (
              <div
                key={idx}
                className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="h-1 w-16 bg-yellow-500 rounded-full group-hover:w-24 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading construction services backed by experience and
              integrity
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {strengths.map((strength, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg flex-shrink-0">
                    {strength.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {strength.title}
                    </h3>
                    <p className="text-gray-600">{strength.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                alt="Construction Professionals"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-3xl font-bold mb-4">
                  Professional Excellence
                </h3>
                <p className="text-lg text-gray-200">
                  Our certified engineers and skilled craftsmen work together to
                  deliver exceptional results on every project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden my-5">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=2000&q=80"
            alt="Construction Crane"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/95 to-yellow-700/90" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Partner with Us for Your Next Project
          </h2>
          <p className="text-xl mb-8 text-yellow-100 max-w-2xl mx-auto">
            Let's build something extraordinary together. Contact our
            construction team today for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Construction Team
            </button>
            <button className="bg-yellow-600 border-2 border-white text-white hover:bg-yellow-700 px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl">
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Construction;
