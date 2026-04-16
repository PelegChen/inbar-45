import FireworksCanvas from "../components/FireworksCanvas";

export const greetingsConfig = [
  {
    pageSpeed: 0.2,
    icon: "❤️",
    heading: "ענבר, מזל טוב ויום הולדת שמח!",
    message: "לעוד שנים ארוכות של חברות!",
    backgroundGradient: "#05050f",
    cardStyle: {
      padding: "28px 36px",
      maxWidth: "420px",
      background: "rgba(255,255,255,0.01)",
      borderRadius: "24px",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(1px)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      headingColor: "transparent",
      messageColor: "#ddeeff",
      headingFontSize: "clamp(2.3rem, 7vw, 4rem)",
      messageFontSize: "clamp(1.1rem, 3vw, 1.5rem)",
    },
    BackgroundComponent: FireworksCanvas,
    containerClassName: "fireworks-card",
  },
];
