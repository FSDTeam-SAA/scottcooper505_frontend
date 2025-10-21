import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const items = [
    {
      img: "/testimonials.png",
      rating: 5,
      review:
        "After Hurricane Harvey damaged our roof, Borrelli Roofing was incredible. They handled our insurance claim seamlessly and installed our new roof in just two days. The quality of work was outstanding Their repair work was just as impressive.",
      name: "Sarah M.",
      title: "Customer",
    },
    {
      img: "/testimonials.png",
      rating: 5,
      review:
        "After Hurricane Harvey damaged our roof, Borrelli Roofing was incredible. They handled our insurance claim seamlessly and installed our new roof in just two days. The quality of work was outstanding Their repair work was just as impressive.",
      name: "Sarah M.",
      title: "Customer",
    },
    {
      img: "/testimonials.png",
      rating: 5,
      review:
        "After Hurricane Harvey damaged our roof, Borrelli Roofing was incredible. They handled our insurance claim seamlessly and installed our new roof in just two days. The quality of work was outstanding Their repair work was just as impressive.",
      name: "Sarah M.",
      title: "Customer",
    },
    {
      img: "/testimonials.png",
      rating: 5,
      review:
        "After Hurricane Harvey damaged our roof, Borrelli Roofing was incredible. They handled our insurance claim seamlessly and installed our new roof in just two days. The quality of work was outstanding Their repair work was just as impressive.",
      name: "Sarah M.",
      title: "Customer",
    },
  ];

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <p className="text-sm text-black/85 mt-2 lg:max-w-xs mx-auto mb-8">
          What our clients say about us their success stories inspire everything
          we do
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="shadow-[0px_2px_15px_0px_#00000026] p-5 rounded-lg flex flex-col lg:flex-row gap-5 cursor-pointer hover:scale-105 transition-all duration-500"
          >
            <div className="w-[90%]">
              <Image
                src={item.img}
                alt="img.png"
                width={1000}
                height={1000}
                className="h-[205px] w-[150px] rounded-md"
              />
            </div>

            <div>
              <Rating style={{ maxWidth: 100 }} value={item.rating} readOnly />
              <p className="text-black/75 mt-2">&quot;{item.review}&quot;</p>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h1 className="font-medium text-lg">{item.name}</h1>
                  <p className="text-sm text-black/70">{item.title}</p>
                </div>

                <div>
                  <Image
                    src={"/qoute.png"}
                    alt="img.png"
                    width={1000}
                    height={1000}
                    className="h-8 w-8"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
