import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ProgramFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  users: { id: string; name: string }[];
}

const ProgramForm: React.FC<ProgramFormProps> = ({ onClose, onSubmit, users }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    memberIds: [] as string[],
    startDate: '',
    endDate: '',
    notes: '',
    search: '',
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setForm((prev) => ({ ...prev, memberIds: selected }));
  };

  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Program name is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.startDate) newErrors.startDate = 'Start date is required';
    if (!form.endDate) newErrors.endDate = 'End date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  // Filter users by search
  const filteredUsers = form.search
    ? users.filter((u) => u.name.toLowerCase().includes(form.search.toLowerCase()))
    : users;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Program Name *</label>
        <Input name="name" value={form.name} onChange={handleChange} required />
        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
      </div>
      <div>
        <label className="block font-medium">Description *</label>
        <Textarea name="description" value={form.description} onChange={handleChange} required />
        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
      </div>
      <div>
        <label className="block font-medium">Select Members</label>
        <Input
          name="search"
          value={form.search}
          onChange={handleChange}
          placeholder="Search users..."
          className="mb-2"
        />
        <select
          multiple
          className="w-full border rounded p-2"
          value={form.memberIds}
          onChange={handleMemberChange}
        >
          {filteredUsers.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium">Start Date *</label>
          <Input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
          {errors.startDate && <div className="text-red-500 text-sm">{errors.startDate}</div>}
        </div>
        <div className="flex-1">
          <label className="block font-medium">End Date *</label>
          <Input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
          {errors.endDate && <div className="text-red-500 text-sm">{errors.endDate}</div>}
        </div>
      </div>
      <div>
        <label className="block font-medium">Additional Notes</label>
        <Textarea name="notes" value={form.notes} onChange={handleChange} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Create Program</Button>
      </div>
    </form>
  );
};

export default ProgramForm; 