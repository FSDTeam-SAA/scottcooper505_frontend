"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Users } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AboutPage() {
  const session = useSession();

  console.log(session);
  return (
    <main className="min-h-screen container">
      {/* Our Story Section */}
      <section className="py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/about1.jpg"
              alt="Business handshake"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-3 text-sm leading-relaxed text-gray-600">
              <p>
                Rage Away, LLC is a duel company in Real Estate, Fix and Flips,
                and Rental Properties. Now we want to bring our experience to
                your home. We are insured and can perform any type of
                construction work. We have a wonderful crew that is passionate
                about bringing customers ideas alive. We offer prices that will
                fit any budget. We stay by our work if we make a mistake, it
                will not come out of your budget. Please book now for a quote or
                a consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              Our Values
            </h2>
            <p className="text-sm text-gray-600">
              To become an intelligent and modern, integral to culture, and
              ethical who can drive change
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Integrity
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  We are committed to the highest standards of integrity and
                  ethical conduct in everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Excellence
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  We strive for excellence in every project we undertake and
                  continuously improve our processes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Safety
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Safety is our top priority. We maintain the highest safety
                  standards on all our projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Teamwork
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  We believe in the power of collaboration and working together
                  to achieve our goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16">
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              Our Team
            </h2>
            <p className="text-sm text-gray-600">
              Meet the talented individuals who drive our vision forward and
              make our success possible.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gray-200 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src={`/team1.png`}
                  alt={`team.png`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Scott Cooper
                </h3>
                <p className="text-sm font-medium text-purple-600 mb-2">
                  Owner
                </p>
                <p className="text-xs leading-relaxed text-gray-600">
                  Scott Cooper is the owner of Rage Away, LLC. He has 15 years’
                  construction experience. He is passionate about saving people
                  money. He wants his customers to be happy with their home
                  remodeling or repairs. Scott has experience in Fix and Flips,
                  and he wants to bring that to your home project.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src={`/team2.png`}
                  alt={`team.png`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Richie Higgins
                </h3>
                <p className="text-sm font-medium text-purple-600 mb-2">
                  crew manager
                </p>
                <p className="text-xs leading-relaxed text-gray-600">
                  Richie Higgins is our crew manager. He has 15 years’
                  construction experience. He is passionate about what he does
                  to make sure people have a nice place to live. He has 15 plus
                  years in roofing, install siding, general repairs, installing
                  windows and garage doors. He is very professional about his
                  work.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src={`/team3.png`}
                  alt={`team.png`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Pacey Gammons
                </h3>
                <p className="text-sm font-medium text-purple-600 mb-2">
                  construction crew
                </p>
                <p className="text-xs leading-relaxed text-gray-600">
                  Pacey Gammons is one of the wonderful construction crew. He
                  has 2 years’ construction experience. He got into this kind of
                  work from always working with his dad or anyone doing their
                  own home repairs. He enjoys working for Rage Away, LLC and all
                  the crew. He plans on continuing to work for Rage Away, LLC
                  for all future projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src={`/team4.png`}
                  alt={`team.png`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Stanley Molands
                </h3>
                <p className="text-sm font-medium text-purple-600 mb-2">
                  construction crew
                </p>
                <p className="text-xs leading-relaxed text-gray-600">
                  Stanley Molands is one of the wonderful construction crew. He
                  has 4 years’ construction experience. He loves this kind of
                  work because he learns more on the job than when he went to
                  school for it. He enjoys taking ideas and bringing them to
                  life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications & Achievements Section */}
      {/* <section className="pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              Certifications & Achievements
            </h2>
            <p className="text-sm text-gray-600">
              Our commitment to excellence has been recognized through our
              industry certifications and awards
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  ISO 9001 Certified
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Recognized and certified for quality management systems
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Industry Leadership Award
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Recognized for our outstanding excellence in the industry
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Safety First Certification
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Commitment to environmental responsibility and sustainable
                  practices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}
    </main>
  );
}
