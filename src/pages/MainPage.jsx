import React from 'react';
import GreetingPageLayout from '../components/GreetingPageLayout';
import GreetingCard from '../components/GreetingCard';
import { greetingsConfig } from '../config/greetings';

const MainPage = () => {
  const config = greetingsConfig[0];

  return (
    <GreetingPageLayout
      BackgroundComponent={config.BackgroundComponent}
      backgroundGradient={config.backgroundGradient}
      pageSpeed={config.pageSpeed}
    >
      <GreetingCard
        icon={config.icon}
        heading={config.heading}
        message={config.message}
        cardStyle={config.cardStyle}
        containerClassName={config.containerClassName}
      />
    </GreetingPageLayout>
  );
};

export default MainPage;
