"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold">Orders</h1>

        <p className="mt-4 text-muted-foreground">No orders found.</p>
      </CardContent>
    </Card>
  );
}
