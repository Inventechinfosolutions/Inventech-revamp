import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogArticles } from "../data/blogArticles";

export default function BlogArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleId = id ? parseInt(id, 10) : 0;
  const article = blogArticles.find((a) => a.id === articleId) ?? blogArticles[0];

  return (
    <div className="min-h-screen pt-28 pb-20 relative z-10">
      {/* Enhanced background for article page */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#020d0f]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(20, 184, 166, 0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(6, 182, 212, 0.15), transparent), radial-gradient(ellipse 60% 40% at 0% 80%, rgba(20, 184, 166, 0.12), transparent)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/30 to-navy-900/80" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <article className="bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl" style={{ borderRadius: 0 }}>
          {/* Image only – no text overlay for clarity */}
          <div className="aspect-video w-full overflow-hidden relative">
            <img
              src={article.image}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-navy-900/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-widest border border-cyan-400/30" style={{ borderRadius: 0 }}>
              {article.category}
            </div>
          </div>

          {/* Title and author on solid background – not over image */}
          <div className="px-8 pt-8 pb-6 md:px-12 md:pt-10 md:pb-8 border-b border-white/10">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight max-w-full break-words pr-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 w-full">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500/30 to-cyan-500/30 border border-teal-400/50 overflow-hidden flex-shrink-0 ring-2 ring-white/10">
                  <img
                    src={article.authorImage ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"}
                    alt={article.author}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div>
                  <div className="font-semibold text-cyan-400">{article.author}</div>
                  <div className="text-sm text-gray-400">{article.date}</div>
                  {article.authorRole && (
                    <div className="text-sm text-cyan-400/90 font-medium mt-0.5">{article.authorRole}</div>
                  )}
                </div>
              </div>
              <span className="text-teal-400 font-semibold ml-auto">{article.readTime}</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {article.pdfUrl ? (
              <>
                <div className="mb-6 border-l-4 border-teal-500 pl-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="bg-navy-900/50 border border-white/10 overflow-hidden" style={{ borderRadius: 0, minHeight: "70vh" }}>
                  <iframe
                    src={`${article.pdfUrl}#toolbar=1`}
                    title={article.title}
                    className="w-full h-[75vh] min-h-[600px] border-0"
                  />
                </div>
              </>
            ) : (
              <>
                {(() => {
                  const excerptStart = (article.excerpt || "").substring(0, 55);
                  const firstBodyStart = article.body?.[0]?.substring(0, 55) ?? "";
                  const isDuplicateIntro = excerptStart.length > 40 && firstBodyStart.length > 40 && excerptStart === firstBodyStart;
                  const showExcerpt = !isDuplicateIntro && article.excerpt;
                  return (
                    <>
                      {showExcerpt && (
                        <div className="mb-10 border-l-4 border-teal-500 pl-6">
                          <p className="text-xl text-gray-300 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                      )}
                      <div className="space-y-6 text-gray-300 leading-relaxed pl-2">
                        {article.body?.map((paragraph, i) => (
                          <p key={i} className="text-lg">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </article>

        <div className="mt-12 flex flex-wrap gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/5 border border-white/20 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-all"
            style={{ borderRadius: 0 }}
          >
            Back
          </button>
          <Link
            to="/blog"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-6 py-3 font-semibold transition-all shadow-lg shadow-teal-600/20"
            style={{ borderRadius: 0 }}
          >
            All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
