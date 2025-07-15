import { motion } from "framer-motion";

const features = [
  {
    icon: "🚀",
    title: "Blazing Fast",
    description: "Create presentations in minutes with our intuitive editor."
  },
  {
    icon: "👥",
    title: "Real-time Collaboration",
    description: "Work with your team simultaneously on the same presentation."
  },
  {
    icon: "🎨",
    title: "Beautiful Templates",
    description: "Professionally designed templates for every use case."
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    description: "Track how your audience engages with your presentations."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to <span className="text-primary">wow</span> your codemate
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools to create, share, and track stunning presentations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;