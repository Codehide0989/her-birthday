import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Home, BookMarked, CreditCard } from 'lucide-react';
import useAuthStore from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sketch-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold gradient-text">StudySphere</span>
          </Link>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/subjects"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <BookMarked className="w-5 h-5" />
                  <span>Subjects</span>
                </Link>

                <Link
                  to="/subscription"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Subscription</span>
                </Link>

                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden md:block">{user?.name}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden md:block">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-sketch"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
