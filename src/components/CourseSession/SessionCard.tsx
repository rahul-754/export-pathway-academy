import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  AwardIcon,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Lock,
  LockIcon,
  LockOpen,
  Play,
  Presentation,
  Video,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";

export default function SessionCard({
  session,
  index,
  inCart,
  isAccessible,
  isCompleted,
  addToCart,
  handleWatchPreview,
  handleWatchFullVideo,
  handleViewNotes,
  handleViewPPT,
  handleQuizOpen,
}) {
  const { isAuthenticated, user } = useUser();

  const [open, setOpen] = useState(false);
  const handleDownloadCertificate = async () => {
    const certificate = document.getElementById("certificate-template");
    if (!certificate) return;

    // Make it visible for rendering
    certificate.style.display = "block";

    // Render to canvas
    const canvas = await html2canvas(certificate, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Hide again
    certificate.style.display = "none";

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("certificate.pdf");
  };

  return (
    <Card key={session._id} className="overflow-hidden  mb-5">
      <CardHeader>
        <div className="flex items-start justify-between gap-10 relative">
          {/* LEFT: Image + Title + Buttons */}
          <div className="flex items-center gap-6 z-[1]">
            <img
              src={session.sessionImage}
              alt={session.title}
              className="max-w-[400px] h-full object-contain"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />

            <div className="flex flex-col gap-2 h-full justify-start ">
              <div className="flex items-center gap-2">
                {isAccessible && session.isCompleted && (
                  <CheckCircle className="h-7 w-7 text-green-600 hover:bg-green-600 hover:text-white p-1 rounded-full transition-colors" />
                )}
                <Badge variant="outline" className="w-fit space-x-2">
                  <Clock className="h-7 w-7 font-bold text-black p-1 rounded-full transition-colors" />
                  <span className="text-sm text-black font-bold">
                    {session.duration || 0} Minutes
                  </span>
                </Badge>
              </div>
              <h2 className=" text-2xl font-medium text-blue-600 z-0 select-none">
                Session {index + 1}
              </h2>
              <CardTitle
                title={session.title}
                className="text-4xl max-w-[700px] text-ellipsis tracking-tighter font-semibold mb-2"
              >
                {session.title}
              </CardTitle>
              {isAuthenticated &&
                (!isAccessible ? (
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4 text-amber-500 font-bold " />{" "}
                    <span className="mr-2 text-amber-500">Locked</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-2">
                    <LockOpen className="h-4 w-4 text-green-500 font-bold " />{" "}
                    <span className="mr-2 text-green-500">Unlocked</span>
                  </div>
                ))}
              <div className="flex gap-4">
                {isAuthenticated ? (
                  <>
                    {!isAccessible && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-blue-700 text-blue-900 font-bold hover:bg-blue-50 flex items-center ${
                          inCart
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : ""
                        }`}
                        onClick={() => addToCart(session._id)}
                        disabled={inCart}
                      >
                        {inCart
                          ? "Added to Cart"
                          : `Add to Cart - ${session.price.currency} ${session.price.amount}`}
                      </Button>
                    )}
                  </>
                ) : (
                  <Button variant="outline" disabled>
                    Please login to access
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-900 text-blue-900 font-bold hover:bg-blue-50 flex items-center"
                  onClick={() => handleWatchPreview(session)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    open
                      ? "border-black text-white bg-black"
                      : "border-blue-900 text-blue-900"
                  }  font-bold flex items-center`}
                  onClick={() => {
                    setOpen((temp) => !temp);
                  }}
                >
                  {open ? "View less " : "View more"}
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT: Clock + Lock + Show More */}
          <div className="flex flex-col items-end my-auto gap-4 z-[1]">
            {isAuthenticated && (
              <div className="flex flex-row-reverse ">
                <div className=" max-w-[300px] space-y-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-start"
                    disabled={!isAccessible || !session.videoUrl}
                    onClick={() => handleWatchFullVideo(session)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Watch Video
                    {!isAccessible && (
                      <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-start"
                    disabled={!isAccessible || !session.notes}
                    onClick={() => handleViewNotes(session)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Notes
                    {!isAccessible && (
                      <LockIcon className="h-3 w-3 ml-auto text-black font-bold" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-start"
                    disabled={!isAccessible || !session.ppt}
                    onClick={() => handleViewPPT(session)}
                  >
                    <Presentation className="h-4 w-4 mr-2" />
                    View PPT
                    {!isAccessible && (
                      <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-start"
                    disabled={!isAccessible || !session.quiz}
                    onClick={() => handleQuizOpen(session._id)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Attempt Quiz
                    {!isAccessible && (
                      <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-start"
                    disabled={!isAccessible}
                    onClick={handleDownloadCertificate}
                  >
                    <AwardIcon className="h-4 w-4 mr-2" />
                    Download certificate
                    {!isAccessible && (
                      <LockIcon className="h-3 w-3 ml-auto text-black font-bold" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      {isAuthenticated && (
        <div
          id="certificate-template"
          style={{
            display: "none",
            width: "1086px",
            height: "768px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -9999,
            backgroundImage: "url('sample 1 (4).jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            fontFamily: "serif",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "235px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#1976d2",
                fontSize: "26px",
                margin: 0,
              }}
            >
              {session.title || "Course Name"}
            </h3>
          </div>

          <div
            style={{
              position: "absolute",
              top: "370px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#1976d2", fontSize: "36px" }}>
              {user?.name || "User Name"}
            </h2>
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CardContent className=" border-t py-10">
              <h3 className="font-semibold text-xl">What you'll learn</h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-5 mt-5">
                <div className="px-10 py-8 shadow-lg border shadow-blue-200/50  rounded-xl w-full space-y-2 relative">
                  <h3 className="font-bold text-xl z-[1]">
                    Leverage AI Tools for Smarter Customer Outreach
                  </h3>
                  <p className=" text-md max-w-[75%] z-[1]">
                    Streamline your Email and WhatsApp marketing using
                    intelligent automation.
                  </p>
                  <span className="absolute bottom-0 right-0 text-9xl font-bold text-blue-600/10 select-none z-0">
                    1
                  </span>
                </div>
                <div className="px-10 py-8 shadow-lg border shadow-blue-200/50  rounded-xl w-full space-y-2 relative">
                  <h3 className="font-bold text-xl z-[1]">
                    Build Seamless Workflows with Zapier
                  </h3>
                  <p className=" text-md max-w-[75%] z-[1]">
                    Integrate your favorite apps to trigger personalized
                    messages effortlessly.
                  </p>
                  <span className="absolute bottom-0 right-0 text-9xl font-bold text-blue-600/10 z-0 select-none">
                    2
                  </span>
                </div>
                <div className="px-10 py-8 shadow-lg border shadow-blue-200/50  rounded-xl w-full space-y-2 relative">
                  <h3 className="font-bold text-xl z-[1]">
                    Use WhatsAuto and Mailchimp for Smart Follow-Ups
                  </h3>
                  <p className=" text-md max-w-[75%] z-[1]">
                    Engage customers at the right time with automated responses
                    and campaigns.
                  </p>
                  <span className="absolute bottom-0 right-0 text-9xl font-bold text-blue-600/10 z-0 select-none">
                    3
                  </span>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
