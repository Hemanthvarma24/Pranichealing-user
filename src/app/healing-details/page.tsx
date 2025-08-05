"use client"

import { useState, Suspense } from "react"
import { ChevronLeft, CreditCard, Smartphone, Wallet, Building2, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/fotter"
import { SessionCard } from "@/components/healings/session-card"


// Define proper types for the session data
interface HealingSession {
  id: string
  date: string
  time: string
  amount: number
  status: "Completed" | "Pending"
}

interface InfoItemProps {
  label: string
  value: string
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  )
}



// Mock data for the headache healing sessions
const healingSessions: HealingSession[] = [
  {
    id: "HDCH001",
    date: "2023-07-18",
    time: "05.00 PM",
    amount: 500,
    status: "Completed",
  },
  {
    id: "HDCH002",
    date: "2023-07-20",
    time: "05.00 PM",
    amount: 500,
    status: "Pending",
  },
  {
    id: "HDCH003",
    date: "2023-07-22",
    time: "05.00 PM",
    amount: 500,
    status: "Pending",
  },
  {
    id: "HDCH004",
    date: "2023-07-24",
    time: "05.00 PM",
    amount: 500,
    status: "Pending",
  },
  {
    id: "HDCH005",
    date: "2023-07-26",
    time: "05.00 PM",
    amount: 500,
    status: "Pending",
  },
]

interface HealingDetailsProps {
  healingId?: string
  status?: "Requested" | "Ongoing" | "Completed"
}

