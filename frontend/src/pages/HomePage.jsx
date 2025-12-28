import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, Rocket } from 'lucide-react';
import Scene3D from '../components/Scene3D';
import { motion } from 'framer-motion';

const HomePage = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: '3D Interactive Learning',
      description: 'Experience learning in a whole new dimension with our immersive 3D interface.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast & Efficient',
      description: 'Optimized content delivery ensures smooth learning without interruptions.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and encryption.',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Career Ready',
      description: 'Get job-ready with industry-relevant courses and certifications.',
    },
  ];

  return (
    <div className="space-y-20">
      <section className="grid lg:grid-cols-2 gap-12 items-center py-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Learn Smarter with{' '}
            <span className="gradient-text">3D Interactive</span> Experience
          </h1>
          <p className="text-xl text-gray-600">
            Transform your learning journey with StudySphere's immersive 3D platform.
            Access premium courses, interactive content, and personalized learning paths.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="btn-sketch text-lg px-8 py-4">
              Start Free Trial
            </Link>
            <Link
              to="/subjects"
              className="px-8 py-4 text-lg font-medium text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">14</span>
              <span>Days Free Trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">100+</span>
              <span>Courses</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Scene3D />
        </motion.div>
      </section>

      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose StudySphere?</h2>
          <p className="text-xl text-gray-600">
            Everything you need for an exceptional learning experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-sketch text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl text-white text-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of students already learning smarter with StudySphere.
            Start your free trial today!
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg text-lg hover:scale-105 transform transition-all"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
