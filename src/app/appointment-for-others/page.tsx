"use client";

import type React from "react";
import { useState, useRef } from "react";
import { CheckCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav";

const countryCodes = [
  { value: "+1", label: "(+1)" },
  { value: "+44", label: "(+44)" },
  { value: "+91", label: "(+91)" },
  { value: "+61", label: "(+61)" },
  { value: "+33", label: "(+33)" },
  { value: "+49", label: "(+49)" },
  { value: "+81", label: "(+81)" },
  { value: "+86", label: "(+86)" },
];

const medicalProblems = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Arthritis",
  "High Cholesterol",
  "Thyroid Disorders",
  "Kidney Disease",
  "Liver Disease",
  "Cancer",
  "Depression",
  "Anxiety",
  "Migraine",
  "Back Pain",
  "Other",
];

const days = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) =>
  (currentYear - i).toString()
);

interface FormData {
  // Personal Information
  patientName: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  age: string;
  gender: string;
  maritalStatus: string;

  // Contact Information
  countryCode: string;
  contactNumber: string;
  email: string;

  // Address
  address: {
    [x: string]: string | number | readonly string[] | undefined;
    flatNo: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };

  // Medical Information
  problems: string[];
  medicalConditions: Record<string, string>;
  generalCondition: string;
  allergies: string;
  currentMedications: string;

  // Documents
  patientPhoto: File | null;
  photoPreview: string | null;

  // Declarations
  declarations: {
    accurateInfo: boolean;
    dataConsent: boolean;
    privacyPolicy: boolean;
  };
}

