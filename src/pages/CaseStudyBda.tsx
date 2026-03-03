import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

export default function CaseStudyBda() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative z-10">
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
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <article className="bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl" style={{ borderRadius: 0 }}>
          {/* Hero image first – blog structure */}
          <div className="w-full overflow-hidden">
            <img
              src="/bda-grievance-portal.png"
              alt="BDA Grievance Management Portal – digital grievance handling and approved sites"
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
              BDA - Grievance Management Portal
            </h1>
            <p className="text-cyan-400 font-semibold mb-4">Category: Digital Government & Citizen Services</p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Estimated reading time: 10 minutes</span>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-10 text-gray-300 leading-relaxed">
            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Fragmented and Non-Transparent Grievance Handling</h2>
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Overview</h3>
              <p className="text-lg mb-4">
                Before the implementation of the digital grievance management system, the grievance handling process relied heavily on manual workflows and decentralized coordination between departments. This resulted in operational inefficiencies, communication gaps, and limited transparency for citizens.
              </p>
            </section>

            {/* Challenges */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Challenges</h2>
              <ul className="space-y-4 text-lg pl-2">
                <li>
                  <strong className="text-white">Lack of Real-Time Citizen Updates:</strong> Citizens couldn&apos;t track their grievances and had to visit offices or call repeatedly, leading to confusion, frustration, and lack of trust due to no automated updates.
                </li>
                <li>
                  <strong className="text-white">No Unique Reference or Tracking Mechanism:</strong> Grievances were managed manually without standardized reference numbers, leading to misplaced or delayed complaints, difficult follow-ups, and no structured tracking history.
                </li>
                <li>
                  <strong className="text-white">Unclear Zone Ownership and Responsibility:</strong> There was no structured system to assign grievances by zone, record ownership, or track responsible officers, resulting in delays, duplication, and accountability gaps.
                </li>
                <li>
                  <strong className="text-white">Inefficient Hearing Scheduling Process:</strong> Hearing schedules were managed manually without a centralized calendar, leading to conflicts, informal rescheduling during holidays or strikes, poor communication, and overall confusion and inefficiency.
                </li>
                <li>
                  <strong className="text-white">Weak Audit Trail and Accountability:</strong> There was limited visibility on who handled each stage of a grievance, and without a digital audit trail, accountability and compliance were difficult to ensure.
                </li>
                <li>
                  <strong className="text-white">Reopen and Escalation Ambiguity:</strong> If a citizen was dissatisfied, the reopening process lacked clarity and structure, leading to inconsistent handling and unclear final authority.
                </li>
              </ul>
            </section>

            {/* Objectives */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Objectives</h2>
              <p className="text-lg mb-6">
                To address these systemic challenges, the BDA Grievance Management System introduced a fully digital, role-based, and auditable workflow.
              </p>
              <ul className="space-y-4 text-lg pl-2">
                <li>
                  <strong className="text-cyan-300">Automated Status Communication via SMS:</strong> Automated SMS notifications at every major stage of the grievance lifecycle. Citizens now receive real-time updates, reducing follow-up calls and improving transparency and confidence in the system.
                </li>
                <li>
                  <strong className="text-cyan-300">Unique BDA Reference Code for Every Grievance:</strong> Each grievance now receives a unique BDA code that serves as a lifetime reference, enables easy portal tracking, and ensures full lifecycle traceability, eliminating ambiguity and improving accuracy.
                </li>
                <li>
                  <strong className="text-cyan-300">Structured Zone-Based Ownership:</strong> The system formalized zone assignment by automatically allocating verified grievances, recording ownership, and updating zonal dashboards—ensuring clear accountability and visibility.
                </li>
                <li>
                  <strong className="text-cyan-300">Intelligent Hearing Scheduling and Rescheduling:</strong> The digital calendar enables structured hearing scheduling, avoids holiday conflicts, supports quick rescheduling, and automatically updates and notifies citizens—ensuring transparency and efficiency.
                </li>
                <li>
                  <strong className="text-cyan-300">Strong Audit Trail and Compliance:</strong> All actions—verification, assignment, hearing decisions, and commissioner approval—are digitally recorded, creating a complete audit-ready lifecycle that strengthens governance and accountability.
                </li>
                <li>
                  <strong className="text-cyan-300">Controlled Reopen Mechanism:</strong> If a citizen is dissatisfied, the helpdesk can formally reopen the grievance through a structured workflow, with the zonal commissioner as the final authority—ensuring fairness and procedural control.
                </li>
              </ul>
              <p className="text-lg mt-6">
                The transformation replaced a fragmented and opaque process with a transparent, trackable, and accountable digital ecosystem.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/5 border border-white/10 p-6">
                  <h4 className="font-bold text-white mb-3">Citizens now have:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Clear visibility</li>
                    <li>Timely updates</li>
                    <li>Defined escalation paths</li>
                    <li>Structured hearing management</li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-6">
                  <h4 className="font-bold text-white mb-3">Internally, the authority benefits from:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Zone-wise workload management</li>
                    <li>Improved accountability</li>
                    <li>Reduced manual coordination</li>
                    <li>Better governance oversight</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Capabilities */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Key Capabilities</h2>
              <p className="text-lg mb-6">
                The BDA Grievance Management System was designed as a comprehensive, governance-ready digital platform with structured workflow control, accountability mechanisms, and citizen-centric features.
              </p>
              <ul className="space-y-4 text-lg pl-2">
                <li>
                  <strong className="text-white">End-to-End Digital Grievance Lifecycle Management:</strong> The system manages the complete grievance lifecycle — from submission to final closure — within a single unified platform. Every stage, including verification, zone assignment, hearing scheduling, decision recording, verification, closure, and reopening, is digitally tracked.
                </li>
                <li>
                  <strong className="text-white">Unique Grievance ID for Transparent Tracking:</strong> Upon submission, each grievance is assigned a unique BDA reference code. This identifier serves as a permanent tracking reference for both internal teams and citizens.
                </li>
                <li>
                  <strong className="text-white">Role-Based Access Control Across Departments:</strong> Different user groups — including Helpdesk, Zonal Officers, Zonal Commissioners, Central Teams, CAC, and Management — have clearly defined permissions.
                </li>
                <li>
                  <strong className="text-white">Zone-Wise Dashboards and Workload Visibility:</strong> Dedicated dashboards provide zone-level visibility into active, pending, and completed grievances across North, South, East, and West zones.
                </li>
                <li>
                  <strong className="text-white">Hearing Calendar with Rescheduling Capability:</strong> A centralized calendar module supports structured hearing scheduling, conflict management, and rescheduling with real-time updates and citizen notification.
                </li>
                <li>
                  <strong className="text-white">Audit Logs for Compliance and Accountability:</strong> Every action is recorded with timestamps and user details, creating a comprehensive audit trail.
                </li>
                <li>
                  <strong className="text-white">MIS Reporting and Management Dashboards:</strong> Authorities can generate reports, analyze grievance trends, monitor zone performance, and gain insights into operational efficiency.
                </li>
                <li>
                  <strong className="text-white">Multilingual Support for Wider Accessibility:</strong> The platform supports multiple languages, enabling citizens to interact in their preferred language.
                </li>
              </ul>
            </section>

            {/* The Impact */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">The Impact</h2>
              <p className="text-lg mb-6">
                The implementation of the BDA Grievance Management System resulted in significant operational and citizen-experience improvements.
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg pl-2">
                <li><strong className="text-white">Enhanced Transparency:</strong> Structured tracking, unique grievance IDs, and real-time status updates brought clarity to the grievance process.</li>
                <li><strong className="text-white">Reduced Manual Intervention and Paperwork:</strong> Digitizing submission, verification, assignment, and hearing management significantly reduced reliance on physical documentation and manual coordination.</li>
                <li><strong className="text-white">Faster Grievance Routing and Decision-Making:</strong> Automated workflows and structured zone assignments enabled quicker routing to responsible officers.</li>
                <li><strong className="text-white">Improved Accountability:</strong> Built-in audit logs and role-based permissions ensure every action is traceable.</li>
                <li><strong className="text-white">Better Zone-Level Workload Management:</strong> Dashboards and reporting tools provide real-time visibility into grievance volumes across zones.</li>
                <li><strong className="text-white">Increased Citizen Awareness and Engagement:</strong> Automated SMS notifications at each major stage keep citizens informed and improve trust.</li>
              </ul>
              <p className="text-lg mt-6">
                Overall, the platform strengthened citizen confidence in governance by providing clarity, responsiveness, and structured oversight.
              </p>
            </section>

            {/* Technology Landscape */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Technology Landscape</h2>
              <p className="text-lg mb-6">
                The solution was built using a modern, scalable, and maintainable technology stack aligned with contemporary web development standards.
              </p>
              <ul className="space-y-4 text-lg pl-2">
                <li><strong className="text-white">Frontend Architecture:</strong> React and TypeScript for modularity, scalability, and type safety.</li>
                <li><strong className="text-white">State and Data Management:</strong> Redux Toolkit for global state; React Query and Axios for server-state management and API communication with caching.</li>
                <li><strong className="text-white">UI and Styling:</strong> Tailwind CSS for responsive, utility-first styling.</li>
                <li><strong className="text-white">Form Handling and Validation:</strong> React Hook Form with Zod schema validation.</li>
                <li><strong className="text-white">Reporting and Documents:</strong> Chart.js for dashboards; ExcelJS and xlsx for bulk import/export; PDF generation for reports.</li>
                <li><strong className="text-white">Security and Access Control:</strong> Role-Based Access Control (RBAC), input validation, script injection prevention, and controlled API access via authenticated endpoints.</li>
              </ul>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-cyan-500 pl-4">Conclusion</h2>
              <p className="text-lg mb-4">
                By transforming a traditionally manual and fragmented grievance handling process into a structured digital ecosystem, BDA established a transparent, accountable, and citizen-centric grievance redressal framework.
              </p>
              <p className="text-lg">
                The platform streamlined zonal coordination, formalized hearing management, and empowered citizens with real-time visibility into their complaints. Through automation, structured workflows, and data-driven oversight, the solution laid a strong foundation for scalable and sustainable digital governance.
              </p>
            </section>
          </div>
        </article>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/#projects"
            className="bg-white/5 border border-white/20 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2"
            style={{ borderRadius: 0 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
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
