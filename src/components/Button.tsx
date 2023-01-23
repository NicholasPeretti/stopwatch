import React from "react";

export default function Button({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={`bg-black text-white w-full p-4 border border-white uppercase tracking-widest ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
