/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3a264a", "#8c00ff", "#3d036d", "#ab69c3",'#714793','#380136'];
const RADIAN = Math.PI / 180;
function countGoalTypes(goals) {
    const types={};
    const typesData = []
  goals.forEach((goal) => {
    if (types[goal.type]) {
      types[goal.type]++;
    } else {
      types[goal.type] = 1;
    }
  });
  Object.entries(types).forEach(([key, val]) => {

    typesData.push({ name: key, value: val });
  });
  return typesData
}
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  data
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const name = data[index]?.name || "";
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieTypeCharts({ goals }) {
  const [size, setSize] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth)
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

 const data = countGoalTypes(goals);
  return (
    <>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(props) => renderCustomizedLabel({ ...props, data: data })}
          outerRadius={size<500?100:150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((value, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
}
