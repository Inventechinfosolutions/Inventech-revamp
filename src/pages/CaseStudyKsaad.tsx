import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

export default function CaseStudyKsaad() {
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
          {/* Hero image */}
          <div className="w-full overflow-hidden">
            <img
              src="/ksaad-audit-dashboard.png"
              alt="KSAAD Audit & Accounts Dashboard – secure, AI-enabled audit system with data management and reporting"
              className="w-full h-auto object-cover object-top"
            />
          </div>

          <div className="px-8 pt-8 pb-6 md:px-12 md:pt-10 md:pb-8 border-b border-white/10">
            <div className="mb-4">
              <span className="inline-block bg-navy-900/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-widest border border-cyan-400/30" style={{ borderRadius: 0 }}>
                Case Study
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Karnataka State Audit and Accounts Department (KSAAD) Web Application
            </h1>
            <p className="text-cyan-400 font-semibold mb-4">Organization: Karnataka State Audit and Accounts Department (KSAAD)</p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Estimated reading time: 12 minutes</span>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-10 text-gray-300 leading-relaxed">
            {/* Background */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Background</h2>
              <p className="text-lg mb-4">
                The Karnataka State Audit and Accounts Department (KSAAD) is responsible for auditing financial operations across municipalities, panchayats, universities, and other government institutions in Karnataka.
              </p>
              <p className="text-lg mb-2 font-semibold text-white">Before digitization:</p>
              <ul className="list-disc list-inside space-y-2 text-lg pl-2 mb-4">
                <li>Audit processes were manual and paper-based</li>
                <li>Data consolidation was slow and error-prone</li>
                <li>Report generation required significant manual effort</li>
                <li>Monitoring across LACs, Regional Offices, and Head Office was difficult</li>
                <li>Limited transparency and delayed compliance tracking</li>
              </ul>
              <p className="text-lg">
                To address these challenges, KSAAD initiated the development of a centralized web-based audit management system (AIM&apos;s).
              </p>
            </section>

            {/* Problem Statement */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Problem Statement</h2>
              <p className="text-lg mb-4">KSAAD faced multiple operational challenges:</p>
              <ul className="space-y-3 text-lg pl-2 mb-4">
                <li className="flex gap-2"><span className="text-white-400">.</span> Decentralized audit data collection</li>
                <li className="flex gap-2"><span className="text-white-400">.</span> Lack of real-time monitoring</li>
                <li className="flex gap-2"><span className="text-white-400">.</span> Manual report compilation</li>
                <li className="flex gap-2"><span className="text-white-400">.</span> No structured audit trail tracking</li>
                <li className="flex gap-2"><span className="text-white-400">.</span> Limited analytics for decision-making</li>
                <li className="flex gap-2"><span className="text-white-400">.</span> Delays in compliance review</li>
              </ul>
              <p className="text-lg font-semibold text-cyan-300">
                There was a critical need to modernize audit workflows and enable real-time data visibility across all levels.
              </p>
            </section>

            {/* Solution Implemented */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Solution Implemented</h2>
              <p className="text-lg mb-6">
                A Web-Based Audit Management Application was developed with the following capabilities:
              </p>

              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 p-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">Role-Based Access Control</h3>
                  <p className="text-gray-300 mb-2">Roles: Admin, LAC Auditor, Regional Officer, Head Office Officials, Principal Director</p>
                  <p className="text-gray-300">Secure login with multi-factor authentication and activity audit logs.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">Dynamic Data Collection</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>60+ institution-specific audit forms</li>
                    <li>Multi-language support (English &amp; Kannada)</li>
                    <li>Real-time validation</li>
                    <li>Categorization by Region, District, and Institution Type</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">Reporting &amp; Analytics</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Interactive dashboards</li>
                    <li>Graphical reports</li>
                    <li>Export to PDF, Excel, CSV</li>
                    <li>Compliance tracking reports</li>
                    <li>Financial performance analysis</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">Automation &amp; Integration</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Scheduled reminders</li>
                    <li>API integration with legacy systems</li>
                    <li>Automated notifications</li>
                    <li>Data import/export</li>
                    <li>Annexure download system</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">Security &amp; Compliance</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>End-to-end encryption</li>
                    <li>Role-based permissions</li>
                    <li>Full audit trails</li>
                    <li>Automated backups</li>
                    <li>Compliance with digital security standards</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-400/30">
                <h4 className="font-bold text-white mb-2">Implementation Architecture (High-Level)</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Centralized Cloud/Web Infrastructure</li>
                  <li>Multi-tier user authentication</li>
                  <li>Database-driven dynamic forms</li>
                  <li>Reporting engine with export capabilities</li>
                  <li>Dashboard visualization system</li>
                </ul>
              </div>
            </section>

            {/* Key Modules */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Key Modules</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-lg">
                <li className="flex items-center gap-2 text-gray-300">• Landing Page</li>
                <li className="flex items-center gap-2 text-gray-300">• Dashboard</li>
                <li className="flex items-center gap-2 text-gray-300">• Downloading Annexure</li>
                <li className="flex items-center gap-2 text-gray-300">• Master Tools</li>
                <li className="flex items-center gap-2 text-gray-300">• Profile Management</li>
                <li className="flex items-center gap-2 text-gray-300">• JD Login</li>
                <li className="flex items-center gap-2 text-gray-300">• Principal Director Login</li>
              </ul>
            </section>

            {/* Impact & Results */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Impact &amp; Results</h2>
              <p className="text-lg mb-4">After implementation:</p>
              <div className="overflow-x-auto">
                <table className="w-full border border-white/20 text-left">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-3 border-b border-white/20 text-cyan-300 font-semibold">Area</th>
                      <th className="p-3 border-b border-white/20 text-cyan-300 font-semibold">Before</th>
                      <th className="p-3 border-b border-white/20 text-cyan-300 font-semibold">After</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr><td className="p-3 border-b border-white/10">Data Collection</td><td className="p-3 border-b border-white/10">Manual</td><td className="p-3 border-b border-white/10">Fully Digital</td></tr>
                    <tr><td className="p-3 border-b border-white/10">Report Generation</td><td className="p-3 border-b border-white/10">Days/Weeks</td><td className="p-3 border-b border-white/10">Minutes</td></tr>
                    <tr><td className="p-3 border-b border-white/10">Monitoring</td><td className="p-3 border-b border-white/10">Periodic</td><td className="p-3 border-b border-white/10">Real-Time</td></tr>
                    <tr><td className="p-3 border-b border-white/10">Transparency</td><td className="p-3 border-b border-white/10">Limited</td><td className="p-3 border-b border-white/10">High</td></tr>
                    <tr><td className="p-3 border-b border-white/10">Compliance Tracking</td><td className="p-3 border-b border-white/10">Manual Follow-ups</td><td className="p-3 border-b border-white/10">Automated Alerts</td></tr>
                    <tr><td className="p-3 border-b border-white/10">Data Accuracy</td><td className="p-3 border-b border-white/10">Error-Prone</td><td className="p-3 border-b border-white/10">Validated &amp; Structured</td></tr>
                  </tbody>
                </table>
              </div>
              <h4 className="font-bold text-white mt-6 mb-3">Measurable Improvements</h4>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>60–70% reduction in processing time</li>
                <li>Significant increase in compliance monitoring accuracy</li>
                <li>Real-time dashboard visibility for leadership</li>
                <li>Improved decision-making with analytics</li>
              </ul>
            </section>

            {/* Business Value */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Business Value</h2>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Increased operational efficiency</li>
                <li>Improved accountability</li>
                <li>Reduced paperwork</li>
                <li>Faster audit lifecycle completion</li>
                <li>Centralized data governance</li>
              </ul>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Conclusion</h2>
              <p className="text-lg mb-4">
                The KSAAD Web Application successfully transformed the traditional audit ecosystem into a modern, digital, transparent, and scalable system.
              </p>
              <p className="text-lg">
                It demonstrates how government departments can leverage technology to improve governance, compliance, and operational efficiency.
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
