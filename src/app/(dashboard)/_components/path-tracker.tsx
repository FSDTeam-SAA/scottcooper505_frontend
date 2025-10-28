"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

const PathTracker = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isEditProjectPage = pathname.startsWith("/dashboard/projects/edit-project/");
  const isEditServicePage = pathname.startsWith("/dashboard/services/edit-service/");

  return (
    <div className="text-xl">
      <div>
        <h1 className="font-semibold">
          {isEditProjectPage
            ? "Edit Project"
            : isEditServicePage
            ? "Edit Service"
            : segments.length
            ? capitalize(segments[segments.length - 1])
            : "Home"}
        </h1>
      </div>

      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");
              const isLast = index === segments.length - 1;

              // hide the last segment if it’s the dynamic ID part of edit page
              const shouldHide =
                (isEditProjectPage && index === segments.length - 1) ||
                (isEditServicePage && index === segments.length - 1);

              if (shouldHide) return null;

              return (
                <Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={href}>{capitalize(segment)}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PathTracker;
