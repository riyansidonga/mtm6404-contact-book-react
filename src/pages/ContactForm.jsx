import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import db from "../db";

export default function ContactForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    async function fetchContact() {
      if (!id) return

      const docRef = doc(db, "contacts", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setFormData(docSnap.data())
      }
    }

    fetchContact()
  }, [id])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("First name, last name, and email are required.")
      return
    }

    if (id) {
      await updateDoc(doc(db, "contacts", id), formData)
      navigate(`/contacts/${id}`)
    } else {
      const docRef = await addDoc(collection(db, "contacts"), formData)
      navigate(`/contacts/${docRef.id}`)
    }
  }

  return (
    <div>
      <h2>{id ? "Edit Contact" : "Add Contact"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <button type="submit" className="btn-create">
          {id ? "Update Contact" : "Create Contact"}
        </button>
        
      </form>
    </div>
  )
}