"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Download, Share2, Home, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface FormData {
  fullName: string
  rollNumber: string
  dateOfBirth: string
  phoneNumber: string
  email: string
  examCenter: string
  experience: string
  motivation: string
  examType: string
}

const examSubjects = {
  "vishal-mega-mart": [
    { name: "Crowd Control & Management", maxMarks: 100 },
    { name: "Theft Prevention Techniques", maxMarks: 100 },
    { name: "Customer Service Skills", maxMarks: 100 },
    { name: "Emergency Response Procedures", maxMarks: 100 },
    { name: "Store Layout & Security Points", maxMarks: 100 },
  ],
  "girls-hostel": [
    { name: "Visitor Management System", maxMarks: 100 },
    { name: "Safety Protocols & Procedures", maxMarks: 100 },
    { name: "Communication & Interpersonal Skills", maxMarks: 100 },
    { name: "Night Patrol & Surveillance", maxMarks: 100 },
    { name: "Emergency Handling", maxMarks: 100 },
  ],
  "atm-security": [
    { name: "Cash Handling & Security", maxMarks: 100 },
    { name: "Surveillance & Monitoring", maxMarks: 100 },
    { name: "Fraud Detection & Prevention", maxMarks: 100 },
    { name: "Technical Knowledge (ATM Operations)", maxMarks: 100 },
    { name: "Risk Assessment", maxMarks: 100 },
  ],
  "mall-security": [
    { name: "Crowd Management", maxMarks: 100 },
    { name: "Lost & Found Operations", maxMarks: 100 },
    { name: "Fire Safety & Evacuation", maxMarks: 100 },
    { name: "Retail Security Protocols", maxMarks: 100 },
    { name: "VIP & Celebrity Handling", maxMarks: 100 },
  ],
  "bank-security": [
    { name: "Banking Security Protocols", maxMarks: 100 },
    { name: "Threat Assessment & Response", maxMarks: 100 },
    { name: "VIP Protection Services", maxMarks: 100 },
    { name: "Alarm Systems & Technology", maxMarks: 100 },
    { name: "Financial Crime Prevention", maxMarks: 100 },
  ],
  "office-security": [
    { name: "Access Control Systems", maxMarks: 100 },
    { name: "Visitor Registration & Logs", maxMarks: 100 },
    { name: "Equipment & Asset Security", maxMarks: 100 },
    { name: "Office Etiquette & Professionalism", maxMarks: 100 },
    { name: "Corporate Emergency Procedures", maxMarks: 100 },
  ],
}

const generateRandomMarks = (experience: string) => {
  let baseScore = 60

  switch (experience) {
    case "fresher":
      baseScore = 65
      break
    case "1-2-years":
      baseScore = 72
      break
    case "3-5-years":
      baseScore = 78
      break
    case "5-plus-years":
      baseScore = 85
      break
    case "ex-military":
      baseScore = 90
      break
    default:
      baseScore = 70
  }

  return Math.floor(baseScore + Math.random() * (95 - baseScore))
}

const getGrade = (percentage: number) => {
  if (percentage >= 90) return { grade: "A+", color: "text-green-600", bg: "bg-green-100" }
  if (percentage >= 80) return { grade: "A", color: "text-green-600", bg: "bg-green-100" }
  if (percentage >= 70) return { grade: "B+", color: "text-blue-600", bg: "bg-blue-100" }
  if (percentage >= 60) return { grade: "B", color: "text-blue-600", bg: "bg-blue-100" }
  if (percentage >= 50) return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-100" }
  return { grade: "F", color: "text-red-600", bg: "bg-red-100" }
}

const getFunnyComment = (percentage: number, examType: string) => {
  const comments = {
    high: [
      "🎉 Outstanding! You're ready to guard the galaxy!",
      "🌟 Excellent work! Even ninjas would be impressed!",
      "🏆 Superb! You could probably guard Fort Knox!",
      "🎯 Amazing! You're a security superhero in disguise!",
    ],
    medium: [
      "👍 Good job! You're definitely security material!",
      "😊 Well done! You've got the security spirit!",
      "🎪 Nice work! You're ready for action!",
      "🚀 Great effort! Security stardom awaits!",
    ],
    low: [
      "📚 Keep studying! Every security expert started somewhere!",
      "💪 Don't give up! Practice makes perfect guards!",
      "🎯 Almost there! A little more preparation will do wonders!",
      "🌱 Growing strong! Your security journey has just begun!",
    ],
  }

  let category = "low"
  if (percentage >= 80) category = "high"
  else if (percentage >= 60) category = "medium"

  const categoryComments = comments[category as keyof typeof comments]
  return categoryComments[Math.floor(Math.random() * categoryComments.length)]
}

