import React from 'react';

const GreetingPageLayout = ({
  BackgroundComponent,
  backgroundGradient = null,
  containerStyle = {},
  children
}) => {
  const defaultContainerStyle = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const finalContainerStyle = {
    ...defaultContainerStyle,
    ...containerStyle,
  };

  if (backgroundGradient) {
    finalContainerStyle.background = backgroundGradient;
  }

  return (
    <div style={finalContainerStyle}>
      {BackgroundComponent && <BackgroundComponent />}
      {children}
    </div>
  );
};

export default GreetingPageLayout;
