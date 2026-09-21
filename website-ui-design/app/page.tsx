'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, CalendarDays, ChevronRight, CircleUserRound, GraduationCap, Heart, Landmark, MapPin, Menu, MessageCircle, Phone, ScrollText, Sparkles, Star, UsersRound, X } from 'lucide-react'

const services = [
  ['श्री महाकाल पूजा', 'ॐ'], ['रुद्राभिषेक', 'श्री'], ['गृह शांति', 'ॐ'], ['महामृत्युंजय जाप', 'ॐ'],
  ['महा अनुष्ठान', 'श्री'], ['नवग्रह शांति', 'ॐ'], ['शतचंडी पाठ एवं अनुष्ठान', 'श्री'], ['मंगल पूजन', 'ॐ'],
  ['वास्तु शांति एवं गृह शांति', 'ॐ'], ['कुंडली विचार', 'ॐ'], ['अर्क विवाह', 'श्री'], ['प्राण प्रतिष्ठा', 'ॐ'],
]
const gallery = [
  ['https://images.unsplash.com/photo-1604608672516-f1b9a7a94a1a?auto=format&fit=crop&w=700&q=80', 'स्वास्तिक'],
  ['https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80', 'महामृत्युंजय जाप'],
  ['https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=700&q=80', 'नवचंडी अनुष्ठान'],
  ['https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80', 'लक्ष्मी पाठ'],
  ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=700&q=80', 'दुर्गा अर्चना'],
  ['https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=700&q=80', 'महा रुद्र प्रयोग'],
]

