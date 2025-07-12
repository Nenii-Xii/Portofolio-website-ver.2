import React, { useState, useEffect, useRef } from 'react';

// === Komponen Ikon (Menggantikan Font Awesome) ===
// Kita buat komponen ikon sederhana agar tidak bergantung pada link eksternal
const Icon = ({ name, className }) => {
  const icons = {
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.543.01-4.78.068-2.967.135-4.247 1.416-4.382 4.382-.058 1.237-.068 1.602-.068 4.78s.01 3.543.068 4.78c.135 2.967 1.416 4.247 4.382 4.382 1.237.058 1.602.068 4.78.068s3.543-.01 4.78-.068c2.967-.135 4.247-1.416 4.382-4.382.058-1.237.068-1.602.068-4.78s-.01-3.543-.068-4.78c-.135-2.967-1.416-4.247-4.382-4.382C15.543 3.613 15.171 3.604 12 3.604zm0 4.865a3.532 3.532 0 100 7.064 3.532 3.532 0 000-7.064zm0 5.662a2.132 2.132 0 110-4.264 2.132 2.132 0 010 4.264zm5.83-6.23a1.24 1.24 0 100 2.48 1.24 1.24 0 000-2.48z",
    github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    link: "M13.875 7.5a2.625 2.625 0 100 5.25 2.625 2.625 0 000-5.25zm-6 5.25a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25zM12 15.75a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z",
    bars: "M3 12h18M3 6h18M3 18h18",
    times: "M6 18L18 6M6 6l12 12",
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  );
};

