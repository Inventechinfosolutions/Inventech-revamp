import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { blogArticles } from "../data/blogArticles";

const CATEGORY_BUTTONS = [
  { label: "GovTech", category: "Government Technology" },
  { label: "UX & Design", category: "UX & Design" },
  { label: "Frontend & React.js", category: "Frontend & React.js" },
  { label: "Frontend & AI", category: "AI & Frontend" },
  { label: "Blockchain & Backend", category: "Blockchain & Backend" },
  { label: "Talent & Workforce Innovation", category: "Talent & Workforce Innovation" },
  { label: "Business & Digital Strategy", category: "Business & Digital Strategy" },
];

const SEARCH_KEYS = ["title", "excerpt", "author", "category"] as const;

function matchSearch(article: (typeof blogArticles)[0], query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return SEARCH_KEYS.some((key) => {
    const val = article[key];
    return typeof val === "string" && val.toLowerCase().includes(q);
  });
}

export default function Blog() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [articlesVisible, setArticlesVisible] = useState(true);
  const [, setSidebarVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [heroKey, setHeroKey] = useState(0);
  const [articlesKey, setArticlesKey] = useState(0);
  const [sidebarKey, setSidebarKey] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const prevVisibleCountRef = useRef(4);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const categoryCardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    setHeroVisible(true);
    setArticlesVisible(true);
    setSidebarVisible(true);

    const observers = [
      {
        ref: heroRef,
        setter: setHeroVisible,
        keySetter: setHeroKey,
      },
      {
        ref: articlesRef,
        setter: setArticlesVisible,
        keySetter: setArticlesKey,
      },
      {
        ref: sidebarRef,
        setter: setSidebarVisible,
        keySetter: setSidebarKey,
      },
    ];

    const observerInstances = observers.map(({ ref, setter, keySetter }) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Only reset animation for sidebar, keep it visible
              if (ref === sidebarRef) {
                keySetter((prev) => prev + 1);
              } else {
                setter(false);
                setTimeout(() => {
                  setter(true);
                  keySetter((prev) => prev + 1);
                }, 50);
              }
            } else {
              // Don't hide sidebar when not intersecting
              if (ref !== sidebarRef) {
                setter(false);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return { observer, ref };
    });

    return () => {
      observerInstances.forEach(({ observer, ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  const articles = blogArticles;
  const filteredBySearch = searchQuery.trim()
    ? articles.filter((a) => matchSearch(a, searchQuery))
    : articles;

  // Featured card: Vadiraj Karanam (Blockchain). Grid order: Shiva → Bankey → Sushmitha → Darshini → Manveeth → Prajwal → rest
  const vadirajArticle = filteredBySearch.find((a) => a.id === 12);
  const shivaArticle = filteredBySearch.find((a) => a.id === 7);
  const bankeyArticle = filteredBySearch.find((a) => a.id === 8);
  const sushmithaArticle = filteredBySearch.find((a) => a.id === 11);
  const darshiniArticle = filteredBySearch.find((a) => a.id === 9);
  const manveethArticle = filteredBySearch.find((a) => a.id === 10);
  const prajwalArticle = filteredBySearch.find((a) => a.id === 13);
  const featuredArticle = vadirajArticle ?? filteredBySearch.find((a) => a.id === 7) ?? filteredBySearch[0];
  const restArticles = filteredBySearch.filter((a) => a.id !== 7 && a.id !== 8 && a.id !== 9 && a.id !== 10 && a.id !== 11 && a.id !== 12 && a.id !== 13);
  const orderedGrid = [shivaArticle, bankeyArticle, sushmithaArticle, darshiniArticle, manveethArticle, prajwalArticle].filter((a): a is NonNullable<typeof a> => a != null);
  const gridArticles = [...orderedGrid, ...restArticles];

  const displayedArticles = gridArticles.slice(0, visibleCount);
  const hasMore = visibleCount < gridArticles.length;

  // Recommended Reads: Manveeth, Prajwal, Darshini, Bankey (Bhakey), Shiva Reddy cards (ids 10, 13, 9, 8, 7)
  const recommendedReads = [
    articles.find((a) => a.id === 10), // Manveeth S K - AI Smarter UI
    articles.find((a) => a.id === 13), // Prajwal - AI-Driven Business Analysis in Government
    articles.find((a) => a.id === 9),  // Darshini G B - Real-Time AI
    articles.find((a) => a.id === 8), // Bankey Bihari - UX Design
    articles.find((a) => a.id === 7), // Shiva Reddy - GovTech
  ].filter((a): a is NonNullable<typeof a> => a != null);

  const handleLoadMore = () => {
    setVisibleCount((prev) => {
      prevVisibleCountRef.current = prev;
      return Math.min(prev + 4, gridArticles.length);
    });
  };

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToBlogCards = () => {
    articlesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    const cardEl = categoryCardRefs.current[category];
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      scrollToBlogCards();
    }
  };

  useEffect(() => {
    prevVisibleCountRef.current = visibleCount;
  }, [visibleCount]);

  return (
    <div className="pt-24 pb-0 relative z-10">
      {/* Hero – phrase at top so buttons and categories are visible */}
      <section ref={heroRef} className="container mx-auto px-6 mb-12 text-center">
        <div key={`hero-title-${heroKey}`} className={`relative inline-block mb-6 ${heroVisible ? "blog-hero-title-visible" : "blog-hero-title-hidden"}`}>
          <div className="w-32 h-32 bg-teal-500/10 rounded-full absolute -top-10 -left-10 blur-2xl animate-pulse-slow"></div>
          <div className="w-32 h-32 bg-cyan-500/10 rounded-full absolute -bottom-10 -right-10 blur-2xl animate-pulse-slow-delayed"></div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 relative z-10 leading-tight" style={{marginTop: '70px'}}>
            Ideas That Shape <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Intelligent Digital Futures
            </span>
          </h1>
        </div>
        <p key={`hero-desc-${heroKey}`} className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed ${heroVisible ? "blog-hero-desc-visible" : "blog-hero-desc-hidden"}`}>
          Discover expert perspectives on AI engineering, automation, cloud
          modernization, and what's redefining enterprise technology.
        </p>
        <div key={`hero-buttons-${heroKey}`} className={`flex justify-center gap-6 flex-wrap mb-8 ${heroVisible ? "blog-hero-buttons-visible" : "blog-hero-buttons-hidden"}`}>
          <button
            onClick={scrollToBlogCards}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-10 py-4 text-lg font-bold shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-95 transition-all hover:scale-105"
          >
            Explore Topics
          </button>
          <button
            onClick={scrollToNewsletter}
            className="bg-white/5 border border-cyan-400/50 text-white px-10 py-4 text-lg font-bold hover:bg-cyan-400/10 hover:border-cyan-400 active:scale-95 transition-all backdrop-blur-md hover:scale-105"
          >
            Subscribe for Insights
          </button>
        </div>
        {/* Categories Bar – first 4 custom, then rest; click scrolls to that category’s cards */}
        <div key={`hero-categories-${heroKey}`} className={`flex flex-wrap justify-center gap-4 border-y border-white/10 py-6 ${heroVisible ? "blog-categories-visible" : "blog-categories-hidden"}`}>
          {CATEGORY_BUTTONS.map(({ label, category }) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8 mb-16 items-start">
        {/* Articles Feed */}
        <div ref={articlesRef} className="lg:col-span-2 space-y-10 scroll-mt-28">
          {filteredBySearch.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-10 text-center rounded-lg">
              <p className="text-gray-400 text-lg mb-2">No insights match your search.</p>
              <p className="text-sm text-gray-500">Try a different term or clear the search to see all articles.</p>
            </div>
          ) : (
            <>
          {/* Featured Article */}
          <article
            ref={(el) => {
              if (el) categoryCardRefs.current[featuredArticle.category] = el;
            }}
            key={`featured-${articlesKey}`}
            className={`enhanced-blog-card bg-white/8 border border-white/15 overflow-hidden group hover:border-cyan-400/30 transition-all duration-500 backdrop-blur-xl relative flex flex-col ${
              articlesVisible ? "blog-featured-visible" : "blog-featured-hidden"
            }`}
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 opacity-100"
              />
              <div className="absolute top-4 left-4 bg-navy-900/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-widest border border-cyan-400/20">
                {featuredArticle.category}
              </div>
            </div>
            <div className="p-8 pl-10 pr-10 relative z-10 flex flex-col flex-grow bg-gradient-to-r from-cyan-500/25 via-sky-500/20 to-teal-500/25 border-t border-cyan-400/20">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-3 leading-tight line-clamp-2 break-words">
                {featuredArticle.title}
              </h2>
              <div className="w-full mb-5 flex-grow min-h-0 border-l-4 border-teal-500 pl-4">
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 min-h-0 overflow-hidden text-ellipsis">
                  {featuredArticle.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3 min-h-0">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 overflow-hidden flex-shrink-0 aspect-square ring-2 ring-white/5">
                    <img
                      src={featuredArticle.authorImage ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"}
                      alt={featuredArticle.author}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-xs font-semibold text-white">
                      {featuredArticle.author}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {featuredArticle.date}
                    </span>
                    {featuredArticle.authorRole && (
                      <span className="text-[10px] text-cyan-400/90 font-medium mt-0.5">
                        {featuredArticle.authorRole}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-xs text-cyan-400 font-semibold mb-1">
                    {featuredArticle.readTime}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <Link
                to={`/blog/article/${featuredArticle.id}`}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group/btn w-fit"
              >
                Read Full Article
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </article>

          {/* Regular Grid */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {displayedArticles.map((article, idx) => {
              const isNewlyLoaded = idx >= prevVisibleCountRef.current && idx < visibleCount;
              return (
                <article
                  ref={(el) => {
                    if (el && !categoryCardRefs.current[article.category]) {
                      categoryCardRefs.current[article.category] = el;
                    }
                  }}
                  key={`article-${article.id}-${idx}`}
                  className={`enhanced-blog-card bg-white/3 border border-white/15 overflow-hidden group hover:bg-white/8 hover:border-cyan-400/25 transition-all duration-500 backdrop-blur-xl relative h-full flex flex-col ${
                    articlesVisible ? "blog-card-visible" : "blog-card-hidden"
                  } ${isNewlyLoaded ? "blog-card-load-more" : ""}`}
                  style={articlesVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-sky-500/0 to-teal-500/0 group-hover:from-cyan-500/20 group-hover:via-sky-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    {article.id === 7 && (
                      <div className="absolute top-4 left-4 bg-navy-900/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-widest border border-cyan-400/20">
                        {article.category}
                      </div>
                    )}
                  </div>
                  <div className="p-8 relative z-10 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="w-full mb-5 flex-grow min-h-0 border-l-4 border-teal-500 pl-4">
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 min-h-0 overflow-hidden text-ellipsis">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5 gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 overflow-hidden flex-shrink-0 aspect-square">
                          <img
                            src={article.authorImage ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"}
                            alt={article.author}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <span className="text-xs font-semibold text-white">{article.author}</span>
                          <span className="text-[10px] text-gray-500 font-medium">{article.date}</span>
                          {article.authorRole && (
                            <span className="text-[10px] text-cyan-400/90 font-medium mt-0.5">
                              {article.authorRole}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="text-xs text-cyan-400 font-semibold mb-1">{article.readTime}</span>
                        <span className="text-[10px] text-gray-500 font-medium">{article.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-auto pt-1">
                      <Link
                        to={`/blog/article/${article.id}`}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group/btn"
                      >
                        Read More
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {hasMore && (
            <div className="text-center pt-6">
              <button
                onClick={handleLoadMore}
                className="bg-white/5 border border-white/20 text-white px-12 py-4 font-bold hover:bg-white/10 transition-all active:scale-95"
              >
                Load More Articles
              </button>
            </div>
          )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside key={`sidebar-${sidebarKey}`} ref={sidebarRef} className="space-y-6 blog-sidebar-visible">
          {/* Search box matching 3rd reference style (teal/dark) */}
          <div className="bg-white/3 border border-white/5 ring-1 ring-emerald-400/20 rounded-lg p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">
              Search Insights
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Advanced search..."
                className="w-full bg-navy-900/50 border border-white/10 ring-1 ring-emerald-400/20 rounded-lg py-3 px-4 pl-10 text-white text-sm focus:ring-2 focus:ring-emerald-400/50 focus:outline-none transition-all"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Recommended Reads - Manveeth, Prajwal, Darshini, Bankey (Bhakey), Shiva Reddy */}
          <div className="bg-white/3 border border-white/5 ring-1 ring-emerald-400/20 rounded-lg p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6">
              Recommended Reads
            </h3>
            <div className="space-y-6">
              {recommendedReads.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/article/${article.id}`}
                  className="flex gap-4 group cursor-pointer rounded-sm border border-emerald-400/25 hover:border-emerald-400/50 px-3 py-2.5 transition-colors"
                >
                  <div className="w-20 h-20 bg-white/5 flex-shrink-0 overflow-hidden rounded-sm border border-emerald-400/20">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white leading-snug group-hover:text-teal-400 transition-colors mb-1 line-clamp-2">
                      {article.title}
                    </h4>
                    <span className="text-xs text-teal-400/60 font-semibold">
                      {article.readTime}
                    </span>
                    {article.author && (
                      <span className="text-[10px] text-gray-500 mt-0.5">
                        {article.author}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Card with Teal Gradient - in sidebar */}
          <div className="bg-gradient-to-br from-[#1b6e68] to-[#134e4a] p-6 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl transition-transform group-hover:scale-150 duration-700" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3">
                Tech Leadership Newsletter
              </h3>
              <p className="text-teal-50/80 mb-6 leading-relaxed text-sm">
                Join 15,000+ readers. No spam. Unsubscribe anytime.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-teal-100/50 py-3 px-4 mb-3 focus:outline-none focus:bg-white/20 transition-all text-center text-sm"
              />
              <button className="w-full bg-white text-teal-700 font-bold py-3 hover:bg-gray-100 active:scale-95 transition-all shadow-lg text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white/3 border border-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">
              Featured Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Artificial Intelligence",
                "DevOps",
                "Cloud Native",
                "Automation",
                "Cybersecurity",
              ].map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                    i === 0
                      ? "bg-teal-600 border-transparent text-white shadow-lg shadow-teal-600/20"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Tech Leadership Newsletter - after all blog cards */}
      <section ref={newsletterRef} className="container mx-auto px-6 mt-16 mb-16 scroll-mt-28">
        <div className="bg-gradient-to-br from-[#1b6e68] to-[#134e4a] p-8 md:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Tech Leadership Newsletter
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed text-sm md:text-base">
              Join 10,000+ readers getting weekly insights on AI, cloud, and digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-white text-gray-900 placeholder:text-gray-500 rounded-none py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
              />
              <button className="bg-white/20 hover:bg-white/30 border border-white/40 text-white font-bold py-3.5 px-8 rounded-none transition-all active:scale-95 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom section removed */}
    </div>
  );
}
