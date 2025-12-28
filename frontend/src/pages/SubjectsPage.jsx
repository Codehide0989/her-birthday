import { useEffect, useState } from 'react';
import { BookOpen, Lock } from 'lucide-react';
import { contentAPI } from '../services/api';
import useAuthStore from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await contentAPI.getSubjects();
      setSubjects(response.data.data.subjects);
    } catch (error) {
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const canAccess = (accessLevel) => {
    if (accessLevel === 'free') return true;
    return user?.subscriptionStatus === 'trial' || user?.subscriptionStatus === 'active';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Explore Subjects</h1>
        <p className="text-gray-600">
          Choose a subject to start learning. {subjects.length} subjects available.
        </p>
      </div>

      {subjects.length === 0 ? (
        <div className="card-sketch text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No subjects available yet</h3>
          <p className="text-gray-600">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card-sketch cursor-pointer group ${
                !canAccess(subject.accessLevel) ? 'opacity-75' : ''
              }`}
            >
              <div
                className="w-full h-32 rounded-lg mb-4 flex items-center justify-center text-white text-4xl font-bold"
                style={{ backgroundColor: subject.color || '#3B82F6' }}
              >
                {subject.icon || '📚'}
              </div>

              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors flex-1">
                  {subject.title}
                </h3>
                {subject.accessLevel === 'premium' && !canAccess(subject.accessLevel) && (
                  <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                )}
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{subject.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{subject.totalChapters || 0} Chapters</span>
                <span>{subject.totalModules || 0} Modules</span>
              </div>

              {subject.accessLevel === 'premium' && (
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 text-xs font-semibold rounded-full">
                    Premium
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;
