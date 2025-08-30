"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Particles } from "./Particles";
import { SectionHeader } from "./SectionHeader";
import Alert from "./Alert";
import { FaEnvelope, FaUser, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { FiSend } from "react-icons/fi";

const contactDetails = [
  { icon: FaEnvelope, title: "Email", value: "akashiyu18@gmail.com", subtext: "Send me an email anytime." },
  { icon: FaUser, title: "Name", value: "Akash", subtext: "G J Akash" },
  { icon: FaMapMarkerAlt, title: "Location", value: "India", subtext: "Open to remote opportunities." },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type: string, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.send(
        "service_17cjfv1", "template_5upukgn",
        { from_name: formData.name, to_name: "Akash Krishnan", from_email: formData.email, to_email: "akashiyu18@email.com", message: formData.message },
        "dPLAumiFJOgRkvh_k"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Message Sent Successfully!");
    } catch (error) {
      setIsLoading(false);
      showAlertMessage("danger", "Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      <Particles className="absolute inset-0 -z-10" quantity={120} ease={80} color={"#ffffff"} />
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="container mx-auto">
        <SectionHeader
          title="Let's Connect"
          eyebrow="Contact"
          description="Available for new projects & collaborations — let's create something extraordinary together."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-12"
          >
            <div>
              <h3 className="text-2xl font-semibold text-pink-600 mb-2">Get in Touch</h3>
              <p className="text-white/70 leading-relaxed">
                Always open to exciting opportunities, innovative projects, and creative collaborations.
              </p>
            </div>

            <div className="space-y-6">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-xl group hover:border-purple-400/50 transition-all duration-500"
                >
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 blur-xl" />
                    <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 animate-pulse" />
                    <detail.icon className="text-purple-200 relative z-10" size={28} />
                  </div>
                  <div className="relative">
                    <h4 className="font-semibold text-white">{detail.title}</h4>
                    <p className="text-sm text-purple-300 font-mono">{detail.value}</p>
                    <p className="text-xs text-white/50">{detail.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {[{ href: "https://github.com/iesxz-c", Icon: FaGithub },
                  { href: "https://www.linkedin.com/in/akash-g-j-b32631287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", Icon: FaLinkedin },
                  { href: "https://www.instagram.com/iesx.z_c/", Icon: FaInstagram }].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 12, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative p-4 rounded-full bg-white/10 border border-white/20 hover:border-purple-400/60 transition-all duration-300 group"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/40 to-pink-600/40 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                    <social.Icon size={20} className="text-white relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative z-10"
          >
            {/* Enhanced form container with multiple lighting effects */}
            <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/40 overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 opacity-50" />
              
              {/* Moving light orb */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-pink-600 mb-6">Send a Message</h3>
                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                  {["name", "email", "message"].map((field, i) => (
                    <div key={i} className="relative group">
                      <motion.label
                        htmlFor={field}
                        initial={{ y: 0 }}
                        animate={{ y: formData[field as keyof typeof formData] ? -18 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-4 top-2 text-sm text-purple-400 pointer-events-none transition-all z-20"
                      >
                        {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Message"}
                      </motion.label>
                      
                      {/* Input glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                      
                      {field !== "message" ? (
                        <input
                          id={field}
                          name={field}
                          type={field === "email" ? "email" : "text"}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          className="relative w-full rounded-xl px-4 pt-6 pb-2 text-white bg-black/40 border border-white/30 
                                   focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/70 focus:bg-black/50
                                   outline-none transition-all duration-300 placeholder-white/30"
                          required
                        />
                      ) : (
                        <textarea
                          id={field}
                          name={field}
                          rows={4}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          className="relative w-full rounded-xl px-4 pt-6 pb-2 text-white bg-black/40 border border-white/30 
                                   focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/70 focus:bg-black/50
                                   outline-none transition-all duration-300 placeholder-white/30 resize-none"
                          required
                        />
                      )}
                    </div>
                  ))}

                  {/* Enhanced button with advanced lighting */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -4,
                      boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)"
                    }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    className="group relative w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl animate-pulse" />
                    </div>
                    
                    {/* Button background */}
                    <div className="relative rounded-2xl bg-gradient-to-r from-purple-900/90 to-pink-900/90 px-8 py-4 transition-all duration-300 group-hover:from-purple-800/90 group-hover:to-pink-800/90">
                      {/* Inner glow effects */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      {/* Button content */}
                      <span className="relative flex items-center justify-center gap-3 text-white font-semibold text-lg">
                        <motion.div
                          animate={isLoading ? { rotate: 360 } : {}}
                          transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
                        >
                          {isLoading ? (
                            <CgSpinner size={22} />
                          ) : (
                            <motion.div
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <FiSend size={22} />
                            </motion.div>
                          )}
                        </motion.div>
                        <span className="relative ">
                          {isLoading ? "Sending..." : "Send Message"}
                        </span>
                      </span>
                      
                      {/* Pulsing dots animation when loading */}
                      {isLoading && (
                        <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-white/60 rounded-full"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Outer glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-3xl opacity-0 group-hover:opacity-75 blur-2xl transition-opacity duration-500" />
                  </motion.button>
                </form>
              </div>
              
              {/* Form border lighting effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;