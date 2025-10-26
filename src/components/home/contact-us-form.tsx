"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Lock, Loader2 } from "lucide-react"
import { contactUsSchema } from "@/schema/contactUsSchema"
import { useCreateContact } from "@/hooks/APiCalling"


type FormValues = z.infer<typeof contactUsSchema>

export function ContactUsForm() {
  const contactMutation = useCreateContact()
  const form = useForm<FormValues>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: FormValues) {
    const payload = {
      name: values.name,
      email: values.email,
      address: values.address,
      phoneNumber: values.phone,
      subject: values.subject,
      message: values.message
    }
    contactMutation.mutate(payload)
    // Handle form submission here
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-foreground">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your First Name"
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Email"
                      type="email"
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-foreground">Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-[45%] text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Enter your address"
                      {...field}
                      className="pl-9"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-foreground">Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="00000000"
                      {...field}
                     
                    />
                    <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-foreground">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is this regarding?"
                    {...field}
                    
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-foreground">You Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us how we can help you"
                    {...field}
                    className="min-h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-white font-semibold text-lg rounded-lg"
          >
            Send  {contactMutation.isPending && <Loader2 className="animate-spin ml-2" />}
          </Button>
        </form>
      </Form>
    </div>
  )
}
