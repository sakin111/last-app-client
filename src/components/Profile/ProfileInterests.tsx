
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProfileInterests({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-3">{title}</h3>

        {items?.length ? (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No data provided</p>
        )}
      </CardContent>
    </Card>
  );
}

