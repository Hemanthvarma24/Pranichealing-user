"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const [month, setMonth] = React.useState(new Date().getMonth())
  const [year, setYear] = React.useState(new Date().getFullYear())

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth)
    const newDate = new Date(year, newMonth)
    if (props.onMonthChange) {
      props.onMonthChange(newDate)
    }
  }

  const handleYearChange = (newYear: number) => {
    setYear(newYear)
    const newDate = new Date(newYear, month)
    if (props.onMonthChange) {
      props.onMonthChange(newDate)
    }
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(buttonVariants({ variant: "ghost" }), "h-8 w-8 p-0 font-normal aria-selected:opacity-100"),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
        Caption: () => (
          <div className="flex items-center justify-center gap-2">
            <Select value={month.toString()} onValueChange={(value) => handleMonthChange(Number(value))}>
              <SelectTrigger className="w-[130px]">
                <SelectValue>{new Date(year, month).toLocaleString("default", { month: "long" })}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {new Date(year, i).toLocaleString("default", { month: "long" })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year.toString()} onValueChange={(value) => handleYearChange(Number(value))}>
              <SelectTrigger className="w-[100px]">
                <SelectValue>{year}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 20 }, (_, i) => (
                  <SelectItem key={i} value={(year - 10 + i).toString()}>
                    {year - 10 + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ),
      }}
      month={new Date(year, month)}
      onMonthChange={(newMonth) => {
        setMonth(newMonth.getMonth())
        setYear(newMonth.getFullYear())
        if (props.onMonthChange) {
          props.onMonthChange(newMonth)
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

