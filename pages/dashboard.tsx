import { NextPage } from 'next';
import React from 'react';
import { DashboardPage } from "../components/dashboard";
import { Layout } from '../components/layout';

const Dashboard: NextPage = () => {
	return (
		<Layout>
			<DashboardPage />
		</Layout>
	);
};

export default Dashboard;
