"use client";

import React, { useRef } from "react";
import {
  motion,
  Variants,
  easeOut,
  useScroll,
  useTransform,
} from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const ContactDemo: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "30%"],
    {
      ease: (t) => t,
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full h-80 overflow-hidden mb-12">
        <motion.div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y: parallaxY }}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/contact-us-banner.jpg"
            alt="contact-baby-marine-international-kochi-kerela-india"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        className="max-w-6xl mx-auto px-4 mb-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-blue-950">Let's Connect</h2>
      </motion.div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Contact Info + Map */}
          <motion.div
            className="flex flex-col justify-between"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Contact Information
              </h2>
              <p>
                <strong>Address:</strong> Thoppumpady, Kochi, Kerala, India - 682005
              </p>
              <p>
                <strong>Phone:</strong> +91 9349513602
              </p>
              <p>
                <strong>Email:</strong> seafood@babymarineintl.com
              </p>

              <div className="w-full h-[200px] md:h-[320px] rounded-lg overflow-hidden shadow-lg mt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.797203215218!2d76.25105957485632!3d9.93901539017526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08739c37226c35%3A0x69e89f4cb19517f1!2sThoppumpady%2C%20Kochi%2C%20Kerala%20682005%2C%20India!5e0!3m2!1sen!2sin!4v1720448372736!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Thoppumpady,+Kochi,+Kerala,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-950 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full"
              >
                Get Directions
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="flex flex-col justify-between"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form className="flex flex-col h-full justify-between space-y-6">
              <div className="space-y-6">
                <p className="text-lg text-gray-700">
                  We'd love to hear from you. Please fill out the form or use
                  the contact details below to reach us.
                </p>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-blue-950 font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-blue-950 font-medium"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-blue-950 font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    className="w-full mt-1 px-4 py-2 h-[210px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="bg-blue-950 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactDemo;
