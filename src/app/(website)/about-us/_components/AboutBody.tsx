"use client";
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle, Shield, Users } from "lucide-react"
import { useSession } from "next-auth/react";

export default function AboutPage() {
  const session = useSession();
  
  console.log(session)
  return (
    <main className="min-h-screen bg-white">
      {/* Our Story Section */}
      <section className="mx-auto container px-4 py-16 sm:px-6 lg:px-8">
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
                We are a family-owned and operated engineering company that has been serving the community for over 30
                years. From our humble beginnings as a small local contractor, we have grown into a full-service
                engineering firm with a reputation for quality work and exceptional customer service.
              </p>
              <p>
                It was a modest start in the mid-nineties, but from the very outset we were committed to providing the
                highest quality engineering services to our clients. We started with just a handful of employees and a
                few pieces of equipment, but our dedication to excellence and our commitment to our clients quickly set
                us apart from the competition.
              </p>
              <p>
                It was a modest start in the mid-nineties, but from the very outset we were committed to providing the
                highest quality engineering services to our clients. We started with just a handful of employees and a
                few pieces of equipment, but our dedication to excellence and our commitment to our clients quickly set
                us apart from the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">Our Values</h2>
            <p className="text-sm text-gray-600">
              To become an intelligent and modern, integral to culture, and ethical who can drive change
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">Integrity</h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  We are committed to the highest standards of integrity and ethical conduct in everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">Excellence</h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  We strive for excellence in every project we undertake and continuously improve our processes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">Safety</h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Safety is our top priority. We maintain the highest safety standards on all our projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">Teamwork</h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  We believe in the power of collaboration and working together to achieve our goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">Our Team</h2>
            <p className="text-sm text-gray-600">
              Meet the talented and experienced team of professionals who make it all happen
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((member) => (
              <Card key={member} className="border-gray-200 overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={`/service.jpg`}
                    alt={`Sarah Johnson ${member}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Sarah Johnson</h3>
                  <p className="text-sm font-medium text-purple-600 mb-2">Civil Engineering</p>
                  <p className="text-xs leading-relaxed text-gray-600">
                    Sarah has over 15 years of experience in civil engineering and has led numerous successful
                    infrastructure projects across the region.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Achievements Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">Certifications & Achievements</h2>
            <p className="text-sm text-gray-600">
              Our commitment to excellence has been recognized through our industry certifications and awards
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">ISO 9001 Certified</h3>
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
                <h3 className="mb-2 text-base font-semibold text-gray-900">Industry Leadership Award</h3>
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
                <h3 className="mb-2 text-base font-semibold text-gray-900">Safety First Certification</h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  Commitment to environmental responsibility and sustainable practices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
