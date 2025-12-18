"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function MortgageCalculator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [price, setPrice] = useState(500000)
  const [downPayment, setDownPayment] = useState(100000)
  const [interestRate, setInterestRate] = useState(5.5)
  const [amortization, setAmortization] = useState(25)

  const monthlyPayment = useMemo(() => {
    const principal = price - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = amortization * 12

    if (monthlyRate === 0) {
      return principal / numPayments
    }

    const payment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    return payment
  }, [price, downPayment, interestRate, amortization])

  const downPaymentPercent = ((downPayment / price) * 100).toFixed(1)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(
      value
    )
  }

  return (
    <section id="calculator" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-[#182542] uppercase tracking-widest mb-4 block">Outils</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance text-[#182542]">
            Calculatrice hypothécaire
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estimez vos paiements mensuels et planifiez votre budget en toute confiance.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-card rounded-2xl border border-border p-8 space-y-8">
              {/* Price */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <label className="font-semibold text-[#182542]">Prix de la propriété</label>
                </div>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="text-lg font-bold mb-3"
                />
                <Slider
                  value={[price]}
                  onValueChange={([value]) => setPrice(value)}
                  min={100000}
                  max={2000000}
                  step={10000}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>100 000 $</span>
                  <span>2 000 000 $</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold text-[#182542]">Mise de fonds</label>
                  </div>
                  <span className="text-sm text-muted-foreground">{downPaymentPercent}%</span>
                </div>
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="text-lg font-bold mb-3"
                />
                <Slider
                  value={[downPayment]}
                  onValueChange={([value]) => setDownPayment(value)}
                  min={price * 0.05}
                  max={price * 0.5}
                  step={5000}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <label className="font-semibold text-[#182542]">Taux d'intérêt</label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="text-lg font-bold"
                    step={0.1}
                  />
                  <span className="text-lg font-bold">%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={1}
                  max={10}
                  step={0.1}
                  className="mt-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1%</span>
                  <span>10%</span>
                </div>
              </div>

              {/* Amortization */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <label className="font-semibold text-[#182542]">Amortissement</label>
                </div>
                <div className="flex gap-2">
                  {[15, 20, 25, 30].map((years) => (
                    <Button
                      key={years}
                      variant={amortization === years ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmortization(years)}
                      className={
                        amortization === years ? "bg-[#182542] hover:bg-[#182542]/90 text-white" : "border-[#182542]/30"
                      }
                    >
                      {years} ans
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results - Using #182542 background */}
            <div className="bg-[#182542] rounded-2xl p-8 text-white flex flex-col justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-sm uppercase tracking-widest text-white/70">Paiement mensuel estimé</span>
                </div>

                <motion.div
                  key={monthlyPayment}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-6xl font-bold mb-8 text-white"
                >
                  {formatCurrency(monthlyPayment)}
                </motion.div>

                <div className="space-y-4 text-left bg-white/10 rounded-xl p-6">
                  <div className="flex justify-between">
                    <span className="text-white/70">Prix de la propriété</span>
                    <span className="font-semibold">{formatCurrency(price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Mise de fonds</span>
                    <span className="font-semibold">{formatCurrency(downPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Montant du prêt</span>
                    <span className="font-semibold">{formatCurrency(price - downPayment)}</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between">
                    <span className="text-white/70">Coût total sur {amortization} ans</span>
                    <span className="font-semibold">{formatCurrency(monthlyPayment * amortization * 12)}</span>
                  </div>
                </div>

                <Button
                  className="mt-8 bg-white hover:bg-white/90 text-[#182542] font-semibold w-full"
                  size="lg"
                  asChild
                >
                  <a href="#contact">Parler à un courtier</a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
