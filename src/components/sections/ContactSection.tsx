import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, Mail, MapPin, Phone, Github, Linkedin, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'primald39@gmail.com',
      href: 'mailto:primald39@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7892762829',
      href: 'tel:+917892762829',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mangalore, Karnataka, India',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-primary-400 font-mono text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            LET'S CONNECT
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">Get In </span>
            <span className="gradient-text">Touch</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">Send a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Your message..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className={`w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-semibold transition-all ${
                      submitted
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                        : 'neon-button'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    {submitted ? 'Message Sent!' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="glass-card p-8 relative overflow-hidden h-full">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-4 mb-8">
                  {contactInfo.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-primary-500/10 transition-all group"
                      whileHover={{ x: 8 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
                        <item.icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div>
                  <h4 className="text-gray-400 text-sm mb-4">Connect with me</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-primary-500/20 hover:border-primary-500/50 transition-all"
                        aria-label={link.label}
                        whileHover={{ scale: 1.05, y: -3 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.9 + i * 0.1 }}
                      >
                        <link.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{link.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
