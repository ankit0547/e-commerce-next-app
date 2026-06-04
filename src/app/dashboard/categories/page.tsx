"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function CategoriesPage() {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <p className="mt-4 text-muted-foreground">No Categories found.</p>
      </CardContent>
    </Card>
  );
}
