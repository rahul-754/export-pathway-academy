import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Globe, IndianRupee, Info, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

interface FormErrors {
  [key: string]: string;
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

  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (batch) {
      setFormData({
        title: batch.title || '',
        description: batch.description || '',
        batchDetails: batch.batchDetails || '',
        metaImage: batch.metaImage || '',
        startDate: batch.startDate || '',
        endDate: batch.endDate || '',
        startTime: batch.startTime || '',
        endTime: batch.endTime || '',
        seatCount: batch.seatCount || 0,
        medium: batch.medium || 'Online',
        category: batch.category || '',
        evaluationEndDate: batch.evaluationEndDate || '',
        batchDetailsRaw: batch.batchDetailsRaw || '',
        isPaid: batch.isPaid || false,
        amount: batch.amount || 0,
        currency: batch.currency || 'INR'
      });
    }
  }, [batch]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const now = new Date();

    // Basic Info validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Schedule validation
    if (formData.startDate && formData.startTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      if (startDateTime < now) {
        newErrors.startDate = 'Start date must be in the future';
      }
    } else if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData.endDate && formData.endTime && formData.startDate && formData.startTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
      if (endDateTime <= startDateTime) {
        newErrors.endDate = 'End date must be after start date';
      }
    } else if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.evaluationEndDate && formData.endDate && formData.endTime) {
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
      const evaluationEndDate = new Date(formData.evaluationEndDate);
      if (evaluationEndDate < endDateTime) {
        newErrors.evaluationEndDate = 'Evaluation end date must be after batch end date';
      }
    } else if (!formData.evaluationEndDate) {
      newErrors.evaluationEndDate = 'Evaluation end date is required';
    }

    // Details validation
    if (formData.seatCount <= 0) {
      newErrors.seatCount = 'Seat count must be greater than 0';
    }

    if (!formData.batchDetails.trim()) {
      newErrors.batchDetails = 'Batch details are required';
    }

    if (!formData.batchDetailsRaw.trim()) {
      newErrors.batchDetailsRaw = 'Raw batch details are required';
    }

    // Pricing validation
    if (formData.isPaid) {
      if (formData.amount <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
      }
      if (!formData.currency) {
        newErrors.currency = 'Currency is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save batch. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldError = (fieldName: string) => {
    if (hasSubmitted && errors[fieldName]) {
      return (
        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {errors[fieldName]}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]" style={{margin:0, border:'none', boxShadow:'none', background:'rgba(0,0,0,0.5)', top:0, left:0, width:'100vw', height:'100vh', padding:0, zIndex:9999}}>
      <Card className="w-[900px] max-h-[90vh] overflow-y-auto bg-white border-0 shadow-none z-[9999]" style={{background:'#fff', border:'none', boxShadow:'none', zIndex:9999}}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{batch ? 'Edit Batch' : 'Create New Batch'}</CardTitle>
              <CardDescription>Fill in the details to {batch ? 'update' : 'create'} a new batch</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoading}>
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {errors.submit && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="title" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Title
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter a descriptive title for the batch</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter batch title"
                      required
                      disabled={isLoading}
                      className={hasSubmitted && errors.title ? 'border-red-500' : ''}
                    />
                    {renderFieldError('title')}
                  </div>

                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="category" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Category
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select a category for the batch</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter category"
                      required
                      disabled={isLoading}
                      className={hasSubmitted && errors.category ? 'border-red-500' : ''}
                    />
                    {renderFieldError('category')}
                  </div>

                  <div className="space-y-2 col-span-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="description" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Description
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Provide a brief description of the batch</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter a brief description"
                      required
                      disabled={isLoading}
                      className={hasSubmitted && errors.description ? 'border-red-500' : ''}
                    />
                    {renderFieldError('description')}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="startDate" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Start Date
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the batch start date</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={hasSubmitted && errors.startDate ? 'border-red-500' : ''}
                    />
                    {renderFieldError('startDate')}
                  </div>

                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="endDate" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            End Date
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the batch end date</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={hasSubmitted && errors.endDate ? 'border-red-500' : ''}
                    />
                    {renderFieldError('endDate')}
                  </div>

                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="startTime" className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Start Time
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the batch start time</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={hasSubmitted && errors.startTime ? 'border-red-500' : ''}
                    />
                    {renderFieldError('startTime')}
                  </div>

                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="endTime" className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            End Time
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the batch end time</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={hasSubmitted && errors.endTime ? 'border-red-500' : ''}
                    />
                    {renderFieldError('endTime')}
                  </div>

                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="evaluationEndDate" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Evaluation End Date
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the last date for evaluations</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="evaluationEndDate"
                      name="evaluationEndDate"
                      type="date"
                      value={formData.evaluationEndDate}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={hasSubmitted && errors.evaluationEndDate ? 'border-red-500' : ''}
                    />
                    {renderFieldError('evaluationEndDate')}
                  </div>

                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="medium" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Medium
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the batch delivery medium</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Select
                      value={formData.medium}
                      onValueChange={(value) => handleSelectChange('medium', value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger className={hasSubmitted && errors.medium ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select medium" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                    {renderFieldError('medium')}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="seatCount" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Seat Count
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter the maximum number of seats available</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="seatCount"
                      name="seatCount"
                      type="number"
                      value={formData.seatCount}
                      onChange={handleChange}
                      required
                      min="1"
                      disabled={isLoading}
                      className={hasSubmitted && errors.seatCount ? 'border-red-500' : ''}
                    />
                    {renderFieldError('seatCount')}
                  </div>

                  <div className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="metaImage" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Meta Image URL
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter the URL for the batch cover image</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="metaImage"
                      name="metaImage"
                      value={formData.metaImage}
                      onChange={handleChange}
                      type="url"
                      placeholder="Enter image URL"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="batchDetails" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Batch Details
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Provide detailed information about the batch</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Textarea
                      id="batchDetails"
                      name="batchDetails"
                      value={formData.batchDetails}
                      onChange={handleChange}
                      placeholder="Enter detailed batch information"
                      required
                      rows={4}
                      disabled={isLoading}
                      className={hasSubmitted && errors.batchDetails ? 'border-red-500' : ''}
                    />
                    {renderFieldError('batchDetails')}
                  </div>

                  <div className="space-y-2 col-span-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="batchDetailsRaw" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Raw Batch Details
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter raw batch details in HTML format</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Textarea
                      id="batchDetailsRaw"
                      name="batchDetailsRaw"
                      value={formData.batchDetailsRaw}
                      onChange={handleChange}
                      placeholder="Enter raw batch details"
                      required
                      rows={4}
                      disabled={isLoading}
                      className={hasSubmitted && errors.batchDetailsRaw ? 'border-red-500' : ''}
                    />
                    {renderFieldError('batchDetailsRaw')}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Label htmlFor="isPaid" className="flex items-center gap-2">
                              <IndianRupee className="h-4 w-4" />
                              Paid Batch
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Toggle if this is a paid batch</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Switch
                        id="isPaid"
                        checked={formData.isPaid}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, isPaid: checked }))
                        }
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {formData.isPaid && (
                    <>
                      <div className="space-y-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Label htmlFor="amount" className="flex items-center gap-2">
                                <IndianRupee className="h-4 w-4" />
                                Amount
                              </Label>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Enter the batch fee amount</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          value={formData.amount}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          required
                          disabled={isLoading}
                          className={hasSubmitted && errors.amount ? 'border-red-500' : ''}
                        />
                        {renderFieldError('amount')}
                      </div>

                      <div className="space-y-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Label htmlFor="currency" className="flex items-center gap-2">
                                <IndianRupee className="h-4 w-4" />
                                Currency
                              </Label>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Select the currency for the batch fee</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Select
                          value={formData.currency}
                          onValueChange={(value) => handleSelectChange('currency', value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger className={hasSubmitted && errors.currency ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">INR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                          </SelectContent>
                        </Select>
                        {renderFieldError('currency')}
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {batch ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    batch ? 'Update Batch' : 'Create Batch'
                  )}
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchForm; 