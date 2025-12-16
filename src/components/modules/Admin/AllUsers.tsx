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
import { adminGetAllUser, deleteUser, updateUserStatus } from "@/services/Admin/admin.service";




interface UserAll {
  id: string;
  profileImage: string;
  name: string;
  email: string;
  userStatus: "ACTIVE" | "INACTIVE" | "DELETED"
  bio: string;
  location: string;
}

export default function AllUsers() {
  const [users, setUsers] = useState<UserAll[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await adminGetAllUser();
    if (res?.success) {
      setUsers(res.data || []);
    }
    setLoading(false);
  };

  console.log(users);

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (
    id: string,
    userStatus: "INACTIVE" | "DELETED"
  ) => {
    try {
      setUpdatingId(id);
      await updateUserStatus(id, userStatus);
      toast.success(`Request ${userStatus}`);
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update User");
    } finally {
      setUpdatingId(null);
    }
  };
  const handleDelete = async (
    userId: string,
  ) => {
    try {
     setLoading(true)
      await deleteUser(userId);
      toast.success(`user deleted successfully`);
      setLoading(false)
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the user");
    } 
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Users for Admin User
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              No one user in this website.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Bio
                    </TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.map((user, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            
                            {user?.name?.charAt(0)?.toUpperCase()}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        {user?.email}
                      </TableCell>

                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {user.bio || "No message provided"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {user.location || "No message provided"}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            user.userStatus === "ACTIVE"
                              ? "default"
                              : user.userStatus === "INACTIVE"
                              ? "destructive"
                              :user.userStatus === "DELETED"? "secondary"
                              : "outline"
                          }
                        >
                          {user.userStatus}
                        </Badge>
                      </TableCell>



                      <TableCell>
                        {user.userStatus === "ACTIVE" ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleStatusUpdate(user.id, "INACTIVE")
                              }
                              disabled={updatingId === user.id}
                            >
                              Accept
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleDelete(user.id)
                              }
                              disabled={loading}
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
