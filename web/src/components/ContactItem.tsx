import type { Contact } from '../types/contact';

interface ContactItemProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export function ContactItem({ contact, onEdit, onDelete }: ContactItemProps) {
  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 text-base mb-1">{contact.name}</div>
        <div className="text-sm text-gray-600 mb-1">{contact.phone}</div>
        {contact.email && (
          <div className="text-sm text-gray-500 truncate">{contact.email}</div>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(contact)}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Edit ${contact.name}`}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </span>
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label={`Delete ${contact.name}`}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </span>
        </button>
      </div>
    </div>
  );
}

