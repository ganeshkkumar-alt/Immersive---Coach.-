"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, User, Upload, ArrowLeft } from "lucide-react"

interface Persona {
  id: string
  name: string
  ageRange: string
  gender: string
  nationality: string
  primaryLanguage: string
  accent: string
  role: string
  specialty: string
  yearsOfExperience: string
  practiceSetting: string
  imageUrl?: string
}

const prebuiltPersonas: Persona[] = [
  {
    id: "1",
    name: "Dr. Clara",
    ageRange: "47-49",
    gender: "Female",
    nationality: "American",
    primaryLanguage: "English",
    accent: "American",
    role: "Physician",
    specialty: "Pulmonology",
    yearsOfExperience: "10-15",
    practiceSetting: "Hospital",
    imageUrl: "/images/personas/dr-clara.png",
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    ageRange: "45-54",
    gender: "Male",
    nationality: "British",
    primaryLanguage: "English",
    accent: "British",
    role: "Consultant",
    specialty: "Cardiology",
    yearsOfExperience: "15-20",
    practiceSetting: "Private Practice",
    imageUrl: "/images/personas/dr-james-wilson.jpg",
  },
  {
    id: "3",
    name: "Dr. Maria Garcia",
    ageRange: "30-34",
    gender: "Female",
    nationality: "Spanish",
    primaryLanguage: "Spanish",
    accent: "European Spanish",
    role: "Resident",
    specialty: "Internal Medicine",
    yearsOfExperience: "3-5",
    practiceSetting: "Academic Medical Center",
    imageUrl: "/images/personas/dr-maria-garcia.jpg",
  },
  {
    id: "4",
    name: "Dr. Hans Mueller",
    ageRange: "55-64",
    gender: "Male",
    nationality: "German",
    primaryLanguage: "German",
    accent: "German",
    role: "Department Head",
    specialty: "Oncology",
    yearsOfExperience: "20+",
    practiceSetting: "University Hospital",
    imageUrl: "/images/personas/dr-hans-mueller.jpg",
  },
]

