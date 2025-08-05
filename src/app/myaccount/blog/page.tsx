"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, ChevronRight, X, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.avif";
import blog4 from "@/assets/blog-4.jpg";
import { BottomNav } from "@/components/fotter";
import { StaticImageData } from "next/image";
import { NavHeader } from "@/components/topnav";


// Define the blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: StaticImageData;
  content: string;
}

// Sample blog post data with full content
const healthBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Simple Habits for Better Mental Health",
    excerpt:
      "Discover practical ways to improve your mental wellbeing with these easy-to-implement daily habits.",
    category: "Mental Health",
    author: "Dr. Sarah Johnson",
    date: "April 28, 2025",
    readTime: "5 min read",
    image: blog1,
    content: `
      <h2>10 Simple Habits for Better Mental Health</h2>
      
      <p>In today's fast-paced world, maintaining good mental health has become more important than ever. The good news is that small, consistent actions can make a big difference in your overall wellbeing.</p>
      
      <h3>1. Practice Mindful Breathing</h3>
      <p>Taking just 5 minutes each day to focus on your breath can reduce stress levels and increase mindfulness. Try deep breathing exercises where you inhale for 4 counts, hold for 2, and exhale for 6.</p>
      
      <h3>2. Limit Social Media Time</h3>
      <p>Studies show that excessive social media use can contribute to feelings of anxiety and depression. Set specific times for checking platforms and consider a digital detox one day per week.</p>
      
      <h3>3. Prioritize Quality Sleep</h3>
      <p>Your brain needs proper rest to function optimally. Aim for 7-9 hours of quality sleep by establishing a consistent bedtime routine and creating a sleep-friendly environment.</p>
      
      <h3>4. Move Your Body Daily</h3>
      <p>Exercise releases endorphins that naturally boost your mood. Even a 15-minute walk can make a significant difference in how you feel mentally.</p>
      
      <h3>5. Practice Gratitude</h3>
      <p>Taking time to acknowledge what you're thankful for can shift your perspective and improve your outlook. Try writing down three things you're grateful for each day.</p>
      
      <h3>6. Connect With Others</h3>
      <p>Human connection is crucial for mental wellbeing. Make time for meaningful conversations and activities with friends and loved ones.</p>
      
      <h3>7. Learn Something New</h3>
      <p>Challenging your brain with new skills or information creates a sense of accomplishment and builds cognitive resilience.</p>
      
      <h3>8. Spend Time in Nature</h3>
      <p>Research shows that time outdoors can reduce stress hormones and improve mood. Even 20 minutes in a park or garden can help.</p>
      
      <h3>9. Limit Caffeine and Alcohol</h3>
      <p>Both substances can affect your mood and sleep quality. Monitor your intake and notice how they impact your mental state.</p>
      
      <h3>10. Practice Self-Compassion</h3>
      <p>Treat yourself with the same kindness you would offer a good friend. Remember that imperfection is part of being human.</p>
      
      <p>By incorporating these simple habits into your daily routine, you can build resilience and improve your mental wellbeing over time. Remember that consistency matters more than perfection.</p>
    `,
  },
  {
    id: 2,
    title: "Understanding Nutrition: A Beginner's Guide",
    excerpt:
      "Learn the fundamentals of nutrition and how to build a balanced diet that works for your unique needs.",
    category: "Nutrition",
    author: "Mark Peterson, RD",
    date: "April 22, 2025",
    readTime: "7 min read",
    image: blog2,
    content: `
      <h2>Understanding Nutrition: A Beginner's Guide</h2>
      
      <p>Nutrition doesn't have to be complicated. With some basic knowledge, you can make informed choices about the foods that best nourish your body.</p>
      
      <h3>The Core Nutrients Your Body Needs</h3>
      <p>Every healthy diet should include a balance of macronutrients (proteins, carbohydrates, and fats) and micronutrients (vitamins and minerals). Each plays a vital role in your overall health.</p>
      
      <h3>Proteins: The Building Blocks</h3>
      <p>Proteins are essential for building and repairing tissues, making enzymes, and supporting immune function. Good sources include lean meats, fish, eggs, dairy, legumes, and plant-based options like tofu.</p>
      
      <h3>Carbohydrates: Your Energy Source</h3>
      <p>Carbohydrates provide your body with its preferred energy source. Focus on complex carbohydrates from whole grains, fruits, vegetables, and legumes rather than simple carbs from processed foods and added sugars.</p>
      
      <h3>Fats: Essential for Health</h3>
      <p>Not all fats are created equal. Your body needs healthy fats for brain function, hormone production, and nutrient absorption. Sources of healthy fats include avocados, nuts, seeds, olive oil, and fatty fish.</p>
      
      <h3>Micronutrients: Small but Mighty</h3>
      <p>Vitamins and minerals are required in smaller amounts but are crucial for virtually all bodily processes. Eating a varied diet rich in colorful fruits and vegetables helps ensure adequate micronutrient intake.</p>
      
      <h3>Building a Balanced Plate</h3>
      <p>A simple approach to balanced eating is to fill half your plate with vegetables and fruits, one quarter with whole grains or starchy vegetables, and one quarter with protein-rich foods. Add a small amount of healthy fat to complete your meal.</p>
      
      <h3>Personalization Matters</h3>
      <p>There's no one-size-fits-all approach to nutrition. Factors like age, activity level, health conditions, and even genetics can influence your specific nutritional needs. Working with a registered dietitian can help you develop a plan tailored to your unique circumstances.</p>
      
      <p>Remember that sustainable nutrition isn't about perfection or restriction—it's about making consistent choices that nourish your body and mind while still allowing flexibility and enjoyment of food.</p>
    `,
  },
  {
    id: 3,
    title: "The Science Behind Effective Exercise Routines",
    excerpt:
      "Explore the research-backed principles that make certain exercise routines more effective than others.",
    category: "Fitness",
    author: "Emma Rodriguez, PT",
    date: "April 15, 2025",
    readTime: "6 min read",
    image: blog3,
    content: `
      <h2>The Science Behind Effective Exercise Routines</h2>
      
      <p>With countless workout programs promising amazing results, how do you know which approaches are actually backed by science? Let's explore the research-supported principles that make exercise programs truly effective.</p>
      
      <h3>Progressive Overload: The Foundation of Improvement</h3>
      <p>Your body adapts to the demands placed upon it. To continue making progress, you need to gradually increase the challenge over time—whether that's lifting heavier weights, adding more repetitions, or increasing workout duration or intensity.</p>
      
      <h3>Specificity: Training for Your Goals</h3>
      <p>The specific adaptations your body makes depend on how you train. Want to build strength? Focus on resistance training with challenging weights. Looking to improve endurance? Consistent cardiovascular training is key. Your exercise selection should align with your objectives.</p>
      
      <h3>Recovery: When the Magic Happens</h3>
      <p>Contrary to popular belief, your body doesn't get stronger during workouts—it gets stronger during recovery. Adequate rest between training sessions allows for muscle repair and growth. Most muscle groups need at least 48 hours of recovery between intense workouts.</p>
      
      <h3>Variation: Preventing Plateaus</h3>
      <p>While consistency is important, so is variation. Your body efficiently adapts to repeated stimuli, eventually leading to plateaus. Strategic changes in exercises, intensity, volume, or training style can help maintain progress.</p>
      
      <h3>Compound Movements: More Bang for Your Buck</h3>
      <p>Exercises that engage multiple muscle groups simultaneously (like squats, deadlifts, push-ups, and rows) stimulate more muscle fibers, burn more calories, and better mimic real-life movement patterns than isolation exercises.</p>
      
      <h3>Intensity Matters</h3>
      <p>Research consistently shows that the intensity of your workouts often matters more than duration. High-intensity interval training (HIIT) can produce comparable or superior results to moderate steady-state exercise in less time.</p>
      
      <h3>Consistency Trumps Perfection</h3>
      <p>The most effective exercise routine is ultimately the one you'll stick with consistently. Finding activities you enjoy and can maintain long-term is crucial for lasting results.</p>
      
      <p>By incorporating these evidence-based principles into your fitness regimen, you can optimize your results and make the most efficient use of your exercise time.</p>
    `,
  },
  {
    id: 4,
    title: "Sleep Optimization: Improve Your Rest Quality",
    excerpt:
      "Discover evidence-based strategies to enhance your sleep quality and wake up feeling refreshed.",
    category: "Sleep",
    author: "Dr. Michael Chen",
    date: "April 8, 2025",
    readTime: "4 min read",
    image: blog4,
    content: `
      <h2>Sleep Optimization: Improve Your Rest Quality</h2>
      
      <p>Quality sleep is a cornerstone of good health, affecting everything from cognitive function to immune system strength. Yet many people struggle to get the restorative rest they need. Here's what science tells us about optimizing your sleep.</p>
      
      <h3>The Sleep Environment Matters</h3>
      <p>Your bedroom should be cool (around 65-68°F/18-20°C), dark, and quiet. Consider blackout curtains, white noise machines, or earplugs if needed. Your mattress and pillows should provide proper support for your body type and sleep position.</p>
      
      <h3>Respect Your Circadian Rhythm</h3>
      <p>Your body's internal clock thrives on consistency. Try to go to bed and wake up at the same times every day—even on weekends. This helps regulate your sleep-wake cycle and can improve both sleep quality and duration.</p>
      
      <h3>Mind Your Light Exposure</h3>
      <p>Natural daylight exposure, especially in the morning, helps regulate your circadian rhythm. Conversely, blue light from screens in the evening can suppress melatonin production. Consider wearing blue light blocking glasses and implementing a digital sunset 1-2 hours before bed.</p>
      
      <h3>Watch What and When You Consume</h3>
      <p>Caffeine can affect sleep quality even when consumed 6+ hours before bedtime. Similarly, alcohol might help you fall asleep but disrupts your sleep architecture, reducing its restorative value. Large meals close to bedtime can also disturb sleep.</p>
      
      <h3>Create a Wind-Down Routine</h3>
      <p>Signal to your body that it's time to sleep with consistent pre-sleep activities. This might include gentle stretching, reading, taking a warm bath, or practicing relaxation techniques like deep breathing or meditation.</p>
      
      <h3>Move Your Body (But Time It Right)</h3>
      <p>Regular physical activity promotes better sleep, but intense exercise too close to bedtime can be stimulating. Aim to complete vigorous workouts at least 1-2 hours before bed.</p>
      
      <h3>Address Stress and Racing Thoughts</h3>
      <p>If worry keeps you awake, try keeping a "worry journal" to offload thoughts before bed. Relaxation techniques like progressive muscle relaxation or guided imagery can also help quiet an active mind.</p>
      
      <p>Remember that improving sleep is often about making small, consistent changes. If you continue to struggle with sleep despite implementing these strategies, consider consulting with a healthcare provider to rule out sleep disorders or other underlying issues.</p>
    `,
  },
];

