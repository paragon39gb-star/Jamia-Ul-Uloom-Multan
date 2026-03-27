/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  BookOpen, 
  Users, 
  Info, 
  Heart, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Menu,
  X,
  CreditCard,
  Building2,
  GraduationCap
} from "lucide-react";
import { CONTENT } from "./constants";

type Language = "ur" | "en";

export default function App() {
  const [lang, setLang] = useState<Language>("ur");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = CONTENT[lang];
  const isRtl = lang === "ur";

  const toggleLang = () => {
    setLang(prev => (prev === "ur" ? "en" : "ur"));
  };

  const navLinks = [
    { id: "intro", label: t.intro.title, icon: Info },
    { id: "features", label: t.features.title, icon: CheckCircle2 },
    { id: "departments", label: t.departments.title, icon: BookOpen },
    { id: "appeal", label: t.appeal.title, icon: Heart },
  ];

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen ${isRtl ? "rtl urdu-text" : "ltr font-sans"}`}>
      {/* Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-primary/90 transition-all"
          >
            <ChevronRight className="-rotate-90" size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                ج
              </div>
              <span className={`text-xl font-bold text-primary ${isRtl ? "urdu-text" : "font-sans"}`}>
                {t.name}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-ink hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all"
              >
                <Globe size={18} />
                <span className={isRtl ? "font-sans" : "urdu-text"}>
                  {lang === "ur" ? "English" : "اردو"}
                </span>
              </button>
            </div>

            {/* Mobile Nav Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleLang} className="text-primary p-2">
                <Globe size={24} />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map(link => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-4 text-lg font-medium text-ink hover:bg-accent rounded-lg"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-primary mb-6 leading-tight">
              {t.name}
            </h1>
            <p className="text-xl md:text-3xl text-secondary font-medium mb-10">
              {t.tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#appeal"
                className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <Heart size={20} />
                {lang === "ur" ? "تعاون کریں" : "Donate Now"}
              </a>
              <a
                href="#intro"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-accent transition-all"
              >
                {lang === "ur" ? "مزید جانیں" : "Learn More"}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro & Motive */}
      <section id="intro" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6 border-b-4 border-secondary inline-block pb-2">
                {t.intro.title}
              </h2>
              <p className="text-lg text-ink/80 leading-relaxed mb-8">
                {t.intro.text}
              </p>
              <h3 className="text-2xl font-bold text-primary mb-4">{t.purpose.title}</h3>
              <p className="text-lg text-ink/80 leading-relaxed">
                {t.purpose.text}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-accent p-8 rounded-3xl border-2 border-primary/10 shadow-xl relative"
            >
              <div className="absolute -top-4 -left-4 bg-secondary text-white p-3 rounded-xl shadow-lg">
                <BookOpen size={24} />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t.motive.title}</h2>
              <div className="space-y-8">
                {t.motive.verses.map((verse, idx) => (
                  <div key={idx} className="border-b border-primary/10 last:border-0 pb-6 last:pb-0">
                    <p className={`text-xl text-primary font-medium mb-2 ${isRtl ? "arabic-text" : ""}`}>
                      {verse.text}
                    </p>
                    <p className="text-sm text-ink/60 italic text-right">{verse.ref}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">{t.features.title}</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.items.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start border-l-4 border-primary"
              >
                <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-lg leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">{t.departments.title}</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.departments.list.map((dept, idx) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-accent/20 p-8 rounded-2xl border border-primary/5 hover:border-primary/20 hover:bg-white transition-all text-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform">
                  {dept.id === 1 && <BookOpen size={32} />}
                  {dept.id === 2 && <Building2 size={32} />}
                  {dept.id === 3 && <GraduationCap size={32} />}
                  {dept.id === 7 && <Globe size={32} />}
                  {dept.id !== 1 && dept.id !== 2 && dept.id !== 3 && dept.id !== 7 && <CheckCircle2 size={32} />}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{dept.name}</h3>
                <p className="text-ink/70 leading-relaxed">{dept.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">{t.faculty.title}</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.faculty.list.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <Users size={40} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-secondary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-ink/60">{member.edu}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">{t.gallery.title}</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.gallery.items.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-bold text-lg">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Needs */}
      <section className="py-20 bg-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border-2 border-primary/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <h2 className="text-3xl font-bold text-primary mb-12 text-center">
                {lang === "ur" ? "تعمیراتی ضروریات" : "Construction Needs"}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-white p-3 rounded-xl shrink-0">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {lang === "ur" ? "نیو ہاسٹل فیز-2" : "New Hostel Phase-2"}
                      </h3>
                      <ul className="space-y-2 text-ink/70">
                        <li>• {lang === "ur" ? "6 منزلہ عمارت" : "6-story building"}</li>
                        <li>• {lang === "ur" ? "ہر منزل پر 10 کمرے" : "10 rooms per floor"}</li>
                        <li>• {lang === "ur" ? "تخمینہ لاگت: 1.71 کروڑ روپے" : "Estimated cost: 1.71 Crore PKR"}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-secondary text-white p-3 rounded-xl shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {lang === "ur" ? "نیو کیمپس" : "New Campus"}
                      </h3>
                      <ul className="space-y-2 text-ink/70">
                        <li>• {lang === "ur" ? "10 ایکڑ رقبہ" : "10-acre land"}</li>
                        <li>• {lang === "ur" ? "تخمینہ لاگت: 5 کروڑ روپے" : "Estimated cost: 5 Crore PKR"}</li>
                        <li>• {lang === "ur" ? "اضافی شعبہ جات کا قیام" : "Establishment of additional departments"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appeal & Bank Details */}
      <section id="appeal" className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Heart className="text-secondary fill-secondary" />
                {t.appeal.title}
              </h2>
              <p className="text-xl leading-[2] mb-10 opacity-90">
                {t.appeal.text}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {t.appeal.contacts.map((contact, idx) => (
                  <div key={idx} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                    <p className="font-bold text-secondary">{contact.name}</p>
                    <p className="text-sm opacity-70 mb-2">{contact.role}</p>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm font-mono ltr">
                        <Phone size={14} />
                        {contact.phone}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm w-fit">
                <MapPin className="text-secondary" />
                <span className="text-lg">Multan, Punjab, Pakistan</span>
              </div>
            </div>

            <div className="bg-white text-ink p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-primary mb-8 text-center">
                {t.appeal.bank.title}
              </h3>
              <div className="space-y-6">
                {t.appeal.bank.accounts.map((acc, idx) => (
                  <div key={idx} className="p-6 bg-accent rounded-2xl border-2 border-primary/5">
                    <div className="flex items-center gap-3 mb-3 text-primary font-bold">
                      <CreditCard size={20} />
                      <span>{acc.bank}</span>
                    </div>
                    <div className="text-2xl font-mono tracking-wider text-ink/80 ltr text-center">
                      {acc.acc}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-ink/60 text-center italic">
                {lang === "ur" ? "آپ کے تعاون کا شکریہ" : "Thank you for your support"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-ink text-white/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Globe size={20} />
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Phone size={20} />
            </div>
          </div>
          <p className="mb-2">© {new Date().getFullYear()} {t.name}. All rights reserved.</p>
          <p className="text-sm opacity-50">Designed for Jamia Ul Uloom Multan</p>
        </div>
      </footer>
    </div>
  );
}
