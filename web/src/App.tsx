import { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { ContactList } from './components/ContactList';
import { ContactModal } from './components/ContactModal';
import type { Contact, ContactInput } from './types/contact';
import { getAllContacts, searchContacts, createContact, updateContact, deleteContact } from './services/api';

type ModalMode = 'create' | 'edit';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    try {
      const results = query.trim() ? await searchContacts(query) : await getAllContacts();
      setContacts(results);
      setIsSearchEmpty(query.trim() !== '' && results.length === 0);
      // Update isEmpty only when not searching (all contacts view)
      if (!query.trim()) {
        setIsEmpty(results.length === 0);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (contact: Contact) => {
    setModalMode('edit');
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleSubmitContact = async (data: ContactInput) => {
    try {
      if (modalMode === 'create') {
        await createContact(data);
      } else if (selectedContact) {
        await updateContact(selectedContact.id, data);
      }
      // Refresh the list
      const results = searchQuery.trim() 
        ? await searchContacts(searchQuery) 
        : await getAllContacts();
      setContacts(results);
      // Update empty states
      if (!searchQuery.trim()) {
        setIsEmpty(results.length === 0);
      } else {
        setIsSearchEmpty(results.length === 0);
      }
    } catch (error) {
      // Re-throw error so ContactModal can handle it
      throw error;
    }
  };

  const handleDeleteContact = async (contact: Contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        console.log('🔴 [DELETE] Deleting contact:', contact.id);
        await deleteContact(contact.id);
        console.log('🔴 [DELETE] Successfully deleted');
        // Remove from list
        const updatedContacts = contacts.filter(c => c.id !== contact.id);
        setContacts(updatedContacts);
        // Update empty states
        if (!searchQuery.trim()) {
          setIsEmpty(updatedContacts.length === 0);
        } else {
          setIsSearchEmpty(updatedContacts.length === 0);
        }
      } catch (error: any) {
        console.error('🔴 [DELETE] Error:', error);
        alert(`Failed to delete contact: ${error.message || 'Unknown error'}`);
      }
    }
  };

  // Load initial contacts (only once)
  useEffect(() => {
    let isMounted = true;
    const loadContacts = async () => {
      setIsLoading(true);
      try {
        console.log('📥 [LOAD] Loading initial contacts...');
        const results = await getAllContacts();
        if (isMounted) {
          setContacts(results);
          setIsEmpty(results.length === 0);
          console.log('📥 [LOAD] Loaded', results.length, 'contacts');
        }
      } catch (error) {
        console.error('📥 [LOAD] Error:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    loadContacts();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 leading-tight">Contacts Manager</h1>
        
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
          <div className="flex-1 sm:mr-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
            aria-label="Add new contact"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Contact
            </span>
          </button>
        </div>

        <ContactList
          contacts={contacts}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteContact}
          isEmpty={isEmpty}
          isSearchEmpty={isSearchEmpty}
          isLoading={isLoading}
        />

        <ContactModal
          isOpen={isModalOpen}
          mode={modalMode}
          contact={selectedContact}
          onClose={handleCloseModal}
          onSubmit={handleSubmitContact}
        />
      </div>
    </div>
  );
}

export default App;
