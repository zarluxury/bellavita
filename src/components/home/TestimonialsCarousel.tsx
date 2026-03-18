'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Testimonial {
  id: number;
  name: string;
  designation?: string;
  image: string;
  testimonial: string;
  rating: number;
}

const TestimonialsCarousel = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alexandra Mitchell",
      designation: "Interior Designer",
      image: "https://picsum.photos/seed/alexandra/200/200.jpg",
      testimonial: "Bellavita's smart home solutions have completely transformed how I design spaces. The seamless integration of technology with luxury aesthetics is unmatched. My clients are consistently amazed by the intuitive controls and sophisticated ambiance.",
      rating: 5
    },
    {
      id: 2,
      name: "James Harrington",
      designation: "Tech Entrepreneur",
      image: "https://picsum.photos/seed/james/200/200.jpg",
      testimonial: "As someone who values both innovation and design, Bellavita exceeded all expectations. The home automation system is incredibly sophisticated yet user-friendly. It's like living in the future, today.",
      rating: 5
    },
    {
      id: 3,
      name: "Sophia Chen",
      designation: "Real Estate Developer",
      image: "https://picsum.photos/seed/sophia/200/200.jpg",
      testimonial: "We've incorporated Bellavita systems into all our luxury developments. The increase in property value and client satisfaction has been remarkable. Their attention to detail and quality is second to none.",
      rating: 5
    },
    {
      id: 4,
      name: "Marcus Williams",
      designation: "Architect",
      image: "https://picsum.photos/seed/marcus/200/200.jpg",
      testimonial: "The way Bellavita integrates smart technology without compromising architectural integrity is brilliant. It's the perfect marriage of form and function that modern luxury homes demand.",
      rating: 5
    },
    {
      id: 5,
      name: "Isabella Rodriguez",
      designation: "Homeowner",
      image: "https://picsum.photos/seed/isabella/200/200.jpg",
      testimonial: "Our Bellavita smart home has made daily life so much more convenient and enjoyable. From lighting to security to entertainment, everything works together perfectly. It's truly a game-changer.",
      rating: 5
    },
    {
      id: 6,
      name: "David Thompson",
      designation: "CEO, Thompson Industries",
      image: "https://picsum.photos/seed/david2/200/200.jpg",
      testimonial: "Bellavita understands what luxury means in the modern age. Their smart home solutions are not just about technology—they're about enhancing lifestyle. Worth every investment.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 px-4 bg-linear-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-900/10 to-purple-900/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Client Experiences
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover why luxury homeowners and industry professionals choose Bellavita for their smart home transformations
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: '.testimonial-next',
              prevEl: '.testimonial-prev',
            }}
            pagination={{
              clickable: true,
              el: '.testimonial-pagination',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: true,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id} className="w-auto! max-w-md!">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-linear-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 h-full min-h-100 flex flex-col shadow-2xl">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start mb-6">
                      <Quote className="w-8 h-8 text-blue-400/50 group-hover:text-blue-400/70 transition-colors" />
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-300 leading-relaxed mb-6 grow text-lg">
                      &ldquo;{testimonial.testimonial}&rdquo;
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-700/50">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">
                          {testimonial.name}
                        </h4>
                        {testimonial.designation && (
                          <p className="text-gray-400 text-sm">
                            {testimonial.designation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button className="testimonial-prev bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="testimonial-pagination flex gap-2"></div>
            <button className="testimonial-next bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400">Luxury Homes Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-400">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">15+</div>
            <div className="text-gray-400">Years of Excellence</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
