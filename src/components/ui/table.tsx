// "use client"

// import * as React from "react"
// import { cn } from "@/lib/utils"

// function Table({ className, ...props }: React.ComponentProps<"table">) {
//   return (
//     <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800 shadow-xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-md">
//       <div className="overflow-x-auto">
//         <table
//           className={cn(
//             "w-full text-sm text-left text-gray-700 dark:text-gray-300",
//             className
//           )}
//           {...props}
//         />
//       </div>
//     </div>
//   )
// }

// function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
//   return (
//     <thead
//       className={cn(
//         "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white",
//         "text-xs uppercase tracking-wider",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
//   return (
//     <tbody
//       className={cn(
//         "divide-y divide-gray-100 dark:divide-gray-800/40",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
//   return (
//     <tfoot
//       className={cn(
//         "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-200",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
//   return (
//     <tr
//       className={cn(
//         "transition-all duration-300 ease-in-out",
//         "hover:bg-gradient-to-r hover:from-indigo-50 hover:via-purple-50 hover:to-pink-50",
//         "dark:hover:from-indigo-950/40 dark:hover:via-purple-950/40 dark:hover:to-pink-950/40",
//         "hover:shadow-md hover:scale-[1.01] cursor-pointer",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableHead({ className, ...props }: React.ComponentProps<"th">) {
//   return (
//     <th
//       className={cn(
//         "px-6 py-4 font-semibold text-white tracking-wide text-sm whitespace-nowrap",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableCell({ className, ...props }: React.ComponentProps<"td">) {
//   return (
//     <td
//       className={cn(
//         "px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap",
//         "group-hover:text-gray-900 dark:group-hover:text-white transition-colors",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
//   return (
//     <caption
//       className={cn(
//         "mt-4 text-sm text-gray-500 dark:text-gray-400 italic font-medium text-center",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export {
//   Table,
//   TableHeader,
//   TableBody,
//   TableFooter,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableCaption,
// }





"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-hidden  dark:border-gray-700/50 bg-white dark:bg-gray-900 backdrop-blur-xl"
    >
      <div className="overflow-x-auto">
        <table
          data-slot="table"
          className={cn("w-full text-sm text-left text-gray-700 dark:text-gray-200", className)}
          {...props}
        />
      </div>
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-gray-100 dark:bg-gray-800  dark:border-gray-700",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "divide-y divide-gray-200 dark:divide-gray-700",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 font-medium text-gray-800 dark:text-gray-100",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-gray-500 dark:text-gray-400 mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}


