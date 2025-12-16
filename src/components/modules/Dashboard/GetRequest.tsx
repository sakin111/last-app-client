"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  getRequestsForMyPlans,
  updateRequestStatus,
} from "@/services/Dashboard/travel-comments.service";

interface RequestUser {
  name: string;
  email: string;
}

interface TravelRequest {
  id: string;
  planTitle: string;
  message: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  user: RequestUser;
  createdAt: string;
}

export default function GetRequest() {
  const [requests, setRequests] = useState<TravelRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await getRequestsForMyPlans();
    console.log(res,"this is from get req");
    if (res?.success) {
      setRequests(res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (
    requestId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      setUpdatingId(requestId);
      await updateRequestStatus(requestId, status);
      toast.success(`Request ${status}`);
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update request");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Requests for My Travel Plans
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              No one has requested your travel plans yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Message
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Requested At
                    </TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {requests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {req.user?.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{req.user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {req.user?.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        {req.planTitle}
                      </TableCell>

                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {req.message || "No message provided"}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            req.status === "ACCEPTED"
                              ? "default"
                              : req.status === "REJECTED"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {req.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        {req.status === "PENDING" ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleStatusUpdate(req.id, "ACCEPTED")
                              }
                              disabled={updatingId === req.id}
                            >
                              Accept
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleStatusUpdate(req.id, "REJECTED")
                              }
                              disabled={updatingId === req.id}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No action
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
