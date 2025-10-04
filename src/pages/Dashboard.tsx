import { useState } from "react";
import { Plus, Upload, Filter, Clock, CheckCircle, XCircle, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExpenseFormModal from "@/components/ExpenseFormModal";

const mockExpenses = [
  { id: 1, date: "2025-01-15", category: "Travel", amount: 2500, currency: "INR", status: "approved", merchant: "Uber" },
  { id: 2, date: "2025-01-14", category: "Meals", amount: 1200, currency: "INR", status: "pending", merchant: "Restaurant ABC" },
  { id: 3, date: "2025-01-13", category: "Office Supplies", amount: 850, currency: "INR", status: "pending", merchant: "Staples" },
  { id: 4, date: "2025-01-12", category: "Travel", amount: 3200, currency: "INR", status: "rejected", merchant: "Airlines" },
  { id: 5, date: "2025-01-10", category: "Entertainment", amount: 1800, currency: "INR", status: "draft", merchant: "Cinema" },
];

const stats = [
  { title: "Total Expenses", value: "₹9,550", description: "This month", trend: "+12%" },
  { title: "Pending Approval", value: "2", description: "Awaiting review", trend: "2 items" },
  { title: "Approved", value: "₹2,500", description: "This month", trend: "1 item" },
  { title: "Rejected", value: "1", description: "Needs revision", trend: "₹3,200" },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { icon: any; variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
      approved: { icon: CheckCircle, variant: "default", className: "bg-success/10 text-success border-success/20 hover:bg-success/20" },
      pending: { icon: Clock, variant: "secondary", className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20" },
      rejected: { icon: XCircle, variant: "destructive", className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20" },
      draft: { icon: Edit2, variant: "outline", className: "bg-muted/50 text-muted-foreground border-muted" },
    };

    const config = variants[status] || variants.draft;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredExpenses = statusFilter === "all" 
    ? mockExpenses 
    : mockExpenses.filter(exp => exp.status === statusFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hi, John! 👋</h1>
          <p className="text-muted-foreground mt-1">Here are your expenses for this month</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Upload Receipt
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{stat.description}</CardDescription>
              <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Your Expenses</CardTitle>
              <CardDescription>Track and manage all your submitted expenses</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length > 0 ? (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{expense.date}</TableCell>
                      <TableCell>{expense.merchant}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell className="font-semibold">
                        {expense.currency} {expense.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(expense.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No expenses yet</h3>
              <p className="text-muted-foreground mb-4">
                Click "Upload Receipt" to get started
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Upload Receipt
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ExpenseFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
