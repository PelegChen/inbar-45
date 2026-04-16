import React from 'react';

const GreetingCard = ({
  icon,
  heading,
  message,
  cardStyle = {},
  containerClassName = ''
}) => {
  const {
    headingColor,
    messageColor,
    textShadow,
    headingFontSize,
    messageFontSize,
    ...restCardStyle
  } = cardStyle;

  const defaultCardStyle = {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '40px 48px',
    borderRadius: '24px',
    backdropFilter: 'blur(10px)',
    maxWidth: '580px',
    margin: '20px',
  };

  const headingStyle = {
    fontSize: 'clamp(1.5rem, 6vw, 3.5rem)', 
    margin: '0 0 16px',
    lineHeight: 1.2,
    color:  'yellow',
  };

  const messageStyle = {
    fontSize: messageFontSize || 'clamp(1rem, 2.5vw, 1.3rem)',
    margin: 0,
    lineHeight: 1.7,
    color: messageColor || '#444',
  };

  if (textShadow) {
    headingStyle.textShadow = '2px 2px 12px rgba(0,0,0,0.5)';
    messageStyle.textShadow = '1px 1px 6px rgba(0,0,0,0.5)';
  }

  return (
    <div
      dir='rtl'
      className={containerClassName}
      style={{
        ...defaultCardStyle,
        ...restCardStyle,
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{icon}</div>
      <h1 className={containerClassName ? `${containerClassName.split(' ')[0]}-title` : ''} style={headingStyle}>
        {heading}
      </h1>
      <p style={messageStyle}>
        {message}
      </p>
    </div>
  );
};

export default GreetingCard;
