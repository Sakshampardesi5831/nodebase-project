"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import {
  CreditCardIcon,
  FolderOpen,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
export const AppSideBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const menuItems = [
    {
      title: "Main",
      items: [
        {
          title: "WorkFlows",
          icon: FolderOpen,
          url: "/workflows",
        },
      ],
    },
    {
      title: "Credentials",
      items: [
        {
          title: "Credentials",
          icon: KeyIcon,
          url: "/credentials",
        },
      ],
    },
    {
      title: "Execution",
      items: [
        {
          title: "Execution",
          icon: HistoryIcon,
          url: "/execution",
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
          <Link href={"/workflows"} prefetch>
            <Image src={"/images/logo.svg"} alt="logo" width={30} height={30} />
            <span className="font-semibold text-sm">NodeBase</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title} title={group.title} className="-mb-2">
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((items) => (
                  <SidebarMenuItem key={items.title}>
                    <SidebarMenuButton
                      tooltip={items.title}
                      isActive={
                        items.url === "/"
                          ? pathName === "/"
                          : pathName.startsWith(items.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={items.url} prefetch>
                        <items.icon className="size-4" />
                        <span>{items.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={"Upgrade to Pro"}
            onClick={() => {}}
            className="gap-x-4 h-10 px-4"
          >
            <StarIcon />
            <span>Upgrade to Pro</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={"Billing Portal"}
          onClick={() => {}}
          className="gap-x-4 h-10 px-4"
        >
          <CreditCardIcon />
          <span>Billing Portal</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={"Sign out"}
          onClick={() => {
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/login");
                },
              },
            });
          }}
          className="gap-x-4 h-10 px-4"
        >
          <LogOutIcon />
          <span>Sign out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Sidebar>
  );
};
