"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { Search, Clock, Users, ChevronRight, Calendar, X, MapPin, MessageSquare, Loader2 } from "lucide-react"
import { NavHeader } from "@/components/topnav"
import { BottomNav } from "@/components/fotter"
import courses1 from "@/assets/course1.jpeg"
import courses2 from "@/assets/course2.jpeg"
import courses3 from "@/assets/course3.jpeg"
import type { StaticImageData } from "next/image"

// Types
interface Course {
  id: number
  title: string
  description: string
  image: string | StaticImageData
  category: string
  duration: string
  content: string
}

interface Event {
  id: number
  title: string
  subtitle: string
  instructor: string
  time: string
  eligibility: string
  language: string
  mode: string
  image: string | StaticImageData
  date: string
}

interface RegistrationData {
  name: string
  email: string
  phone: string
  eventId: number | null
}

// Skeleton Components
const CourseSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden animate-pulse">
    <div className="h-48 bg-slate-200"></div>
    <div className="p-4 pb-2">
      <div className="h-6 bg-slate-200 rounded mb-2"></div>
      <div className="h-4 bg-slate-200 rounded mb-1"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
    </div>
    <div className="px-4 pb-2">
      <div className="flex items-center gap-4">
        <div className="h-4 bg-slate-200 rounded w-16"></div>
        <div className="h-4 bg-slate-200 rounded w-12"></div>
      </div>
    </div>
    <div className="px-4 pt-2 pb-4">
      <div className="h-8 bg-slate-200 rounded w-24"></div>
    </div>
  </div>
)

const EventSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden animate-pulse">
    <div className="aspect-square bg-slate-200"></div>
  </div>
)

// UI Components with animations
interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  type?: "button" | "submit" | "reset"
  loading?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  variant = "default",
  size = "default",
  type = "button",
  loading = false,
  disabled = false,
}) => {
  const variantClasses = {
    default: "bg-teal-600 hover:bg-teal-700 text-white transform hover:scale-105 active:scale-95",
    outline: "border border-teal-600 text-teal-600 hover:bg-teal-50 hover:scale-105 active:scale-95",
    ghost: "text-teal-600 hover:text-teal-700 hover:bg-teal-50 hover:scale-105 active:scale-95",
    link: "text-teal-600 hover:underline p-0 h-auto hover:scale-105 active:scale-95",
  }

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6",
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`font-medium rounded-md flex items-center justify-center transition-all duration-200 ease-in-out ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
      onClick={onClick}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
      {children}
    </button>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={`h-10 px-3 py-2 rounded-md border border-slate-200 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${className || ""}`}
    {...props}
  />
)

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${className || ""}`}>
    {children}
  </span>
)

interface CardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const Card: React.FC<CardProps> = ({ children, className, delay = 0 }) => (
  <div
    className={`bg-white rounded-lg border border-slate-200 overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className || ""}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
)

interface TabsProps {
  tabs: string[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex border-b border-slate-200 mb-6">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`px-4 py-3 font-medium text-sm transition-all duration-300 ease-in-out relative ${
          activeTab === tab ? "text-teal-600" : "text-slate-600 hover:text-teal-600"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
        {activeTab === tab && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 animate-in slide-in-from-left duration-300" />
        )}
      </button>
    ))}
  </div>
)

// Modal components with animations
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors duration-200 hover:scale-110"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  )
}

// Sample data
const courses: Course[] = [
  {
    id: 1,
    title: "Understanding Diabetes Management",
    description: "Learn the essentials of managing diabetes for a healthier life.",
    image: courses1,
    category: "Chronic Care",
    duration: "4 weeks",
    content:
      "This comprehensive course covers various aspects of diabetes management including monitoring blood glucose, nutrition planning, physical activity, medication management, and preventing complications. Join expert instructors who will guide you through practical strategies to maintain a balanced lifestyle while managing diabetes effectively.",
  },
  {
    id: 2,
    title: "Nutrition Fundamentals",
    description: "Discover the basics of balanced nutrition and meal planning.",
    image: courses2,
    category: "Nutrition",
    duration: "3 weeks",
    content:
      "Our Nutrition Fundamentals course provides you with the knowledge and tools to make healthier food choices. Learn about macronutrients, micronutrients, portion control, reading food labels, and creating balanced meal plans. This course includes practical cooking demonstrations and personalized nutrition advice from certified nutritionists.",
  },
  {
    id: 3,
    title: "Stress Management Techniques",
    description: "Practical approaches to manage stress and improve mental wellbeing.",
    image: courses3,
    category: "Mental Health",
    duration: "2 weeks",
    content:
      "In this course, you'll learn effective techniques to identify stress triggers and develop healthy coping mechanisms. Our experienced mental health professionals will guide you through mindfulness practices, relaxation techniques, cognitive restructuring, and lifestyle changes that promote mental wellbeing. Join a supportive community of learners on the path to better stress management.",
  },
]

