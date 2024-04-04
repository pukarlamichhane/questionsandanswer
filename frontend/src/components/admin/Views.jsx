
import Asidebar from './Asidebar';

function Views() {

    // const data = [
    //     { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    //     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    //     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    //     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    //     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    //     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    //     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    // ];

    return (
        <main className='w-full h-screen bg-white-900'>
            <Asidebar></Asidebar>
            <div className='ml-60 p-6'>
                <div className='m-2'>
                    <h3 className='text-2xl font-semibold'>View product</h3>
                </div>

            </div>
        </main>
    );
}

export default Views;
