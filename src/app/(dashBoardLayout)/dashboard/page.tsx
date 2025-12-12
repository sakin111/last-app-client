import DashboardHome from '@/components/modules/Dashboard/DashboardHome';
import { getUserInfo } from '@/services/Auth/getUserInfo';
import React from 'react';

const DashboardPage = async() => {

    const user = await getUserInfo()
  return (
    <div>
    <DashboardHome user={user}/>
    </div>
  );
};

export default DashboardPage;