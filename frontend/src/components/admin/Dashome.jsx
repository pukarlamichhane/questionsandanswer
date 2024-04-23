import { BsFillArchiveFill, BsPeopleFill } from "react-icons/bs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import Asidebar from "./Asidebar";

function Dashome() {
  const data = [
    { name: "Sunday", uv: 0, pv: 0, amt: 0 },
    { name: "Monday", uv: 0, pv: 0, amt: 0 },
    { name: "Tuesday", uv: 0, pv: 0, amt: 0 },
    { name: "Wednesday", uv: 0, pv: 0, amt: 0 },
    { name: "Thursday", uv: 0, pv: 0, amt: 0 },
    { name: "Friday", uv: 0, pv: 0, amt: 0 },
    { name: "Saturday", uv: 0, pv: 0, amt: 0 },
  ];
  return (
    <main className="w-full h-screen bg-white-900">
      <Asidebar></Asidebar>
      <div className="ml-60 p-6">
        <div className="m-2">
          <h3 className="text-2xl font-semibold">DASHBOARD</h3>
        </div>

        <div className=" grid grid-cols-4 gap-6">
          <div className=" bg-blue-600 text-white rounded p-4">
            <div className=" flex justify-between items-center">
              <h3>TOtal sales</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1 className="text-4xl">0</h1>
          </div>
          <div className=" bg-blue-600 text-white rounded p-4">
            <div className=" flex justify-between items-center">
              <h3>PRODUCTS</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1 className="text-4xl">0</h1>
          </div>
          <div className=" bg-blue-600 text-white rounded p-4">
            <div className=" flex justify-between items-center">
              <h3>CUSTOMERS</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1 className="text-4xl">0</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Dashome;
