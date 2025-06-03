
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Upload, Calendar as CalendarIcon, FileText, Presentation } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Session {
  title: string;
  video: File | null;
  notes: File | null;
  ppt: File | null;
}

interface CourseFormData {
  title: string;
  instructor: string;
  shortNote: string;
  description: string;
  image: File | null;
  videos: File[];
  tags: string[];
  category: string;
  published: boolean;
  upcoming: boolean;
  featured: boolean;
  publishedOn: Date | null;
  courseType: 'free' | 'paid';
  amount: number;
  currency: string;
  sessions: Session[];
}

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
  courseData?: Partial<CourseFormData>;
  isEditing?: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({ open, onClose, courseData, isEditing = false }) => {
  const [tagInput, setTagInput] = useState('');
  console.log(courseData)
  const form = useForm<CourseFormData>({
    defaultValues: {
      title: courseData?.title || '',
      instructor: courseData?.instructor || '',
      shortNote: courseData?.shortNote || '',
      description: courseData?.description || '',
      image: null,
      videos: [],
      tags: courseData?.tags || [],
      category: courseData?.category || '',
      published: courseData?.published || false,
      upcoming: courseData?.upcoming || false,
      featured: courseData?.featured || false,
      publishedOn: courseData?.publishedOn || null,
      courseType: courseData?.courseType || 'free',
      amount: courseData?.amount || 0,
      currency: courseData?.currency || 'USD',
      sessions: courseData?.sessions || [],
    },
  });
  
  const { fields: sessionFields, append: appendSession, remove: removeSession } = useFieldArray({
    control: form.control,
    name: 'sessions',
  });

  useEffect(() => {
  if (courseData) {
    form.reset({
      title: courseData.title || '',
      instructor: courseData.instructor || '',
      shortNote: courseData.shortNote || '',
      description: courseData.description || '',
      image: null,
      videos: [],
      tags: courseData.tags || [],
      category: courseData.category || '',
      published: courseData.published || false,
      upcoming: courseData.upcoming || false,
      featured: courseData.featured || false,
      publishedOn: courseData.publishedOn ? new Date(courseData.publishedOn) : null,
      courseType: courseData.courseType || 'free',
      amount: courseData.amount || 0,
      currency: courseData.currency || 'USD',
      sessions: courseData.sessions || [],
    });
  }
}, [courseData, form]);

  const courseType = form.watch('courseType');
  const tags = form.watch('tags');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      form.setValue('tags', [...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue('tags', tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddSession = () => {
    appendSession({
      title: '',
      video: null,
      notes: null,
      ppt: null,
    });
  };

  const onSubmit = (data: CourseFormData) => {
    console.log('Course data:', data);
    // Handle form submission here
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Course' : 'Create New Course'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter instructor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortNote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Note</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief course summary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detailed course description" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Media Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Image</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-2">
                            <label htmlFor="image-upload" className="cursor-pointer">
                              <span className="text-blue-600 hover:text-blue-500">Upload an image</span>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                              />
                            </label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Videos</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-2">
                            <label htmlFor="video-upload" className="cursor-pointer">
                              <span className="text-blue-600 hover:text-blue-500">Upload videos</span>
                              <input
                                id="video-upload"
                                type="file"
                                accept="video/*"
                                multiple
                                className="hidden"
                                onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                              />
                            </label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <Button type="button" onClick={handleAddTag}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </FormItem>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="export-basics">Export Basics</SelectItem>
                          <SelectItem value="documentation">Documentation</SelectItem>
                          <SelectItem value="trade-laws">Trade Laws</SelectItem>
                          <SelectItem value="customs">Customs</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-6">
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Published</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="upcoming"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Upcoming</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Featured</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="publishedOn"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Published On</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="courseType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Course Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="free" id="free" />
                            <label htmlFor="free">Free</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paid" id="paid" />
                            <label htmlFor="paid">Paid</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {courseType === 'paid' && (
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0.00" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormLabel>Currency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="INR">INR</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sessions */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Course Sessions</CardTitle>
                  <Button type="button" onClick={handleAddSession} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Session
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessionFields.map((session, index) => (
                  <Card key={session.id} className="border border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Session {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSession(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <FormField
                        control={form.control}
                        name={`sessions.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter session title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`sessions.${index}.video`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video</FormLabel>
                              <FormControl>
                                <div className="border border-gray-300 rounded p-3 text-center">
                                  <label htmlFor={`video-${index}`} className="cursor-pointer">
                                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-blue-600">Upload Video</span>
                                    <input
                                      id={`video-${index}`}
                                      type="file"
                                      accept="video/*"
                                      className="hidden"
                                      onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                    />
                                  </label>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`sessions.${index}.notes`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes</FormLabel>
                              <FormControl>
                                <div className="border border-gray-300 rounded p-3 text-center">
                                  <label htmlFor={`notes-${index}`} className="cursor-pointer">
                                    <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-blue-600">Upload Notes</span>
                                    <input
                                      id={`notes-${index}`}
                                      type="file"
                                      accept=".pdf,.doc,.docx"
                                      className="hidden"
                                      onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                    />
                                  </label>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`sessions.${index}.ppt`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PPT (Optional)</FormLabel>
                              <FormControl>
                                <div className="border border-gray-300 rounded p-3 text-center">
                                  <label htmlFor={`ppt-${index}`} className="cursor-pointer">
                                    <Presentation className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-blue-600">Upload PPT</span>
                                    <input
                                      id={`ppt-${index}`}
                                      type="file"
                                      accept=".ppt,.pptx"
                                      className="hidden"
                                      onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                    />
                                  </label>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {sessionFields.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No sessions added yet. Click "Add Session" to get started.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Course' : 'Create Course'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseForm;
