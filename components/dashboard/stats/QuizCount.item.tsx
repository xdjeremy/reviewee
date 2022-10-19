import React, { FC, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useEffectOnce } from "usehooks-ts";
import { supabase } from "../../../utils";
import { toast } from "react-hot-toast";
import StatItem from "./Stat.item";
import {ListBulletIcon} from "@heroicons/react/24/outline";

const QuizCountItem: FC = () => {
  const [loading, setLoading] = useState(true);
  const [quizCount, setQuizCount] = useState<number>(0);
  useEffectOnce(() => {
    const fetchStats = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          throw userError;
        }

        const { data, error } = await supabase
          .from("quiz")
          .select("id")
          .eq("owner", user?.id);
        if (error) {
          throw error;
        }
        setQuizCount(data.length);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchStats().then((_r) => setLoading(false));
  });
  return (
    <StatItem title={'Quiz Count'} value={quizCount} loading={loading} icon={<ListBulletIcon className={'w-8 h-8 stroke-2'} />} />
  );
};

export default QuizCountItem;