function Header({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  return <>
    <header className="site-header">
      <a className="brand" href="#home"><span className="brand-mark">ॐ</span><span><b>शास्त्री अक्षय अवस्थी जी</b><small>वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य</small></span></a>
      <nav className={open ? 'nav open' : 'nav'}>
        {['होम', 'सेवाएं', 'गैलरी', 'आचार्य', 'परिचय', 'संपर्क'].map((item, i) => <a href={`#${['home','services','gallery','acharya','about','contact'][i]}`} key={item} onClick={() => setOpen(false)}>{item}</a>)}
      </nav>
      <div className="header-contact"><span><MessageCircle size={13}/> 9300096938 | 8982102113</span><a href="#contact">Contact for Booking</a></div>
      <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </header>
    <div className="notice"><MessageCircle size={13}/> 9300096938 | 8982102113 <a href="#contact">Contact for Booking</a></div>
  </>
}

function Hero() {
  return <section className="hero" id="home"><div className="hero-copy"><p className="eyebrow">श्री महाकालेश्वर तीर्थ, उज्जैन</p><h1>शास्त्री अक्षय अवस्थी जी</h1><h2>वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य</h2><div className="hero-note">वैदिक परंपराओं एवं शास्त्रोक्‍त विधि-विधान से<br/>पूजन, संस्कार एवं धार्मिक अनुष्ठान</div><p className="location"><MapPin size={18}/> श्री महाकालेश्वर तीर्थ, उज्जैन</p><a className="button" href="#contact">Contact for Booking</a></div><div className="guru-art"><div className="sun-disc"/><div className="temple-silhouette">ॐ</div><div className="guru-placeholder">आचार्य<br/><span>अक्षय अवस्थी</span></div><div className="flag">जय<br/>महाकाल</div></div></section>
}

function Stats() { return <div className="stats"><div><span className="stat-icon"><Star/></span><b>15+ Years</b><small>वैदिक कर्मकांड एवं धार्मिक<br/>अनुष्ठान का अनुभव</small></div><div><span className="stat-icon"><GraduationCap/></span><b>Education</b><small>शास्त्री — व्याकरण<br/>आचार्य — संस्कृत</small></div><div><span className="stat-icon"><MapPin/></span><b>Location</b><small>उज्जैन — श्री महाकालेश्वर तीर्थ</small></div></div> }

function RitualAccents() { return <><a className="floating-diya" href="https://wa.me/919300096938?text=नमस्ते%20आचार्य%20जी,%20मुझे%20पूजा%20एवं%20अनुष्ठान%20के%20बारे%20में%20जानकारी%20चाहिए।" target="_blank" rel="noreferrer" aria-label="चैट सहायक खोलें"><span className="diya-flame"/><span className="diya-bowl"/><span className="diya-chat-hint">चैट</span></a><div className="flower-orbit flower-orbit-left" aria-hidden="true"><span>✿</span><span>✽</span><span>✿</span></div><div className="flower-orbit flower-orbit-right" aria-hidden="true"><span>✽</span><span>✿</span><span>✽</span></div><div className="ritual-divider" aria-hidden="true"><span>✦</span><b>ॐ</b><span>✦</span></div></> }

function Services() { return <section className="section" id="services"><div className="section-heading"><span>✦</span><h2>हमारी प्रमुख सेवाएं</h2><span>✦</span></div><div className="service-grid">{services.map(([name, mark]) => <div className="service-card" key={name}><strong>{mark}</strong><span>{name}</span></div>)}<div className="custom-card"><Sparkles/><b>Special Anushthan<br/>/ Custom Puja</b><small>आपके विशेष पूजा/अनुष्ठान के लिए<br/>संपर्क करें</small><a className="button" href="#contact">Contact for Custom Puja</a></div></div><p className="center-note">अथवा पूजन एवं संस्कार भी वैदिक परंपराओं एवं शास्त्रोक्त विधि-विधान के अनुसार संपन्न कराए जाते हैं।</p></section> }

function Gallery() {
  const [active, setActive] = useState(2)
  return <section className="section gallery-section" id="gallery">
    <div className="section-heading"><span>✦</span><h2>हमारी गैलरी</h2><a href="#gallery">View All <ChevronRight size={14}/></a></div>
    <div className="elastic-gallery" aria-label="पूजन एवं अनुष्ठान गैलरी">
      {gallery.map(([src, label], index) => <button type="button" className={`elastic-panel ${active === index ? 'is-active' : ''}`} key={label} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-label={`${label} देखें`}>
        <img src={src} alt={label}/><span className="elastic-shade"/><span className="elastic-copy"><small>पूजन एवं अनुष्ठान</small><strong>{label}</strong><em>विवरण देखें <ChevronRight size={15}/></em></span><span className="elastic-collapsed">{String(index + 1).padStart(2, '0')}</span>
      </button>)}
    </div>
  </section>
}

function Acharya() { return <section className="acharya section" id="acharya"><div className="portrait-wrap"><img src="https://images.unsplash.com/photo-1531376799393-8b8f5c9a1b8a?auto=format&fit=crop&w=700&q=80" alt="आचार्य अक्षय अवस्थी जी"/><span>ॐ</span></div><div className="acharya-copy"><p className="eyebrow">आचार्य परिचय</p><h2>शास्त्री अक्षय अवस्थी जी</h2><h3>वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य</h3><div className="bio-lines"><p><GraduationCap/> <b>शिक्षा</b><span>शास्त्री — व्याकरण | आचार्य — संस्कृत</span></p><p><CalendarDays/> <b>अनुभव</b><span>15+ वर्ष</span></p><p><ScrollText/> <b>विशेषज्ञता</b><span>वैदिक कर्मकांड, धार्मिक अनुष्ठान, दुर्गा अर्चन, महाकाल शांति, नवग्रह, वास्तु शांति, सत्यनारायण, मह�����मृत्युंजय जाप, मंगल पूजन एवं गृह प्रवेश पूजा आदि।</span></p></div><blockquote>“ वेदों के प्रकाश से, धर्म के मार्ग पर... ”</blockquote></div></section> }

function Articles() {
  const [active, setActive] = useState(0)
  const articles = [
    ['उज्जैन में महामृत्युंजय जाप: कब और क्यों?', 'महामृत्युंजय जाप', 'रुद्र मंत्र, संकल्प और विधि-विधान के साथ विशेष अनुष्ठान का महत्व जानें।'],
    ['महामृत्युंजय जाप का महत्व', 'वैदिक ज्ञान', 'आयु, आरोग्य और मानसिक शांति के लिए इस पवित्र जाप की परंपरा समझें।'],
    ['नवचंडी अनुष्ठान एवं लाभ', 'शक्ति उपासना', 'माँ चंडी की आराधना से जुड़े नियम, लाभ और शुभ अवसरों की जानकारी।'],
    ['गृह शांति एवं वास्तु पूजा', 'गृह संस्कार', 'नए घर और परिवार में सुख-शांति के लिए वैदिक पूजन विधि।'],
    ['पुण्य प्राप्ति के वैदिक उपाय', 'धर्म एवं संस्कार', 'दैनिक जीवन में अपनाए जा सकने वाले सरल वैदिक उपाय और संस्कार।'],
  ]
  return <section className="section articles" id="about"><div className="section-heading"><span>✦</span><h2>हमारे लेख</h2></div><div className="article-grid article-flip-grid">{articles.map(([title, category, excerpt], i) => <button type="button" className={`article-card ${active === i ? 'is-active' : ''}`} key={title} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}><div className={`article-image image-${i + 1}`}/><div className="article-face article-front"><small>{category}</small><h3>{title}</h3><span>Read More <ChevronRight size={14}/></span></div><div className="article-face article-back"><span className="article-number">{String(i + 1).padStart(2, '0')}</span><small>{category}</small><h3>{title}</h3><p>{excerpt}</p><a href="#contact" onClick={(event) => event.stopPropagation()}>लेख के बारे में पूछें <ChevronRight size={14}/></a></div></button>)}</div></section>
}

