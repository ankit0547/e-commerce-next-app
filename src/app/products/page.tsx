"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ProductsPage() {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold">ProductsPage</h1>

        <p className="mt-4 text-muted-foreground">No Products found.</p>
      </CardContent>
    </Card>
  );
}
