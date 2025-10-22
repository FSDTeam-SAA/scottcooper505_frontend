import { ContactUsForm } from "@/components/home/contact-us-form";
import {
  Clock4,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

const ServiceArea = dynamic(
  () => import("./_components/service-area"),
  { ssr: false }
);

const Page = () => {
  return (
    <div className="mt-32 min-h-[calc(100vh-500px)]">
      <div>
        <div className="container flex flex-col lg:flex-row gap-20">
          <div className="lg:w-[60%]">
            <h1 className="text-2xl font-bold">Get In Touch With Us</h1>
            <p className="text-md opacity-75 mt-2">
              Have questions, feedback, or ideas to share? Our team is ready to
              assist you. Whether you need support, want to collaborate, or
              simply wish to say hello, we’d love to hear from you. Reach out
              today and let’s start the conversation.{" "}
            </p>

            <div className="mt-8 w-full">
              <h1 className="flex items-center gap-2 hover:underline hover:text-primary transition-all cursor-pointer">
                <Phone className="text-primary h-5 w-5" /> 731-592-1892
              </h1>
              <h1 className="flex items-center gap-2 my-2 hover:underline hover:text-primary transition-all cursor-pointer">
                <Mail className="text-primary h-5 w-5" />{" "}
                rageawaysession@yahoo.com
              </h1>

              <div className="flex gap-2 mt-5">
                <div>
                  <h1>
                    <MapPin className="text-primary h-5 w-5" />
                  </h1>
                </div>

                <div className="-mt-1">
                  <h1 className="font-medium mb-2 text-xl">Address</h1>
                  <h1>123 Business Street</h1>
                  <h1>Suite 100</h1>
                  <h1>New York, NY 10001</h1>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <div>
                  <h1>
                    <Clock4 className="text-primary h-5 w-5" />
                  </h1>
                </div>

                <div className="-mt-1 w-full">
                  <h1 className="font-medium mb-2 text-xl">Office Hours</h1>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between w-full">
                      <h1>Monday </h1>
                      <h1>8:00 AM – 6:00 PM</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1>Monday </h1>
                      <h1>8:00 AM – 6:00 PM</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1>Monday </h1>
                      <h1>8:00 AM – 6:00 PM</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1>Monday </h1>
                      <h1>8:00 AM – 6:00 PM</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1>Monday </h1>
                      <h1>8:00 AM – 6:00 PM</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1>Monday </h1>
                      <h1>8:00 AM – 6:00 PM</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1>Monday </h1>
                      <h1>8:00 AM – 6:00 PM</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h1 className="font-medium mb-2 text-xl">Connect With Us</h1>

                <div className="flex items-center gap-5 mt-2">
                  <div className="bg-[#9a9a9c34] h-12 w-12 rounded-full flex flex-col items-center justify-center">
                    <Facebook className="text-blue-500" />
                  </div>

                  <div className="bg-[#9a9a9c34] h-12 w-12 rounded-full flex flex-col items-center justify-center">
                    <Twitter className="text-blue-500" />
                  </div>

                  <div className="bg-[#9a9a9c34] h-12 w-12 rounded-full flex flex-col items-center justify-center">
                    <Instagram className="text-blue-500" />
                  </div>

                  <div className="bg-[#9a9a9c34] h-12 w-12 rounded-full flex flex-col items-center justify-center">
                    <Linkedin className="text-blue-500" />
                  </div>

                  <div className="bg-[#9a9a9c34] h-12 w-12 rounded-full flex flex-col items-center justify-center">
                    <Youtube className="text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[#f9fafb] mt-8">
                <h1 className="text-blue-500 text-lg mb-2">
                  Why Choose Rage Away, LLC?
                </h1>
                <p>
                  When you work with us, you&apos;re working directly with the
                  owner. Constantino personally oversees every project to ensure
                  the highest quality standards are met. We&apos;re committed to
                  providing exceptional service, transparent communication, and
                  lasting results for every client.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-[40%] sticky top-32 self-start">
            <ContactUsForm />
          </div>
        </div>

        <div className="mt-20">
          <ServiceArea />
        </div>
      </div>
    </div>
  );
};

export default Page;
