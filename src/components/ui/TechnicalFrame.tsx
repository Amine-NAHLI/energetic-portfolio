import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TechnicalFrameProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div" | "aside";
  children: ReactNode;
  index?: string;
  label?: string;
  tone?: "default" | "quiet" | "raised";
};

export default function TechnicalFrame({
  as: Component = "article",
  children,
  className,
  index,
  label,
  tone = "default",
  ...props
}: TechnicalFrameProps) {
  return (
    <Component 
      className={cn(
        "technical-frame relative overflow-hidden",
        `technical-frame--${tone}`, 
        className
      )}
      {...props}
    >
      {(index || label) ? <div className="technical-frame__meta relative z-10" aria-hidden="true"><span>{index ?? "//"}</span><span>{label}</span></div> : null}
      <div className="relative z-10">{children}</div>
      <span className="technical-frame__node technical-frame__node--start" aria-hidden="true" />
      <span className="technical-frame__node technical-frame__node--end" aria-hidden="true" />
    </Component>
  );
}