// Categories for filtering blog posts
const categories = ["All", "Mental Health", "Nutrition", "Fitness", "Sleep"];

export default function HealthBlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter posts based on active category
  const filteredPosts =
    activeCategory === "All"
      ? healthBlogPosts
      : healthBlogPosts.filter((post) => post.category === activeCategory);

  // Open article modal function
  const openArticle = (post: BlogPost) => {
    setSelectedPost(post);
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  // Close article modal function
  const closeArticle = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  return (
    <>
      <NavHeader />
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header section with improved spacing */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Health & Wellness Blog
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover evidence-based insights, tips, and guidance to help you
              achieve optimal health and wellbeing.
            </p>
          </div>

          {/* Category filter tabs with improved spacing and styling */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 hover:text-blue-600 shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog posts grid with improved spacing, padding and hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openArticle(post)}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-5 py-1.5 rounded-full text-xs font-semibold shadow-md">
                    {post.category}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1.5" /> {post.readTime}
                    </span>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                    <button className="text-blue-600 font-medium text-sm flex items-center hover:text-blue-800 transition-colors">
                      Read more <ChevronRight className="ml-1.5 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter signup with improved design and padding */}
          <div className="mt-8 bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl shadow-xl p-4 text-center">
            <div className="max-w-2xl mx-auto">
              <BookOpen className="h-16 w-16 text-blue-200 mx-auto mb-8" />
              <h3 className="text-3xl font-bold text-white mb-5">
                Subscribe to Our Health Newsletter
              </h3>
              <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                Get the latest health tips, research findings, and expert advice
                delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal Popup with improved UI */}
      {modalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 mb-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={closeArticle}
              className="absolute top-5 right-5 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
            
            {/* Article header image */}
            <div className="relative h-72 w-full">
              <Image
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
                <div className="inline-block bg-blue-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-md">
                  {selectedPost.category}
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight">{selectedPost.title}</h2>
              </div>
            </div>
            
            {/* Article content */}
            <div className="p-10 overflow-y-auto max-h-[calc(90vh-18rem)]">
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedPost.author}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedPost.date} · {selectedPost.readTime}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div 
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
              
              <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="font-medium text-gray-900 mb-4">Share this article:</p>
                <div className="flex space-x-4">
                  <button className="p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}