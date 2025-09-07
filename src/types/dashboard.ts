export interface Widget {
  id: string;
  name: string;
  text: string;
  type: 'chart' | 'metric' | 'text' | 'progress';
  chartData?: {
    type: 'donut' | 'bar' | 'line';
    data: { label: string; value: number; color?: string }[];
  };
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  title: string;
  categories: Category[];
}

export const defaultDashboardData: DashboardData = {
  title: "CNAPP Dashboard",
  categories: [
    {
      id: "cspm-executive",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          text: "Connected and Not Connected accounts",
          type: "chart",
          chartData: {
            type: "donut",
            data: [
              { label: "Connected", value: 2, color: "hsl(var(--chart-info))" },
              { label: "Not Connected", value: 2, color: "hsl(var(--muted))" }
            ]
          }
        },
        {
          id: "cloud-account-risk",
          name: "Cloud Account Risk Assessment",
          text: "Risk assessment across cloud accounts",
          type: "chart",
          chartData: {
            type: "donut",
            data: [
              { label: "Failed", value: 1689, color: "hsl(var(--chart-danger))" },
              { label: "Warning", value: 681, color: "hsl(var(--chart-warning))" },
              { label: "Not Available", value: 36, color: "hsl(var(--muted))" },
              { label: "Passed", value: 7253, color: "hsl(var(--chart-success))" }
            ]
          }
        }
      ]
    },
    {
      id: "cwpp-dashboard",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "top-5-alerts",
          name: "Top 5 Namespace Specific Alerts",
          text: "No Graph data available!",
          type: "text"
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          text: "No Graph data available!",
          type: "text"
        }
      ]
    },
    {
      id: "registry-scan",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk-assessment",
          name: "Image Risk Assessment",
          text: "Total Vulnerabilities: 1470",
          type: "progress",
          chartData: {
            type: "bar",
            data: [
              { label: "Critical", value: 9, color: "hsl(var(--chart-danger))" },
              { label: "High", value: 150, color: "hsl(var(--chart-warning))" }
            ]
          }
        },
        {
          id: "image-security-issues",
          name: "Image Security Issues",
          text: "Total Images: 2",
          type: "progress",
          chartData: {
            type: "bar",
            data: [
              { label: "Critical", value: 2, color: "hsl(var(--chart-danger))" },
              { label: "High", value: 2, color: "hsl(var(--chart-warning))" }
            ]
          }
        }
      ]
    }
  ]
};