import DashboardHome from '@/components/modules/Dashboard/DashboardHome';
import { getUserInfo } from '@/services/Auth/getUserInfo';
import { getIndividualR } from '@/services/Dashboard/travel-comments.service';
import { myTravel } from '@/services/Dashboard/travel.server';
import { getMyPlan } from '@/services/subscribe/sub.service';


export const dynamic = 'force-dynamic';

const DashboardPage = async() => {

    const user = await getUserInfo()
    const review = await getIndividualR(1, 10)
    const travel = await myTravel()
    const Subscribed = await getMyPlan()
    console.log(Subscribed);

  return (
    <div>
    <DashboardHome user={user} review={review} travel={travel} Subscribed={Subscribed}/>
    </div>
  );
};

export default DashboardPage;