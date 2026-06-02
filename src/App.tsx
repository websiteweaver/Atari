import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, User, ArrowRight, Heart, MessageCircle, Star } from 'lucide-react';

// Types
interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

// All articles data
const allArticles: Article[] = [
  {
    id: 1,
    title: "Atari 2600: The Console That Changed Everything",
    excerpt: "A deep dive into the hardware and legacy that launched the home gaming revolution.",
    content: "The Atari 2600, originally known as the Atari Video Computer System, was released in September 1977. It became the first successful home video game console. With its groundbreaking cartridge system, the 2600 allowed players to experience dozens of different games on a single machine. Titles like Space Invaders, Pac-Man, and Pitfall! became cultural phenomena. Today, original hardware and cartridges are highly sought after by collectors worldwide.",
    category: "History",
    date: "March 12, 2025",
    author: "Michael Chen",
    image: "/images/hero.jpg",
    readTime: "12 min"
  },
  {
    id: 2,
    title: "Atari ST: The Computer That Powered the Music Industry",
    excerpt: "How the Atari ST became the secret weapon for legendary music producers in the 80s and 90s.",
    content: "The Atari 520ST and 1040ST were revolutionary 16-bit computers released in 1985. Featuring a built-in MIDI port, they quickly became favorites among musicians. Artists including Prince, Madonna, and New Order used the ST to create iconic tracks. With powerful software like Cubase and Notator, it offered professional-grade music production at an affordable price.",
    category: "Tech",
    date: "March 10, 2025",
    author: "Sarah Patel",
    image: "/images/st-computer.jpg",
    readTime: "9 min"
  },
  {
    id: 3,
    title: "Atari 7800: The Forgotten Masterpiece",
    excerpt: "Why the 7800 remains one of the most underrated consoles in gaming history.",
    content: "Released in 1986, the Atari 7800 ProSystem was designed to compete directly with the Nintendo Entertainment System. It featured backward compatibility with 2600 games and impressive graphical capabilities for its time. Though limited by poor marketing, its library includes gems like Food Fight, Alien Brigade, and the excellent port of Ninja Golf.",
    category: "Reviews",
    date: "March 8, 2025",
    author: "David Rodriguez",
    image: "/images/cartridge.jpg",
    readTime: "7 min"
  },
  {
    id: 4,
    title: "The Jaguar: Atari's Last Stand",
    excerpt: "Inside the ambitious but troubled 64-bit console that marked the end of Atari's hardware era.",
    content: "The Atari Jaguar launched in 1993 as the world's first 64-bit gaming console. Featuring a powerful multi-chip architecture, it promised incredible performance. Despite impressive titles like Tempest 2000 and Alien vs Predator, development challenges and a difficult controller held it back. Still, the Jaguar remains a cult favorite among retro enthusiasts.",
    category: "History",
    date: "March 5, 2025",
    author: "Elena Voss",
    image: "/images/jaguar.jpg",
    readTime: "11 min"
  },
  {
    id: 5,
    title: "Atari 5200: The Unfortunate Middle Child",
    excerpt: "Revisiting the ambitious but flawed successor to the legendary 2600.",
    content: "The Atari 5200 was released in 1982 as a direct competitor to Intellivision. It boasted superior graphics and analog joysticks, but suffered from a bulky design and lack of backward compatibility. Despite its issues, the 5200 delivered excellent arcade ports and remains beloved by collectors today.",
    category: "Reviews",
    date: "March 3, 2025",
    author: "James Torres",
    image: "/images/atari5200.jpg",
    readTime: "8 min"
  }
];

const categories = ["All", "History", "Tech", "Reviews"];

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-[#1A1A1A]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// Navbar
function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/news?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E60012] rounded flex items-center justify-center">
              <span className="text-white font-black text-2xl tracking-[-2px]">A</span>
            </div>
            <div>
              <div className="font-black text-2xl tracking-[-1.5px]">ATARI HQ</div>
              <div className="text-[10px] text-gray-500 -mt-1">THE ST REPORT</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-[#E60012] transition-colors">Home</Link>
            <Link to="/news" className="hover:text-[#E60012] transition-colors">News</Link>
            <Link to="/reviews" className="hover:text-[#E60012] transition-colors">Reviews</Link>
            <Link to="/gallery" className="hover:text-[#E60012] transition-colors">Gallery</Link>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative w-80 hidden md:block">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Atari articles..."
            className="w-full bg-gray-100 pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#E60012]"
          />
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
        </form>

        <Link 
          to="/news" 
          className="bg-[#E60012] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-black transition-all"
        >
          READ LATEST <ArrowRight size={16} />
        </Link>
      </div>
    </nav>
  );
}