const events: Event[] = [
  {
    id: 1,
    title: "Meditation on Twin Hearts",
    subtitle: "FULL MOON MEDITATION",
    instructor: "Master Choa Kok Sui",
    time: "6:30PM TO 7:30PM",
    eligibility: "Open for All",
    language: "Tamil & English",
    mode: "ONLINE",
    image: courses1,
    date: "May 15, 2025",
  },
  {
    id: 2,
    title: "Yoga for Beginners",
    subtitle: "MORNING WELLNESS",
    instructor: "Dr. Sarah Johnson",
    time: "7:00AM TO 8:00AM",
    eligibility: "Open for All",
    language: "English",
    mode: "HYBRID",
    image: courses2,
    date: "May 10, 2025",
  },
  {
    id: 3,
    title: "Nutrition Workshop",
    subtitle: "HEALTHY EATING SERIES",
    instructor: "Chef Michael Thompson",
    time: "5:00PM TO 6:30PM",
    eligibility: "Premium Members",
    language: "English",
    mode: "IN-PERSON",
    image: courses3,
    date: "May 20, 2025",
  },
  {
    id: 4,
    title: "Mental Health Awareness",
    subtitle: "COMMUNITY TALK",
    instructor: "Dr. Lisa Chang",
    time: "6:00PM TO 7:30PM",
    eligibility: "Open for All",
    language: "English & Spanish",
    mode: "ONLINE",
    image: courses1,
    date: "May 25, 2025",
  },
]

