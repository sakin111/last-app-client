"use client";

import React, { useEffect, useState } from "react";
import { DeleteMyTravelById, myTravel, UpdateMyTravel, } from "@/services/Dashboard/travel.server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";


interface Travel {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelType: string;
  budgetRange: string;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function MyTravel() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelType: "",
    budgetRange: "",
    visibility: true,
  });

  const fetchTravels = async () => {
    setLoading(true);
    try {
      const result = await myTravel();
      if (result?.data) setTravels(result.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch travels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  const handleEdit = (travel: Travel) => {
    setSelectedTravel(travel);
    setFormData({
      title: travel.title,
      destination: travel.destination,
      startDate: travel.startDate,
      endDate: travel.endDate,
      travelType: travel.travelType,
      budgetRange: travel.budgetRange,
      visibility: travel.visibility,
    });
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this travel?")) return;

    try {
      await DeleteMyTravelById(id);
      toast.success("Travel deleted successfully");
      fetchTravels();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete travel");
    }
  };



  const handleUpdate = async () => {
    if (!selectedTravel) return;
    try {
      await UpdateMyTravel(selectedTravel.id, formData);
      toast.success("Travel updated successfully");
      setOpenModal(false);
      fetchTravels();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update travel");
    }
  };

  if (loading) return <div className="text-center p-8">Loading travels...</div>;

  if (!travels || travels.length === 0)
    return <div className="text-center p-8 text-gray-500">You have not created any travels yet.</div>;

  return (
    <>
      <Card className="w-full overflow-auto">
        <CardHeader>
          <CardTitle>My Travels</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {travels.map((travel) => (
                <TableRow key={travel.id}>
                  <TableCell>{travel.title}</TableCell>
                  <TableCell>{travel.destination}</TableCell>
                  <TableCell>{new Date(travel.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(travel.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{travel.travelType}</TableCell>
                  <TableCell>{travel.budgetRange}</TableCell>
                  <TableCell>
                    <Badge variant={travel.visibility ? "default" : "outline"}>
                      {travel.visibility ? "Public" : "Private"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(travel)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="ml-2" onClick={() => handleDelete(travel.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Travel</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input
              placeholder="Destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
            <Input
              placeholder="Travel Type"
              value={formData.travelType}
              onChange={(e) => setFormData({ ...formData, travelType: e.target.value })}
            />
            <Input
              placeholder="Budget Range"
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            />
          </div>
          <DialogFooter className="mt-4 flex justify-end">
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