function Contact() { return <section className="contact section" id="contact"><div><p className="eyebrow">संपर्क करें</p><h2>अपने अनुष्ठान के लिए आज ही बात करें</h2><p><Phone size={15}/> 9300096938</p><p><MessageCircle size={15}/> 8982102113</p><p>अवस्थीशास्त्री749@gmail.com</p><p><MapPin size={15}/> D21A, होमगार्ड चौराहा, उज्जैन, मध्य प्रदेश</p></div><form><input placeholder="आपका नाम"/><input placeholder="मोबाइल नंबर"/><select defaultValue=""><option value="" disabled>सेवा चुनें</option><option>पूजन एवं अनुष्ठान</option><option>कुंडली विचार</option></select><textarea placeholder="आपका संदेश" rows={3}/><button className="button" type="button">पूजा/अनुष्ठान के लिए संपर्क करें</button></form></section> }

function Footer() { return <footer><div className="footer-om">ॐ</div><h2>श्री महाकालेश्वर तीर्थ, उज्जैन</h2><p>धर्म, संस्कार और वैदिक परंपराओं के साथ</p><div className="footer-links"><a href="#home">होम</a><a href="#services">सेवाएं</a><a href="#gallery">गैलरी</a><a href="#contact">संपर्क</a></div><small>© 2025, शास्त्री अक्षय अवस्थी जी. सर्वाधिकार सुरक्षित।</small><a className="to-top" href="#home"><ArrowUp size={16}/> Back to Top</a></footer> }

export default function Page() { const [open, setOpen] = useState(false); useEffect(() => { const items = document.querySelectorAll('main > section, main > .stats, main > footer'); items.forEach((item) => item.classList.add('reveal')); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: 0.12 }); items.forEach((item) => observer.observe(item)); return () => observer.disconnect() }, []); return <main><Header open={open} setOpen={setOpen}/><RitualAccents/><Hero/><Stats/><Services/><Gallery/><Acharya/><Articles/><Contact/><Footer/></main> }
