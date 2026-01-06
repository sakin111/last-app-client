/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { adminGetAllUser, deleteUser, updateUserStatus } from "@/services/Admin/admin.service";
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
import { ClearFilters, FilterSelect, SearchInput, SortSelect, TableFilterBar } from "@/components/Shared/TablerInput";
import { Paginator } from "@/components/Shared/Paginator";

interface User {
  id: string;
  profileImage: string | null;
  name: string;
  email: string;
  userStatus: "ACTIVE" | "INACTIVE" | "DELETED";
  bio: string | null;
  location: string | null;
}

export interface ApiResponse {
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [meta, setMeta] = useState<ApiResponse['meta'] | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const abortControllerRef = useRef<AbortController | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; userId: string | null; userName: string | null }>({
    open: false,
    userId: null,
    userName: null,
  });

  const queryKey = useMemo(() => searchParams.toString(), [searchParams]);


  const fetchUsers = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsRefreshing(true);

    try {
      const params: Record<string, string> = {};
      searchParams.forEach((v, k) => (params[k] = v));

      const res = await adminGetAllUser(params, controller.signal);

      if (res?.success) {
        setUsers(res.data ?? []);
        setMeta(res.meta ?? null);
      } else {
        setUsers([]);
        toast.error(res?.message || "Failed to fetch users");
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        toast.error("Unexpected error");
        console.error(e);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [queryKey, searchParams]);

  useEffect(() => {
    fetchUsers();
    return () => abortControllerRef.current?.abort();
  }, [fetchUsers]);



  // Pagination
  const onPageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) params.delete("page");
      else params.set("page", String(page));

      router.replace(params.toString() ? `?${params.toString()}` : "", { scroll: false });
    },
    [router, searchParams]
  );

  const handleStatusUpdate = async (userId: string, newStatus: "ACTIVE" | "INACTIVE") => {
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

  const openDeleteDialog = useCallback((userId: string, userName: string) => {
    setDeleteDialog({ open: true, userId, userName });
  }, []);

  const getStatusBadgeVariant = useCallback(
    (status: "ACTIVE" | "INACTIVE" | "DELETED"): "default" | "destructive" | "secondary" | "outline" => {
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
    },
    []
  );

  const getInitials = useCallback((name: string) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  }, []);

  const sortOptions = useMemo(
    () => [
      { label: "Old User", value: "createdAt" },
      { label: "New User", value: "-createdAt" },
    ],
    []
  );

  const statusFilterOptions = useMemo(
    () => [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
      { label: "Deleted", value: "DELETED" },
    ],
    []
  );

  const hasActiveFilters = useMemo(
    () => searchParams.get("searchTerm") || searchParams.get("sort") || searchParams.get("userStatus"),
    [searchParams]
  );

  const UserCard = ({ user }: { user: User }) => (
    <div className="border rounded-lg p-4 space-y-4 bg-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src={user.profileImage || undefined} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">{user.name}</div>
            <div className="text-sm text-muted-foreground truncate">{user.email}</div>
          </div>
        </div>
        <Badge variant={getStatusBadgeVariant(user.userStatus)} className="flex-shrink-0">
          {user.userStatus}
        </Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-muted-foreground">Bio: </span>
          <span>{user.bio || "No bio provided"}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Location: </span>
          <span>{user.location || "Not specified"}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {user.userStatus === "ACTIVE" ? (
          <>
            <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(user.id, "INACTIVE")} disabled={actionLoading === user.id}>
              {actionLoading === user.id ? "Processing..." : "Deactivate"}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(user.id, user.name)} disabled={actionLoading === user.id}>
              Delete
            </Button>
          </>
        ) : user.userStatus === "INACTIVE" ? (
          <>
            <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(user.id, "ACTIVE")} disabled={actionLoading === user.id}>
              {actionLoading === user.id ? "Processing..." : "Activate"}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(user.id, user.name)} disabled={actionLoading === user.id}>
              Delete
            </Button>
          </>
        ) : (
          <span className="text-sm text-muted-foreground w-full text-center py-2">Deleted</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>User Management</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Manage all registered users</p>
            </div>
            {isRefreshing && (
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Updating...
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <TableFilterBar>
            <SearchInput placeholder="Search by name or email..." />
            <SortSelect options={sortOptions} defaultSort="-createdAt" />
            <FilterSelect name="userStatus" label="User Status" options={statusFilterOptions} placeholder="All Status" />
            <ClearFilters preserveParams={[]} />
          </TableFilterBar>

          {loading && users.length === 0 ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-lg font-medium mb-1">{hasActiveFilters ? "No users found" : "No users yet"}</div>
              <p className="text-sm">{hasActiveFilters ? "Try adjusting your filters to see more results" : "Users will appear here once they register"}</p>
            </div>
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">User</TableHead>
                      <TableHead className="w-[200px]">Email</TableHead>
                      <TableHead className="min-w-[150px]">Bio</TableHead>
                      <TableHead className="w-[150px]">Location</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[200px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.profileImage || undefined} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="font-medium truncate">{user.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell><div className="line-clamp-2">{user.bio || "No bio provided"}</div></TableCell>
                        <TableCell>{user.location || "Not specified"}</TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(user.userStatus)}>{user.userStatus}</Badge></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {user.userStatus === "ACTIVE" ? (
                              <>
                                <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(user.id, "INACTIVE")} disabled={actionLoading === user.id}>{actionLoading === user.id ? "..." : "Deactivate"}</Button>
                                <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(user.id, user.name)} disabled={actionLoading === user.id}>Delete</Button>
                              </>
                            ) : user.userStatus === "INACTIVE" ? (
                              <>
                                <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(user.id, "ACTIVE")} disabled={actionLoading === user.id}>{actionLoading === user.id ? "..." : "Activate"}</Button>
                                <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(user.id, user.name)} disabled={actionLoading === user.id}>Delete</Button>
                              </>
                            ) : <span className="text-sm text-muted-foreground">Deleted</span>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="lg:hidden space-y-4">{users.map((user) => <UserCard key={user.id} user={user} />)}</div>
            </>
          )}

          {users.length > 0 && meta && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground order-2 sm:order-1">
                Showing {(meta.page - 1) * meta.limit + 1}–{Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
              </div>
              <div className="order-1 sm:order-2">
                <Paginator page={meta.page} totalPages={meta.totalPage} onPageChange={onPageChange} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, userId: null, userName: null })}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user <strong>{deleteDialog.userName}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {actionLoading ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
