import defaultSettings from './defaultSettings.json';

const currentSettings = { ...defaultSettings, port: process.env.PORT || defaultSettings.PORT };

currentSettings.setSettings = (newSettings) => {
  Object.keys(newSettings).forEach((setting) => {
    currentSettings[setting] = newSettings[setting];
  });
};

export default currentSettings;
