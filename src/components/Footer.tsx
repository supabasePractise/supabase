import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="px-4 text-gray-600 bg-gray-200">
      <Link href="/" passHref>
        <a>
          <small>&copy; 2022 nixiee.plus</small>
        </a>
      </Link>
    </footer>
  )
};
