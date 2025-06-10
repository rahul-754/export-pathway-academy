import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DeleteIcon,
  Edit2,
  FileText,
  Presentation,
  Trash,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { CourseFormData } from "../CourseForm";
import { useEffect, useLayoutEffect, useState } from "react";
import { getCourseById } from "@/Apis/Apis";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SessionProps = {
  session: FieldArrayWithId<CourseFormData, "sessions", "id">;
  index: number;
  removeSession: UseFieldArrayRemove;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<CourseFormData, any, CourseFormData>;
};

export default function Session({
  session,
  index,
  form,
  removeSession,
}: SessionProps) {
  const [disabled, setDisabled] = useState(true);
  const [viewVideo, setViewVideo] = useState(false);
  const [viewPpt, setViewPpt] = useState(false);
  const [viewNotes, setViewNotes] = useState(false);

  return (
    <Card className={`border border-gray-200 `}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold">Session {index + 1}</h4>
          <div className="flex gap-5 items-start justify-center">
            <Button
              type="button"
              variant={disabled ? "outline" : "secondary"}
              size="sm"
              onClick={() => setDisabled((state) => !state)}
            >
              <Edit2 className={`w-4 h-4 ${!disabled && "text-blue-600"}`} />
            </Button>
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure? This action cannot be undone."))
                    removeSession(index);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <FormField
          control={form.control}
          disabled={disabled}
          name={`sessions.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Title</FormLabel>
              <FormControl>
                <Input
                  autoFocus={false}
                  disabled={disabled}
                  placeholder="Enter session title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={disabled}
          name={`sessions.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Description</FormLabel>
              <FormControl>
                <Textarea
                  autoFocus={false}
                  disabled={disabled}
                  placeholder="Enter session description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`sessions.${index}.sessionImage`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Image</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="relative group">
                    {!disabled && (
                      <Button
                        onClick={() => field.onChange(null)}
                        variant="destructive"
                        className="absolute top-0 right-0"
                      >
                        <Trash />
                      </Button>
                    )}
                    <img
                      src={
                        "https://terrasourcing.com/Terra-lms-files/Basic/images/whatsapp%20automation.png"
                      }
                      alt={`Session ${index + 1} image`}
                      className="w-full h-auto rounded-lg min-h-[100px] border"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500">
                          Upload an image
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    </div>
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`sessions.${index}.previewVideo`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Videos</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="relative group">
                    {!disabled && (
                      <Button
                        onClick={() => field.onChange(null)}
                        variant="destructive"
                        className="absolute top-0 right-0 z-[900]"
                      >
                        <Trash />
                      </Button>
                    )}
                    <video
                      width="320"
                      height="240"
                      controls
                      className="w-full h-auto"
                    >
                      <source src={field.value as string} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="video-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500">
                          Upload videos
                        </span>
                        <input
                          id="video-upload"
                          type="file"
                          accept="video/*"
                          multiple
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(Array.from(e.target.files || null))
                          }
                        />
                      </label>
                    </div>
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name={`sessions.${index}.price.amount`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    disabled={disabled}
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`sessions.${index}.price.currency`}
            render={({ field }) => (
              <FormItem className="w-32">
                <FormLabel>Currency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={disabled}
                >
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            disabled={disabled}
            name={`sessions.${index}.videoUrl`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <div className="border border-gray-300 rounded p-3 text-center relative">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    {field.value ? (
                      <>
                        <button
                          type="button"
                          className="text-sm text-green-600 font-bold"
                          onClick={() => setViewVideo(true)}
                        >
                          View Video
                        </button>
                        {!disabled && (
                          <Button
                            type="button"
                            variant="destructive"
                            className="text-sm text-red-600 font-bold rounded-bl-xl rounded-tr-none rounded-tl-sm rounded-br-sm w-10 h-10 absolute top-0 right-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              field.onChange(null);
                            }}
                          >
                            <Trash className="text-white" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <label
                        htmlFor={`video-${index}`}
                        className={`${
                          disabled ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <span
                          className={`text-sm text-blue-600 ${
                            disabled && "text-gray-600"
                          }`}
                        >
                          Upload Video
                        </span>
                        <input
                          id={`video-${index}`}
                          type="file"
                          accept="video/*"
                          disabled={disabled}
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            disabled={disabled}
            control={form.control}
            name={`sessions.${index}.notes`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <div className="relative border border-gray-300 rounded p-3 text-center">
                    <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    {field.value ? (
                      <>
                        <button
                          type="button"
                          className="text-sm text-green-600 font-bold"
                          onClick={() => setViewNotes(true)}
                        >
                          View Notes
                        </button>
                        {!disabled && (
                          <Button
                            type="button"
                            variant="destructive"
                            className="text-sm text-red-600 font-bold rounded-bl-xl rounded-tr-none rounded-tl-sm rounded-br-sm w-10 h-10 absolute top-0 right-0"
                            onClick={(e) => {
                              e.stopPropagation();

                              field.onChange(null);
                            }}
                          >
                            <Trash className="text-white" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <label
                        htmlFor={`notes-${index}`}
                        className={`${
                          disabled ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <span
                          className={`text-sm text-blue-600 ${
                            disabled && "text-gray-600"
                          }`}
                        >
                          Upload Notes
                        </span>
                        <input
                          id={`notes-${index}`}
                          type="file"
                          disabled={disabled}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            disabled={disabled}
            name={`sessions.${index}.ppt`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>PPT (Optional)</FormLabel>
                <FormControl>
                  <div className="border border-gray-300 rounded p-3 text-center relative">
                    <Presentation className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    {field.value ? (
                      <>
                        <button
                          type="button"
                          className="text-sm text-green-600 font-bold"
                          onClick={() => setViewPpt(true)}
                        >
                          View Ppt
                        </button>
                        {!disabled && (
                          <Button
                            type="button"
                            variant="destructive"
                            className="text-sm text-red-600 font-bold rounded-bl-xl rounded-tr-none rounded-tl-sm rounded-br-sm w-10 h-10 absolute top-0 right-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              field.onChange(null);
                            }}
                          >
                            <Trash className="text-white" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <label
                        htmlFor={`ppt-${index}`}
                        className={`${
                          disabled ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <span
                          className={`text-sm text-blue-600 ${
                            disabled && "text-gray-600"
                          }`}
                        >
                          Upload PPT
                        </span>
                        <input
                          id={`ppt-${index}`}
                          type="file"
                          disabled={disabled}
                          accept=".ppt,.pptx"
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      {viewVideo && (
        <Dialog open={viewVideo} onOpenChange={setViewVideo}>
          <DialogContent className="max-w-2xl w-full p-4">
            <video
              controls
              autoPlay
              className="w-full h-auto rounded"
              src={session.videoUrl as string}
            >
              Your browser does not support the video tag.
            </video>
          </DialogContent>
        </Dialog>
      )}

      {viewNotes && (
        <Dialog open={viewNotes} onOpenChange={setViewNotes}>
          <DialogContent className="max-w-2xl w-full p-4">
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                session.notes as string
              )}&embedded=true`}
              className="flex-grow w-full min-h-[80vh]"
              frameBorder="0"
              title="Notes Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </DialogContent>
        </Dialog>
      )}
      {viewPpt && (
        <Dialog open={viewPpt} onOpenChange={setViewPpt}>
          <DialogContent className="max-w-2xl w-full p-4">
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                session.ppt as string
              )}&embedded=true`}
              className="flex-grow w-full min-h-[80vh]"
              frameBorder="0"
              title="Ppt Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
