"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function DealsPage() {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold">Deals</h1>
        <p className="mt-4 text-muted-foreground">No Deals found.</p>
      </CardContent>
    </Card>
  );
}
