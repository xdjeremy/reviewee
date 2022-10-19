import React, {FC, ReactNode} from 'react';
import Skeleton from "react-loading-skeleton";

interface Props {
    title: string;
    value: number;
    loading: boolean;
    description?: string;
    icon: ReactNode
}

const StatItem: FC<Props> = ({title, value, loading, description, icon}) => {
    return (
        <div className="stat">
            <div className="stat-figure text-secondary">
                {icon}
            </div>
            <div className="stat-title">{title}</div>
            <div className="stat-value">
                {loading ? <Skeleton /> : value}
            </div>
            <div className="stat-desc">{description}</div>
        </div>
    );
};

export default StatItem;
