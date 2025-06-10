import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface Batch {
  id: string;
  title: string;
  description: string;
  batchDetails: string;
  metaImage: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  seatCount: number;
  enrolledCount: number;
  medium: 'Online' | 'Offline';
  category: string;
  evaluationEndDate: string;
  batchDetailsRaw: string;
  isPaid: boolean;
  amount?: number;
  currency?: string;
  status: 'upcoming' | 'active' | 'completed';
}

interface BatchFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  batch?: Batch | null;
}

const BatchForm = ({ onClose, onSubmit, batch }: BatchFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    batchDetails: '',
    metaImage: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    seatCount: 0,
    medium: 'Online' as const,
    category: '',
    evaluationEndDate: '',
    batchDetailsRaw: '',
    isPaid: false,
    amount: 0,
    currency: 'INR'
  });

  useEffect(() => {
    if (batch) {
      setFormData({
        title: batch.title,
        description: batch.description,
        batchDetails: batch.batchDetails,
        metaImage: batch.metaImage,
        startDate: batch.startDate,
        endDate: batch.endDate,
        startTime: batch.startTime,
        endTime: batch.endTime,
        seatCount: batch.seatCount,
        medium: batch.medium,
        category: batch.category,
        evaluationEndDate: batch.evaluationEndDate,
        batchDetailsRaw: batch.batchDetailsRaw,
        isPaid: batch.isPaid,
        amount: batch.amount || 0,
        currency: batch.currency || 'INR'
      });
    }
  }, [batch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-[800px] max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{batch ? 'Edit Batch' : 'Create New Batch'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="batchDetails">Batch Details</Label>
                <Textarea
                  id="batchDetails"
                  name="batchDetails"
                  value={formData.batchDetails}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaImage">Meta Image URL</Label>
                <Input
                  id="metaImage"
                  name="metaImage"
                  value={formData.metaImage}
                  onChange={handleChange}
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seatCount">Seat Count</Label>
                <Input
                  id="seatCount"
                  name="seatCount"
                  type="number"
                  value={formData.seatCount}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evaluationEndDate">Evaluation End Date</Label>
                <Input
                  id="evaluationEndDate"
                  name="evaluationEndDate"
                  type="date"
                  value={formData.evaluationEndDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medium">Medium</Label>
                <Select
                  value={formData.medium}
                  onValueChange={(value) => handleSelectChange('medium', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batchDetailsRaw">Batch Details Raw</Label>
                <Textarea
                  id="batchDetailsRaw"
                  name="batchDetailsRaw"
                  value={formData.batchDetailsRaw}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPaid"
                    checked={formData.isPaid}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, isPaid: checked }))
                    }
                  />
                  <Label htmlFor="isPaid">Paid Batch</Label>
                </div>
              </div>

              {formData.isPaid && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => handleSelectChange('currency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {batch ? 'Update Batch' : 'Create Batch'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchForm; 