import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const summaryData = [
  { title: "Approved", value: "₹45,200", count: 23, trend: "+15%", icon: TrendingUp, color: "text-success" },
  { title: "Rejected", value: "₹8,400", count: 5, trend: "-8%", icon: TrendingDown, color: "text-destructive" },
  { title: "Pending", value: "₹12,600", count: 8, trend: "8 items", icon: DollarSign, color: "text-warning" },
];

const categoryData = [
  { category: "Travel", amount: 25400, percentage: 42, count: 12 },
  { category: "Meals", amount: 15200, percentage: 25, count: 18 },
  { category: "Office Supplies", amount: 10800, percentage: 18, count: 8 },
  { category: "Software", amount: 6200, percentage: 10, count: 5 },
  { category: "Other", amount: 3000, percentage: 5, count: 3 },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">View expense reports and export data</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">{item.title}</CardDescription>
                  <div className={`p-2 rounded-lg bg-${item.color.replace('text-', '')}/10`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{item.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{item.count} expenses</p>
                  <Badge variant="outline" className={item.color}>
                    {item.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>Breakdown of spending across different categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-muted-foreground">
                    ₹{item.amount.toLocaleString()} ({item.count} expenses)
                  </span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>
          <CardDescription>Expense trends over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-border rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Chart visualization would appear here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (Can be implemented with Recharts library)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