// Payment Page Component
function PaymentPage({
  onClose,
  pendingAmount,
  healingId,
  onPaymentSuccess,
}: {
  onClose: () => void
  pendingAmount: string
  healingId: string
  onPaymentSuccess: () => void
}) {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setPaymentSuccess(true)
    // Close payment page after success
    setTimeout(() => {
      onPaymentSuccess()
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-white z-50 mb-10 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b bg-white sticky top-0 z-10">
        <ChevronLeft className="h-6 w-6 text-gray-600 cursor-pointer" onClick={onClose} />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Complete Payment</h1>
          <p className="text-sm text-gray-500">Secure payment powered by Razorpay</p>
        </div>
      </div>

      {paymentSuccess ? (
        <div className="flex flex-col items-center justify-center  min-h-[60vh] px-4">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 text-center mb-4">
            Your payment of {pendingAmount} has been processed successfully.
          </p>
          <p className="text-sm text-gray-500">Transaction ID: TXN{Date.now()}</p>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          {/* Order Summary */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Treatment ID:</span>
                <span className="font-medium">{healingId}</span>
              </div>
              <div className="flex justify-between">
                <span>Sessions:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">{pendingAmount}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total:</span>
                <span className="text-[#4ead91]">{pendingAmount}</span>
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Choose Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="upi" id="upi" />
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">
                    UPI (GPay, PhonePe, Paytm)
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Wallet className="h-5 w-5 text-purple-600" />
                  <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                    Wallets (Paytm, Amazon Pay)
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Building2 className="h-5 w-5 text-red-600" />
                  <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                    Net Banking
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>

          {/* Payment Form */}
          <Card className="p-4">
            {paymentMethod === "upi" && (
              <div className="space-y-4">
                <h4 className="font-medium">Enter UPI ID</h4>
                <Input placeholder="yourname@paytm" />
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="p-3 h-auto bg-transparent">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-1"></div>
                      <span className="text-xs">GPay</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="p-3 h-auto bg-transparent">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-purple-600 rounded mx-auto mb-1"></div>
                      <span className="text-xs">PhonePe</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="p-3 h-auto bg-transparent">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-1"></div>
                      <span className="text-xs">Paytm</span>
                    </div>
                  </Button>
                </div>
              </div>
            )}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <h4 className="font-medium">Card Details</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === "wallet" && (
              <div className="space-y-4">
                <h4 className="font-medium">Select Wallet</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="p-4 h-auto bg-transparent">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-500 rounded mx-auto mb-2"></div>
                      <span className="text-sm">Paytm Wallet</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto bg-transparent">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-orange-500 rounded mx-auto mb-2"></div>
                      <span className="text-sm">Amazon Pay</span>
                    </div>
                  </Button>
                </div>
              </div>
            )}
            {paymentMethod === "netbanking" && (
              <div className="space-y-4">
                <h4 className="font-medium">Select Bank</h4>
                <select className="w-full p-3 border rounded-lg">
                  <option>Select your bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank</option>
                </select>
              </div>
            )}
          </Card>

          {/* Security Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 text-center">🔒 Your payment information is secure and encrypted</p>
          </div>

          {/* Pay Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-[#4ead91] hover:bg-[#3d9c80] text-white py-3 text-lg font-semibold"
          >
            {isProcessing ? "Processing..." : `Pay ${pendingAmount}`}
          </Button>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>Powered by Razorpay | Terms & Conditions | Privacy Policy</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Loading Component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4ead91]"></div>
    </div>
  )
}




// Main Healing Details Component
function HealingDetails({ healingId = "HDC045", status = "Ongoing" }: HealingDetailsProps) {
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [showPaymentPage, setShowPaymentPage] = useState(false)
  const router = useRouter()

  const pendingAmount = status === "Ongoing" ? "₹1500" : "₹2500"

  const handleViewSession = (sessionId: string) => {
    router.push(`/session-details?sessionId=${sessionId}`)
  }

  const handleBack = () => {
    router.back()
  }

  const handleConfirmPayment = () => {
    setPaymentOpen(false)
    setTimeout(() => {
      setShowPaymentPage(true)
    }, 100)
  }

  return (
    <>
      {!showPaymentPage ? (
        <div className="flex flex-col h-full mb-6">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b bg-white sticky top-0 z-10">
            <ChevronLeft className="h-6 w-6 text-[#4ead91] cursor-pointer" onClick={handleBack} />
            <h1 className="text-xl font-semibold">Session Details</h1>
          </div>

          <div className="p-4 space-y-4 pb-20">
            <div className="w-full mx-auto">
              <div className="rounded-xl overflow-hidden shadow-md bg-[#4ead91] max-w-xl mx-auto">
                <div className="p-6 text-white relative space-y-6">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 bg-white rounded-full text-sm font-semibold shadow ${
                        status === "Completed"
                          ? "text-[#4ead91]"
                          : status === "Ongoing"
                            ? "text-orange-500"
                            : "text-blue-500"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Info Row */}
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-xs opacity-80">Treatment ID</p>
                      <p className="text-lg font-semibold">{healingId}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80">Start Date</p>
                      <p className="text-lg font-semibold">{status === "Requested" ? "NA" : "18 July 2025"}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80">End Date</p>
                      <p className="text-lg font-semibold">{status === "Completed" ? "24 July 2025" : "NA"}</p>
                    </div>
                  </div>

                  {/* Sessions Info */}
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-xs opacity-80">No. of Sessions</p>
                      <p className="text-lg font-semibold">05</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80">Completed</p>
                      <p className="text-lg font-semibold">
                        {status === "Completed" ? "05" : status === "Ongoing" ? "02" : "00"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80">Pending</p>
                      <p className="text-lg font-semibold">
                        {status === "Completed" ? "00" : status === "Ongoing" ? "03" : "05"}
                      </p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-xs opacity-80">Total Amount</p>
                      <p className="text-base font-semibold">₹2500</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80">Amount Paid</p>
                      <p className="text-base font-semibold">
                        {status === "Completed" ? "₹2500" : status === "Ongoing" ? "₹1000" : "₹0"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80">To Pay</p>
                      <p className="text-base font-semibold">{pendingAmount}</p>
                    </div>
                    {status !== "Completed" && (
                      <div className="pt-2 w-full max-w-xs text-left">
                        <button
                          onClick={() => setPaymentOpen(true)}
                          className="bg-white text-black font-semibold px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                        >
                          Pay Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="sessions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12 p-0 rounded-xl bg-white">
                <TabsTrigger
                  value="sessions"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground data-[state=active]:font-medium"
                >
                  Sessions
                </TabsTrigger>
                <TabsTrigger
                  value="info"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground data-[state=active]:font-medium"
                >
                  Info
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sessions" className="mt-4 space-y-4">
                {healingSessions.map((session) => (
                  <SessionCard key={session.id} session={session} onViewSession={() => handleViewSession(session.id)} />
                ))}
              </TabsContent>

              <TabsContent value="info" className="mt-4">
                <Card className="rounded-lg overflow-hidden border border-gray-200">
                  <div className="p-4 space-y-3">
                    <InfoItem label="Patient Name" value="John Doe" />
                    <InfoItem label="Date of Birth" value="January 15, 1990" />
                    <InfoItem label="Age" value="35" />
                    <InfoItem label="Blood Group" value="B+ve" />
                    <InfoItem label="Location" value="123 Wellness Street, Health City" />
                    <InfoItem label="Emergency Contact" value="+91 98765 43210" />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Payment Dialog */}
          <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
            <DialogContent className="max-w-md rounded-lg shadow-lg ">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-gray-800">Payment Details</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Confirm your payment for the headache treatment sessions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Treatment ID:</span>
                  <span className="font-medium text-gray-900">{healingId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">No. of Sessions:</span>
                  <span className="font-medium text-gray-900">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pending Amount:</span>
                  <span className="font-medium text-[#4ead91]">{pendingAmount}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setPaymentOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#4ead91] text-white hover:bg-[#3d9c80]" onClick={handleConfirmPayment}>
                  Confirm Payment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <PaymentPage
          onClose={() => setShowPaymentPage(false)}
          pendingAmount={pendingAmount}
          healingId={healingId}
          onPaymentSuccess={() => {
            console.log("Payment successful!")
          }}
        />
      )}
    </>
  )
}

// Main page component with Suspense boundary
export default function HealingDetailsPage() {
  return (
    <>
      
      <Suspense fallback={<LoadingFallback />}>
        <HealingDetails />
      </Suspense>
      <BottomNav />
    </>
  )
}
