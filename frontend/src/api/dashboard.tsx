import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { DeviceType } from "./devices";
import { checkErrorStatus } from "@util/checkErrorStatus";
import toast from "react-hot-toast";

export type ReadingType = {
  temperature: number;
  humidity: number;
  gas: number;
  vibration: number;
  time: string;
};

export type AlertType = {
  _id: string;
  device: DeviceType;
  sensor: "vibration" | "gas" | "temperature" | "humidity";
  startTime: string;
  endTime: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
};

type UserDashboardType = {
  userName: string;
  lastReading: ReadingType;
  averageTempSeries: {
    date: string;
    average: number;
  }[];
  latestAlerts: AlertType[];
};

type AdminDashboardType = {
  totalDevices: number;
  totalActiveDevices: number;
  totalAlerts: number;
  totalReadings: number;
  location: { _id: string; total: number }[];
  latestAlerts: AlertType[];
  activeDevicesSeries: {
    date: string;
    total: number;
  }[];
};

export function useGetUserDashboard(
  onSuccess?: () => void,
  onError?: () => void
) {
  const query = useQuery({
    queryKey: ["user-dasboard"],
    queryFn: async () => {
      const res = await axios.get<UserDashboardType>("user-dashboard");
      return res.data;
    },
    staleTime: 60000,
    refetchInterval: 60000,
    onSuccess,
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
      onError && onError();
    },
  });
  return query;
}

export function useGetAdminDashboard(
  onSuccess?: () => void,
  onError?: () => void
) {
  const query = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axios.get<AdminDashboardType>("admin-dashboard");
      return res.data;
    },
    staleTime: 60000,
    refetchInterval: 60000,
    onSuccess,
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
      onError && onError();
    },
  });
  return query;
}
