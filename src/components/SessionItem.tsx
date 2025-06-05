import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  CheckCircle,
  Lock,
  Video as VideoIcon,
  FileText,
  Presentation,
  Lock as LockIcon,
  Play,
} from "lucide-react";

const SessionItem = ({
  session,
  isPurchased,
  isInCart,
  onAddToCart,
  onWatchPreview,
  onWatchFullVideo,
  onViewNotes,
  onViewPPT,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border border-blue-600 rounded-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="rounded-lg bg-blue-100 flex items-center justify-center"
              style={{ width: "200px", height: "auto" }}
            >
              <img
                src={session.sessionImage}
                alt={session.title}
                className="w-full h-full object-cover"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            </div>
            <div>
              <CardTitle className="text-lg">{session.title}</CardTitle>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-800 font-bold" />
            <span className="text-sm text-blue-800 font-bold">
              {session.duration}
            </span>
            {isPurchased && session.isCompleted && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
            {!isPurchased && (
              <Lock className="h-5 w-5 text-blue-800 font-bold" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-3">What you'll learn:</h4>
            <h5 className="mb-2">{session.description}</h5>
            <div className="flex gap-4">
              {!isPurchased && (
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-blue-700 text-blue-900 font-bold hover:bg-blue-50 flex items-center ${
                    isInCart ? "bg-green-600 hover:bg-green-700 text-white" : ""
                  }`}
                  onClick={onAddToCart}
                  disabled={isInCart}
                >
                  {isInCart
                    ? "Added to Cart"
                    : `Add to Cart - ${session.price.currency} ${session.price.amount}`}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-blue-900 text-blue-900 font-bold hover:bg-blue-50 flex items-center"
                onClick={onWatchPreview}
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Preview
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Course Materials:</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                disabled={!isPurchased || !session.videoUrl}
                onClick={onWatchFullVideo}
              >
                <VideoIcon className="h-4 w-4 mr-2" />
                Watch Video
                {!isPurchased && (
                  <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                disabled={!isPurchased || !session.notes}
                onClick={onViewNotes}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Notes
                {!isPurchased && (
                  <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                disabled={!isPurchased || !session.ppt}
                onClick={onViewPPT}
              >
                <Presentation className="h-4 w-4 mr-2" />
                View PPT
                {!isPurchased && (
                  <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionItem;
