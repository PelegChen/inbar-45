import React, { useState } from 'react';
import { GreetingContext } from './GreetingContext';

/**
 * @typedef {Object} Greeting
 * @property {string} recipientName - Name of the birthday person
 * @property {string} senderName - Name of the sender (optional)
 * @property {string} message - Custom birthday message (optional)
 * @property {string} date - Birthday date
 */

/** @type {Greeting} */
const defaultGreeting = {
  recipientName: "John Doe",
  senderName: "",
  message: "Wishing you an amazing birthday!",
  date: new Date().toLocaleDateString()
};

export const GreetingProvider = ({ children }) => {
  const [greetingData] = useState(defaultGreeting);

  return (
    <GreetingContext.Provider value={greetingData}>
      {children}
    </GreetingContext.Provider>
  );
};
