import * as React from "react";

import { cn } from "./utils";

function PhoneFrame({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="phone-frame"
      className={cn("flex flex-col overflow-hidden bg-background", className)}
      style={{
        width: 360,
        height: 690,
        borderRadius: 44,
        border: "8px solid #1C1C1E",
        boxShadow: "0 40px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.12)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export { PhoneFrame };
