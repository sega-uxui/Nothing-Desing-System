import * as React from "react";
import { MediaImage } from "iconoir-react";

import { cn } from "./utils";
import { Card } from "./card";
import { Badge } from "./badge";

function NewsCard({
  image,
  title,
  source,
  time,
  tag,
  onClick,
  className,
}: {
  image?: string;
  title: string;
  source: string;
  time: string;
  tag?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "gap-0 py-0 overflow-hidden",
        onClick && "cursor-pointer transition-colors hover:bg-accent/50",
        className,
      )}
    >
      <div className="aspect-video w-full bg-muted flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <MediaImage width={28} height={28} className="text-muted-foreground/50" />
        )}
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex items-center gap-2">
          {tag && <Badge variant="secondary" className="text-xs">{tag}</Badge>}
          <span className="text-xs text-muted-foreground ml-auto">{time}</span>
        </div>
        <div className="text-sm leading-snug">{title}</div>
        <div className="text-xs text-muted-foreground">{source}</div>
      </div>
    </Card>
  );
}

export { NewsCard };