export default function AppointmentForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    dateOfBirth: {
      day: "",
      month: "",
      year: "",
    },
    age: "",
    gender: "",
    maritalStatus: "",
    countryCode: "+91",
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
    allergies: "",
    currentMedications: "",
    patientPhoto: null,
    photoPreview: null,
    declarations: {
      accurateInfo: false,
      dataConsent: false,
      privacyPolicy: false,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showThankYou, setShowThankYou] = useState(false);

  const calculateAge = (day: string, month: string, year: string) => {
    if (day && month && year) {
      const birthDate = new Date(
        Number.parseInt(year),
        Number.parseInt(month) - 1,
        Number.parseInt(day)
      );
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          patientPhoto: "File size must be less than 10MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setFormData((prev) => ({
            ...prev,
            patientPhoto: file,
            photoPreview: result as string,
          }));
          setErrors((prev) => ({ ...prev, patientPhoto: "" }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const addProblem = (problem: string) => {
    if (!formData.problems.includes(problem)) {
      setFormData((prev) => ({
        ...prev,
        problems: [...prev.problems, problem],
      }));
    }
  };

  const removeProblem = (problem: string) => {
    setFormData((prev) => ({
      ...prev,
      problems: prev.problems.filter((p) => p !== problem),
      medicalConditions: Object.fromEntries(
        Object.entries(prev.medicalConditions).filter(
          ([key]) => key !== problem
        )
      ),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Personal Information
    if (!formData.patientName.trim())
      newErrors.patientName = "Patient name is required";
    if (
      !formData.dateOfBirth.day ||
      !formData.dateOfBirth.month ||
      !formData.dateOfBirth.year
    ) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.maritalStatus)
      newErrors.maritalStatus = "Marital status is required";

    // Contact Information
    if (!formData.countryCode)
      newErrors.countryCode = "Country code is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    // Address
    if (!formData.address.flatNo.trim())
      newErrors["address.flatNo"] = "Flat/Door No. is required";
    if (!formData.address.street.trim())
      newErrors["address.street"] = "Street is required";
    if (!formData.address.city.trim())
      newErrors["address.city"] = "City is required";
    if (!formData.address.state.trim())
      newErrors["address.state"] = "State is required";
    if (!formData.address.pincode.trim())
      newErrors["address.pincode"] = "Pincode is required";

    // Medical Information
    if (formData.problems.length === 0)
      newErrors.problems = "At least one medical problem must be selected";

    // Patient Photo
    if (!formData.patientPhoto)
      newErrors.patientPhoto = "Patient photo is required";

    // Declarations
    const allDeclarationsChecked = Object.values(formData.declarations).every(
      Boolean
    );
    if (!allDeclarationsChecked)
      newErrors.declarations = "All declarations must be accepted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setShowThankYou(true);
    } else {
      // Scroll to first error
      const firstErrorElement = document.querySelector(".border-red-500");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <>
      <NavHeader />
      <div className="min-h-screen bg-gray-50 py-8 px-4 mb-10 mt-10">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-xl font-bold text-center mb-6">
            Patient Appointment Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="patientName"
                  className="text-sm font-medium mb-1"
                >
                  Name *
                </Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      patientName: e.target.value,
                    }))
                  }
                  className={errors.patientName ? "border-red-500" : ""}
                  placeholder="Enter your name"
                />
                {errors.patientName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.patientName}
                  </p>
                )}
              </div>

              {/* Mobile Number moved up */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-sm font-medium mb-1">Country</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, countryCode: value }))
                    }
                    value={formData.countryCode}
                  >
                    <SelectTrigger
                      className={errors.countryCode ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((code) => (
                        <SelectItem key={code.value} value={code.value}>
                          {code.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.countryCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.countryCode}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Label
                    htmlFor="contactNumber"
                    className="text-sm font-medium mb-1"
                  >
                    Mobile Number *
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactNumber: e.target.value,
                      }))
                    }
                    className={errors.contactNumber ? "border-red-500" : ""}
                    placeholder="Enter mobile number"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1">
                    Date of Birth *
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Select
                        value={formData.dateOfBirth.day}
                        onValueChange={(value) => {
                          const newDob = {
                            ...formData.dateOfBirth,
                            day: value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            dateOfBirth: newDob,
                          }));
                          calculateAge(newDob.day, newDob.month, newDob.year);
                        }}
                      >
                        <SelectTrigger
                          className={`${
                            errors.dateOfBirth ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value={formData.dateOfBirth.month}
                        onValueChange={(value) => {
                          const newDob = {
                            ...formData.dateOfBirth,
                            month: value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            dateOfBirth: newDob,
                          }));
                          calculateAge(newDob.day, newDob.month, newDob.year);
                        }}
                      >
                        <SelectTrigger
                          className={`${
                            errors.dateOfBirth ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value={formData.dateOfBirth.year}
                        onValueChange={(value) => {
                          const newDob = {
                            ...formData.dateOfBirth,
                            year: value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            dateOfBirth: newDob,
                          }));
                          calculateAge(newDob.day, newDob.month, newDob.year);
                        }}
                      >
                        <SelectTrigger
                          className={`${
                            errors.dateOfBirth ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="age" className="text-sm font-medium mb-1">
                    Age
                  </Label>
                  <Input
                    id="age"
                    value={formData.age}
                    disabled
                    className="bg-gray-50"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1">Gender *</Label>
                <RadioGroup
                  className="flex gap-6 mt-2"
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-1">
                  Marital Status *
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, maritalStatus: value }))
                  }
                >
                  <SelectTrigger
                    className={`${
                      errors.maritalStatus ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                    <SelectItem value="separated">Separated</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.maritalStatus}
                  </p>
                )}
              </div>
            </div>

            <hr className="my-4" />
            {/* Location (Address) Section */}
            <div className="space-y-2">
              <Label className="text-sm font-medium mb-1">Location</Label>
              <div>
                <Label className="text-sm font-medium mb-1">Country *</Label>
                <Input
                  value={formData.address.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, country: e.target.value },
                    }))
                  }
                  className={`${
                    errors["address.country"] ? "border-red-500" : ""
                  }`}
                  placeholder="Country"
                />
                {errors["address.country"] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors["address.country"]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1">State *</Label>
                  <Input
                    value={formData.address.state}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, state: e.target.value },
                      }))
                    }
                    className={`${
                      errors["address.state"] ? "border-red-500" : ""
                    }`}
                    placeholder="State"
                  />
                  {errors["address.state"] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors["address.state"]}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium mb-1">City *</Label>
                  <Input
                    value={formData.address.city}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value },
                      }))
                    }
                    className={`${
                      errors["address.city"] ? "border-red-500" : ""
                    }`}
                    placeholder="City"
                  />
                  {errors["address.city"] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors["address.city"]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1">Street *</Label>
                <Input
                  value={formData.address.street}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value },
                    }))
                  }
                  className={`${
                    errors["address.street"] ? "border-red-500" : ""
                  }`}
                  placeholder="Street name"
                />
                {errors["address.street"] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors["address.street"]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1">Pincode *</Label>
                  <Input
                    value={formData.address.pincode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, pincode: e.target.value },
                      }))
                    }
                    className={`${
                      errors["address.pincode"] ? "border-red-500" : ""
                    }`}
                    placeholder="Postal code"
                  />
                  {errors["address.pincode"] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors["address.pincode"]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <hr className="my-6" />

            {/* Medical Information */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-1">
                  Medical Conditions
                </Label>

                {/* Medical Problems */}
                <div className="space-y-4">
                  <div>
                    <Select
                      onValueChange={(value) => addProblem(value)}
                      value=""
                    >
                      <SelectTrigger
                        className={`${errors.problems ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select medical problems" />
                      </SelectTrigger>
                      <SelectContent>
                        {medicalProblems.map((problem) => (
                          <SelectItem key={problem} value={problem}>
                            {problem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {formData.problems.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.problems.map((problem) => (
                          <div
                            key={problem}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                          >
                            {problem}
                            <button
                              type="button"
                              onClick={() => removeProblem(problem)}
                              className="text-gray-600 hover:text-gray-800 font-bold"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.problems && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.problems}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-2 space-y-3">
                  {formData.problems.length > 0 ? (
                    formData.problems.map((problem) => (
                      <div
                        key={problem}
                        className="p-3 border border-gray-200 rounded-md"
                      >
                        <Label className="block text-sm font-medium text-gray-700 mb-1">
                          {problem}
                        </Label>
                        <Textarea
                          value={formData.medicalConditions[problem] || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              medicalConditions: {
                                ...prev.medicalConditions,
                                [problem]: e.target.value,
                              },
                            }))
                          }
                          className="resize-none"
                          rows={2}
                          placeholder={`Please describe your ${problem.toLowerCase()} condition...`}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="p-3 border border-gray-200 rounded-md">
                      <Textarea
                        value={formData.generalCondition}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            generalCondition: e.target.value,
                          }))
                        }
                        className="resize-none"
                        rows={3}
                        placeholder="Please describe your medical conditions here..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <hr className="my-6" />

            {/* Patient Photo */}
            <div className="space-y-2">
              <Label className="text-sm font-medium mb-1">
                Patient Photo *
              </Label>
              <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-md">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {formData.photoPreview ? (
                  <div className="space-y-3 text-center">
                    <img
                      src={formData.photoPreview || "/placeholder.svg"}
                      alt="Patient"
                      className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={triggerFileInput}
                      size="sm"
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 text-center">
                    <div className="p-3 rounded-full bg-gray-100 inline-block">
                      <Upload className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={triggerFileInput}
                        size="sm"
                      >
                        Upload Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {errors.patientPhoto && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.patientPhoto}
                </p>
              )}
            </div>

            <hr className="my-6" />

            {/* Declarations */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="accurateInfo"
                  checked={formData.declarations.accurateInfo}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      declarations: {
                        ...prev.declarations,
                        accurateInfo: checked === true,
                      },
                    }))
                  }
                  className="mt-1"
                />
                <Label htmlFor="accurateInfo" className="text-sm">
                  I confirm that all the information provided is accurate and
                  complete.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="dataConsent"
                  checked={formData.declarations.dataConsent}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      declarations: {
                        ...prev.declarations,
                        dataConsent: checked === true,
                      },
                    }))
                  }
                  className="mt-1"
                />
                <Label htmlFor="dataConsent" className="text-sm">
                  I consent to the processing of my personal data for healthcare
                  purposes.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacyPolicy"
                  checked={formData.declarations.privacyPolicy}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      declarations: {
                        ...prev.declarations,
                        privacyPolicy: checked === true,
                      },
                    }))
                  }
                  className="mt-1"
                />
                <Label htmlFor="privacyPolicy" className="text-sm">
                  I acknowledge that I have read and understood the privacy
                  policy.
                </Label>
              </div>
              {errors.declarations && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.declarations}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 ">
              <Button type="submit" className="w-full bg-[#4ead91]">
                Submit Registration
              </Button>
            </div>
          </form>

          {/* Thank You Modal */}
          {showThankYou && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-4">
                  Your form has been successfully submitted.
                </p>
                <Button
                  onClick={() => setShowThankYou(false)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
