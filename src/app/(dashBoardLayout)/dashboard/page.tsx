import DashboardHome from '@/components/modules/Dashboard/DashboardHome';
import { getUserInfo } from '@/services/Auth/getUserInfo';
import { getIndividualR } from '@/services/Dashboard/travel-comments.service';
import { myTravel } from '@/services/Dashboard/travel.service';


const DashboardPage = async() => {

    const user = await getUserInfo()
    const review = await getIndividualR()
    const travel = await myTravel()
  return (
    <div>
    <DashboardHome user={user} review={review} travel={travel}/>
    </div>
  );
};

export default DashboardPage;