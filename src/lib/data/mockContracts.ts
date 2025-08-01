import { ContractSummary } from "@/types/contract";

export const mockContracts: ContractSummary[] = [
  {
    id: "1",
    title: "Berlin ↔ Barcelona Swap",
    otherParty: "Carlos Martinez",
    status: "pending",
    createdDate: "2 days ago",
    startDate: "March 15",
    conversationId: "1",
  },
  {
    id: "2",
    title: "Berlin ↔ Rome Swap",
    otherParty: "Marco Rodriguez",
    status: "active",
    createdDate: "1 week ago",
    startDate: "April 5",
    conversationId: "2",
  },
  {
    id: "3",
    title: "Berlin ↔ London Swap",
    otherParty: "Emma Wilson",
    status: "draft",
    createdDate: "3 weeks ago",
  },
  {
    id: "4",
    title: "Berlin ↔ Tokyo Swap",
    otherParty: "Alex Chen",
    status: "completed",
    createdDate: "2 months ago",
    startDate: "January 10",
    endDate: "January 20",
  },
];
