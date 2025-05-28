"use client"

import { motion } from "framer-motion"
import { Shield, Users, Building, CreditCard, Camera, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const examTypes = [
  {
    id: "vishal-mega-mart",
    title: "Vishal Mega Mart Security Guard",
    description: "Protect the aisles, secure the deals! 🛒",
    icon: Building,
    color: "bg-blue-500",
    difficulty: "Easy",
    subjects: ["Crowd Control", "Theft Prevention", "Customer Service", "Emergency Response"],
  },
  {
    id: "girls-hostel",
    title: "Girls Hostel Security Guard",
    description: "Guardian of dreams and safety! 🏠",
    icon: Users,
    color: "bg-pink-500",
    difficulty: "Medium",
    subjects: ["Visitor Management", "Safety Protocols", "Communication Skills", "Night Patrol"],
  },
  {
    id: "atm-security",
    title: "ATM Security Guard",
    description: "Money talks, you listen! 💰",
    icon: CreditCard,
    color: "bg-green-500",
    difficulty: "Hard",
    subjects: ["Cash Handling", "Surveillance", "Fraud Detection", "Technical Knowledge"],
  },
  {
    id: "mall-security",
    title: "Shopping Mall Security",
    description: "Where fashion meets protection! 👕",
    icon: Camera,
    color: "bg-purple-500",
    difficulty: "Medium",
    subjects: ["Crowd Management", "Lost & Found", "Fire Safety", "Retail Security"],
  },
  {
    id: "bank-security",
    title: "Bank Security Guard",
    description: "Vault protector extraordinaire! 🏦",
    icon: Lock,
    color: "bg-yellow-500",
    difficulty: "Expert",
    subjects: ["Banking Protocols", "Threat Assessment", "VIP Protection", "Alarm Systems"],
  },
  {
    id: "office-security",
    title: "Corporate Office Security",
    description: "Suit up for security! 💼",
    icon: Shield,
    color: "bg-indigo-500",
    difficulty: "Easy",
    subjects: ["Access Control", "Visitor Logs", "Equipment Security", "Office Etiquette"],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg border-b-4 border-blue-500"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Shield className="h-10 w-10 text-blue-600" />
            </motion.div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Security Guard Results Portal</h1>
              <p className="text-gray-600">Your gateway to security excellence! 🛡️</p>
            </div>
          </div>
        </div>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="container mx-auto px-4 py-12 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Ultimate Security Guard Exam Portal! 🎯
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          From mall cops to bank vault guardians, we've got all your security exam results right here! Select your exam
          type below and discover if you're ready to protect and serve (with style)!
        </p>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-6xl mb-8"
        >
          🚨
        </motion.div>
      </motion.section>
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examTypes.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300">
                <CardHeader className="text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 ${exam.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <exam.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-lg font-bold">{exam.title}</CardTitle>
                  <CardDescription className="text-sm">{exam.description}</CardDescription>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        exam.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : exam.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : exam.difficulty === "Hard"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {exam.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-semibold text-gray-700">Exam Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {exam.subjects.map((subject, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href={`/exam/${exam.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Check My Results! 🎉</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="bg-blue-600 text-white py-12"
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-8">Portal Statistics 📊</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div whileHover={{ scale: 1.1 }} className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold">12,847</div>
              <div className="text-sm">Results Checked</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold">89%</div>
              <div className="text-sm">Pass Rate</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold">6</div>
              <div className="text-sm">Exam Types</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Portal Access</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Security Guard Results Portal . Made With ❤️ By Aryan Katiyar 😀
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Remember: A good security guard never sleeps... but they do check their exam results! 😴
          </p>
        </div>
      </footer>
    </div>
  )
}
