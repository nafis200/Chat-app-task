import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export function FloatingDockDemo() {

  const handleHomeClick = () => alert("Home clicked!");
  const handleProductsClick = () => alert("Products clicked!");
  const handleComponentsClick = () => alert("Components clicked!");
  const handleUIProjectClick = () => alert("Aceternity UI clicked!");
  const handleChangelogClick = () => alert("Changelog clicked!");
  const handleTwitterClick = () => alert("Twitter clicked!");
  const handleGithubClick = () => alert("GitHub clicked!");


  const links = [
    { title: "Home", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />, onClick: handleHomeClick },
    { title: "Products", icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />, onClick: handleProductsClick },
    { title: "Components", icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />, onClick: handleComponentsClick },
    { title: "Aceternity UI", icon: <img src="https://assets.aceternity.com/logo-dark.png" width={20} height={20} alt="Aceternity Logo" />, onClick: handleUIProjectClick },
    { title: "Changelog", icon: <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />, onClick: handleChangelogClick },
    { title: "Twitter", icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />, onClick: handleTwitterClick },
    { title: "GitHub", icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />, onClick: handleGithubClick },
  ];

  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // demo এর জন্য
        desktopClassName="hidden md:flex"
        items={links.map((item) => ({
          ...item,
          href: "#", // যদি তুমি still href রাখতে চাও
          onClick: item.onClick,
        }))}
      />
    </div>
  );
}
