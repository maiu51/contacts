import type { Contact } from '../types/contact';
import { ContactItem } from './ContactItem';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  isEmpty: boolean;
  isSearchEmpty: boolean;
  isLoading?: boolean;
}

export function ContactList({
  contacts,
  onEdit,
  onDelete,
  isEmpty,
  isSearchEmpty,
  isLoading = false,
}: ContactListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
        <p className="mt-4 text-gray-600 text-base">Loading contacts...</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-16 h-16 text-gray-300 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg font-medium">No contacts yet</p>
        <p className="text-gray-400 text-sm mt-1">Get started by adding your first contact</p>
      </div>
    );
  }

  if (isSearchEmpty) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-16 h-16 text-gray-300 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg font-medium">No contacts found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

