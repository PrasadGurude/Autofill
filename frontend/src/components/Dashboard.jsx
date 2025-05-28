import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileText, User, Calendar, LogOut } from "lucide-react"
import { Link } from "react-router-dom"

// Dummy data for forms (replace with real API/data fetching in production)
const dummyForms = [
  {
    id: 1,
    userId: 1, // Adjust this to match your test user id
    currentStep: 2,
    status: "draft",
    submittedAt: null,
  },
  {
    id: 2,
    userId: 2,
    currentStep: 4,
    status: "approved",
    submittedAt: "2025-05-20T00:00:00Z",
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [userForm, setUserForm] = useState(false)
  const [formData, setFormData] = useState([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }

    setUser(JSON.parse(userData))
    console.log("User data:", userData)

    const fetchFormData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/form/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch form data")
        }
        const data = await response.json()
        console.log("Form data:", data)
        if (data.formData) {
          setUserForm(true)
          setFormData(data.formData)
        } else {
          setUserForm(false)
        }
      } catch (error) {
        console.error("Error fetching form data:", error)
        setUserForm(false)
      }
    }

    fetchFormData()

  }, []) // Only run once on component mount


  if (!user) return null

  const handleLogout = () => {
    navigate("/login")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "under-review":
        return "bg-purple-100 text-purple-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center border px-4 py-2 rounded-md text-sm hover:bg-gray-100"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 bg-white shadow rounded-lg p-6">
            <div className="mb-4 flex items-center">
              <User className="mr-2 h-5 w-5" />
              <h2 className="text-lg font-semibold">Profile Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-semibold">{new Date(user.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile Number</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">College</p>
                <p className="font-semibold">{user.collegeName}</p>
              </div>
            </div>
          </div>

          {/* Application Status */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <div className="flex items-center mb-1">
                <FileText className="mr-2 h-5 w-5" />
                <h2 className="text-lg font-semibold">Admission Application</h2>
              </div>
              <p className="text-sm text-gray-600">Track your admission application progress</p>
            </div>

            {userForm ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Admission Application</h3>
                  </div>
                </div>

                {userForm.submittedAt && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Submitted on {new Date(formData.createdAt).toLocaleDateString()}
                  </div>
                )}

                <div className="flex gap-4">
                    <Link to="/admission">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Form submitted</button>
                    </Link>
                  <button className="border px-4 py-2 rounded hover:bg-gray-100 " onClick={()=>navigate('/admission')}>View Details</button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Application Found</h3>
                <p className="text-gray-600 mb-4">You haven't started your admission application yet.</p>
                <Link to="/admission">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Start Application</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
