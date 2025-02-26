import React from "react";
import Link from "next/link";
import logo from "@/app/assets/logo/png/logo-color.png";
import { Button } from "../ui/button";
import Image from "next/image";

function Logo() {
  return (
    <Button size="sm" asChild className=" p-0">
      <Link href="/">
        {/* Set explicit width and height */}
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={0}
          className="object-cover bg-primary"
        />
      </Link>
    </Button>
  );
}

export default Logo;
