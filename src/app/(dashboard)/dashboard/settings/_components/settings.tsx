import React from "react";
import { SettingsHeader } from "./settings-header";
import { SettingsForm } from "./settings-form";

const Settings = () => {
  return (
    <div className="space-y-8">
      <SettingsHeader />
      <SettingsForm />
    </div>
  );
};

export default Settings;
