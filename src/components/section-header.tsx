import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeader({ title, subtitle, className, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-12", align === "center" && "text-center", className)}>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground md:text-base max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className={cn("mt-3 h-1 w-12 rounded-full bg-primary", align === "center" && "mx-auto")} />
    </div>
  )
}
