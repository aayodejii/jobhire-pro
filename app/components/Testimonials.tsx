// src/components/Testimonials.tsx
import { Testimonial } from "../types";
import { FaStar, FaArrowRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah J.",
      role: "Marketing Director",
      content:
        "After 6 months of applying with no responses, JobHire Pro got me 5 interviews in the first month. I accepted an offer with a 30% salary increase!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: 2,
      name: "Michael T.",
      role: "Software Engineer",
      content:
        "The personalized resume tailoring made all the difference. I went from 1 interview every 50 applications to 1 interview every 10 applications.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/43.jpg",
    },
    {
      id: 3,
      name: "Priya K.",
      role: "Financial Analyst",
      content:
        "As a recent graduate, I was overwhelmed by the job search. JobHire Pro not only applied for me but taught me how to interview better. Landed my first job in 3 weeks!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Don't just take our word for it—hear from professionals who've
            transformed their job search
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg testimonial-card"
            >
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-2 text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Join Our Success Stories
            <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
