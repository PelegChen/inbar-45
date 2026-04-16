import React from 'react';
import GreetingPageLayout from '../components/GreetingPageLayout';
import GreetingCard from '../components/GreetingCard';
import { greetingsConfig } from '../config/greetings';

const Greeting2 = () => {
  const config = greetingsConfig[1];

  return (
    <GreetingPageLayout
      BackgroundComponent={config.BackgroundComponent}
      backgroundGradient={config.backgroundGradient}
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

export default Greeting2;
