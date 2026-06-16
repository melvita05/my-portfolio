import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const navLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:primald39@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-primary-400" />
              <span className="gradient-text font-bold text-xl">Primal</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              MCA student and MERN Stack Developer with experience at Codelab System and Zephyr Technologies.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-500/20 hover:border-primary-500/50 transition-all"
                >
                  <link.icon className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-400 text-sm hover:text-primary-400 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm mb-2">primald39@gmail.com</p>
            <p className="text-gray-400 text-sm mb-2">+91 7892762829</p>
            <p className="text-gray-400 text-sm mb-4">Mangalore, Karnataka, India</p>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="text-primary-400 text-sm hover:text-primary-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              Let's talk →
            </motion.button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            Designed & Developed with <Heart className="w-4 h-4 text-red-500" /> by
            <span className="text-primary-400 font-semibold">Primal Melvita Dsouza</span>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
