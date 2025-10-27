"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import Calendar from "./calendar";
import TimeSlotSelector from "./time-slot-selector";
import { ServiceResponse } from "./booking-data-type";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface GeneratedSlot {
  date: string;
  slots: TimeSlot[];
}

interface ServiceData {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  duration: string;
  generatedSlots: GeneratedSlot[];
}

interface CheckoutResponse {
  status: boolean;
  message: string;
  data: {
    sessionUrl: string;
  };
}

export default function BookingPage({ serviceId }: { serviceId?: string }) {
  const router = useRouter();
  console.log(router)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  // ✅ Fetch service data using React Query
  const { data, isLoading, isError } = useQuery<ServiceResponse>({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service/${serviceId}`
      );
      if (!res.ok) throw new Error("Failed to fetch service data");
      return res.json();
    },
    enabled: !!serviceId,
  });

  const serviceData = data?.data as ServiceData | undefined;

  // ✅ Create Checkout Session API
  const { mutate: createCheckoutSession, isPending } = useMutation<
    CheckoutResponse,
    Error
  >({
    mutationFn: async () => {
      if (!serviceData || !selectedDate || !selectedSlot)
        throw new Error("Missing booking information");

      const payload = {
        serviceId: serviceData._id,
        selectedSlots: [
          {
            date: selectedDate.toISOString(),
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
          },
        ],
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,

           },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to create checkout session");
      return res.json();
    },
    onSuccess: (response) => {
      toast.success(response.message || "Redirecting to checkout...");
      if (response.data?.sessionUrl) {
        // Redirect to Stripe Checkout page
        window.location.href = response.data.sessionUrl;
      }
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading booking system...</p>
        </div>
      </div>
    );
  }

  // ✅ Error or no data
  if (isError || !serviceData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">Failed to load service data</p>
      </div>
    );
  }

  // ✅ Prepare available dates and current slots
  const availableDates = serviceData.generatedSlots.map(
    (slot) => new Date(slot.date)
  );

  const currentSlots =
    selectedDate &&
    serviceData.generatedSlots.find(
      (slot) =>
        new Date(slot.date).toDateString() === selectedDate.toDateString()
    )?.slots;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Calendar */}
        <Card className="p-6 border-border/50 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Select Date
          </h2>
          <Calendar
            availableDates={availableDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </Card>

        {/* Time Slots */}
        <div>
          {selectedDate && (
            <Card className="p-6 border-border/50 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Available Time Slots
              </h2>
              {currentSlots && currentSlots.length > 0 ? (
                <TimeSlotSelector
                  slots={currentSlots}
                  selectedSlot={selectedSlot}
                  onSelectSlot={setSelectedSlot}
                />
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    No available slots for this date
                  </p>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* Continue Button */}
      {selectedDate && selectedSlot && (
        <div className="mt-3 w-full flex items-center justify-end">
          <button
            disabled={isPending}
            onClick={() => createCheckoutSession()}
            className="bg-[#4D0EB9] text-base font-medium leading-[120%] text-white py-4 px-10 rounded-[10px] hover:bg-[#3e0a94] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Processing..." : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
}























// "use client";

// import { useState } from "react";
// import { Clock } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import Calendar from "./calendar";
// import TimeSlotSelector from "./time-slot-selector";
// import { ServiceResponse } from "./booking-data-type";
// import { useQuery } from "@tanstack/react-query";

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
// }

// interface GeneratedSlot {
//   date: string;
//   slots: TimeSlot[];
// }

// interface ServiceData {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
//   duration: string;
//   generatedSlots: GeneratedSlot[];
// }

// export default function BookingPage({ serviceId }: { serviceId?: string }) {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

//   // ✅ Fetch service data using React Query
//   const { data, isLoading, isError } = useQuery<ServiceResponse>({
//     queryKey: ["service", serviceId],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/service/${serviceId}`
//       );
//       if (!res.ok) throw new Error("Failed to fetch service data");
//       return res.json();
//     },
//     enabled: !!serviceId, // only run query if serviceId is available
//   });

//   const serviceData = data?.data as ServiceData | undefined;

//   // ✅ Loading state
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading booking system...</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Error or no data
//   if (isError || !serviceData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-destructive">Failed to load service data</p>
//       </div>
//     );
//   }

//   // ✅ Prepare available dates and current slots
//   const availableDates = serviceData.generatedSlots.map(
//     (slot) => new Date(slot.date)
//   );

//   const currentSlots =
//     selectedDate &&
//     serviceData.generatedSlots.find(
//       (slot) =>
//         new Date(slot.date).toDateString() === selectedDate.toDateString()
//     )?.slots;

//   return (
//     <div className=" ">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Calendar */}
//         <Card className="p-6 border-border/50 shadow-sm">
//           <h2 className="text-lg font-semibold text-foreground mb-4">
//             Select Date
//           </h2>
//           <Calendar
//             availableDates={availableDates}
//             selectedDate={selectedDate}
//             onSelectDate={setSelectedDate}
//           />
//         </Card>

//         {/* Time Slots */}
//         <div>
//           {selectedDate && (
//             <Card className="p-6 border-border/50 shadow-sm">
//               <h2 className="text-lg font-semibold text-foreground mb-4">
//                 Available Time Slots
//               </h2>
//               {currentSlots && currentSlots.length > 0 ? (
//                 <TimeSlotSelector
//                   slots={currentSlots}
//                   selectedSlot={selectedSlot}
//                   onSelectSlot={setSelectedSlot}
//                 />
//               ) : (
//                 <div className="text-center py-8">
//                   <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
//                   <p className="text-muted-foreground">
//                     No available slots for this date
//                   </p>
//                 </div>
//               )}
//             </Card>
//           )}
//         </div>
//       </div>

//       {/* Book Now Button */}
//       {selectedDate && selectedSlot && (
//         <div className="mt-3 w-full flex items-center justify-end">
//           <button className="bg-[#4D0EB9] text-base font-medium leading-[120%] text-white py-4 px-10 rounded-[10px]">Continue</button>
//         </div>
//       )}
//     </div>
//   );
// }







