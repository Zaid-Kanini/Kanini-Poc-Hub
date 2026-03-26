const KANINI_LOGO = 'https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 pt-20 pb-10 px-6 lg:px-20 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        {/* Brand col */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src={KANINI_LOGO} alt="Kanini" className="h-9" />
            <span className="text-gray-300 font-light">|</span>
            <h2 className="text-lg font-bold text-black">POC Hub</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Automation, Cloud, AI-driven Insights – more than “Dreams of the Future” these have become the “Demands of the Present”, to set the stage for a business to be truly digital.
          </p>
          <div className="flex gap-4">
            {['public', 'alternate_email', 'group'].map((icon) => (
              <span
                key={icon}
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">{icon}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold mb-6 text-black">Navigation</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            {['Dashboard', 'Active POCs', 'Archived Pilots', 'Knowledge Base'].map((l) => (
              <li key={l}>
                <a className="hover:text-secondary transition-colors" href="#">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold mb-6 text-black">Resources</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            {['Submission Guidelines', 'Funding Request', 'Tech Stack Matrix', 'Legal & IP'].map(
              (l) => (
                <li key={l}>
                  <a className="hover:text-secondary transition-colors" href="#">
                    {l}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-bold mb-6 text-black">Legal</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            {['Privacy Policy', 'Terms of Use', 'Compliance'].map((l) => (
              <li key={l}>
                <a className="hover:text-secondary transition-colors" href="#">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-400">&copy; © 2026 KANINI Software Solutions | All Rights Reserved | <a href="https://kanini.com/privacy-policy/" className="text-black">
  Privacy Policy
</a></p>
        {/* <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          System Status: All Systems Operational
        </div> */}
      </div>
    </footer>
  );
}
