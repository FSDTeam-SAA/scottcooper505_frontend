import React from "react";
import { ContactUsForm } from "./contact-us-form";

const Contact = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/contact-us-section.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
      className="py-20 bg-[#00000069] flex flex-col items-center justify-center"
    >
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="text-white text-3xl font-bold lg:max-w-3xl">Connect With the Experts in Construction Excellence</h1>
          <p className="text-sm text-white/85 mt-2 lg:max-w-lg">
            From concept to completion, we make your vision a reality. Reach out
            today and start building with the experts.
          </p>
        </div>

        <div>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
