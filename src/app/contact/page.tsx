'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Check, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import styles from '@/app/contact/page.module.css'

const serviceOptions = [
  { value: 'decoration', label: 'Stylish Decoration' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'luxury-fragrance', label: 'Luxury Fragrance' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'other', label: 'Other' },
]

type ContactFormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

const defaultFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+]?[-()\s\d]{7,20}$/

const formatTopic = (topic: string) =>
  topic
    .split('-')
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ')

export default function ContactPage() {
  const [requestedService, setRequestedService] = useState('')
  const [requestedTopic, setRequestedTopic] = useState('')
  const [formData, setFormData] = useState<ContactFormData>(defaultFormData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setRequestedService(params.get('service')?.toLowerCase() ?? '')
    setRequestedTopic(params.get('topic')?.toLowerCase() ?? '')
  }, [])

  useEffect(() => {
    if (!requestedService) {
      return
    }

    const isValidService = serviceOptions.some((option) => option.value === requestedService)
    if (isValidService && requestedService !== formData.service) {
      setFormData((prev) => ({ ...prev, service: requestedService }))
    }
  }, [requestedService, formData.service])

  useEffect(() => {
    if (!requestedTopic || formData.message.trim()) {
      return
    }

    setFormData((prev) => ({
      ...prev,
      message: `I need help with ${formatTopic(requestedTopic)}.`,
    }))
  }, [requestedTopic, formData.message])

  const validateForm = (): ContactFormErrors => {
    const validationErrors: ContactFormErrors = {}

    if (formData.name.trim().length < 2) {
      validationErrors.name = 'Please enter your full name.'
    }

    if (!emailPattern.test(formData.email.trim())) {
      validationErrors.email = 'Please enter a valid email address.'
    }

    if (formData.phone.trim() && !phonePattern.test(formData.phone.trim())) {
      validationErrors.phone = 'Please enter a valid phone number.'
    }

    if (!formData.service) {
      validationErrors.service = 'Please select a service.'
    }

    if (formData.message.trim().length < 20) {
      validationErrors.message = 'Please provide at least 20 characters about your project.'
    }

    return validationErrors
  }

  const clearFieldError = (field: keyof ContactFormData) => {
    if (!errors[field]) {
      return
    }

    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 900))

    const hasRequestedService = serviceOptions.some((option) => option.value === requestedService)

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      ...defaultFormData,
      service: hasRequestedService ? requestedService : '',
      message: requestedTopic ? `I need help with ${formatTopic(requestedTopic)}.` : '',
    })

    setTimeout(() => setIsSubmitted(false), 4000)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    const field = name as keyof ContactFormData

    setFormData((prev) => ({ ...prev, [field]: value }))
    clearFieldError(field)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
            alt="Corporate Office"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroDescription}>
            Have a question or want to work together? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              <h2 className={styles.infoTitle}>Get In Touch</h2>
              <p className={styles.infoText}>
                Ready to start your project? Contact us today and let&apos;s discuss how we can help bring your vision to life.
              </p>

              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>Address</h4>
                    <p>KAMPALA NTINDA</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+256708924166</p>
                    <p>+256702027566</p>
                    <p>+256709928840</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>arahcompanies369@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              {(requestedService || requestedTopic) && (
                <p className={styles.prefillNote}>
                  This form was pre-filled from your previous selection.
                </p>
              )}

              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <Check size={40} />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className={errors.name ? styles.fieldError : ''}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className={styles.errorText} role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className={errors.email ? styles.fieldError : ''}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className={styles.errorText} role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+256708924166"
                        className={errors.phone ? styles.fieldError : ''}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" className={styles.errorText} role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="service">Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className={errors.service ? styles.fieldError : ''}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="service-error" className={styles.errorText} role="alert">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className={errors.message ? styles.fieldError : ''}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className={styles.errorText} role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className={styles.spinner} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

