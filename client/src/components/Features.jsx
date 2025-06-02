import React from 'react';

const features = [
  { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Learn from IITians and doctors with 10+ years experience.' },
  { icon: '📚', title: 'Complete Study Material', desc: 'NCERT-based content with PYQs and assignments.' },
  { icon: '📊', title: 'Weekly and Daily Test Series', desc: 'Mock exams with analytics to track progress.' },
  { icon: '🎯', title: 'Personal Mentoring', desc: 'Small batches, doubt sessions and motivation.' },
  { icon: '💻', title: 'Online & Offline Classes', desc: 'Attend from anywhere with recorded sessions.' },
  { icon: '🏆', title: 'Top Results', desc: 'AIR under 1000 every year for 3+ years.' },
];

const Features = () => (
  <section id="features" className="py-20 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-lg">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
