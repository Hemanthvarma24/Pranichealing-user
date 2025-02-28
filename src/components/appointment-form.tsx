"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, CheckCircle } from "lucide-react"
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
// import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

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
  declarations: Record<string, boolean>
}

export default function PatientForm() {
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
    declarations: {
      declaration1: false,
      declaration2: false,
      declaration3: false,
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showThankYou, setShowThankYou] = useState(false)

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

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

  return (
    <div className="min-h-screen flex items-center justify-center p-2 mb-12 pt-[70px]">
      <div className="max-w-2xl w-full p-8  rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Patient Registration</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className={`mt-1  focus:border-[#4ead91] ${errors.patientName ? "border-red-500" : ""}`}
            />
            {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full flex justify-between items-center mt-1 focus:border-[#4ead91] ${
                    errors.dateOfBirth ? "border-red-500" : ""
                  }`}
                >
                  <span>{formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}</span>
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <Calendar mode="single" selected={formData.dateOfBirth} onSelect={handleDateSelect} />
              </PopoverContent>
            </Popover>
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" value={formData.age} disabled className="mt-1 bg-gray-50" />
          </div>

          <div>
            <Label>Gender</Label>
            <RadioGroup
              className="flex space-x-4 mt-1"
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <div className="flex items-center">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="ml-2">
                  Male
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="ml-2">
                  Female
                </Label>
              </div>
            </RadioGroup>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div>
            <Label>Marital Status</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}>
              <SelectTrigger className={`mt-1 focus:border-[#4ead91] ${errors.maritalStatus ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
              </SelectContent>
            </Select>
            {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}
          </div>

          <div>
            <Label>Country Code</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
              value={formData.countryCode}
            >
              <SelectTrigger className={`mt-1 focus:border-[#4ead91] ${errors.countryCode ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select country code" />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((code) => (
                  <SelectItem key={code.value} value={code.value}>
                    {code.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.countryCode && <p className="text-red-500 text-sm mt-1">{errors.countryCode}</p>}
          </div>

          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className={`mt-1  focus:border-[#4ead91] ${errors.contactNumber ? "border-red-500" : ""}`}
            />
            {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`mt-1  focus:border-[#4ead91] ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label>Address</Label>
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
                className={`text-sm focus:border-[#4ead91] ${errors["address.flatNo"] ? "border-red-500" : ""}`}
              />
              {errors["address.flatNo"] && <p className="text-red-500 text-sm">{errors["address.flatNo"]}</p>}
              <Input
                placeholder="Street"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
                className={`text-sm focus:border-[#4ead91] ${errors["address.street"] ? "border-red-500" : ""}`}
              />
              {errors["address.street"] && <p className="text-red-500 text-sm">{errors["address.street"]}</p>}
              <Input
                placeholder="City"
                value={formData.address.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value },
                  })
                }
                className={`text-sm focus:border-[#4ead91] ${errors["address.city"] ? "border-red-500" : ""}`}
              />
              {errors["address.city"] && <p className="text-red-500 text-sm">{errors["address.city"]}</p>}
              <Input
                placeholder="State"
                value={formData.address.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value },
                  })
                }
                className={`text-sm hover:bg-gray-100 focus:border-[#4ead91] ${
                  errors["address.state"] ? "border-red-500" : ""
                }`}
              />
              {errors["address.state"] && <p className="text-red-500 text-sm">{errors["address.state"]}</p>}
              <Input
                placeholder="Pincode"
                value={formData.address.pincode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, pincode: e.target.value },
                  })
                }
                className={`text-sm focus:border-[#4ead91] ${errors["address.pincode"] ? "border-red-500" : ""}`}
              />
              {errors["address.pincode"] && <p className="text-red-500 text-sm">{errors["address.pincode"]}</p>}
            </div>
          </div>

          <div>
            <Label>Problems</Label>
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
              <SelectContent>
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
                  <div key={problem} className="px-2 py-1 rounded-full text-sm flex items-center">
                    {problem}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          problems: formData.problems.filter((p) => p !== problem),
                        })
                      }
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.problems && <p className="text-red-500 text-sm mt-1">{errors.problems}</p>}
          </div>

          <div>
            <Label>Medical Conditions</Label>
            <div className="mt-1 space-y-4">
              {formData.problems.length > 0 ? (
                formData.problems.map((problem, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md">
                    <Label className="block text-sm font-medium text-gray-700">{problem}</Label>
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
                      className="bg-white hover:bg-gray-100 focus:border-[#4ead91] mt-1"
                      rows={3}
                      placeholder={`Describe the condition related to "${problem}" here...`}
                    />
                  </div>
                ))
              ) : (
                <div className="p-4 border border-gray-300 rounded-md">
                  <Textarea
                    value={formData.generalCondition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        generalCondition: e.target.value,
                      })
                    }
                    className="bg-white focus:border-[#4ead91]"
                    rows={3}
                    placeholder="Please describe your medical conditions here..."
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {Object.keys(formData.declarations).map((key, index) => (
              <div key={index} className="flex items-center space-x-2">
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
                />
                <Label htmlFor={key} className="text-sm">
                  {key.replace("declaration", "Declaration ")}
                </Label>
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full mt-4 bg-[#4ead91] hover:bg-[#3d9c80] text-white">
            Submit
          </Button>
        </form>
      </div>

      {showThankYou && (
        <div className="fixed inset-0 bg-[#4ead91] flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <CheckCircle className="w-[72px] h-[72px] text-green-500 mx-auto mb-4" />

            <h2 className="text-4xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">Your form has been successfully submitted.</p>
            <Button onClick={() => setShowThankYou(false)} className="bg-[#4ead91] hover:bg-[#3d9c80] text-white">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