export function PersonaManager() {
  const [personas, setPersonas] = useState<Persona[]>(prebuiltPersonas)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [newPersona, setNewPersona] = useState<Partial<Persona>>({
    name: "",
    ageRange: "",
    gender: "",
    nationality: "",
    primaryLanguage: "",
    accent: "",
    role: "",
    specialty: "",
    yearsOfExperience: "",
    practiceSetting: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setNewPersona({ ...newPersona, imageUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreatePersona = () => {
    if (newPersona.name) {
      const persona: Persona = {
        id: Date.now().toString(),
        name: newPersona.name || "",
        ageRange: newPersona.ageRange || "",
        gender: newPersona.gender || "",
        nationality: newPersona.nationality || "",
        primaryLanguage: newPersona.primaryLanguage || "",
        accent: newPersona.accent || "",
        role: newPersona.role || "",
        specialty: newPersona.specialty || "",
        yearsOfExperience: newPersona.yearsOfExperience || "",
        practiceSetting: newPersona.practiceSetting || "",
        imageUrl: newPersona.imageUrl,
      }
      setPersonas([...personas, persona])
      setNewPersona({
        name: "",
        ageRange: "",
        gender: "",
        nationality: "",
        primaryLanguage: "",
        accent: "",
        role: "",
        specialty: "",
        yearsOfExperience: "",
        practiceSetting: "",
      })
      setImagePreview(null)
      setShowCreateForm(false)
    }
  }

  // Show persona detail view
  if (selectedPersona) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPersona(null)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Personas
          </Button>
        </div>

        <Card className="border border-border max-w-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Persona Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center overflow-hidden">
                {selectedPersona.imageUrl ? (
                  <img
                    src={selectedPersona.imageUrl || "/placeholder.svg"}
                    alt={selectedPersona.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-blue-600 dark:text-blue-300" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedPersona.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedPersona.role} - {selectedPersona.specialty}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedPersona.practiceSetting}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Age Range</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.ageRange}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Gender</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.gender}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Nationality</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.nationality}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Primary Language</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.primaryLanguage}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Accent</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.accent}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Years of Experience</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.yearsOfExperience} years</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Role / Title</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.role}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Specialty</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.specialty}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs text-muted-foreground">Practice Setting</Label>
                <p className="text-sm font-medium text-foreground">{selectedPersona.practiceSetting}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setSelectedPersona(null)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showCreateForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCreateForm(false)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Personas
          </Button>
        </div>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg">Create New Persona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image Upload */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center overflow-hidden bg-muted">
                  {imagePreview ? (
                    <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-muted-foreground" />
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer hover:bg-primary/90 transition-colors">
                  <Upload className="w-3 h-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Name</Label>
                <Input
                  value={newPersona.name || ""}
                  onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                  placeholder="Enter name"
                  className="h-9"
                />
              </div>

              {/* Age Range */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Age Range</Label>
                <Select
                  value={newPersona.ageRange || ""}
                  onValueChange={(value) => setNewPersona({ ...newPersona, ageRange: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25-29">25-29</SelectItem>
                    <SelectItem value="30-34">30-34</SelectItem>
                    <SelectItem value="35-44">35-44</SelectItem>
                    <SelectItem value="45-54">45-54</SelectItem>
                    <SelectItem value="55-64">55-64</SelectItem>
                    <SelectItem value="65+">65+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Gender</Label>
                <Select
                  value={newPersona.gender || ""}
                  onValueChange={(value) => setNewPersona({ ...newPersona, gender: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Non-binary">Non-binary</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nationality */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Nationality</Label>
                <Input
                  value={newPersona.nationality || ""}
                  onChange={(e) => setNewPersona({ ...newPersona, nationality: e.target.value })}
                  placeholder="Enter nationality"
                  className="h-9"
                />
              </div>

              {/* Primary Language */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Primary Language</Label>
                <Select
                  value={newPersona.primaryLanguage || ""}
                  onValueChange={(value) => setNewPersona({ ...newPersona, primaryLanguage: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Mandarin">Mandarin</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Accent */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Accent</Label>
                <Input
                  value={newPersona.accent || ""}
                  onChange={(e) => setNewPersona({ ...newPersona, accent: e.target.value })}
                  placeholder="Enter accent"
                  className="h-9"
                />
              </div>

              {/* Role / Title */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Role / Title</Label>
                <Select
                  value={newPersona.role || ""}
                  onValueChange={(value) => setNewPersona({ ...newPersona, role: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Physician">Physician</SelectItem>
                    <SelectItem value="Consultant">Consultant</SelectItem>
                    <SelectItem value="Resident">Resident</SelectItem>
                    <SelectItem value="Department Head">Department Head</SelectItem>
                    <SelectItem value="Nurse Practitioner">Nurse Practitioner</SelectItem>
                    <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="Medical Director">Medical Director</SelectItem>
                    <SelectItem value="Clinical Researcher">Clinical Researcher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Specialty */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Specialty</Label>
                <Select
                  value={newPersona.specialty || ""}
                  onValueChange={(value) => setNewPersona({ ...newPersona, specialty: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pulmonology">Pulmonology</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Oncology">Oncology</SelectItem>
                    <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                    <SelectItem value="Rheumatology">Rheumatology</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Gastroenterology">Gastroenterology</SelectItem>
                    <SelectItem value="General Practice">General Practice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Years of Experience */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Years of Experience</Label>
                <Select
                  value={newPersona.yearsOfExperience || ""}
                  onValueChange={(value) => setNewPersona({ ...newPersona, yearsOfExperience: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10-15">10-15 years</SelectItem>
                    <SelectItem value="15-20">15-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Practice Setting */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Practice Setting</Label>
                <Select
                  value={newPersona.practiceSetting || ""}
                  onValueChange={(value) => setNewPersona({ ...newPersona, practiceSetting: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                    <SelectItem value="Private Practice">Private Practice</SelectItem>
                    <SelectItem value="Academic Medical Center">Academic Medical Center</SelectItem>
                    <SelectItem value="University Hospital">University Hospital</SelectItem>
                    <SelectItem value="Community Clinic">Community Clinic</SelectItem>
                    <SelectItem value="Research Institution">Research Institution</SelectItem>
                    <SelectItem value="Outpatient Clinic">Outpatient Clinic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePersona} disabled={!newPersona.name}>
                Create Persona
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Persona Management</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Create Persona Card */}
        <Card
          className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 cursor-pointer transition-all hover:shadow-md flex flex-col items-center justify-center min-h-[220px]"
          onClick={() => setShowCreateForm(true)}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Plus className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Create Persona</p>
            <p className="text-xs text-muted-foreground mt-1">Add a custom persona</p>
          </CardContent>
        </Card>

        {/* Persona Cards */}
        {personas.map((persona) => (
          <Card
            key={persona.id}
            className="border border-border hover:shadow-md transition-all cursor-pointer min-h-[220px]"
            onClick={() => setSelectedPersona(persona)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center mb-3 overflow-hidden">
                  <img src={persona.imageUrl || "/images/personas/default-persona.png"} alt={persona.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{persona.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{persona.role}</p>
                <div className="space-y-1 w-full">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Specialty:</span>
                    <span className="font-medium text-foreground">{persona.specialty}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium text-foreground">{persona.yearsOfExperience} yrs</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Setting:</span>
                    <span className="font-medium text-foreground truncate max-w-[80px]">{persona.practiceSetting}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
