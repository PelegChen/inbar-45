import React from 'react';

/**
 * @param {{
 *   BackgroundComponent?: React.ComponentType<{ pageSpeed?: number }> | null,
 *   backgroundGradient?: string | null,
 *   pageSpeed?: number,
 *   containerStyle?: React.CSSProperties,
 *   children: React.ReactNode
 * }} props
 */
const GreetingPageLayout = ({
  BackgroundComponent,
  backgroundGradient = null,
  pageSpeed = 0.5,
  containerStyle = {},
  children
}) => {
  /** @type {React.CSSProperties} */
  const defaultContainerStyle = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  /** @type {React.CSSProperties} */
  const finalContainerStyle = {
    ...defaultContainerStyle,
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