export default function ResultsPage() {
  const params = useParams()
  const examType = params.examType as string
  const [formData, setFormData] = useState<FormData | null>(null)
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get form data from localStorage
    const storedData = localStorage.getItem("examFormData")
    if (storedData) {
      const data = JSON.parse(storedData)
      setFormData(data)

      // Generate random results
      const subjects = examSubjects[examType as keyof typeof examSubjects] || []
      const generatedResults = subjects.map((subject) => ({
        ...subject,
        marksObtained: generateRandomMarks(data.experience || "fresher"),
      }))

      setResults(generatedResults)
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000)
  }, [examType])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🔄
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Calculating Your Results...</h2>
          <p className="text-gray-600">Our security experts are reviewing your performance! 🕵️‍♂️</p>
          <motion.div
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 2 }}
            className="w-64 h-2 bg-gray-200 rounded-full mx-auto mt-4 overflow-hidden"
          >
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Oops! No Data Found</h2>
            <p className="text-gray-600 mb-4">Please fill out the exam form first.</p>
            <Link href="/">
              <Button>Go Back to Exams</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalMarks = results.reduce((sum, result) => sum + result.marksObtained, 0)
  const maxTotalMarks = results.reduce((sum, result) => sum + result.maxMarks, 0)
  const percentage = Math.round((totalMarks / maxTotalMarks) * 100)
  const gradeInfo = getGrade(percentage)
  const isPassed = percentage >= 50
  const funnyComment = getFunnyComment(percentage, examType)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-lg border-b-4 border-green-500"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Exam Results 📊</h1>
              <p className="text-gray-600">The moment of truth has arrived!</p>
            </div>
            <Link href="/">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Student Info Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Name:</strong> {formData.fullName}
                    </p>
                    <p>
                      <strong>Roll Number:</strong> {formData.rollNumber}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {formData.dateOfBirth}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Exam Center:</strong> {formData.examCenter || "Not specified"}
                    </p>
                    <p>
                      <strong>Experience:</strong> {formData.experience || "Not specified"}
                    </p>
                    <p>
                      <strong>Exam Date:</strong> {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Overall Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className={`border-4 ${isPassed ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"}`}>
              <CardHeader className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-6xl mb-4"
                >
                  {isPassed ? "🎉" : "😔"}
                </motion.div>
                <CardTitle className={`text-3xl ${isPassed ? "text-green-700" : "text-red-700"}`}>
                  {isPassed ? "CONGRATULATIONS!" : "BETTER LUCK NEXT TIME!"}
                </CardTitle>
                <CardDescription className="text-lg">{funnyComment}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">{totalMarks}</div>
                    <div className="text-sm text-gray-600">Total Marks</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-600">{percentage}%</div>
                    <div className="text-sm text-gray-600">Percentage</div>
                  </div>
                  <div className="space-y-2">
                    <Badge className={`text-2xl px-4 py-2 ${gradeInfo.bg} ${gradeInfo.color}`}>{gradeInfo.grade}</Badge>
                    <div className="text-sm text-gray-600">Grade</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>

                <div
                  className={`flex items-center justify-center space-x-2 text-lg font-semibold ${isPassed ? "text-green-600" : "text-red-600"}`}
                >
                  {isPassed ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                  <span>{isPassed ? "PASSED" : "FAILED"}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject-wise Results */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Medal className="h-6 w-6 mr-2 text-blue-600" />
                  Subject-wise Performance
                </CardTitle>
                <CardDescription>Detailed breakdown of your performance in each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.map((result, index) => {
                    const subjectPercentage = Math.round((result.marksObtained / result.maxMarks) * 100)
                    const subjectGrade = getGrade(subjectPercentage)

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-800">{result.name}</h4>
                          <Badge className={`${subjectGrade.bg} ${subjectGrade.color}`}>{subjectGrade.grade}</Badge>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            {result.marksObtained} / {result.maxMarks} marks
                          </span>
                          <span className="text-sm font-semibold">{subjectPercentage}%</span>
                        </div>
                        <Progress value={subjectPercentage} className="h-2" />
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
            <Link href="/">
              <Button variant="outline">Take Another Exam</Button>
            </Link>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300">
              <CardContent className="p-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="text-4xl mb-2"
                >
                  🎭
                </motion.div>
                <p className="text-lg font-semibold text-orange-800">
                  {isPassed
                    ? "Welcome to the elite security force! Your badge is in the mail! 📮"
                    : "Don't worry, even Batman failed his first security exam! 🦇"}
                </p>
                <p className="text-sm text-orange-600 mt-2">
                  Remember: A good security guard is always prepared... for anything! 🛡️
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
