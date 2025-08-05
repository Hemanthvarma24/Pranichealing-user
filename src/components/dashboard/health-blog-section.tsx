"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ChevronRight, Clock, User } from "lucide-react";
import Image from "next/image";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.avif";

const healthBlogPosts = [
  {
    id: 1,
    title: "10 Science-Backed Habits for Better Mental Health",
    excerpt:
      "Discover research-based practices to improve your mental wellbeing, from mindfulness meditation to social connection strategies.",
    category: "Mental Health",
    author: "Dr. Sarah Johnson",
    date: "April 28, 2025",
    readTime: "5 min read",
    image: blog1,
  },
  {
    id: 2,
    title: "The Complete Guide to Nutrition: Beyond the Basics",
    excerpt:
      "Learn how to create a personalized nutrition plan that optimizes your energy levels, supports immunity, and promotes long-term health.",
    category: "Nutrition",
    author: "Mark Peterson, RD",
    date: "April 22, 2025",
    readTime: "7 min read",
    image: blog2,
  },
  {
    id: 3,
    title: "Exercise Science: Maximizing Results with Minimal Time",
    excerpt:
      "Explore evidence-based training methods that deliver optimal health benefits in less time, based on the latest exercise physiology research.",
    category: "Fitness",
    author: "Emma Rodriguez, PT",
    date: "April 15, 2025",
    readTime: "6 min read",
    image: blog3,
  },
];

export default function HealthBlogSection() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/myaccount/blog/`);
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Health & Wellness Insights
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover evidence-based insights, practical tips, and expert guidance to help you achieve optimal health and well-being in everyday life.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthBlogPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => handleNavigate()}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-full flex flex-col"
            >
              <div className="relative h-52 sm:h-60 md:h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center">
                      <User className="mr-1 h-4 w-4 text-gray-400" />
                      {post.author}
                    </span>
                    <span className="text-blue-600 font-medium text-sm flex items-center group-hover:text-blue-800">
                      Read article
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/myaccount/blog")}
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-[#4ead91] hover:bg-blue-400 transition-colors shadow-md hover:shadow-lg"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}