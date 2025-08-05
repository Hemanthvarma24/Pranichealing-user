"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { CalendarIcon, CheckCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { BottomNav } from "@/components/fotter"
import { NavHeader } from "@/components/topnav"

const countryCodes = [
  { value: "+1", label: "United States (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+91", label: "India (+91)" },
  // Add more country codes as needed
]

const problems = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Arthritis",
  // Add more problems as needed
]

interface FormData {
  patientName: string
  dateOfBirth: Date | undefined
  age: string
  gender: string
  maritalStatus: string
  countryCode: string
  contactNumber: string
  email: string
  address: {
    flatNo: string
    street: string
    city: string
    state: string
    pincode: string
  }
  problems: string[]
  medicalConditions: Record<string, string>
  generalCondition: string
  patientPhoto: File | null
  photoPreview: string | null
  declarations: Record<string, boolean>
}

export default function AppointmentForm() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const today = new Date()
  const [userStatus, setUserStatus] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    dateOfBirth: undefined,
    age: "",
    gender: "",
    maritalStatus: "",
    countryCode: "",
    contactNumber: "",
    email: "",
    address: {
      flatNo: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    problems: [],
    medicalConditions: {},
    generalCondition: "",
    patientPhoto: null,
    photoPreview: null,
    declarations: {
      declaration1: false,
      declaration2: false,
      declaration3: false,
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showThankYou, setShowThankYou] = useState(false)

  // Load user status and info from localStorage on component mount
  useEffect(() => {
    const status = localStorage.getItem("userStatus")
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")

    setUserStatus(status)
    setUserEmail(email)
    setUserName(name)

    // Pre-fill form with user data if available
    if (email) {
      setFormData((prev) => ({
        ...prev,
        email: email,
        patientName: name || "",
      }))
    }
  }, [])

  const calculateAge = (birthDate: Date) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    setFormData((prev) => ({ ...prev, age: age.toString() }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: date }))
      calculateAge(date)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData({
            ...formData,
            patientPhoto: file,
            photoPreview: event.target.result as string,
          })
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // For logged-in users (status=1), only validate the minimal fields
    if (userStatus === "1") {
      if (formData.problems.length === 0) newErrors.problems = "At least one problem must be selected"
      if (!formData.patientPhoto) newErrors.patientPhoto = "Patient photo is required"

      // Check declarations
      if (
        !formData.declarations.declaration1 ||
        !formData.declarations.declaration2 ||
        !formData.declarations.declaration3
      ) {
        newErrors.declarations = "All declarations must be accepted"
      }
    } else {
      // For new users (status=0), validate all fields
      if (!formData.patientName) newErrors.patientName = "Patient name is required"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
      if (!formData.gender) newErrors.gender = "Gender is required"
      if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required"
      if (!formData.countryCode) newErrors.countryCode = "Country code is required"
      if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required"
      if (!formData.email) newErrors.email = "Email is required"
      if (!formData.address.flatNo) newErrors["address.flatNo"] = "Flat/Door No. is required"
      if (!formData.address.street) newErrors["address.street"] = "Street is required"
      if (!formData.address.city) newErrors["address.city"] = "City is required"
      if (!formData.address.state) newErrors["address.state"] = "State is required"
      if (!formData.address.pincode) newErrors["address.pincode"] = "Pincode is required"
      if (formData.problems.length === 0) newErrors.problems = "At least one problem must be selected"
      if (!formData.patientPhoto) newErrors.patientPhoto = "Patient photo is required"

      // Check declarations
      if (
        !formData.declarations.declaration1 ||
        !formData.declarations.declaration2 ||
        !formData.declarations.declaration3
      ) {
        newErrors.declarations = "All declarations must be accepted"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      setShowThankYou(true)
    }
  }

  // Render the simplified form for logged-in users (status=1)
  const renderSimplifiedForm = () => {
    return (
      <div className="w-full max-w-md p-4 rounded-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Medical Information</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label className="text-sm font-medium">Problems</Label>
            <Select
              onValueChange={(value) => {
                if (!formData.problems.includes(value)) {
                  setFormData({
                    ...formData,
                    problems: [...formData.problems, value],
                  })
                }
              }}
              value=""
            >
              <SelectTrigger className={`mt-1 focus:border-[#4ead91] ${errors.problems ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select problems" />
              </SelectTrigger>
              <SelectContent position="popper">
                {problems.map((problem) => (
                  <SelectItem key={problem} value={problem}>
                    {problem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.problems.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.problems.map((problem) => (
                  <div
                    key={problem}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm flex items-center"
                  >
                    {problem}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          problems: formData.problems.filter((p) => p !== problem),
                        })
                      }
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.problems && <p className="text-red-500 text-xs mt-1">{errors.problems}</p>}
          </div>

          <div>
            <Label className="text-sm font-medium">Medical Conditions</Label>
            <div className="mt-1 space-y-3">
              {formData.problems.length > 0 ? (
                formData.problems.map((problem, index) => (
                  <div key={index} className="p-3 border border-gray-300 rounded-md">
                    <Label className="block text-xs sm:text-sm font-medium text-gray-700">{problem}</Label>
                    <Textarea
                      value={formData.medicalConditions[problem] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          medicalConditions: {
                            ...formData.medicalConditions,
                            [problem]: e.target.value,
                          },
                        })
                      }
                      className="bg-white hover:bg-gray-100 focus:border-[#4ead91] mt-1 text-xs sm:text-sm"
                      rows={2}
                      placeholder={`Describe condition for "${problem}"...`}
                    />
                  </div>
                ))
              ) : (
                <div className="p-3 border border-gray-300 rounded-md">
                  <Textarea
                    value={formData.generalCondition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        generalCondition: e.target.value,
                      })
                    }
                    className="bg-white focus:border-[#4ead91] text-xs sm:text-sm"
                    rows={2}
                    placeholder="Please describe your medical conditions here..."
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Patient Photo</Label>
            <div className="mt-1 flex flex-col items-center p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} className="hidden" />

              {formData.photoPreview ? (
                <div className="space-y-3 w-full flex flex-col items-center">
                  <img
                    src={formData.photoPreview || "/placeholder.svg"}
                    alt="Patient"
                    className="w-24 h-24 object-cover rounded-full border-4 border-[#4ead91]"
                  />
                  <Button type="button" variant="outline" onClick={triggerFileInput} className="text-xs">
                    Change Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 flex flex-col items-center">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="text-center">
                    <Button type="button" variant="outline" onClick={triggerFileInput} className="text-xs">
                      Upload Photo
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
              {errors.patientPhoto && <p className="text-red-500 text-xs mt-1">{errors.patientPhoto}</p>}
            </div>
          </div>

          <div className="space-y-2">
            {Object.keys(formData.declarations).map((key, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox
                  id={key}
                  checked={formData.declarations[key] || false}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      declarations: {
                        ...formData.declarations,
                        [key]: checked === true,
                      },
                    })
                  }
                  className="mt-1"
                />
                <Label htmlFor={key} className="text-xs sm:text-sm">
                  {key === "declaration1"
                    ? "I confirm that all the information provided is accurate and complete."
                    : key === "declaration2"
                      ? "I consent to the processing of my personal data for healthcare purposes."
                      : "I acknowledge that I have read and understood the privacy policy."}
                </Label>
              </div>
            ))}
            {errors.declarations && <p className="text-red-500 text-xs">{errors.declarations}</p>}
          </div>

          <Button type="submit" className="w-full mt-4 bg-[#4ead91] hover:bg-[#3d9c80] text-white">
            Submit
          </Button>
        </form>
      </div>
    )
  }

  // Render the full form for new users (status=0)
  const renderFullForm = () => {
    return (
      <div className="w-full max-w-md p-4 rounded-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Patient Registration</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="patientName" className="text-sm font-medium">
              Patient Name
            </Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className={`mt-1 focus:border-[#4ead91] ${errors.patientName ? "border-red-500" : ""}`}
            />
            {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>}
          </div>

          <div>
            <Label className="text-sm font-medium">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full flex justify-between items-center mt-1 focus:border-[#4ead91] ${errors.dateOfBirth ? "border-red-500" : ""}`}
                >
                  <span>{formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}</span>
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={handleDateSelect}
                  disabled={{ after: today }}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
          </div>

          <div>
            <Label htmlFor="age" className="text-sm font-medium">
              Age
            </Label>
            <Input id="age" value={formData.age} disabled className="mt-1 bg-gray-50" />
          </div>

          <div>
            <Label className="text-sm font-medium">Gender</Label>
            <RadioGroup
              className="flex space-x-4 mt-1"
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <div className="flex items-center">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="ml-2 text-sm">
                  Male
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="ml-2 text-sm">
                  Female
                </Label>
              </div>
            </RadioGroup>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          <div>
            <Label className="text-sm font-medium">Marital Status</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}>
              <SelectTrigger className={`mt-1 focus:border-[#4ead91] ${errors.maritalStatus ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent position="popper" className="w-full">
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
              </SelectContent>
            </Select>
            {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <Label className="text-sm font-medium">Country Code</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                value={formData.countryCode}
              >
                <SelectTrigger className={`mt-1 focus:border-[#4ead91] ${errors.countryCode ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {countryCodes.map((code) => (
                    <SelectItem key={code.value} value={code.value}>
                      {code.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.countryCode && <p className="text-red-500 text-xs mt-1">{errors.countryCode}</p>}
            </div>

            <div className="col-span-2">
              <Label htmlFor="contactNumber" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className={`mt-1 focus:border-[#4ead91] ${errors.contactNumber ? "border-red-500" : ""}`}
              />
              {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`mt-1 focus:border-[#4ead91] ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label className="text-sm font-medium">Address</Label>
            <div className="space-y-2 mt-1">
              <Input
                placeholder="Flat/Door No."
                value={formData.address.flatNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, flatNo: e.target.value },
                  })
                }
                className={`text-xs sm:text-sm focus:border-[#4ead91] ${errors["address.flatNo"] ? "border-red-500" : ""}`}
              />
              {errors["address.flatNo"] && <p className="text-red-500 text-xs">{errors["address.flatNo"]}</p>}
              <Input
                placeholder="Street"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
                className={`text-xs sm:text-sm focus:border-[#4ead91] ${errors["address.street"] ? "border-red-500" : ""}`}
              />
              {errors["address.street"] && <p className="text-red-500 text-xs">{errors["address.street"]}</p>}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value },
                      })
                    }
                    className={`text-xs sm:text-sm focus:border-[#4ead91] ${errors["address.city"] ? "border-red-500" : ""}`}
                  />
                  {errors["address.city"] && <p className="text-red-500 text-xs">{errors["address.city"]}</p>}
                </div>
                <div>
                  <Input
                    placeholder="State"
                    value={formData.address.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, state: e.target.value },
                      })
                    }
                    className={`text-xs sm:text-sm hover:bg-gray-100 focus:border-[#4ead91] ${errors["address.state"] ? "border-red-500" : ""}`}
                  />
                  {errors["address.state"] && <p className="text-red-500 text-xs">{errors["address.state"]}</p>}
                </div>
              </div>
              <Input
                placeholder="Pincode"
                value={formData.address.pincode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, pincode: e.target.value },
                  })
                }
                className={`text-xs sm:text-sm focus:border-[#4ead91] ${errors["address.pincode"] ? "border-red-500" : ""}`}
              />
              {errors["address.pincode"] && <p className="text-red-500 text-xs">{errors["address.pincode"]}</p>}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Problems</Label>
            <Select
              onValueChange={(value) => {
                if (!formData.problems.includes(value)) {
                  setFormData({
                    ...formData,
                    problems: [...formData.problems, value],
                  })
                }
              }}
              value=""
            >
              <SelectTrigger className={`mt-1 focus:border-[#4ead91] ${errors.problems ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select problems" />
              </SelectTrigger>
              <SelectContent position="popper">
                {problems.map((problem) => (
                  <SelectItem key={problem} value={problem}>
                    {problem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.problems.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.problems.map((problem) => (
                  <div
                    key={problem}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm flex items-center"
                  >
                    {problem}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          problems: formData.problems.filter((p) => p !== problem),
                        })
                      }
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.problems && <p className="text-red-500 text-xs mt-1">{errors.problems}</p>}
          </div>

          <div>
            <Label className="text-sm font-medium">Medical Conditions</Label>
            <div className="mt-1 space-y-3">
              {formData.problems.length > 0 ? (
                formData.problems.map((problem, index) => (
                  <div key={index} className="p-3 border border-gray-300 rounded-md">
                    <Label className="block text-xs sm:text-sm font-medium text-gray-700">{problem}</Label>
                    <Textarea
                      value={formData.medicalConditions[problem] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          medicalConditions: {
                            ...formData.medicalConditions,
                            [problem]: e.target.value,
                          },
                        })
                      }
                      className="bg-white hover:bg-gray-100 focus:border-[#4ead91] mt-1 text-xs sm:text-sm"
                      rows={2}
                      placeholder={`Describe condition for "${problem}"...`}
                    />
                  </div>
                ))
              ) : (
                <div className="p-3 border border-gray-300 rounded-md">
                  <Textarea
                    value={formData.generalCondition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        generalCondition: e.target.value,
                      })
                    }
                    className="bg-white focus:border-[#4ead91] text-xs sm:text-sm"
                    rows={2}
                    placeholder="Please describe your medical conditions here..."
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Patient Photo</Label>
            <div className="mt-1 flex flex-col items-center p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} className="hidden" />

              {formData.photoPreview ? (
                <div className="space-y-3 w-full flex flex-col items-center">
                  <img
                    src={formData.photoPreview || "/placeholder.svg"}
                    alt="Patient"
                    className="w-24 h-24 object-cover rounded-full border-4 border-[#4ead91]"
                  />
                  <Button type="button" variant="outline" onClick={triggerFileInput} className="text-xs">
                    Change Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 flex flex-col items-center">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="text-center">
                    <Button type="button" variant="outline" onClick={triggerFileInput} className="text-xs">
                      Upload Photo
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
              {errors.patientPhoto && <p className="text-red-500 text-xs mt-1">{errors.patientPhoto}</p>}
            </div>
          </div>

          <div className="space-y-2">
            {Object.keys(formData.declarations).map((key, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox
                  id={key}
                  checked={formData.declarations[key] || false}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      declarations: {
                        ...formData.declarations,
                        [key]: checked === true,
                      },
                    })
                  }
                  className="mt-1"
                />
                <Label htmlFor={key} className="text-xs sm:text-sm">
                  {key === "declaration1"
                    ? "I confirm that all the information provided is accurate and complete."
                    : key === "declaration2"
                      ? "I consent to the processing of my personal data for healthcare purposes."
                      : "I acknowledge that I have read and understood the privacy policy."}
                </Label>
              </div>
            ))}
            {errors.declarations && <p className="text-red-500 text-xs">{errors.declarations}</p>}
          </div>

          <Button type="submit" className="w-full mt-4 bg-[#4ead91] hover:bg-[#3d9c80] text-white">
            Submit
          </Button>
        </form>
      </div>
    )
  }

  return (
    <>
      <NavHeader />
      <div className="min-h-[calc(100vh-136px)] flex items-center justify-center p-3 py-12 mt-8 mb-8">
        {/* Render form based on user status */}
        {userStatus === "1" ? renderSimplifiedForm() : renderFullForm()}

        {showThankYou && (
          <div className="fixed inset-0 bg-[#4ead91] bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs w-full">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />

              <h2 className="text-xl font-bold mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-4 text-sm">Your form has been successfully submitted.</p>
              <Button
                onClick={() => setShowThankYou(false)}
                className="w-full bg-[#4ead91] hover:bg-[#3d9c80] text-white"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  )
}
