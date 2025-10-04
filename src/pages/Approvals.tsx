import { useState } from "react";
import { CheckCircle, XCircle, Eye, FileText, Calendar, User } from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const mockApprovals = [
  { id: 1, employee: "John Doe", date: "2025-01-15", category: "Travel", amount: 2500, currency: "INR", merchant: "Uber", description: "Client meeting transportation" },
  { id: 2, employee: "Jane Smith", date: "2025-01-14", category: "Meals", amount: 1200, currency: "INR", merchant: "Restaurant ABC", description: "Team dinner" },
  { id: 3, employee: "Mike Johnson", date: "2025-01-13", category: "Office Supplies", amount: 850, currency: "INR", merchant: "Staples", description: "Office stationery" },
];

export default function Approvals() {
  const [selectedExpense, setSelectedExpense] = useState<typeof mockApprovals[0] | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const { toast } = useToast();

  const handleAction = (expense: typeof mockApprovals[0], action: "approve" | "reject") => {
    setSelectedExpense(expense);
    setActionType(action);
  };

  const confirmAction = () => {
    if (!selectedExpense || !actionType) return;

    const message = actionType === "approve"
      ? `✅ Expense of ₹${selectedExpense.amount.toLocaleString()} has been approved!`
      : `❌ Expense of ₹${selectedExpense.amount.toLocaleString()} has been rejected.`;

    toast({
      title: actionType === "approve" ? "Expense Approved" : "Expense Rejected",
      description: message,
    });

    setSelectedExpense(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Approvals to Review</h1>
        <p className="text-muted-foreground mt-1">Review and approve expense submissions from your team</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Pending Review</CardDescription>
            <CardTitle className="text-2xl font-bold">{mockApprovals.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Awaiting your approval</p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Total Amount</CardDescription>
            <CardTitle className="text-2xl font-bold">
              ₹{mockApprovals.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Sum of pending expenses</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">This Week</CardDescription>
            <CardTitle className="text-2xl font-bold">12</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Expenses processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Approvals</CardTitle>
          <CardDescription>Review each expense and take appropriate action</CardDescription>
        </CardHeader>
        <CardContent>
          {mockApprovals.length > 0 ? (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApprovals.map((expense) => (
                    <TableRow key={expense.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{expense.employee}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {expense.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>{expense.merchant}</TableCell>
                      <TableCell className="font-semibold">
                        {expense.currency} {expense.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-success hover:bg-success/10 hover:text-success hover:border-success"
                            onClick={() => handleAction(expense, "approve")}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                            onClick={() => handleAction(expense, "reject")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">
                There are no expenses waiting for your approval
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedExpense} onOpenChange={() => setSelectedExpense(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "approve" ? "Approve Expense?" : "Reject Expense?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "approve" ? (
                <>
                  Are you sure you want to approve this expense of{" "}
                  <span className="font-semibold">
                    ₹{selectedExpense?.amount.toLocaleString()}
                  </span>{" "}
                  for {selectedExpense?.category}?
                </>
              ) : (
                <>
                  Are you sure you want to reject this expense? The employee will be notified and can resubmit with corrections.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={
                actionType === "approve"
                  ? "bg-success hover:bg-success/90"
                  : "bg-destructive hover:bg-destructive/90"
              }
            >
              {actionType === "approve" ? "Approve" : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
