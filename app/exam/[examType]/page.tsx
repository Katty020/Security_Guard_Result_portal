"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, MapPin } from "lucide-react"
import Link from "next/link"

const examData = {
  "vishal-mega-mart": {
    title: "Vishal Mega Mart Security Guard Exam",
    description: "Protecting shoppers and securing deals since forever! 🛒",
    funFact: "Did you know? The average security guard walks 15,000 steps per day in a mall!",
  },
  "girls-hostel": {
    title: "Girls Hostel Security Guard Exam",
    description: "Guardian angel of the hostel! 👼",
    funFact: "Fun fact: 73% of hostel security guards become expert tea makers!",
  },
  "atm-security": {
    title: "ATM Security Guard Exam",
    description: "Money never sleeps, and neither do you! 💰",
    funFact: "Interesting: ATM guards have the highest coffee consumption rate in security!",
  },
  "mall-security": {
    title: "Shopping Mall Security Exam",
    description: "Fashion police with real authority! 👮‍♂️",
    funFact: "Mall guards walk an average of 20km per day - that's a marathon!",
  },
  "bank-security": {
    title: "Bank Security Guard Exam",
    description: "Vault protector and money whisperer! 🏦",
    funFact: "Bank security guards have the best posture in the industry!",
  },
  "office-security": {
    title: "Corporate Office Security Exam",
    description: "Suit up for corporate protection! 💼",
    funFact: "Office guards know more office gossip than HR!",
  },
}

export default function ExamPage() {
  const params = useParams()
  const router = useRouter()
  const examType = params.examType as string
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    examCenter: "",
    experience: "",
    motivation: "",
  })

  const exam = examData[examType as keyof typeof examData]

  if (!exam) {
    return <div>Exam not found</div>
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    
    if (!formData.fullName || !formData.rollNumber || !formData.dateOfBirth) {
      alert("Please fill in all required fields!")
      return
    }

    localStorage.setItem("examFormData", JSON.stringify({ ...formData, examType }))
    router.push(`/results/${examType}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-lg border-b-4 border-purple-500"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Exams
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
              <p className="text-gray-600">{exam.description}</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="mb-8 bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-200">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-4xl mb-2"
                >
                  🤓
                </motion.div>
                <p className="text-purple-800 font-semibold">{exam.funFact}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="shadow-xl border-2 border-gray-200">
              <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Student Information Form 📝</CardTitle>
                <CardDescription className="text-purple-100">
                  We need some details before revealing your epic results!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <User className="h-5 w-5 mr-2 text-purple-600" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rollNumber">Roll Number *</Label>
                      <Input
                        id="rollNumber"
                        placeholder="e.g., SG2024001"
                        value={formData.rollNumber}
                        onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="+91 9876543210"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Exam Information
                  </h3>

                  <div>
                    <Label htmlFor="examCenter">Exam Center</Label>
                    <Select onValueChange={(value) => handleInputChange("examCenter", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your exam center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi-center">Delhi Central - Connaught Place</SelectItem>
                        <SelectItem value="mumbai-center">Mumbai Center - Andheri</SelectItem>
                        <SelectItem value="bangalore-center">Bangalore Center - Koramangala</SelectItem>
                        <SelectItem value="chennai-center">Chennai Center - T. Nagar</SelectItem>
                        <SelectItem value="kolkata-center">Kolkata Center - Park Street</SelectItem>
                        <SelectItem value="pune-center">Pune Center - FC Road</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Previous Security Experience</Label>
                    <Select onValueChange={(value) => handleInputChange("experience", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher (0 years) - Ready to start!</SelectItem>
                        <SelectItem value="1-2-years">1-2 years - Getting the hang of it</SelectItem>
                        <SelectItem value="3-5-years">3-5 years - Experienced guardian</SelectItem>
                        <SelectItem value="5-plus-years">5+ years - Security veteran</SelectItem>
                        <SelectItem value="ex-military">Ex-Military - Ultimate protector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Fun Question 🎭</h3>
                  <div>
                    <Label htmlFor="motivation">Why do you want to be a security guard? (Optional but fun!)</Label>
                    <Textarea
                      id="motivation"
                      placeholder="e.g., I want to protect people and look cool in uniform! 😎"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
                    size="lg"
                  >
                    🎉 Show Me My Results! 🎉
                  </Button>
                </motion.div>

                <p className="text-sm text-gray-500 text-center">
                  * Required fields. Don't worry, we'll keep your secrets safe! 🤐
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
