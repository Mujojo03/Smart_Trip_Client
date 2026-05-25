import { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { EXPEDITIONS } from '../data/expeditions'
import { CheckCircle, Smartphone, Bitcoin } from 'lucide-react'

type PaymentMethod = 'mpesa' | 'bitcoin'

interface Participant {
  name: string
  email: string
  phone: string
  specialRequests: string
}

const STEPS = ['Your Details', 'Payment', 'Review']

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i < current ? 'bg-olive text-white' : i === current ? 'bg-olive text-white ring-4 ring-olive/20' : 'bg-gray-100 text-gray-400'}`}>
              {i < current ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-xs mt-1 ${i === current ? 'text-olive font-medium' : 'text-gray-400'}`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-20 mx-2 mb-4 ${i < current ? 'bg-olive' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function BookingFlow() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const exp = EXPEDITIONS.find(e => e.id === id)
  const { date, participants: count } = (location.state ?? { date: '', participants: 1 }) as { date: string; participants: number }

  const [step, setStep] = useState(0)
  const [participant, setParticipant] = useState<Participant>({ name: '', email: '', phone: '+254', specialRequests: '' })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa')
  const [mpesaPhone, setMpesaPhone] = useState('+254')
  const [submitting, setSubmitting] = useState(false)

  if (!exp) return null

  const total = exp.priceKes * count
  const set = (k: keyof Participant) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setParticipant(p => ({ ...p, [k]: e.target.value }))

  const step1Valid = participant.name.trim() && participant.email.includes('@') && participant.phone.length >= 10

  function handlePayment() {
    setSubmitting(true)
    // Simulate payment processing
    // In a real app, here you'd integrate with M-Pesa API or Coinbase Commerce and handle callbacks/webhooks for payment confirmation
    //Later intergrations, Bitcoin Payments, PayPal, Credit Cards etc can be added here
    setTimeout(() => {
      setSubmitting(false)
      navigate(`/confirmation/${exp!.id}`, {
        state: { date, participants: count, participant, paymentMethod, total, bookingRef: 'ST-' + Math.random().toString(36).slice(2, 8).toUpperCase() }
      })
    }, 1800)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <StepIndicator current={step} />

      {/* Order summary strip */}
      <div className="bg-olive/5 border border-olive/20 rounded-xl px-4 py-3 mb-6 flex items-center justify-between text-sm">
        <div>
          <span className="font-semibold text-gray-900">{exp.name}</span>
          <span className="text-gray-500 ml-2">·</span>
          <span className="text-gray-500 ml-2">{new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="text-gray-500 ml-2">· {count} participant{count > 1 ? 's' : ''}</span>
        </div>
        <span className="font-bold text-gray-900">KES {total.toLocaleString()}</span>
      </div>

      {/* Step 0: Participant details */}
      {step === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-bold text-lg text-gray-900">Your Details</h2>
          <p className="text-sm text-gray-500">Lead participant details. You'll receive the booking confirmation at this email.</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
              <input value={participant.name} onChange={set('name')} placeholder="As on your ID/Passport"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
              <input type="email" value={participant.email} onChange={set('email')} placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
              <input value={participant.phone} onChange={set('phone')} placeholder="+254712345678"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Special Requests <span className="font-normal text-gray-400">(optional)</span></label>
              <textarea value={participant.specialRequests} onChange={set('specialRequests')}
                placeholder="Dietary requirements, medical conditions, accessibility needs…"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive resize-none" />
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-gray-400 mb-3">
              Required documents to bring: {exp.requirements.join(', ')}.
            </p>
            <button onClick={() => setStep(1)} disabled={!step1Valid}
              className="w-full py-3 bg-olive text-white font-semibold rounded-xl hover:bg-olive-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Payment */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-bold text-lg text-gray-900">Payment</h2>

          {/* Method selector */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setPaymentMethod('mpesa')}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${paymentMethod === 'mpesa' ? 'border-olive bg-olive/5' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Smartphone size={18} className="text-green-700" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm text-gray-900">M-Pesa</div>
                <div className="text-xs text-gray-500">STK Push to your phone</div>
              </div>
            </button>
            <button onClick={() => setPaymentMethod('bitcoin')}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${paymentMethod === 'bitcoin' ? 'border-olive bg-olive/5' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <Bitcoin size={18} className="text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm text-gray-900">Bitcoin</div>
                <div className="text-xs text-gray-500">Pay via Coinbase Commerce</div>
              </div>
            </button>
          </div>

          {/* M-Pesa flow */}
          {paymentMethod === 'mpesa' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">M-Pesa Phone Number</label>
                <input value={mpesaPhone} onChange={e => setMpesaPhone(e.target.value)} placeholder="+254712345678"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive" />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800 space-y-1">
                <p className="font-semibold">How M-Pesa STK Push works:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-green-700">
                  <li>Click "Pay KES {total.toLocaleString()}" below</li>
                  <li>A payment prompt appears on your phone</li>
                  <li>Enter your M-Pesa PIN to confirm</li>
                  <li>Booking confirmed instantly</li>
                </ol>
              </div>
            </div>
          )}

          {/* Bitcoin flow */}
          {paymentMethod === 'bitcoin' && (
            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs text-orange-800 space-y-1">
                <p className="font-semibold">Bitcoin via Coinbase Commerce:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-orange-700">
                  <li>Click "Pay with Bitcoin" below</li>
                  <li>You'll be redirected to a secure Coinbase Commerce page</li>
                  <li>Send the exact BTC amount shown to the provided address</li>
                  <li>Booking confirmed after 1 network confirmation (~10 min)</li>
                </ol>
              </div>
              <p className="text-xs text-gray-400">BTC amount calculated at current exchange rate at time of payment.</p>
            </div>
          )}

          {/* Amount summary */}
          <div className="border-t border-gray-100 pt-4 space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>KES {exp.priceKes.toLocaleString()} × {count} participant{count > 1 ? 's' : ''}</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(0)}
              className="px-5 py-3 border border-gray-200 text-sm rounded-xl text-gray-600 hover:border-gray-300">
              Back
            </button>
            <button onClick={() => setStep(2)}
              className="flex-1 py-3 bg-olive text-white font-semibold rounded-xl hover:bg-olive-dark transition-colors">
              Review Booking
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Review & confirm */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-bold text-lg text-gray-900">Review & Confirm</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Expedition</span>
              <span className="font-medium">{exp.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Start Date</span>
              <span className="font-medium">{new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Participants</span>
              <span className="font-medium">{count}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Lead Participant</span>
              <span className="font-medium">{participant.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Contact</span>
              <span className="font-medium">{participant.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium capitalize">{paymentMethod === 'mpesa' ? 'M-Pesa' : 'Bitcoin'}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-base">
              <span>Total</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            By confirming, you agree to Smart Trip's terms and conditions. Required documents ({exp.requirements.join(', ')}) must be presented on the day of departure.
          </p>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)}
              className="px-5 py-3 border border-gray-200 text-sm rounded-xl text-gray-600 hover:border-gray-300">
              Back
            </button>
            <button onClick={handlePayment} disabled={submitting}
              className="flex-1 py-3 bg-olive text-white font-semibold rounded-xl hover:bg-olive-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting
                ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing…</>
                : `Confirm & Pay KES ${total.toLocaleString()}`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
