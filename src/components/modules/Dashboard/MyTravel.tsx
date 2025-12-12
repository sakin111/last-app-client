"use client";

import React, { useEffect, useState } from "react";
import { myTravel } from "@/services/Dashboard/travel.service";
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
import { timeAgo } from "@/lib/time-ago";

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

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const result = await myTravel();
        if (result?.data) {
          setTravels(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading travels...</div>;
  }

  if (!travels || travels.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        You have not created any travels yet.
      </div>
    );
  }

  return (
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
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" className="ml-2">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
