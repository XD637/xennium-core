import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Access the username from the session data
  const username = session?.user?.username;

  return (
    <>
      <nav className="bg-zinc-950 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl flex items-center">
            {/* Sidebar toggle button with animation */}
            <button
              onClick={toggleSidebar}
              className={`relative z-50 focus:outline-none transition-transform duration-300 ${
                sidebarOpen ? 'transform rotate-90' : ''
              }`}
            >
              <div className={`hamburger ${sidebarOpen ? 'open' : ''}`}>
                <span className="block bg-white w-6 h-0.5 mb-1"></span>
                <span className="block bg-white w-6 h-0.5 mb-1"></span>
                <span className="block bg-white w-6 h-0.5"></span>
              </div>
            </button>
            <Link href="/" className="ml-4">Xennium</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-white hover:translate-y-0.5 transition-transform">Home</Link>
            <Link href="/about" className="text-white hover:translate-y-0.5 transition-transform">About</Link>
            <Link href="/contact" className="text-white hover:translate-y-0.5 transition-transform">Contact</Link>
            {session ? (
              <button 
                onClick={() => signOut()} 
                className="text-white hover:translate-y-0.25 transition-transform"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="text-white hover:translate-y-0.5 transition-transform">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={handleSidebarClose}
          ></div>
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 bg-zinc-950 shadow-lg z-40 transition-transform transform">
            <div className="p-4 flex justify-center items-center border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Menu</h2>
            </div>
            <div className="p-4">
              <ul>
                <li className="mb-3 border-b border-gray-700">
                  <Link href={`/profile/${username}`} className="text-lg text-white" onClick={handleSidebarClose}>Profile</Link>
                </li>
                <li className="mb-3 border-b border-gray-700">
                  <Link href="/dashboard" className="text-lg text-white" onClick={handleSidebarClose}>Dashboard</Link>
                </li>
                <li className="mb-3 border-b border-gray-700">
                  <Link href="/privacy-policy" className="text-lg text-white" onClick={handleSidebarClose}>Privacy Policy</Link>
                </li>
                <li className="border-b border-gray-700">
                  <Link href="/terms-and-conditions" className="text-lg text-white" onClick={handleSidebarClose}>Terms and Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .hamburger span {
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      `}</style>
    </>
  );
};

export default Navbar;
