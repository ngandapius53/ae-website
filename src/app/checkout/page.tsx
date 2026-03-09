'use client'

import { FormEvent, useMemo, useState } from 'react'
import styles from '@/app/checkout/page.module.css'
import { getSupabaseBrowserClient } from '@/lib/supabaseClient'

type CheckoutFormData = {
  fullName: string
  phone: string
  email: string
  location: string
  service: string
  itemName: string
  quantity: string
  notes: string
}

const initialForm: CheckoutFormData = {
  fullName: '',
  phone: '',
  email: '',
  location: '',
  service: '',
  itemName: '',
  quantity: '1',
  notes: '',
}

const serviceOptions = [
  'Decoration',
  'Furniture',
  'Luxury Fragrance',
  'Graphic Design',
  'Real Estate',
  'Other',
]

export default function CheckoutPage() {
  const [form, setForm] = useState<CheckoutFormData>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const supabase = useMemo(() => getSupabaseBrowserClient(), [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!supabase) {
      setStatus('error')
      setMessage('Supabase is not connected yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
      return
    }

    const quantity = Number.parseInt(form.quantity, 10)
    if (!Number.isFinite(quantity) || quantity < 1) {
      setStatus('error')
      setMessage('Quantity must be at least 1.')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setMessage('')

    const payload = {
      full_name: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      location: form.location.trim() || null,
      service: form.service,
      item_name: form.itemName.trim(),
      quantity,
      notes: form.notes.trim() || null,
    }

    const { error } = await supabase
      .from('checkout_information')
      .insert(payload)

    if (error) {
      setStatus('error')
      setMessage(`Could not save checkout information: ${error.message}`)
      setIsSubmitting(false)
      return
    }

    setForm(initialForm)
    setStatus('success')
    setMessage('Checkout information saved successfully.')
    setIsSubmitting(false)
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Checkout Information</h1>
          <p className={styles.subtitle}>
            Submit customer checkout details here. Each submission is saved to your Supabase table.
          </p>
        </div>

        <div className={styles.card}>
          <form onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="fullName" className={styles.label}>Full Name</label>
                <input
                  id="fullName"
                  required
                  className={styles.input}
                  value={form.fullName}
                  onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>Phone Number</label>
                <input
                  id="phone"
                  required
                  className={styles.input}
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email (optional)</label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="location" className={styles.label}>Location (optional)</label>
                <input
                  id="location"
                  className={styles.input}
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="service" className={styles.label}>Service</label>
                <select
                  id="service"
                  required
                  className={styles.select}
                  value={form.service}
                  onChange={(event) => setForm({ ...form, service: event.target.value })}
                >
                  <option value="">Select service</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="quantity" className={styles.label}>Quantity</label>
                <input
                  id="quantity"
                  required
                  type="number"
                  min={1}
                  className={styles.input}
                  value={form.quantity}
                  onChange={(event) => setForm({ ...form, quantity: event.target.value })}
                />
              </div>

              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label htmlFor="itemName" className={styles.label}>Item / Product / Package</label>
                <input
                  id="itemName"
                  required
                  className={styles.input}
                  value={form.itemName}
                  onChange={(event) => setForm({ ...form, itemName: event.target.value })}
                />
              </div>

              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label htmlFor="notes" className={styles.label}>Notes (optional)</label>
                <textarea
                  id="notes"
                  className={styles.textarea}
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.submit} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Checkout Info'}
              </button>
              <p className={styles.hint}>Table name: checkout_information</p>
            </div>

            {status !== 'idle' && (
              <p className={`${styles.message} ${status === 'success' ? styles.success : styles.error}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
