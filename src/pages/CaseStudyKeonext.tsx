import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

export default function CaseStudyKeonext() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full pt-28 pb-20 relative z-10">
      {/* Background – match blog article style */}
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
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <article className="bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl" style={{ borderRadius: 0 }}>
          {/* Hero image first – blog structure */}
          <div className="w-full overflow-hidden">
            <img
              src="/casestudy%20keonics.png"
              alt="KEONEXT Government Procurement Dashboard – workflows, vendors, expenditure tracking, and approval status"
              className="w-full h-auto object-cover object-top"
            />
          </div>

          {/* Title and meta below image – like blog */}
          <div className="px-8 pt-8 pb-6 md:px-12 md:pt-10 md:pb-8 border-b border-white/10">
            <div className="mb-4">
              <span className="inline-block bg-navy-900/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-widest border border-cyan-400/30" style={{ borderRadius: 0 }}>
                Case Study
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
              KEONEXT: Unified Procurement, Resource & Training Management Transformation
            </h1>
            <p className="text-cyan-400 font-semibold mb-4">Category: Digital Government & G2G Services</p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Estimated reading time: 8 minutes</span>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-10 text-gray-300 leading-relaxed">
            {/* Executive Summary */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Executive Summary</h2>
              <p className="text-lg mb-4">
                KEONEXT is a comprehensive digital marketplace developed for KEONICS (Karnataka State Electronics Development Corporation Limited) to transform government procurement, resource management, infrastructure services, and training governance across Karnataka.
              </p>
              <p className="text-lg mb-4">
                The platform unifies goods procurement, service management, HR resource workflows, infrastructure and facility management, training administration, and Government-to-Government (G2G) services into a single, secure, and scalable ecosystem.
              </p>
              <p className="text-lg mb-4">
                By automating the entire lifecycle—from indent creation to invoice verification, payment initiation, and training program management—KEONEXT improves transparency, operational efficiency, compliance tracking, skill development governance, and vendor engagement across multiple government departments.
              </p>
            </section>

            {/* The Client */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">The Client</h2>
              <p className="text-lg">
                KEONICS (Karnataka State Electronics Development Corporation Limited) is a Government of Karnataka enterprise dedicated to promoting electronics and IT development in the state.
              </p>
              <p className="text-lg mt-4">
                As a key digital enabler for various government departments, KEONICS required a unified digital platform to streamline procurement processes, HR resource allocation, infrastructure and facility services, training program management, and inter-department (G2G) coordination while ensuring transparency and compliance.
              </p>
            </section>

            {/* Business Challenges */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Business Challenges</h2>
              <ul className="list-disc list-inside space-y-2 text-lg pl-2">
                <li>Fragmented systems for goods, services, HR, facilities, and training management.</li>
                <li>Limited visibility into procurement lifecycle (Indent → PO → Invoice → Payment).</li>
                <li>Manual and time-consuming verification processes.</li>
                <li>Lack of centralized vendor, department, and training participant onboarding.</li>
                <li>Absence of a unified G2G digital marketplace across Karnataka.</li>
                <li>Limited audit trails and compliance monitoring mechanisms.</li>
                <li>No structured digital system for training scheduling, batch management, and certification tracking.</li>
              </ul>
            </section>

            {/* Project Scope & Scale */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Project Scope & Scale</h2>
              <p className="text-lg mb-4">
                KEONEXT is a large-scale enterprise platform serving multiple government departments, vendors, internal KEONICS staff, citizens, department users, training participants, and trainers.
              </p>
              <p className="text-lg">
                The system supports configurable workflows (process master), dynamic role-menu mapping, and multi-entity operations (departments, locations, zones) with end-to-end auditability.
              </p>
            </section>

            {/* Core Modules */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Core Modules</h2>
              <p className="text-lg mb-4">
                Goods Management, Services Management, HR Resource Management, Infrastructure & Facilities Management, Training Management, Administration & Master Data, and Public Portal & Citizen Interface.
              </p>
              <p className="text-lg">
                Each module supports end-to-end workflow automation, approval chains, document uploads, audit trails, and reporting dashboards.
              </p>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-lg pl-2">
                <li>Role-based access control and dynamic menu management.</li>
                <li>End-to-end workflow automation.</li>
                <li>Indent-to-Invoice verification with audit trails.</li>
                <li>Integrated training lifecycle management.</li>
                <li>Expenditure tracking dashboards.</li>
                <li>Secure document uploads and verification.</li>
                <li>Multi-department and multi-vendor support.</li>
                <li>REST API-based integration with JWT authentication.</li>
                <li>Responsive design and i18n support.</li>
                <li>Captcha security for public forms.</li>
              </ul>
            </section>

            {/* Integrations & Ecosystem */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Integrations & Ecosystem</h2>
              <ul className="list-disc list-inside space-y-2 text-lg pl-2">
                <li>KPPP portal integration for tenders.</li>
                <li>JWT-based authentication.</li>
                <li>Secure file storage for procurement documents.</li>
                <li>External government links and resources.</li>
              </ul>
            </section>

            {/* Security & Compliance */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Security & Compliance</h2>
              <ul className="list-disc list-inside space-y-2 text-lg pl-2">
                <li>JWT-based authentication and secure session handling.</li>
                <li>Role-driven authorization and menu visibility.</li>
                <li>Audit logging for procurement lifecycle.</li>
                <li>Secure file uploads with controlled formats.</li>
                <li>Department and vendor-level data isolation.</li>
              </ul>
            </section>

            {/* Business Impact & Outcomes */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Business Impact & Outcomes</h2>
              <ul className="list-disc list-inside space-y-2 text-lg pl-2">
                <li>Unified digital marketplace for G2G services across Karnataka.</li>
                <li>Reduced manual intervention and faster approvals.</li>
                <li>Improved procurement transparency and compliance.</li>
                <li>Centralized onboarding for vendors and departments.</li>
                <li>Digitized training governance with certification tracking.</li>
                <li>Enhanced operational visibility and scalability.</li>
              </ul>
            </section>

            {/* Technology Stack */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Technology Stack</h2>
              <ul className="space-y-2 text-lg pl-2">
                <li><strong className="text-white">Frontend:</strong> React 18, TypeScript, Vite, Ant Design, Styled Components, React Router, Redux Toolkit.</li>
                <li><strong className="text-white">Backend:</strong> REST APIs with JWT authentication.</li>
                <li><strong className="text-white">Database:</strong> Relational database.</li>
                <li><strong className="text-white">Security:</strong> Role-based access control, secure uploads, audit logging, captcha.</li>
                <li><strong className="text-white">Build & Tooling:</strong> Vite, ESLint, Babel, react-intl (i18n support).</li>
              </ul>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Conclusion</h2>
              <p className="text-lg mb-4">
                KEONEXT successfully modernized procurement, resource allocation, infrastructure services, and training governance for KEONICS.
              </p>
              <p className="text-lg">
                By unifying goods, services, HR, facilities, and training management into a scalable digital ecosystem, KEONICS strengthened operational control, improved compliance, accelerated G2G service delivery, and enabled structured skill development initiatives across Karnataka.
              </p>
            </section>
          </div>
        </article>

        <div className="mt-12 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white/5 border border-white/20 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2"
            style={{ borderRadius: 0 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <Link
            to="/portfolio"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-6 py-3 font-semibold transition-all shadow-lg shadow-teal-600/20"
            style={{ borderRadius: 0 }}
          >
            View All Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
