import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import db from "../db"

export default function ContactDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contact, setContact] = useState(null)

  useEffect(() => {
    async function fetchContact() {
      const docRef = doc(db, "contacts", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() })
      }
    }

    fetchContact()
  }, [id])

  async function handleDelete() {
    const confirmDelete = window.confirm("Delete this contact?")
    if (!confirmDelete) return

    await deleteDoc(doc(db, "contacts", id))
    navigate("/")
  }

  if (!contact) return <p>Loading...</p>

    return (
  <div className="contact-details">
    <h2>
      {contact.firstName} {contact.lastName}
    </h2>

    <p><strong>Email:</strong> {contact.email}</p>
    {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
    {contact.address && <p><strong>Address:</strong> {contact.address}</p>}

    <div className="actions">
      <Link to={`/edit/${contact.id}`} className="btn btn-edit">
        Edit
    </Link>
      <button onClick={handleDelete} className="btn btn-delete">
        Delete
      </button>
    </div>
  </div>
)
}