// === Komponen Navbar ===
const Navbar = ({ isDarkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section, header');
    const handleScroll = () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about-me', label: 'About Me' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact-me', label: 'Contact Me' },
  ];

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center py-4 bg-white/80 dark:bg-[#0D1117]/80 backdrop-blur-sm shadow-sm">
      <a href="#home" className="text-2xl font-bold text-main-blue dark:text-blue-400 pl-2">Nenii</a>
      <div className="flex items-center">
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className={`transition ${activeLink === link.href.substring(1) ? 'nav-link-active' : 'text-gray-500 dark:text-gray-400 hover:text-main-blue dark:hover:text-white'}`}>
              {link.label}
            </a>
          ))}
        </div>
        <div id="fancy-toggle" onClick={onToggleTheme} className="ml-4 relative w-[70px] h-[36px] bg-slate-300 dark:bg-gray-800 rounded-full cursor-pointer transition-colors duration-300 ease-in-out overflow-hidden">
          <div className="thumb absolute top-1 left-1 w-7 h-7 bg-white rounded-full transition-transform duration-400 ease-in-out bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/869/869869.png')", backgroundSize: '18px', transform: isDarkMode ? 'translateX(34px)' : 'translateX(0)', backgroundImage: isDarkMode ? "url('https://cdn-icons-png.flaticon.com/512/547/547433.png')" : "url('https://cdn-icons-png.flaticon.com/512/869/869869.png')"}}></div>
          <div className="stars absolute top-0 left-0 w-full h-full opacity-0 dark:opacity-70 transition-opacity duration-300" style={{backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '8px 8px'}}></div>
        </div>
      </div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl z-30">
        <Icon name={isMenuOpen ? "times" : "bars"} className="w-6 h-6" />
      </button>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white dark:bg-[#0D1117] z-20 flex flex-col items-center justify-center space-y-8 text-lg">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-main-blue dark:hover:text-accent-orange transition">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// === Komponen Hero ===
const Hero = () => (
  <header id="home" className="py-16 md:py-24">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="relative text-center md:text-left">
        <h1 className="text-5xl md:text-[65px] leading-tight font-semibold">
          <span className="text-main-blue dark:text-blue-400">NENI </span><span className="font-light text-accent-orange">GALUH </span><span className="text-main-blue dark:text-blue-400">PUTRI</span>
        </h1>
        <p className="text-5xl md:text-[65px] font-thin text-accent-orange mt-2">ANYELER</p>
        <p className="text-lg font-thin mt-8 text-gray-400 dark:text-gray-500 text-outline">Admin Engineering | Student of Information System and Technology at Cakrawala University</p>
        <div className="bg-main-blue text-white p-6 rounded-lg mt-8 max-w-md mx-auto md:mx-0">
          <p className="text-sm leading-relaxed">I am a passionate university student with hands-on experience in technical administration. With a background in Computer and Network Engineering, I combine meticulous operational management with technical understanding to support the efficiency and workflow of the engineering team.</p>
        </div>
        <div className="flex items-center justify-center md:justify-start space-x-4 mt-6">
          <a href="#" className="text-2xl text-main-blue dark:text-blue-400 hover:scale-110 transition"><Icon name="instagram" className="w-6 h-6 fill-current" /></a>
          <a href="#" className="text-2xl text-main-blue dark:text-blue-400 hover:scale-110 transition"><Icon name="github" className="w-6 h-6 fill-current" /></a>
          <a href="#" className="text-2xl text-main-blue dark:text-blue-400 hover:scale-110 transition"><Icon name="link" className="w-6 h-6 fill-current" /></a>
        </div>
        <a href="#" className="inline-block text-center mt-8">
          <span className="block bg-main-blue text-white px-10 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-800 dark:hover:bg-blue-600 transition">My CV?</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Click on me!</span>
        </a>
      </div>
      <div className="hidden md:block relative">
        <img src="https://i.imgur.com/8i9YyI2.png" alt="Ilustrasi seorang wanita sedang bekerja di depan komputer" className="relative z-10 dark:opacity-80" />
        <div className="absolute w-40 h-40 bg-main-blue/20 rounded-full -top-10 -right-10"></div>
        <div className="absolute w-24 h-24 bg-orange-200/40 rounded-full -bottom-10 right-20"></div>
      </div>
    </div>
  </header>
);

// === Komponen Experience & Skills ===
const ExperienceAndSkills = () => {
  const experiences = [
    {
      role: 'Engineering Operations Coordinator',
      company: 'PT. YIFANG CARGO MUTIARA ELECTRONIC | March 2024 - Present',
      tasks: [
        'Handling team personnel administration, including leave, transfers, and other related documents to maintain organizational order.',
        'Conducting precise data entry for frame numbers, engines, and GPS on each electric vehicle unit for repair and quality control purposes.',
        'Responsible for checking, maintaining, and managing factory assets to ensure smooth operational flow.',
        'Creating and managing Internal Orders (IO) for both weekly and urgent needs.',
        'Recording and archiving meeting and briefing notes as crucial documentation for decision-making.',
      ],
    },
    {
      role: 'Computer & Network Technician (Internship)',
      company: 'CV. ONE MEDIA SOLUTION | January 2022 - March 2022',
      tasks: [
        'Provided technical services to customers, including reinstalling Windows operating systems and other software.',
        'Performed configuration and troubleshooting of internet networks (Wi-Fi) for clients.',
        'Assisted customers directly, providing solutions to their technical problems.',
      ],
    },
  ];

  const skills = [
      {
          category: 'Administration & Organization',
          details: 'Data Management, Asset Management, Meeting Minutes, Microsoft Office Suite (Word, Excel)'
      },
      {
          category: 'Technical',
          details: 'Computer Network Basics, Software & OS Installation, Hardware Troubleshooting, Technical Support'
      },
      {
          category: 'Soft Skills',
          details: 'Attention to Detail, Time Management, Effective Communication, Adaptability'
      }
  ]

  return (
    <main>
      <section id="about-me" className="py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <h2 className="text-3xl font-bold text-main-blue dark:text-blue-400 mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-12">Hello! My name is NENI GALUH PUTRI ANYELER, an active student at Cakrawala University currently pursuing a career as an Admin Engineering at PT. Yifang Cargo Mutiara Electronic, an innovative company in the electric vehicle industry. My educational background in Computer and Network Engineering (TKJ) has given me a strong foundation in logic and technical problem-solving. I realize that the world of technology is not just about coding or assembly, but also about how the underlying systems and operations run smoothly.</p>
            <h2 id="experience" className="text-3xl font-bold text-main-blue dark:text-blue-400 mb-8">Experience</h2>
            <div className="relative">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <h3 className="text-lg font-semibold text-main-blue dark:text-blue-400">{exp.role}</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{exp.company}</p>
                  <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    {exp.tasks.map((task, i) => <li key={i}>{task}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 mt-12 md:mt-0">
            <div className="bg-white dark:bg-gray-800/50 p-8 rounded-lg shadow-lg sticky top-24">
              <h2 className="text-3xl font-bold text-main-blue dark:text-blue-400 mb-6">Skills</h2>
              <div className="space-y-6">
                {skills.map(skill => (
                    <div key={skill.category}>
                        <h4 className="font-semibold text-gray-400 dark:text-gray-500 border-b-2 border-gray-200 dark:border-gray-700 pb-2 mb-3">{skill.category}</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-400">{skill.details}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// === Komponen Contact & Footer ===
const ContactAndFooter = () => (
  <>
    <section id="contact-me" className="pt-16 md:pt-24 pb-12">
      <div className="bg-main-blue text-white p-8 md:p-12 rounded-xl relative overflow-hidden">
        <div className="absolute w-24 h-24 bg-accent-orange/20 rounded-full -bottom-10 -left-10"></div>
        <div className="absolute w-16 h-16 bg-accent-orange/20 rounded-full -bottom-4 left-20"></div>
        <div className="absolute w-32 h-32 bg-accent-orange/20 rounded-full -bottom-12 -right-12"></div>
        <div className="absolute w-12 h-12 bg-accent-orange/20 rounded-full bottom-20 -right-4"></div>
        <h2 className="text-3xl font-bold text-center mb-2">Contact Me</h2>
        <p className="text-center text-gray-300 mb-8">What do you think of me?</p>
        <form name="contact" method="POST" data-netlify="true" className="grid md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto">
          <input type="text" name="name" placeholder="Name : Who are you?" className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-white" />
          <input type="email" name="email" placeholder="E-mail : I'll reply to you" className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-white" />
          <input type="text" name="subject" placeholder="Subject : About What?" className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-white" />
          <input type="text" name="whatsapp" placeholder="WhatsApp Number : 08XX...?" className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-white" />
          <div className="md:col-span-2">
            <textarea name="message" placeholder="Message : How can I help you?..." rows="5" className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white flex-grow text-white"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full mt-2 bg-white text-main-blue font-bold py-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center space-x-2">
              <span>Send Message</span>
              <Icon name="paper-plane" className="w-4 h-4" />
            </button>
          </div>
        </form>
        <p className="text-center italic mt-12 text-gray-200">"Success does not come to us, we must pursue it with hard work and perseverance."</p>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <a href="#" className="text-2xl text-white hover:scale-110 transition"><Icon name="instagram" className="w-6 h-6 fill-current" /></a>
          <a href="#" className="text-2xl text-white hover:scale-110 transition"><Icon name="github" className="w-6 h-6 fill-current" /></a>
          <a href="#" className="text-2xl text-white hover:scale-110 transition"><Icon name="link" className="w-6 h-6 fill-current" /></a>
        </div>
      </div>
    </section>
    <footer className="bg-main-blue text-center py-4">
      <p className="text-sm text-white">&copy; 2025 - Created by Neni Galuh Putri Anyeler</p>
    </footer>
  </>
);


// === Komponen Utama App ===
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Cek tema dari localStorage atau preferensi sistem
    const useDark = localStorage.getItem('color-theme') === 'dark' || 
                    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(useDark);
    if (useDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem('color-theme', newIsDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newIsDarkMode);
  };

  return (
    <div className="container mx-auto px-6 md:px-12">
      <Navbar isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
      <Hero />
      <ExperienceAndSkills />
      <ContactAndFooter />
    </div>
  );
}

