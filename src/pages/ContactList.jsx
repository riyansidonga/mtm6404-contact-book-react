import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import db from "../db"

export default function ContactList() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchContacts() {
      const querySnapshot = await getDocs(collection(db, "contacts"))
      const contactData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      contactData.sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      )

      setContacts(contactData)
    }

    fetchContacts()
  }, [])

  const filteredContacts = contacts.filter((contact) => {
    const fullName =
      `${contact.firstName} ${contact.lastName}`.toLowerCase()
    return fullName.includes(search.toLowerCase())
  })

  return (
    <div>
      <h2>All Contacts</h2>

      <input
        type="text"
        placeholder="Search by first or last name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contacts/${contact.id}`}>
                {contact.lastName} {contact.firstName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}