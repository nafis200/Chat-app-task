"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, TrendingUp, Briefcase } from "lucide-react";

export default function AIMLCard() {
  return (
    <Card className="w-80 overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Image Section (reduced height) */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src="https://i.postimg.cc/zGKYjxPf/1645599766887.png"
          alt="AI/ML Interview"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow px-2 py-0.5 text-[10px] font-semibold">
          POPULAR
        </Badge>
      </div>

      {/* Content Section (tight spacing) */}
      <CardContent className="">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md">
              <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            AI/ML Interview
          </CardTitle>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug mb-3">
          Practice AI/ML interview questions and improve your technical skills for top tech companies.
        </p>

        <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            <span>500+ Qs</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>30–45 min</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span>95%</span>
          </div>
        </div>
      </CardContent>

      {/* Footer Section (more compact) */}
      <CardFooter className="flex justify-between items-center px-4 pb-4 pt-0">
        <div className="flex gap-1.5">
          <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300 text-[10px]">
            AI/ML
          </Badge>
          <Badge variant="outline" className="border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300 text-[10px]">
            Interview
          </Badge>
        </div>
        <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-md hover:shadow-md hover:scale-105 transition-all duration-200">
          Start
        </button>
      </CardFooter>
    </Card>
  );
}
