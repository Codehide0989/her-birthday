import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import useAuthStore from '../hooks/useAuth';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [trialDaysLeft, setTrialDaysLeft] = useState(null);

  useEffect(() => {
    if (user?.subscriptionStatus === 'trial' && user?.trialEndDate) {
      const endDate = new Date(user.trialEndDate);
      const today = new Date();
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      setTrialDaysLeft(daysLeft > 0 ? daysLeft : 0);
    }
  }, [user]);

  const stats = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      label: 'Courses Enrolled',
      value: '5',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      label: 'Hours Learned',
      value: '24',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <Award className="w-8 h-8" />,
      label: 'Certificates',
      value: '2',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      label: 'Streak Days',
      value: '7',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>
      </div>

      {user?.subscriptionStatus === 'trial' && trialDaysLeft !== null && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-sketch bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-200"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {trialDaysLeft} Days Left in Your Free Trial
              </h3>
              <p className="text-gray-600 mb-4">
                Upgrade to premium to continue accessing all features after your trial ends.
              </p>
              <Link to="/subscription" className="btn-sketch">
                View Plans
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-sketch"
          >
            <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card-sketch"
        >
          <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Course Title {index + 1}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(index + 1) * 30}%` }}
                      ></div>
                    </div>
                    <span>{(index + 1) * 30}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/subjects"
            className="block text-center mt-6 text-primary-600 font-medium hover:underline"
          >
            View All Courses →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card-sketch"
        >
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Completed', item: 'Chapter 3: Advanced Topics', time: '2 hours ago' },
              { action: 'Started', item: 'New Course: Web Development', time: 'Yesterday' },
              { action: 'Earned', item: 'Certificate: React Basics', time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium">
                    {activity.action}{' '}
                    <span className="text-primary-600">{activity.item}</span>
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
