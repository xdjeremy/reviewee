import React, { FC, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { toast } from "react-hot-toast";
import { supabase } from "../../../utils";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

const LeaderboardItem: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const { id } = router.query;
  useEffectOnce(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase
          .from("quiz_attempt_items")
          .select("is_correct, quiz_attempt!inner(quiz, owner, created_at, id)")
          .eq("quiz_attempt.quiz", id);

        if (error) {
          return toast.error(error.message);
        }

        // create an array for each quiz_attempt.id and push the is_correct value
        const quizAttemptItems: any[] = [];
        data?.forEach((item: any) => {
          const index = quizAttemptItems.findIndex(
            (quizAttempt) => quizAttempt.id === item.quiz_attempt.id
          );
          if (index === -1) {
            quizAttemptItems.push({
              id: item.quiz_attempt.id,
              is_correct: [item.is_correct],
              owner: item.quiz_attempt.owner,
              created_at: item.quiz_attempt.created_at,
            });
          } else {
            quizAttemptItems[index].is_correct.push(item.is_correct);
          }
        });

        // get score and total question for each quiz attempt
        const leaderboard = quizAttemptItems.map((quizAttempt) => {
          const score = quizAttempt.is_correct.filter(
            (item: any) => item
          ).length;
          const totalQuestion = quizAttempt.is_correct.length;
          return {
            id: quizAttempt.id,
            score,
            totalQuestion,
            // trim owner to first 15 characters
            owner: quizAttempt.owner.slice(0, 15) + "...",
            // format date to dd/mm/yyyy
            created_at: new Date(quizAttempt.created_at).toLocaleDateString(
              "en-GB"
            ),
          };
        });
        // sort by score
        leaderboard.sort((a, b) => b.score - a.score);
        setLeaderboard(leaderboard);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchLeaderboard().then(() => setIsLoading(false));
  });
  return (
    <div className="overflow-x-auto">
      <table className="table w-full rounded-md">
        <thead>
          <tr>
            <th></th>
            <th className={"w-10"}>User</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
            </tr>
          )}
          {!isLoading &&
            leaderboard.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className={"w-10 truncate"}>{item.owner}</td>
                <td>
                  {item.score}/{item.totalQuestion}
                </td>
                <td>{item.created_at}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardItem;
