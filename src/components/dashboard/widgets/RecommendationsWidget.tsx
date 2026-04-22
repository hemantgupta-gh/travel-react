import React from 'react';

const RecommendationsWidget: React.FC = () => {
  const recommendations = [
    {
      id: 1,
      name: 'Eiffel Tower',
      description: 'Visit the iconic Eiffel Tower in Paris.',
    },
    {
      id: 2,
      name: 'Great Wall of China',
      description: 'Explore the ancient Great Wall of China.',
    },
    {
      id: 3,
      name: 'Machu Picchu',
      description: 'Discover the ruins of Machu Picchu in Peru.',
    },
  ];

  return (
    <div className="recommendations-widget">
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsWidget;