// Home Page
function HomePage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "RetroGamer92", text: "The 2600 still holds up today. Incredible engineering.", date: "2h ago" },
    { id: 2, author: "STFanatic", text: "The ST's MIDI ports were a game changer for musicians.", date: "5h ago" }
  ]);
  const [newComment, setNewComment] = useState('');

  const featured = allArticles.slice(0, 3);

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      author: "You",
      text: newComment.trim(),
      date: "Just now"
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <>
      {/* Hero Section - Nintendo Everything style */}
      <div className="relative h-[88vh] bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero.jpg" 
            alt="Atari 2600" 
            className="w-full h-full object-cover opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>
        
        <div className="relative z-10 max-w-4xl px-6 text-center text-white">
          <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm tracking-[3px] mb-6">EST 1977</div>
          <h1 className="text-7xl md:text-8xl font-black tracking-[-4.5px] leading-none mb-4">THE LEGEND<br />LIVES ON</h1>
          <p className="text-2xl text-white/90 max-w-lg mx-auto mb-10">Celebrating Atari's iconic hardware, software and lasting impact on gaming culture.</p>
          
          <div className="flex justify-center gap-4">
            <Link to="/news" className="bg-white text-black px-9 py-4 rounded-full font-semibold flex items-center gap-3 text-lg hover:bg-[#E60012] hover:text-white transition-all">
              EXPLORE THE ARCHIVE
            </Link>
            <Link to="/gallery" className="border-2 border-white/80 px-9 py-4 rounded-full font-semibold flex items-center gap-3 text-lg hover:bg-white hover:text-black transition-all">
              VIEW GALLERY
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="flex items-end justify-between mb-9">
          <div>
            <div className="text-[#E60012] font-bold tracking-[2px] text-sm">FEATURED THIS WEEK</div>
            <h2 className="text-6xl font-black tracking-[-2.5px]">Essential Reads</h2>
          </div>
          <Link to="/news" className="hidden md:flex items-center gap-2 text-[#E60012] font-semibold">VIEW ALL NEWS <ArrowRight /></Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((article, index) => (
            <motion.div 
              key={article.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedArticle(article)}
              className="article-card group cursor-pointer bg-white border border-gray-200 overflow-hidden rounded-2xl"
            >
              <div className="relative h-72">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-4 py-1 text-xs font-bold tracking-widest bg-white text-black rounded-full">
                  {article.category}
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{article.date}</span><span>•</span><span>{article.readTime}</span>
                </div>
                <h3 className="font-black text-[21px] tracking-[-0.6px] leading-tight mb-3 group-hover:text-[#E60012] transition-colors">{article.title}</h3>
                <p className="text-gray-600 text-[15px] line-clamp-2">{article.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-[#F8F8F8] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline text-[#E60012] font-bold tracking-[3px] text-sm">COMMUNITY</div>
            <h2 className="text-5xl font-black tracking-[-2px] mt-2">Join the conversation</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-9">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="text-[#E60012]" /> 
              <span className="font-semibold text-xl">Latest Comments</span>
            </div>

            <div className="space-y-5 mb-8 max-h-[260px] overflow-auto pr-2">
              {comments.map((c) => (
                <div key={c.id} className="border-l-4 border-[#E60012] pl-5 py-1">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-semibold">{c.author}</span>
                    <span className="text-gray-400 text-xs">{c.date}</span>
                  </div>
                  <p className="text-gray-700 leading-snug">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={addComment} className="flex gap-3">
              <input 
                type="text" 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on Atari..." 
                className="flex-1 bg-gray-100 px-6 py-3.5 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-[#E60012]"
              />
              <button type="submit" className="bg-[#E60012] hover:bg-black transition-colors text-white px-9 rounded-full font-semibold">POST</button>
            </form>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" onClick={() => setSelectedArticle(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="modal bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="relative">
                <img src={selectedArticle.image} alt="" className="w-full h-96 object-cover" />
                <button onClick={() => setSelectedArticle(null)} className="absolute top-5 right-5 bg-white/90 p-3 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="p-10">
                <div className="uppercase tracking-[3px] text-xs text-[#E60012] font-bold mb-2">{selectedArticle.category} • {selectedArticle.readTime}</div>
                <h1 className="text-5xl font-black tracking-[-2.2px] mb-4 pr-6">{selectedArticle.title}</h1>
                <div className="flex gap-5 text-sm text-gray-600 mb-9">
                  <div className="flex items-center gap-2"><User size={16} /> {selectedArticle.author}</div>
                  <div className="flex items-center gap-2"><Calendar size={16} /> {selectedArticle.date}</div>
                </div>
                <div className="prose prose-lg max-w-none text-[17px] leading-relaxed text-gray-800">
                  {selectedArticle.content}
                </div>
                <div className="mt-9 pt-9 border-t flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-[#E60012]">
                    <Heart className="cursor-pointer" /> <span className="font-medium">1.8k</span>
                  </div>
                  <button onClick={() => setSelectedArticle(null)} className="font-semibold">CLOSE ARTICLE</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// News Page — Fully functional with live search & filter
function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="font-bold tracking-[4px] text-xs text-[#E60012]">ARCHIVES</div>
        <h1 className="text-[68px] font-black tracking-[-4px] leading-none mt-1">Latest Atari News</h1>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 border-b pb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-[#E60012] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 border-none pl-11 py-3 rounded-full focus:ring-1 focus:ring-[#E60012] text-sm"
          />
          <Search className="absolute left-4 top-4 text-gray-400" size={18} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)} 
              className="article-card group flex flex-col md:flex-row gap-7 border border-gray-200 p-7 rounded-3xl cursor-pointer hover:border-[#E60012]"
            >
              <div className="md:w-2/5">
                <img src={article.image} alt="" className="rounded-2xl w-full aspect-[16/10] object-cover" />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between text-xs mb-4 text-gray-500">
                  <span>{article.category}</span><span>{article.date}</span>
                </div>
                <h3 className="font-black tracking-[-0.8px] text-3xl leading-none mb-4 pr-2 group-hover:text-[#E60012] transition-colors">{article.title}</h3>
                <p className="text-gray-600 text-[15px] leading-tight mb-4">{article.excerpt}</p>
                <div className="text-[#E60012] font-semibold inline-flex items-center gap-1 text-sm">READ FULL ARTICLE <ArrowRight size={15}/></div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 text-gray-500">No articles found matching your criteria.</div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedArticle(null)}>
            <motion.div 
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              className="bg-white max-w-[860px] w-full rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()}
            >
              <img src={selectedArticle.image} className="w-full h-[360px] object-cover" />
              <div className="p-10">
                <div className="uppercase text-xs font-bold tracking-[4px] text-[#E60012] mb-1">{selectedArticle.category}</div>
                <h2 className="font-black tracking-[-2.2px] text-5xl mb-6 pr-10">{selectedArticle.title}</h2>
                <div className="text-gray-600 mb-8">{selectedArticle.content}</div>
                <button onClick={() => setSelectedArticle(null)} className="font-semibold text-sm">CLOSE</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reviews Page
function ReviewsPage() {
  const reviewArticles = allArticles.filter(a => a.category === "Reviews");
  const [selected, setSelected] = useState<Article | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-12">
        <div className="text-[#E60012] font-bold tracking-widest text-sm">CRITICAL ANALYSIS</div>
        <h1 className="text-7xl font-black tracking-[-3.5px]">Atari Reviews</h1>
      </div>
      
      <div className="space-y-5">
        {reviewArticles.map(article => (
          <div key={article.id} onClick={() => setSelected(article)} className="group flex items-center gap-8 border border-gray-200 p-8 rounded-3xl cursor-pointer hover:border-[#E60012]">
            <img src={article.image} alt="" className="w-80 rounded-2xl object-cover aspect-video" />
            <div>
              <div className="flex items-center gap-2 mb-2"><Star className="text-[#E60012]" size={19} /> <span className="font-semibold">CLASSIC</span></div>
              <h3 className="font-black text-4xl tracking-[-1.5px] mb-3 group-hover:text-[#E60012] transition-colors">{article.title}</h3>
              <p className="text-xl text-gray-600">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[80] p-5" onClick={() => setSelected(null)}>
            <div onClick={e => e.stopPropagation()} className="bg-white max-w-3xl rounded-3xl overflow-hidden">
              <img src={selected.image} className="h-80 w-full object-cover" />
              <div className="px-10 py-9">
                <h2 className="font-black text-4xl tracking-tight mb-5">{selected.title}</h2>
                <p className="leading-relaxed text-lg text-gray-800">{selected.content}</p>
                <button className="mt-8 text-sm font-bold" onClick={() => setSelected(null)}>BACK TO REVIEWS</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Gallery Page
function GalleryPage() {
  const galleryImages = [
    { src: "/images/hero.jpg", label: "Atari 2600" },
    { src: "/images/st-computer.jpg", label: "Atari ST" },
    { src: "/images/cartridge.jpg", label: "7800 Cartridges" },
    { src: "/images/jaguar.jpg", label: "Jaguar Console" },
    { src: "/images/atari5200.jpg", label: "5200 System" },
    { src: "/images/magazine.jpg", label: "Classic Print Ads" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-xl mb-12">
        <div className="text-[#E60012] text-xs tracking-[4px] font-bold">VISUAL ARCHIVES</div>
        <h1 className="font-black text-[72px] tracking-[-4.5px] leading-none mt-1">Atari Gallery</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((img, index) => (
          <div key={index} className="group relative overflow-hidden rounded-3xl aspect-[16/10] border border-gray-200">
            <img src={img.src} alt={img.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-7">
              <div className="text-white font-black tracking-[-0.5px] text-3xl">{img.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 text-sm text-gray-500">High-resolution archival images from the golden age of Atari</div>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t bg-[#F8F8F8] py-16 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-y-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-[#E60012] flex items-center justify-center rounded"><span className="text-white font-black">A</span></div>
            <span className="font-black tracking-tight">ATARI HQ • TSR</span>
          </div>
          <div className="text-gray-500 max-w-xs">Preserving and celebrating the history of Atari since 1996.</div>
        </div>
        <div className="md:text-right text-gray-500">© {new Date().getFullYear()} Atari HQ. All rights preserved. Not affiliated with Atari, Inc.</div>
      </div>
    </footer>
  );
}

export default App;
