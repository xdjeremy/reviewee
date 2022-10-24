import React, { FC, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { toast } from "react-hot-toast";
import { supabase } from "../../../utils";
import StatItem from "./Stat.item";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const AverageScoreItem: FC = () => {
  const [loading, setLoading] = useState(true);
  const [averageScore, setAverageScore] = useState<number>(0);

  useEffectOnce(() => {
    const fetchAverageScore = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          return toast.error(userError.message);
        }

        const { data, error } = await supabase
          .from("quiz_attempt_items")
          .select("is_correct")
          .eq("owner", user?.id);
        if (error) {
          return toast.error(error.message);
        }
        const correctAnswers = data.filter(
          (item: any) => item.is_correct
        ).length;
        const averageScore = (correctAnswers / data.length) * 100;
        // limit to 2 decimal places
        setAverageScore(Math.round(averageScore * 100) / 100);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchAverageScore().then((_r) => setLoading(false));
  });
  return (
    <StatItem
      title={"Average Score"}
      value={averageScore + "%"}
      loading={loading}
      icon={<ArrowTrendingUpIcon className={"h-8 w-8 stroke-2"} />}
    />
  );
};

export default AverageScoreItem;
