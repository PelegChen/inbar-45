import React from 'react';

const GreetingPageLayout = ({
  BackgroundComponent,
  backgroundGradient = null,
  pageSpeed = 1,
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
    '--page-speed': pageSpeed,
    ...containerStyle,
  };

  if (backgroundGradient) {
    finalContainerStyle.background = backgroundGradient;
  }

  return (
    <div style={finalContainerStyle}>
      {BackgroundComponent && <BackgroundComponent pageSpeed={pageSpeed} />}
      {children}
    </div>
  );
};

export default GreetingPageLayout;
