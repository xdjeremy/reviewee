import React, { FC, useState } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import StatItem from "./Stat.item";
import { useEffectOnce } from "usehooks-ts";
import { toast } from "react-hot-toast";
import { supabase } from "../../../utils";

const TotalQuizCount: FC = () => {
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(0);
  useEffectOnce(() => {
    const fetchUserCount = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("quiz")
          .select("id", { count: "exact" });
        if (error) {
          return toast.error(error.message);
        }
        setUserCount(data.length);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchUserCount().then(() => setLoading(false));
  });
  return (
    <StatItem
      title={"Total Quiz Count"}
      value={userCount}
      loading={loading}
      icon={<UserGroupIcon className={"h-8 w-8 stroke-2"} />}
    />
  );
};

export default TotalQuizCount;
