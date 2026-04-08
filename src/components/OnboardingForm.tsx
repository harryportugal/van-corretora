"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const steps = [
  { id: "personal", title: "Informações Pessoais" },
  { id: "objective", title: "Seu Objetivo" },
  { id: "propertyType", title: "Tipo de Imóvel" },
  { id: "location", title: "Localização" },
  { id: "budget", title: "Investimento" },
  { id: "requirements", title: "Detalhes" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  objective: string;
  propertyType: string;
  location: string;
  budget: string;
  timeline: string;
  features: string[];
  additionalInfo: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    objective: "",
    propertyType: "",
    location: "",
    budget: "",
    timeline: "",
    features: [],
    additionalInfo: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const features = [...prev.features];
      if (features.includes(feature)) {
        return { ...prev, features: features.filter((f) => f !== feature) };
      } else {
        return { ...prev, features: [...features, feature] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      setIsSubmitting(false);
    }, 1500);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";
      case 1:
        return formData.objective !== "";
      case 2:
        return formData.propertyType !== "";
      case 3:
        return formData.location.trim() !== "";
      case 4:
        return formData.budget !== "" && formData.timeline !== "";
      default:
        return true;
    }
  };

  // Glassmorphism classes for Apple-like aesthetic
  const glassInput = "bg-white/10 backdrop-blur-xl border-white/20 shadow-inner focus:bg-white/20 text-white placeholder:text-white/40 transition-all duration-300 focus:ring-2 focus:ring-white/30 focus:border-white/40 rounded-xl";
  const glassCard = "bg-black/40 backdrop-blur-[40px] border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] rounded-[2rem] overflow-hidden text-white";

  return (
    <div className="w-full max-w-lg mx-auto py-8">
      {/* Progress indicator */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between mb-3 px-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={cn(
                  "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-500 shadow-sm",
                  index < currentStep
                    ? "bg-white"
                    : index === currentStep
                      ? "bg-white text-zinc-900 ring-4 ring-white/20 scale-125"
                      : "bg-white/20"
                )}
                onClick={() => {
                  if (index <= currentStep) setCurrentStep(index);
                }}
              />
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-white/10 backdrop-blur-sm h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Passo {currentStep + 1} de {steps.length}
          </span>
          <h3 className="text-white font-medium text-sm mt-1">{steps[currentStep].title}</h3>
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <Card className={glassCard}>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {/* Step 1: Personal Info */}
                {currentStep === 0 && (
                  <>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-bold text-white tracking-tight">Suas Informações</CardTitle>
                      <CardDescription className="text-white/60">
                        Como podemos chamar você de forma amigável?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="name" className="text-white/90 font-medium">Nome Completo</Label>
                        <Input
                          id="name"
                          placeholder="Ex: Carlos Silva"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          className={glassInput}
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="email" className="text-white/90 font-medium">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="carlos@exemplo.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className={glassInput}
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="phone" className="text-white/90 font-medium">WhatsApp / Telefone</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className={glassInput}
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 2: Objetivo */}
                {currentStep === 1 && (
                  <>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-bold text-white tracking-tight">O que você busca?</CardTitle>
                      <CardDescription className="text-white/60">
                        Entender seu objetivo nos ajuda a encontrar a melhor oportunidade.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <RadioGroup
                          value={formData.objective}
                          onValueChange={(value) => updateFormData("objective", value)}
                          className="grid gap-3"
                        >
                          {[
                            { value: "comprar", label: "Comprar um imóvel" },
                            { value: "alugar", label: "Alugar um imóvel" },
                            { value: "vender", label: "Vender meu imóvel" },
                            { value: "investir", label: "Investir no mercado imobiliário" },
                          ].map((obj, index) => (
                            <motion.div
                              key={obj.value}
                              className={cn(
                                "flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-all duration-300",
                                formData.objective === obj.value ? "border-zinc-500 bg-white shadow-sm" : "border-white/10 bg-black/20 hover:bg-white/10"
                              )}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => updateFormData("objective", obj.value)}
                            >
                              <RadioGroupItem value={obj.value} id={`obj-${index}`} />
                              <Label htmlFor={`obj-${index}`} className="cursor-pointer font-medium text-white w-full text-base">
                                {obj.label}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 3: Tipo de Imóvel */}
                {currentStep === 2 && (
                  <>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-bold text-white tracking-tight">Tipo de Imóvel</CardTitle>
                      <CardDescription className="text-white/60">
                        Que tipo de propriedade mais combina com o que você quer?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => updateFormData("propertyType", value)}
                        >
                          <SelectTrigger id="propertyType" className={cn(glassInput, "h-12 text-base")}>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900/90 backdrop-blur-xl border-white/10 rounded-xl shadow-lg text-white">
                            <SelectItem value="apartamento">Apartamento Padrão</SelectItem>
                            <SelectItem value="cobertura">Cobertura / Duplex</SelectItem>
                            <SelectItem value="casa-condominio">Casa em Condomínio</SelectItem>
                            <SelectItem value="casa-rua">Casa de Rua</SelectItem>
                            <SelectItem value="terreno">Lote / Terreno</SelectItem>
                            <SelectItem value="comercial">Sala / Loja Comercial</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 4: Localização */}
                {currentStep === 3 && (
                  <>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-bold text-white tracking-tight">Localização Desejada</CardTitle>
                      <CardDescription className="text-white/60">
                        Em quais regiões, cidades ou bairros você tem preferência?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="location" className="text-white/90 font-medium">Bairros ou Regiões</Label>
                        <Textarea
                          id="location"
                          placeholder="Ex: Zona Sul, Jardins, Pinheiros, ou condomínios específicos..."
                          value={formData.location}
                          onChange={(e) => updateFormData("location", e.target.value)}
                          className={cn(glassInput, "min-h-[120px] resize-none")}
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 5: Budget & Timeline */}
                {currentStep === 4 && (
                  <>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-bold text-white tracking-tight">Investimento e Prazo</CardTitle>
                      <CardDescription className="text-white/60">
                        Estes dados ajudam a filtrar as propriedades perfeitas para você.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div variants={fadeInUp} className="space-y-3">
                        <Label className="text-white/90 font-medium">Qual a faixa de investimento prevista?</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => updateFormData("budget", value)}
                        >
                          <SelectTrigger id="budget" className={cn(glassInput, "h-12 text-base")}>
                            <SelectValue placeholder="Selecione o valor aproximado" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900/90 backdrop-blur-xl border-white/10 rounded-xl shadow-lg text-white">
                            <SelectItem value="ate-500k">Até R$ 500.000</SelectItem>
                            <SelectItem value="500k-1m">R$ 500.000 a R$ 1 Milhão</SelectItem>
                            <SelectItem value="1m-3m">R$ 1 Milhão a R$ 3 Milhões</SelectItem>
                            <SelectItem value="3m-5m">R$ 3 Milhões a R$ 5 Milhões</SelectItem>
                            <SelectItem value="acima-5m">Acima de R$ 5 Milhões</SelectItem>
                            <SelectItem value="sob-consulta">Prefiro não informar agora</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-3">
                        <Label className="text-white/90 font-medium">Para quando você planeja essa mudança/investimento?</Label>
                        <RadioGroup
                          value={formData.timeline}
                          onValueChange={(value) => updateFormData("timeline", value)}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          {[
                            { value: "imediato", label: "Imediato" },
                            { value: "3-meses", label: "Até 3 meses" },
                            { value: "6-meses", label: "Até 6 meses" },
                            { value: "explorando", label: "Apenas pesquisando" },
                          ].map((time, index) => (
                            <motion.div
                              key={time.value}
                              className={cn(
                                "flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all duration-300",
                                formData.timeline === time.value ? "border-zinc-500 bg-white shadow-sm" : "border-white/10 bg-black/20 hover:bg-white/10"
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => updateFormData("timeline", time.value)}
                            >
                              <RadioGroupItem value={time.value} id={`time-${index}`} />
                              <Label htmlFor={`time-${index}`} className="cursor-pointer text-sm font-medium text-white w-full">
                                {time.label}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 6: Additional Requirements */}
                {currentStep === 5 && (
                  <>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-bold text-white tracking-tight">Detalhes Finais</CardTitle>
                      <CardDescription className="text-white/60">
                        Marque itens essenciais e conte mais se desejar.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <motion.div variants={fadeInUp} className="space-y-3">
                        <Label className="text-white/90 font-medium">Itens Indispensáveis</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            "Suíte Master",
                            "Varanda Gourmet",
                            "Vista Livre",
                            "Piscina Privativa",
                            "Condomínio Fechado",
                            "Aceita Pets",
                            "Próximo ao Metrô",
                            "Andar Alto",
                          ].map((feature, index) => (
                             <motion.div
                              key={feature}
                              className={cn(
                                "flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all duration-300",
                                formData.features.includes(feature) ? "border-zinc-500 bg-white shadow-sm" : "border-white/10 bg-black/20 hover:bg-white/10"
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleFeature(feature)}
                            >
                              <Checkbox
                                id={`feature-${index}`}
                                checked={formData.features.includes(feature)}
                                onCheckedChange={() => toggleFeature(feature)}
                                className="border-white/30 hover:border-white/50 transition-colors h-5 w-5 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:text-white"
                              />
                              <Label htmlFor={`feature-${index}`} className="cursor-pointer text-sm font-medium text-white w-full">
                                {feature}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="additionalInfo" className="text-white/90 font-medium">
                          Observações (Nº Quarto, Vagas, etc...)
                        </Label>
                        <Textarea
                          id="additionalInfo"
                          placeholder="Mínimo 3 quartos, 2 vagas de garagem, sol da manhã, reforma impecável..."
                          value={formData.additionalInfo}
                          onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                          className={cn(glassInput, "min-h-[100px] resize-none")}
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-6 px-6 bg-black/30 border-t border-white/10 mt-4 rounded-b-[2rem]">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1.5 transition-all text-white/80 hover:text-white hover:bg-black/5 rounded-xl px-5 h-11"
                >
                  <ChevronLeft className="h-4 w-4" /> Voltar
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="button"
                  onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                  disabled={!isStepValid() || isSubmitting}
                  className={cn(
                    "flex items-center gap-1.5 transition-all shadow-md rounded-xl px-7 h-11 font-medium",
                    currentStep === steps.length - 1 
                      ? "bg-white hover:bg-white/90 text-black" 
                      : "bg-white hover:bg-white/90 text-black"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Processando...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Enviar Solicitação" : "Continuar"}
                      {currentStep === steps.length - 1 ? (
                        <Check className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronRight className="h-4 w-4 ml-1" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;
