import { useState, useRef } from 'react';
import { useAppSelector } from '@/store/store';
import { exportToExcel, importFromExcel, downloadTemplate } from '@/lib/excel';

const initialContacts = [
  { id: '1', name: 'John Smith', email: 'john@acme.com', phone: '+1 555-0123', company: 'Acme Corp', role: 'CEO', ownerId: 'user-rehaan', department: 'Sales' },
  { id: '2', name: 'Jane Doe', email: 'jane@techstart.io', phone: '+1 555-0456', company: 'TechStart', role: 'CTO', ownerId: 'user-emp-a', department: 'Sales' },
  { id: '3', name: 'Bob Wilson', email: 'bob@globaltech.com', phone: '+1 555-0789', company: 'GlobalTech', role: 'Manager', ownerId: 'user-emp-b', department: 'Sales' },
  { id: '4', name: 'Alice Chen', email: 'alice@dataflow.ai', phone: '+1 555-0321', company: 'DataFlow', role: 'Engineer', ownerId: 'user-sood', department: 'Management' },
];

export function useContactsController() {
  const user = useAppSelector((s) => s.auth.user);
  const [contacts, setContacts] = useState<any[]>(initialContacts);
  const [search, setSearch] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importPreview, setImportPreview] = useState<any[]>([]);
  const [importing, setImporting] = useState(false);
  const [newContactModalOpen, setNewContactModalOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Strict Privacy Filtering
  const visibleContacts = contacts.filter(contact => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    if (user.role === 'SUPERVISOR') {
      return contact.department === user.department;
    }
    return contact.ownerId === user.id;
  });

  const filteredContacts = visibleContacts.filter((c: any) =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.company || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    exportToExcel(
      visibleContacts.map(({ name, email, phone, company, role }) => ({
        Name: name, Email: email, Phone: phone || '', Company: company || '', Role: role || '',
      })),
      'nexus_contacts', 'Contacts'
    );
  };

  const handleTemplate = () => {
    downloadTemplate(['Name', 'Email', 'Phone', 'Company', 'Role'], 'contacts', 'Contacts');
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importFromExcel(file);
      setImportPreview(data);
      setImportModalOpen(true);
    } catch { alert('Failed to parse file.'); }
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleImportConfirm = async () => {
    setImporting(true);
    setTimeout(() => {
      const newContacts = importPreview.map((row: any, i) => ({
        id: `import-${Date.now()}-${i}`,
        name: row.Name || 'Unknown',
        email: row.Email || '',
        phone: row.Phone || '',
        company: row.Company || '',
        role: row.Role || '',
        ownerId: user?.id,
        department: user?.department,
      }));
      setContacts([...contacts, ...newContacts]);
      setImportPreview([]);
      setImportModalOpen(false);
      setImporting(false);
    }, 600);
  };

  const handleCreateContact = async (data: { name: string; email: string; phone: string; company: string; role: string }) => {
    const newContact = {
      id: Date.now().toString(),
      ...data,
      ownerId: user?.id,
      department: user?.department,
    };
    setContacts([newContact, ...contacts]);
    setNewContactModalOpen(false);
  };

  return {
    contacts: visibleContacts,
    filteredContacts,
    search,
    setSearch,
    isLoading: false,
    importModalOpen,
    setImportModalOpen,
    importPreview,
    importing,
    newContactModalOpen,
    setNewContactModalOpen,
    fileRef,
    handleExport,
    handleTemplate,
    handleFileSelect,
    handleImportConfirm,
    handleCreateContact,
  };
}
