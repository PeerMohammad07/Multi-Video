import ReactGA from "react-ga4";

export const initGA = () => {
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
  if (trackingId) {
    ReactGA.initialize(trackingId);
    console.log("GA initialized");
  } else {
    console.warn("GA tracking ID not found. Analytics will not be sent.");
  }
};

export const logPageView = () => {
  if (import.meta.env.VITE_GA_TRACKING_ID) {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }
};

export const logEvent = (category, action, label = "") => {
  if (import.meta.env.VITE_GA_TRACKING_ID) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }
};
