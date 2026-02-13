/**
 * PAYMENT STEP — Payment method selection
 * Final step before confirmation
 */

import { CreditCard, Smartphone, Wallet, Shield, Check } from "lucide-react";
import { useState } from "react";

interface PaymentStepProps {
  totalAmount: number;
  onConfirm: () => void;
}

const PAYMENT_METHODS = [
  {
    id: "card",
    icon: CreditCard,
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, Amex",
    popular: true
  },
  {
    id: "apple-pay",
    icon: Smartphone,
    name: "Apple Pay",
    description: "One-tap checkout",
    popular: false
  },
  {
    id: "google-pay",
    icon: Wallet,
    name: "Google Pay",
    description: "Fast & secure",
    popular: false
  }
];

export function PaymentStep({ totalAmount, onConfirm }: PaymentStepProps) {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [saveDetails, setSaveDetails] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Complete Your <span className="text-gradient-gold">Booking</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Select payment method and confirm your journey
        </p>
      </div>

      {/* Total Amount Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
        <p className="text-4xl font-bold text-foreground mb-2">£{totalAmount}</p>
        <p className="text-xs text-trainline-success font-medium">
          Includes all taxes and fees • No hidden charges
        </p>
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3">Payment Method</h3>
        <div className="grid gap-3">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;

            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/30 bg-card-gradient hover:border-border/50"
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isSelected ? "bg-primary/10" : "bg-secondary/20"
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{method.name}</p>
                    {method.popular && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Details (if card selected) */}
      {selectedMethod === "card" && (
        <div className="space-y-4 p-5 rounded-xl border border-border/30 bg-card-gradient">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 rounded-lg border border-border/30 bg-background text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 rounded-lg border border-border/30 bg-background text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 rounded-lg border border-border/30 bg-background text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* Save Payment Details */}
      <button
        onClick={() => setSaveDetails(!saveDetails)}
        className="flex items-center gap-3 p-4 w-full rounded-xl border border-border/30 bg-card-gradient hover:border-border/50 transition-all"
      >
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          saveDetails ? "border-primary bg-primary" : "border-muted-foreground/30"
        }`}>
          {saveDetails && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-foreground">Save payment details for faster checkout</p>
          <p className="text-xs text-muted-foreground">Securely stored and encrypted</p>
        </div>
      </button>

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20 border border-border/20">
        <Shield className="w-5 h-5 text-trainline-success mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Secure Payment</p>
          <p className="text-xs text-muted-foreground">
            Your payment information is encrypted and secure. We never store your CVV.
          </p>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={onConfirm}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-xl"
      >
        Confirm Booking • £{totalAmount}
      </button>
    </div>
  );
}
