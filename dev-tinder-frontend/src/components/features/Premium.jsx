import { useState } from 'react';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Premium = ({ onPlanSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('annual');
  const [isHovered, setIsHovered] = useState(null);

  const plans = {
    basic: {
      name: 'Starter',
      price: {
        monthly: '$19',
        annual: '$15',
      },
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 5 projects',
        'Basic analytics',
        'Email support',
        '1 team member',
      ],
      cta: 'Get Started',
      featured: false,
      color: 'bg-blue-500',
      icon: <SparklesIcon className="h-6 w-6 text-blue-500" />,
    },
    pro: {
      name: 'Professional',
      price: {
        monthly: '$49',
        annual: '$39',
      },
      description: 'For teams and growing businesses',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        'Up to 10 team members',
        'Custom branding',
      ],
      cta: 'Go Professional',
      featured: true,
      color: 'bg-purple-600',
      icon: <BoltIcon className="h-6 w-6 text-purple-600" />,
    },
    enterprise: {
      name: 'Enterprise',
      price: {
        monthly: '$99',
        annual: '$79',
      },
      description: 'For organizations with advanced needs',
      features: [
        'Unlimited everything',
        'Dedicated account manager',
        '24/7 support',
        'Unlimited team members',
        'API access',
        'Single sign-on',
      ],
      cta: 'Contact Sales',
      featured: false,
      color: 'bg-amber-500',
      icon: <ShieldCheckIcon className="h-6 w-6 text-amber-500" />,
    },
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = async () => {
    const planData = {
      plan: selectedPlan,
      billing: billingCycle,
      price: plans[selectedPlan].price[billingCycle === 'annual' ? 'annual' : 'monthly'],
    };

    try {
      onPlanSelect(planData);
    } catch (error) {
      console.error('Error selecting plan:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Choose Your Plan
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Select the perfect plan for your needs. Start small and upgrade anytime.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-white shadow-md text-gray-900'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === 'annual'
                  ? 'bg-white shadow-md text-gray-900'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center">
                Annual <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">20% off</span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8 lg:grid-cols-3 lg:gap-12 max-w-6xl mx-auto"
        >
          {Object.entries(plans).map(([key, plan]) => (
            <motion.div
              key={key}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setIsHovered(key)}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => handlePlanSelect(key)}
              className={`relative p-8 border rounded-3xl shadow-sm transition-all duration-300 cursor-pointer overflow-hidden ${
                selectedPlan === key
                  ? 'ring-2 ring-offset-4 ring-purple-500'
                  : 'border-gray-200 hover:shadow-lg'
              } ${plan.featured ? 'border-t-8 border-t-purple-600' : ''}`}
            >
              {/* Floating background shape */}
              <AnimatePresence>
                {isHovered === key && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 ${plan.color} rounded-2xl`}
                  />
                )}
              </AnimatePresence>

              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                    Most popular
                  </span>
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-white shadow-sm mr-4">
                    {plan.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{plan.name}</h2>
                </div>
                
                <p className="text-gray-600 mb-8">{plan.description}</p>
                
                <div className="mb-10">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {plan.price[billingCycle === 'annual' ? 'annual' : 'monthly']}
                  </span>
                  <span className="text-lg font-medium text-gray-500">
                    {billingCycle === 'annual' ? '/year' : '/month'}
                  </span>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 ${
                    selectedPlan === key
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-gray-50 to-white rounded-3xl p-10 sm:p-14 shadow-inner border border-gray-100"
        >
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Features Included in All Plans
            </h2>
            <p className="text-xl text-gray-600">
              Every plan comes with our core set of powerful features to help you succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <ShieldCheckIcon className="h-8 w-8 text-purple-600" />,
                title: 'Enterprise-grade security',
                description: 'Your data is protected with industry-leading security measures and encryption protocols.',
              },
              {
                icon: <ChartBarIcon className="h-8 w-8 text-blue-500" />,
                title: 'Advanced analytics',
                description: 'Get real-time insights and custom reports on how your projects are performing.',
              },
              {
                icon: <UsersIcon className="h-8 w-8 text-amber-500" />,
                title: 'Team collaboration',
                description: 'Work seamlessly with your team with real-time updates and shared workspaces.',
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <button
            onClick={handleSubmit}
            className="relative inline-flex items-center px-12 py-5 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-xl transition-all transform hover:scale-105 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center">
              Continue with {plans[selectedPlan].name} Plan
              <ArrowRightIcon className="ml-3 h-5 w-5 text-white animate-pulse" />
            </span>
          </button>
          <p className="mt-6 text-gray-500">
            No credit card required for trial. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Premium;