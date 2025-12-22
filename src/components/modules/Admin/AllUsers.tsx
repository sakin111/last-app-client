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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  adminGetAllUser,
  deleteUser,
  updateUserStatus,
} from "@/services/Admin/admin.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  profileImage: string | null;
  name: string;
  email: string;
  userStatus: "ACTIVE" | "INACTIVE" | "DELETED";
  bio: string | null;
  location: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: User[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    userId: string | null;
    userName: string | null;
  }>({
    open: false,
    userId: null,
    userName: null,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminGetAllUser();
      
      if (response?.success && response.data) {
        setUsers(response.data);
      } else {
        toast.error(response?.message || "Failed to fetch users");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An unexpected error occurred");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusUpdate = async (
    userId: string,
    newStatus: "ACTIVE" | "INACTIVE"
  ) => {
    try {
      setActionLoading(userId);
      const response = await updateUserStatus(userId, newStatus);
      
      if (response?.success) {
        toast.success(`User status updated to ${newStatus}`);
        await fetchUsers();
      } else {
        toast.error(response?.message || "Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.userId) return;

    try {
      setActionLoading(deleteDialog.userId);
      const response = await deleteUser(deleteDialog.userId);
      
      if (response?.success) {
        toast.success("User deleted successfully");
        await fetchUsers();
      } else {
        toast.error(response?.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setActionLoading(null);
      setDeleteDialog({ open: false, userId: null, userName: null });
    }
  };

  const openDeleteDialog = (userId: string, userName: string) => {
    setDeleteDialog({
      open: true,
      userId,
      userName,
    });
  };

  const getStatusBadgeVariant = (
    status: "ACTIVE" | "INACTIVE" | "DELETED"
  ) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "INACTIVE":
        return "destructive";
      case "DELETED":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">
              User Management
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage all registered users
            </p>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No users found in the system.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Bio
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Location
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.profileImage || undefined} />
                              <AvatarFallback>
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          {user.email}
                        </TableCell>

                        <TableCell className="hidden md:table-cell max-w-xs">
                          <p className="truncate">
                            {user.bio || "No bio provided"}
                          </p>
                        </TableCell>

                        <TableCell className="hidden lg:table-cell">
                          {user.location || "Not specified"}
                        </TableCell>

                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.userStatus)}>
                            {user.userStatus}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-2">
                            {user.userStatus === "ACTIVE" ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleStatusUpdate(user.id, "INACTIVE")
                                  }
                                  disabled={actionLoading === user.id}
                                >
                                  {actionLoading === user.id
                                    ? "Processing..."
                                    : "Deactivate"}
                                </Button>

                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    openDeleteDialog(user.id, user.name)
                                  }
                                  disabled={actionLoading === user.id}
                                >
                                  Delete
                                </Button>
                              </>
                            ) : user.userStatus === "INACTIVE" ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleStatusUpdate(user.id, "ACTIVE")
                                  }
                                  disabled={actionLoading === user.id}
                                >
                                  {actionLoading === user.id
                                    ? "Processing..."
                                    : "Activate"}
                                </Button>

                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    openDeleteDialog(user.id, user.name)
                                  }
                                  disabled={actionLoading === user.id}
                                >
                                  Delete
                                </Button>
                              </>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                Deleted
                              </span>
                            )}
                          </div>
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


      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, userId: null, userName: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user{" "}
              <span className="font-semibold">{deleteDialog.userName}</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading !== null}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={actionLoading !== null}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {actionLoading ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}