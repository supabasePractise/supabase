import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header>
      <Link href="/" passHref>
        <a className="flex justify-item-center">
          <Image
            alt={"logo"}
            height={50}
            src={"/logo.png"}
            width={50}
          />
        </a>
      </Link>
      <Link href="/" passHref>
        <a className="text-4xl text-center flex justify-items-center">
          <h1 className="pt-4">Manga List</h1>
        </a>
      </Link>
    </header>
  )
};