export default function HealthWellnessPage() {
  const [activeTab, setActiveTab] = useState<string>("Courses")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: "",
    email: "",
    phone: "",
    eventId: null,
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course)
  }

  const handleRegisterEvent = (eventId: number) => {
    setRegistrationData((prev) => ({ ...prev, eventId }))
    setShowRegistrationForm(true)
  }

  const handleRegistrationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(`Registration submitted for ${registrationData.name}`)
    setIsSubmitting(false)
    setShowRegistrationForm(false)
    setRegistrationData({
      name: "",
      email: "",
      phone: "",
      eventId: null,
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegistrationData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <NavHeader />
      <div className="container mx-auto px-4 py-6 md:py-10 mt-14 mb-16">
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Health & Wellness</h1>
          <p className="text-slate-600 max-w-2xl">
            Explore our curated courses and upcoming events designed to help you better understand your health and
            manage your wellness journey.
          </p>
        </div>

        <div className="animate-in slide-in-from-top duration-500 delay-200">
          <Tabs tabs={["Courses", "Events"]} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {activeTab === "Courses" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 mb-8 animate-in slide-in-from-top duration-500 delay-300">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 transition-colors duration-200" />
                <Input placeholder="Search courses..." className="pl-10 bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? // Show skeleton loading
                  Array.from({ length: 6 }).map((_, index) => <CourseSkeleton key={index} />)
                : courses.map((course, index) => (
                    <Card key={course.id} className="animate-in slide-in-from-bottom duration-500" delay={index * 100}>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <Badge className="absolute top-3 right-3 bg-white text-slate-800 shadow-sm">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="p-4 pb-2">
                        <h3 className="text-lg font-semibold transition-colors duration-200 hover:text-teal-600">
                          {course.title}
                        </h3>
                        <p className="text-slate-600 text-sm mt-1">{course.description}</p>
                      </div>
                      <div className="px-4 pb-2">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pt-2 pb-4 flex justify-between items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewCourse(course)}
                          className="text-teal-600 hover:text-teal-700 p-0 flex items-center group"
                        >
                          View Course
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </Card>
                  ))}
            </div>

            <div className="mt-10 text-center animate-in slide-in-from-bottom duration-500 delay-500">
              <Button className="bg-teal-600 hover:bg-teal-700">Load More Courses</Button>
            </div>
          </div>
        )}

        {activeTab === "Events" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {isLoading
              ? // Show skeleton loading
                Array.from({ length: 4 }).map((_, index) => <EventSkeleton key={index} />)
              : events.map((event, index) => (
                  <Card key={event.id} className="animate-in slide-in-from-bottom duration-500" delay={index * 100}>
                    <div className="relative group">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6 text-center text-white">
                        <div className="text-sm font-medium mb-1 animate-in slide-in-from-bottom duration-300 delay-100">
                          {event.instructor}'s
                        </div>
                        <h3 className="text-xl font-bold mb-1 animate-in slide-in-from-bottom duration-300 delay-200">
                          {event.title}
                        </h3>
                        <div className="text-lg font-bold mb-4 animate-in slide-in-from-bottom duration-300 delay-300">
                          {event.subtitle}
                        </div>
                        <div className="mb-1 animate-in slide-in-from-bottom duration-300 delay-400">{event.time}</div>
                        <div className="text-sm animate-in slide-in-from-bottom duration-300 delay-500">
                          Eligibility: {event.eligibility}
                        </div>
                        <div className="text-sm animate-in slide-in-from-bottom duration-300 delay-600">
                          Language: {event.language}
                        </div>
                        <div className="text-sm mb-4 animate-in slide-in-from-bottom duration-300 delay-700">
                          MODE: {event.mode}
                        </div>
                        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom duration-300 delay-800">
                          <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                            onClick={() => handleRegisterEvent(event.id)}
                          >
                            REGISTER NOW!
                          </Button>
                          <Button
                            variant="outline"
                            className="border-white text-white hover:bg-white/20 w-full"
                            onClick={() => setSelectedEvent(event)}
                          >
                            LEARN MORE
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      <Modal isOpen={selectedCourse !== null} onClose={() => setSelectedCourse(null)}>
        {selectedCourse && (
          <div className="space-y-4 mb-16">
            <h2 className="text-2xl font-bold text-slate-900 animate-in slide-in-from-top duration-300">
              {selectedCourse.title}
            </h2>
            <div className="flex items-center gap-3 text-sm animate-in slide-in-from-top duration-300 delay-100">
              <Badge className="bg-teal-100 text-teal-800">{selectedCourse.category}</Badge>
              <div className="flex items-center gap-1 text-slate-600">
                <Clock className="h-4 w-4" />
                <span>{selectedCourse.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <Users className="h-4 w-4" />
              </div>
            </div>

            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden animate-in zoom-in-95 duration-300 delay-200">
              <Image
                src={selectedCourse.image || "/placeholder.svg"}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose max-w-none animate-in slide-in-from-bottom duration-300 delay-300">
              <h3 className="text-lg font-semibold">Course Overview</h3>
              <p>{selectedCourse.content}</p>

              <h3 className="text-lg font-semibold">What You'll Learn</h3>
              <ul>
                <li>Comprehensive understanding of {selectedCourse.category.toLowerCase()}</li>
                <li>Practical skills for daily implementation</li>
                <li>Evidence-based strategies and techniques</li>
                <li>Personal assessment and progress tracking</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Event Detail Modal */}
      <Modal isOpen={selectedEvent !== null} onClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <div className="space-y-4 mb-[400px]">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden animate-in zoom-in-95 duration-300">
              <Image
                src={selectedEvent.image || "/placeholder.svg"}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 animate-in slide-in-from-top duration-300 delay-100">
              {selectedEvent.title}
            </h2>
            <h3 className="text-xl font-semibold animate-in slide-in-from-top duration-300 delay-200">
              {selectedEvent.subtitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom duration-300 delay-300">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Date & Time</div>
                    <div className="text-slate-600">{selectedEvent.date}</div>
                    <div className="text-slate-600">{selectedEvent.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Instructor</div>
                    <div className="text-slate-600">{selectedEvent.instructor}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Mode</div>
                    <div className="text-slate-600">{selectedEvent.mode}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Language</div>
                    <div className="text-slate-600">{selectedEvent.language}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose max-w-none animate-in slide-in-from-bottom duration-300 delay-400">
              <h3 className="text-lg font-semibold">About This Event</h3>
              <p>
                Join us for this special event led by {selectedEvent.instructor}. This{" "}
                {selectedEvent.title.toLowerCase()} session is designed to help participants experience deeper
                relaxation and mindfulness.
              </p>

              <h3 className="text-lg font-semibold">Who Can Attend</h3>
              <p>Eligibility: {selectedEvent.eligibility}</p>
            </div>

            <div className="flex gap-3 pt-4 animate-in slide-in-from-bottom duration-300 delay-500">
              <Button
                className="flex-1"
                onClick={() => {
                  setSelectedEvent(null)
                  handleRegisterEvent(selectedEvent.id)
                }}
              >
                Register Now
              </Button>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Registration Form Modal */}
      <Modal isOpen={showRegistrationForm} onClose={() => setShowRegistrationForm(false)}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 animate-in slide-in-from-top duration-300">
            Event Registration
          </h2>

          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div className="animate-in slide-in-from-left duration-300 delay-100">
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <Input
                name="name"
                value={registrationData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="animate-in slide-in-from-left duration-300 delay-200">
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <Input
                type="email"
                name="email"
                value={registrationData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="animate-in slide-in-from-left duration-300 delay-300">
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <Input
                type="tel"
                name="phone"
                value={registrationData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-2 animate-in slide-in-from-left duration-300 delay-400">
              <input
                type="checkbox"
                id="whatsapp-consent"
                className="h-4 w-4 text-teal-600 border-slate-300 rounded transition-colors duration-200"
                required
              />
              <label htmlFor="whatsapp-consent" className="text-sm text-slate-700">
                I consent to receive updates via WhatsApp
              </label>
            </div>

            <div className="pt-4 flex gap-3 animate-in slide-in-from-bottom duration-300 delay-500">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowRegistrationForm(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" loading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <BottomNav />
    </>
  )
}
